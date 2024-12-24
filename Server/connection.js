const express = require('express');
const db = require('./Dtabaseconnection')
const cors = require('cors');
const app = express();
const multer = require('multer')
const userLogin = require('./component/Login');
const departmentRegistration = require('./admin/departmentRegistration');
const studentregistration = require('./admin/studentRegistratuion')
// const { verfiyUser, renweToken, userLogin } = require('./component/Login')
app.use(cors({
    origin: ['http://localhost:3000'],
    Credential: true
}));

app.use(express.json());
app.use('/', userLogin);
app.use('/login/verifyOtp', userLogin);
app.use('/inner_pages/DepartmentRegistartion', departmentRegistration)
app.use('/inner_pages/student_registration', studentregistration);

//student detail update from the admin 
app.put('/updateStudentValues:id', (req, res) => {
    const id = req.params.id;
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.birthdate,
        req.body.gender,
        req.body.region,
        req.body.diabled,
        req.body.bacth,
        req.body.College,
        req.body.Department,
    ]
    const sql = 'UPDATE student SET fname = ? , lname =?  , birth_date=?  , gender =?  , region=?  ,disabled=?  ,  bacth =?  ,college=?  ,department=? WHERE university_id = ?'

    db.query(sql, [...values, id], (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json({ Message: 'Updtaed Successfully' })
    })
})//end of update student detail

//department update 
app.put('/updateDepartmentValues:id', (req, res) => {
    const id = req.params.id;
    const values = [
        req.body.department_name,
        req.body.college,
        req.body.max_capacity,
        req.body.min_capacity,
        req.body.total_course,
        req.body.location,
        req.body.total_teacher
    ]
    const sql = 'UPDATE department SET department_name = ? ,college= ? , max_capacity= ?, min_capacity=? , total_course = ? ,total_teacher = ? , location = ? WHERE department_id = ?'
    db.query(sql, [...values, id], (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json({ Message: 'updated Successfully' })
    })
})

//update user profile 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.put('/UpdateUserProfile:username', upload.single('image'), (req, res) => {
    const username = req.params.username;
    if (!req.file) {
        return res.json({ err: 'err' })
    }
    const image = req.file.buffer;
    console.log(image)
    const updateProfile = 'UPDATE useraccount SET profile = ? WHERE username = ?';
    db.query(updateProfile, [image, username], (err, result) => {
        if (err) return res.json(err)
        if (result) {
            return res.json(result)
        }
    })
})



app.put('/updateTeacherValues:id', (req, res) => {
    const id = req.params.id;
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.gender,
        req.body.experince,
        req.body.Level,
        req.body.birthdata,
        req.body.college,
        req.body.Department,
        req.body.Role
    ]
    const sql = 'UPDATE teacher SET FirstName= ?, LastName= ?, gender= ?, experince= ?, Level= ?, BirthData= ?, college = ?,Department= ?, Role = ? WHERE University_Id = ?'
    db.query(sql, [...values, id], (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json({ Message: 'updated Successfully' })
    })
})
//depratment delete
app.delete('/deleteDepartment:id', (req, res) => {
    db.query('DELETE FROM department WHERE department_id ="' + req.params.id + '"', (err, result) => {
        if (err) return res.json(err)
        if (result) res.json({ delete: 'deleted' })
    })
})

app.get('/inner_pages/display_student_information', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.json(err);
        }
        return res.json(data);
    });
});
app.get('/inner_pages/DisplayTeacher', (req, res) => {
    const sql = "SELECT * FROM Teacher";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/inner_pages/DisplayDepartment', async (req, res) => {
    const sql = "SELECT * FROM department"
    await db.query(sql, (err, result) => {
        if (err) return res.json(err);
        if (result) return res.json(result);
    })

});
app.get('/inner_pages/Announcement', (req, res) => {
    const sql = "SELECT *FROM anounce";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.json(err);
        }
        return res.json(data);
    });
});
app.get('/src/', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM teacher";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.json(err);
        }
        return res.json({ count: data[0].count });
    });
});
app.get('/src/login', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM college";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.json(err);
        }
        return res.json({ count: data[0].count });
    });
});
app.get('/inner_pages/DepartmentRegistartion', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM department";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.json(err);
        }
        return res.json({ count: data[0].count });
    });
});

