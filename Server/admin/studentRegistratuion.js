const express = require('express');
const router = express.Router();
const db = require('../Dtabaseconnection')

router.post('/', (req, res) => {
    const sqlStudentExistCheck = 'SELECT *FROM student WHERE university_id = ?'
    db.query(sqlStudentExistCheck, [req.body.university_id], (err, result) => {
        if (err) return res.json(err)
        if (result.length > 0) {
            return res.json({ register: false })
        } else {
            const values = [
                req.body.fname,
                req.body.lname,
                req.body.university_id,
                req.body.birth_date,
                req.body.gender,
                req.body.region,
                req.body.disabled,
                req.body.entrance,
                req.body.gpa,
                req.body.batch,
                req.body.College,
                req.body.department,
                req.body.role,
            ]
            const sql = "INSERT INTO student(`fname`,`lname`,`university_id`,`birth_date`,`gender`,`region`,`disabled`,`entrancemark`,`gpa`,`bacth`, `college`,`department`,`role`) VALUES (?)";
            db.query(sql, [values], (err, result) => {
                if (!err) {
                    res.status(200).json({ register: true })
                } else { return res.json(err) }
            })
        }
    })





    // db.query(sqlStudentExistCheck, [req.body.university_id], (err, data) => {
    //     if (err) return res.json(err)
    //     if (data.length < 1) {
    //         const values = [
    //             req.body.fname,
    //             req.body.lname,
    //             req.body.university_id,
    //             req.body.birth_date,
    //             req.body.gender,
    //             req.body.region,
    //             req.body.disabled,
    //             req.body.entrance,
    //             req.body.gpa,
    //             req.body.batch,
    //             req.body.college,
    //             req.body.department,
    //             req.body.role,
    //         ]
    //         const sql = "INSERT INTO student(`fname`,`lname`,`university_id`,`birth_date`,`gender`,`region`,`disabled`,`entrancemark`,`gpa`,`bacth`, `college`,`department`,`role`) VALUES (?)";
    //         db.query(sql, [values], (err, result) => {
    //             if (err) return res.json(err);
    //             if (result) {
    //                 return res.json({ register: true })
    //             } else {
    //                 return res.json({ register: false })
    //             }
    //         });

    //     }
    // })
})


module.exports = router