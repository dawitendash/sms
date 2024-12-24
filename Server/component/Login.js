const express = require('express');
const router = express.Router();
const db = require('../Dtabaseconnection')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer');
let otpStore = {};
router.post('/', (req, res) => {
    const sql = "SELECT University_Id, fname, lname, email  FROM useraccount WHERE username = ? and password = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.json(err);
        }
        if (data) {
            const accessToken = jwt.sign({ username: req.body.username }, 'jwt-access-token-secret-key', { expiresIn: '1m' })
            const refreshToken = jwt.sign({ username: req.body.username }, 'jwt-refresh-token-secret-key', { expiresIn: '5m' })
            res.cookie('accessToken', accessToken, { maxAge: 60000 })
            res.cookie('refreshToken', refreshToken, { maxAge: 300000, httponly: true, secure: true, sameSite: 'strict' })
            if (data.length > 0) {
                const Id = data[0].University_Id
                const sqlStudentrole = 'SELECT department FROM student WHERE university_id = ?'
                db.query(sqlStudentrole, [Id], (err, result) => {
                    if (err) return res.json(err)
                    if (result.length > 0) {
                        const email = data[0].email
                        console.log(data[0].email)
                        console.log(email)
                        otpSender(email)
                        return res.json({
                            Login: true, isStudent: true, Role: 'student', department: result[0].department, id: data[0].University_Id, Data: data, otp: otpStore[email]
                        })
                    } else if (result.length < 1) {
                        const email = data[0].email
                        console.log(data[0].email)
                        console.log(email)
                        otpSender(email)
                        const sqlTeacherrole = "SELECT Department FROM teacher WHERE University_Id = ? and Role ='teacher' "
                        db.query(sqlTeacherrole, [Id], (err, result) => {
                            if (err) return res.json(err)
                            if (result.length > 0) {
                                return res.json({ Login: true, isTeacher: true, Role: 'teacher', department: result[0].Department, id: data[0].University_Id, Data: data, otp: otpStore[email] })
                            } else if (result.length < 1) {
                                const sqlHeadRole = "SELECT Department FROM teacher WHERE University_Id = ? and Role ='head'"
                                const email = data[0].email
                                console.log(data[0].email)
                                console.log(email)
                                otpSender(email)
                                db.query(sqlHeadRole, [Id], (err, result) => {
                                    if (err) return res.json(err)
                                    if (result.length > 0) {
                                        return res.json({ Login: true, isHead: true, Role: 'head', department: result[0].Department, id: data[0].University_Id, Data: data, otp: otpStore[email] })
                                    } else {
                                        const email = data[0].email
                                        console.log(data[0].email)
                                        console.log(email)
                                        otpSender(email)
                                        return res.json({ Login: true, isAdmin: true, Role: 'admin', id: data[0].University_Id, Data: data, otp: otpStore[email] })
                                    }
                                })
                            }

                        })
                    }
                })

            } else {
                return res.json({ Login: false });
            }
        }
    });


});


router.post('/login/verifyOtp', (req, res) => {
    const userotp = req.body.values.code1 + req.body.values.code2 + req.body.values.code3 + req.body.values.code4 + req.body.values.code5
    const email = req.query
    console.log("=================")//this diplay the users useremaik and user otp that acceptes from the input
    console.log(email.email)
    console.log(userotp);
    console.log("=================")//this diplay the otp that generate from the server
    console.log(otpStore[email.email]);
    if (userotp.toString() === otpStore[email.email].toString()) {
        delete otpStore[email.email];
        return res.json({ verify: true }) //make the response true for navigate to another page

    } else {
        return res.json({ verify: false, meg: "wrong otp please enetr the valid otp" })
    }
    // if (otpStore[email] === userotp) {
    //     return res.json({})
    // }
})


const genrateOtp = () => {
    return Math.floor(10000 + Math.random() * 90000)
}
const otpSender = (props) => {
    const email = props;
    const otp = genrateOtp();

    otpStore[email] = otp;
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'dawitendashaw74@gmail.com',
            pass: 'Feven2003',
        },
    });

    const mailOption = {
        from: 'dawitendashaw74@gmail.com',
        to: email,
        subject: 'your otp ',
        text: `You otp is ${otp} expires after 5 minutes`
    }
    // try {
    //     console.log(otp)
    //     console.log(otpStore[email])
    //     transporter.sendMail(mailOption);
    //     console.log(`succcessfully send to the ${email} go this`)
    // } catch (err) {
    //     console.log(err)
    //     console.log("error is occures in the otp sender")
    // }
}


const verfiyUser = (req, res, next) => {
    const accsessToken = req.cookie.accessToken;
    if (!accsessToken) {
        return res.json({ message: 'invalid access token' })
    } else {
        jwt.verify(accsessToken, 'jwt-access-token-secret-key', (err, decoed) => {
            if (err) {
                return res.json({ valid: false, message: 'invalid token' })
            } else {
                next();
            }
        })
    }
}
const renweToken = (req, res) => {
    const refreshToken = req.cookie.refreshToken;
    if (!refreshToken) {
        return res.json({ valid: false, messgae: 'no refresh token' })
    } else {
        jwt.verify(refreshToken, 'jwt-refresh-token-secret-key', (err, decoed) => {
            if (err) {
                return res.json({ valid: false, message: 'invalid token' })
            } else {
                req.username = decoed.username;
                const refreshToken = jwt.sign({ username: req.body.username }, 'jwt-refresh-token-secret-key', { expiresIn: '5m' })
                res.cookie('accessToken', accessToken, { maxAge: 60000 })
            }

        })
    }
}





module.exports = { verfiyUser, renweToken }
module.exports = router