app.get('/inner_pages/dasboard', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM student";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.json(err);
        }
        return res.json({ count: data[0].count });
    });
});
app.post('/pages/NewUserRegistration', (req, res) => {
    const sqlidcheck = 'SELECT *FROM student WHERE University_Id = ?'
    db.query(sqlidcheck, [req.body.idnumber], (err, result) => {
        if (err) return res.json(err);
        if (result.length > 0) {
            const sqlcheck = "SELECT *FROM useraccount WHERE username = ? and email = ?";
            db.query(sqlcheck, [req.body.userName, req.body.email], (err, result) => {
                if (err) return res.json();
                if (result.length > 0) {
                    return res.json({ message: true })
                } else {
                    const sql = "INSERT INTO useraccount (`University_Id`,`fname`,`lname`,`email`,`phone`, `username`, `password`) VALUES (?)";
                    const values = [
                        req.body.idnumber,
                        req.body.firstName,
                        req.body.lastName,
                        req.body.email,
                        req.body.phone,
                        req.body.userName,
                        req.body.password
                    ]
                    db.query(sql, [values], (err, result) => {
                        if (err) return res.json(err);
                        return res.json(result);
                    });
                }
            })
        } else if (result.length < 1) {
            const sqlteacheridcheck = 'SELECT *FROM teacher WHERE University_Id = ?'
            db.query(sqlteacheridcheck, [req.body.idnumber], (err, result) => {
                if (err) return res.json(err)
                if (result.length > 0) {
                    const sqlcheck = "SELECT *FROM useraccount WHERE username = ? and email = ?";
                    db.query(sqlcheck, [req.body.userName, req.body.email], (err, result) => {
                        if (err) return res.json(err);
                        if (result.length > 0) {
                            return res.json({ message: true })
                        } else {
                            const sql = "INSERT INTO useraccount (`University_Id`,`fname`,`lname`,`email`,`phone`, `username`, `password`) VALUES (?)";
                            const values = [
                                req.body.idnumber,
                                req.body.firstName,
                                req.body.lastName,
                                req.body.email,
                                req.body.phone,
                                req.body.userName,
                                req.body.password
                            ]
                            db.query(sql, [values], (err, result) => {
                                if (err) return res.json(err);
                                return res.json(result);
                            });
                        }
                    })
                }
            })
        } else {
            return res.json({ idexist: true })
        }
    })
})
app.post('/CourseRegistration', (req, res) => {
    const sqlidcheck = 'SELECT *FROM course WHERE course_code = ? and course_title = ?'
    db.query(sqlidcheck, [req.body.CourseCode, req.body.CourseTitle], (err, result) => {
        if (err) return res.json(err);
        if (result.length > 0) {
            return res.json({ register: false })
        } else {
            const sql = "INSERT INTO course (`course_code`,`course_title`,`credit_hour`,`tutorial`,`lab`, `active_batch`, `active_semister`,`college`,`department_id`) VALUES (?)";
            const values = [
                req.body.CourseCode,
                req.body.CourseTitle,
                req.body.CreditHour,
                req.body.Tutorial,
                req.body.Lab,
                req.body.ActiveBatch,
                req.body.ActiveSemister,
                req.body.College,
                req.body.Department,
            ]
            db.query(sql, [values], (err, result) => {
                if (err) return res.json(err);
                return res.json({ register: true })
            });
        }
    })
})
app.post('/inner_pages/TeacherRegistartion', (req, res) => {
    const selcetTotalTeacher = 'SELECT total_teacher FROM department WHERE department_name =?'
    db.query(selcetTotalTeacher, [req.body.Department], (err, result) => {
        if (err) return res.json(err)
        if (result.length > 0) {
            const total_teacher = result[0].total_teacher;
            const countTeachers = 'SELECT COUNT(*) AS count FROM teacher WHERE Department = ?'
            db.query(countTeachers, [req.body.Department], (err, result) => {
                if (err) return res.json(err)
                if (result[0].count > total_teacher) {
                    return res.json({ teacherFullMessage: true, register: false })
                } else {
                    const sqlTeacherExistCheck = 'SELECT *FROM teacher WHERE University_Id =  ? '
                    db.query(sqlTeacherExistCheck, [req.body.university_id], (err, result) => {
                        if (err) return res.json(err)
                        if (result.length > 0) {
                            return res.json({ register: false, teacherFullMessage: false })
                        } else {
                            const sql = "INSERT INTO teacher (`University_Id`,`FirstName`,`LastName`,`gender`,`experince`,`Level`,`BirthData`,`college`,`Department`,`Role`) VALUES (?)";
                            const values = [
                                req.body.university_id,
                                req.body.fname,
                                req.body.lname,
                                req.body.gender,
                                req.body.experince,
                                req.body.level,
                                req.body.birth_date,
                                req.body.College,
                                req.body.Department,
                                req.body.role,
                            ]
                            db.query(sql, [values], (err, result) => {
                                if (err) return res.json(err);
                                return res.json({ register: true, teacherFullMessage: false })
                            });
                        }
                    })
                }
            })
        }
    })


})


