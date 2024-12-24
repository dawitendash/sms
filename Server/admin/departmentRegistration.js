const express = require('express');
const router = express.Router();
const db = require('../Dtabaseconnection')

router.post('/', (req, res) => {
    const sqldepartmentcheck = 'SELECT *FROM department WHERE department_id = ? '
    db.query(sqldepartmentcheck, [req.body.dep_id], (err, result) => {
        if (err) return res.json(err)
        if (result.length > 0) {
            return res.json({ register: false })
        } else {
            const sql = "INSERT INTO department (`department_name`,`department_id`,`college`,`max_capacity`,`min_capacity`, `total_course`,`total_teacher`,`location`) VALUES (?)";
            const values = [
                req.body.dep_name,
                req.body.dep_id,
                req.body.college,
                req.body.max_capacity,
                req.body.min_capacity,
                req.body.total_course,
                req.body.total_teacher,
                req.body.location,
            ]
            db.query(sql, [values], (err, result) => {
                if (err) return res.json(err);
                return res.json({ register: true })
            });
        }
    })
})

module.exports = router