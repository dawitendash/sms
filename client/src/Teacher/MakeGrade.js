import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../Styles/MakeGrade.module.css';
function MakeGrade() {
    const department = localStorage.getItem('department')
    const active_bacth = localStorage.getItem('active_bacth')
    const username = localStorage.getItem('username');
    const Role = localStorage.getItem('Role');
    const Navigate = useNavigate();
    const [data, setdata] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/teacher/displaystudentforgrade`)
            .then(res => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setdata(data)
                } else {
                    console.log('the expected value is must be an array')
                }
            }
            )
            .catch(err => console.log(err));
    }, [])
    const filterDepartment = data.filter(param => param.department_id === department)
    console.log(data)
    console.log(filterDepartment)
    console.log(active_bacth)
    if (username && Role) {
        return (
            <>
                <div className='main-container'>

                    <div className={style.flex}>
                        <div className={style.lable}>Student Id</div>
                        <div className={style.lable}>Full Name</div>
                        <div className={style.lable}>Course</div>
                        <div className={style.lable}>Assigment</div>
                        <div className={style.lable}>Mid Exam</div>
                        <div className={style.lable}>Final Exam</div>
                        <div className={style.lable}>Grade</div>
                        <div className={style.lable}>Action</div>
                    </div>
                    {
                        filterDepartment.map((d, i) => (
                            <Formik>{({ isValid }) => (
                                <Form className={style.innerflex}>
                                    <div className={style.id}>
                                        <Field type='text' value={d.university_id}></Field>
                                    </div>
                                    <div className={style.Fullname}>
                                        <Field value={`${d.fname} ${d.lname}`} ></Field>
                                    </div>
                                    <div className={style.name}>
                                        <Field value={d.department_id}></Field>
                                    </div>
                                    <div className={style.Assiment}>
                                        <Field type='text' name='assigment' value={d.active_batch} ></Field>
                                    </div>
                                    <div className={style.Mid}>
                                        <Field type='text' name='midexam'  ></Field>
                                    </div>
                                    <div className={style.Final}>
                                        <Field type='text' name='finalexam' ></Field>
                                    </div>
                                    <div className={style.Final}>
                                        <Field ></Field>
                                    </div>
                                    <div className={style.btn}>
                                        <button type='submit' className='btn btn-primary text-white rounded-0'>Insert</button>
                                    </div>
                                </Form>
                            )}
                            </Formik>
                        ))
                    }
                </div>
            </>
        )
    } else {
        Navigate('/');
    }
}

export default MakeGrade