app.post('/pages/forget_password', (req, res) => {
    const sql = "SELECT *FROM useraccount WHERE University_Id = ? and email = ?";
    db.query(sql, [req.body.id, req.body.email], (err, result) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.json(err);
        }
        if (result.length > 0) {
            const id = [req.body.id]
            const sqlStudentrole = 'SELECT department FROM student WHERE university_id = ?'
            db.query(sqlStudentrole, [id], (err, result) => {
                if (err) return res.json(err)
                if (result.length > 0) {
                    return res.json({
                        Login: true, isStudent: true, Role: 'student', department: result[0].department
                    })
                } else if (result.length < 1) {
                    const sqlTeacherrole = "SELECT Department FROM teacher WHERE University_Id = ? and Role ='teacher' "
                    db.query(sqlTeacherrole, [id], (err, result) => {
                        if (err) return res.json(err)
                        if (result.length > 0) {
                            return res.json({ Login: true, isTeacher: true, Role: 'teacher', department: result[0].Department })
                        } else if (result.length < 1) {
                            const sqlHeadRole = "SELECT Department FROM teacher WHERE University_Id = ? and Role ='head'"
                            db.query(sqlHeadRole, [id], (err, result) => {
                                if (err) return res.json(err)
                                if (result.length > 0) {
                                    return res.json({ Login: true, isHead: true, Role: 'head', department: result[0].Department })
                                } else {
                                    return res.json({ Login: true, isAdmin: true, Role: 'admin' })
                                }
                            })
                        }

                    })
                }
            })

        } else {
            return res.json({ Login: false });
        }
    });
});
app.post('/college_registration', (req, res) => {
    const checkCollegeExistance = 'SELECT *FROM college WHERE college_id = ? and college_name = ?'
    db.query(checkCollegeExistance, [req.body.college_id, req.body.college_name], (err, result) => {
        if (err) return res.json(err);
        if (result.length < 1) {
            const insertCollegeValue = 'INSERT INTO college(`college_id`,`college_name`) VALUES(?)'
            const values = [
                req.body.college_id,
                req.body.college_name,
            ]
            db.query(insertCollegeValue, [values], (err, result) => {
                if (err) return res.json(err)
                if (result) {
                    return res.json({ register: true })
                }
            })
        } else {
            return res.json({ register: false })
        }
    })
})
app.get('/DisplayDepartment', (req, res) => {
    const selectCollege = 'SELECT *FROM college '
    db.query(selectCollege, (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json(result)

    })
})
app.post('/courseRegistration', (req, res) => {
    const checkCourseExistance = 'SELECT *FROM course WHERE course_title = ? and course_code = ?'
    db.query(checkCourseExistance, [req.body.CourseTitle, req.body.CourseCode], (err, result) => {
        if (err) return res.json(err)
        if (result.length < 1) {
            const inserCourseValues = 'INSERT INTO course (`course_code`,`course_title`,`credit_hour`,`tutorial`,`lab`,`active_batch`,`active_semiste`,`college`,`department_id`) VALUES(?)'
            const values = [
                req.body.CourseTitle,
                req.body.CourseCode,
                req.body.CreditHour,
                req.body.Lab,
                req.body.Tutorial,
                req.body.ActiveBatch,
                req.body.ActiveSemister,
                req.body.College,
                req.body.Department,
            ]
            db.query(insertCourseValues, [values], (err, result) => {
                if (err) return res.json(err)
                if (result) {
                    return res.json({ register: true })
                } else {
                    return res.json({ register: false })
                }
            })
        }
    })
})
app.post('/announce', (req, res) => {
    const checkAnnounceExist = 'SELECT *FROM anounce WHERE title = ? AND time = ?'
    db.query(checkAnnounceExist, [req.body.title, req.body.time], (err, result) => {
        if (err) return res, json(err)
        if (result.length > 0) {
            return res.json({ register: false })
        } else {
            const insertvalue = 'INSERT INTO anounce(`title`,`time`,`message`) VALUES(?)';
            const values = [
                req.body.title,
                req.body.time,
                req.body.message,
            ]
            db.query(insertvalue, [values], (err, result) => {
                if (err) return res.json(err)
                if (result) return res.json({ register: true })
            })
        }
    })

})
app.post('/ChangePassword', (req, res) => {
    const updatePassword = 'UPDATE useraccount SET password =? WHERE username = ? '
    db.query(updatePassword, [req.body.password, req.body.username], (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json({ update: true })
    })
})
app.get('/Teacher/selectTeacherId', (req, res) => {
    const selectTEacherId = `SELECT *FROM teacher WHERE Role = 'teacher' `
    db.query(selectTEacherId, (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json(result)
    })
})
app.get('/Department/Course', (req, res) => {
    const selectCourse = 'SELECT *FROM course'
    db.query(selectCourse, (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json(result)
    })
})
app.post('/head/TeacherAssign', (req, res) => {
    const selectTeacherName = 'SELECT FirstName,LastName FROM teacher WHERE University_Id =?'
    db.query(selectTeacherName, [req.body.TeacherId], (err, data) => {
        if (err) return res.json(err)
        if (data) {
            const checkAssignTeacher = 'SELECT *FROM assignedteacher WHERE teacher_id = ? and course = ?'
            db.query(checkAssignTeacher, [req.body.TeacherId, req.body.Course], (err, result) => {
                if (err) return res.json(err)
                if (result.length > 0) {
                    return res.json({ Assigned: false })
                } else {
                    const insertValues = 'INSERT INTO assignedteacher(`teacher_id`,`teacher_name`,`course`) VALUES(?)'
                    const values = [
                        req.body.TeacherId,
                        data[0].FirstName,
                        req.body.Course,
                    ]
                    db.query(insertValues, [values], (err, result) => {
                        if (err) return res.json(err)
                        if (result) return res.json({ Assigned: true })
                    })
                }
            })

        }
    })
})
app.get('/head/DisplayAssignTeacher', (req, res) => {
    const selectAssignValues = 'SELECT *FROM assignedteacher'
    db.query(selectAssignValues, (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json(result)
    })
})
app.post('/Head/AddClass', (req, res) => {
    const selectClassExist = 'SELECT *FROM ClassSchedule WHERE day =? and course=?'
    db.query(selectClassExist, [req.body.Day, req.body.Course], (err, result) => {
        if (err) return res.json(err)
        if (result.length > 0) {
            return res.json({ AddClass: false })
        } else {
            const inserClassValues = 'INSERT INTO ClassSchedule(`starttime`,`endtime`,`day`,`course`) VALUES(?)';
            const values = [
                req.body.StartTime,
                req.body.EndTime,
                req.body.Day,
                req.body.Course]
            db.query(inserClassValues, [values], (err, result) => {
                if (err) return res.json(err)
                if (result) return res.json({ AddClass: true })
            })
        }//end of else
    })
})
app.get('/Head/DisplayAddClass', (req, res) => {
    const displayClass = 'SELECT *FROM ClassSchedule'
    db.query(displayClass, (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json(result)
    })
})
app.put('studentupdate', (req, res) => {

})
app.delete('/inner_pages/DeleteTeacher:id', (req, res) => {
    db.query('DELETE FROM teacher WHERE University_Id = "' + req.params.id + '"', (err, result) => {
        if (!err) {
            db.query('DELETE FROM useraccount WHERE University_Id = "' + req.params.id + '"', (err, response) => {
                if (err) { return res.json(err) }
                if (response) {
                    res.status(200).json(result)
                }
            })
        } else {
            return res.json(err);
        }

    })
})
app.post('/inner_pages/DeleteTeacherRecord', (req, res) => {
    const insertdeleteddata = 'INSERT INTO DeleteTeacherRecord(`deleteid`,`username`,`deleteby`,`deletedate`,`deletetime`) VALUES(?)'
    const value = [
        req.body.id,
        req.body.user,
        req.body.Role,
        req.body.deleteday,
        req.body.deletetime,
    ]
    db.query(insertdeleteddata, [value], (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json(result)
    })
})
app.get('/inner_pages/DisplayDeleteTeacherRecord', (req, res) => {
    db.query('SELECT *FROM deleteteacherrecord', (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json(result)
    })
})
app.delete('/inner_pages/DeleteStudent:id', (req, res) => {
    db.query('DELETE FROM student WHERE university_id="' + req.params.id + '"  ', (err, result) => {
        if (!err) {
            db.query('DELETE FROM useraccount WHERE University_Id = "' + req.params.id + '"', (err, response) => {
                if (err) return res.json(err)
                if (response) { res.status(200).json(result) }
            })

        } else {
            return res.json(err);
        }
    })
})
app.post('/inner_pages/DeletestudentRecord', (req, res) => {
    const values = [
        req.body.id, req.body.user, req.body.Role, req.body.deleteday, req.body.deletetime,
    ]
    const insertDeletedstudent = 'INSERT INTO deletedStudent(`deletedid`,`deleterusername`,`deletdby`,`deletedday`,`deletedtime`) VALUES(?)'
    db.query(insertDeletedstudent, [values], (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json(result)
    })
})
app.get('/inner_pages/DiplayDeletedStudentRecord', (req, res) => {
    db.query('SELECT *FROM deletedStudent', (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json(result)
    })
})

app.get('/inner_pages/SelectCourseToTeacher', (req, res) => {
    db.query('SELECT *From assignedteacher ', (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json(result)
    })
})
app.get('/inner_pages/SelectCourseToStudent', (req, res) => {
    db.query('SELECT *FROM course', (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json(result)
    })
})
app.get('/teacher/displaystudentforgrade', (req, res) => {
    const sql = 'SELECT S.fname,S.lname,S.university_id,C.active_batch,C.department_id FROM student S INNER JOIN course C on S.bacth = C.active_batch ';
    db.query(sql, (err, result) => {
        if (err) return res.json(err)
        if (result) return res.json(result)
    })
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});