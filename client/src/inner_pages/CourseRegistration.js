import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamation } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CourseValidation from '../formvalidation/CourseValidation';
import style from '../Styles/student_registration.module.css';
const initialValues = {
    CourseTitle: '',
    CourseCode: '',
    CreditHour: '',
    Lab: '',
    Tutorial: '',
    ActiveBatch: '',
    ActiveSemister: '',
    College: '',
    Department: '',
}
function CourseRegistration() {
    const user = localStorage.getItem('username');
    const Role = localStorage.getItem('Role');
    const Navigate = useNavigate();
    const [data, setdata] = useState([]);
    const [collegeData, setCOllegeData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/inner_pages/DisplayDepartment')
            .then(res => res.json())
            .then(data => setdata(data))
            .catch(err => console.log(err));
    }, [])
    useEffect(() => {
        fetch('http://localhost:5000/DisplayDepartment')
            .then(res => res.json())
            .then(collegeData => setCOllegeData(collegeData))
            .catch(err => console.log(err));
    }, [])
    const [success, setsuccess] = useState('');
    const [Err, setErr] = useState('');
    const [proccecing, setproccesing] = useState(false);
    const handleSubmit = async (values) => {
        const { CourseTitle, CourseCode, CreditHour, Lab, Tutorial, ActiveBatch, ActiveSemister, College, Department } = values
        console.log({ CourseTitle, CourseCode, CreditHour, Lab, Tutorial, ActiveBatch, ActiveSemister, College, Department })
        const url = 'http://localhost:8080/demo_war_exploded/course'
        setproccesing(true);
        try {
            const res = await axios.post(url, values)
            console.log(res);
            if (res.data.register) {
                setTimeout(() => {
                    setproccesing(false)
                    setsuccess('Register Successfully')
                    setTimeout(() => {
                        setsuccess('')
                    }, 2000)
                }, 4000)
            } else {
                setproccesing(true);
                setTimeout(() => {
                    setproccesing(false)
                    setErr('Course is already exist')
                    setTimeout(() => {
                        setErr('')
                    }, 4000)
                }, 4000)
            }
        } catch (error) {
            setErr('Check the network');
        }
    }
    if (user && Role === 'admin') {
        return (
            <>
                {
                    proccecing ? (
                        <p id={style.err_message} className='alert alert-primary'>
                            <span className={style.loader}></span>
                            <span>Request Proccessing....</span>
                        </p>
                    )
                        : (<>
                            {Err && <p id={style.err_message} className='alert alert-danger'>
                                <FaExclamation className={style.error} />
                                {Err}
                            </p>
                            }
                            {success && <p id={style.err_message} className='alert alert-success'>
                                <FaCheckCircle className={style.register} />
                                <span className={style.err}></span>
                                {success}</p>}
                        </>
                        )
                }
                <div className='main-container'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={CourseValidation}
                        onSubmit={handleSubmit}
                    >
                        {({ isValid, setFieldValue, values }) => (
                            <Form
                                className={style.registration}>
                                <h4>Course Registration</h4>
                                <div className={style.flex}>
                                    <div className={style.CourseName}>
                                        <label forhtml='CourseTitle'>Course Title:</label>
                                        <Field
                                            type='text'
                                            name='CourseTitle'
                                            placeholder='Course Title'></Field>
                                        <ErrorMessage
                                            className={style.error}
                                            name='CourseTitle'
                                            component='div' />
                                    </div>
                                    <div className={style.CourseCode}>
                                        <label forhtml='CourseCode'>Course Code:</label>
                                        <Field
                                            type='text'
                                            name='CourseCode'
                                            placeholder='Course Code'></Field>
                                        <ErrorMessage
                                            className={style.error}
                                            name='CourseCode'
                                            component='div' />
                                    </div>
                                    <div className={style.CreditHour}>
                                        <label forhtml='CreditHour'>Credit Hour:</label>
                                        <Field
                                            type='number'
                                            name='CreditHour'
                                            placeholder='Credit Hour'></Field>
                                        <ErrorMessage
                                            className={style.error}
                                            name='CreditHour'
                                            component='div' />
                                    </div>
                                    <div className={style.Lab}>
                                        <label forhtml='Lab'>Lab:</label>
                                        <Field
                                            type='number'
                                            name='Lab'
                                            placeholder='Lab'></Field>
                                        <ErrorMessage
                                            className={style.error}
                                            name='Lab'
                                            component='div' />
                                    </div>
                                    <div className={style.Tutorial}>
                                        <label forhtml='Tutorial'>Tutorial:</label>
                                        <Field
                                            type='number'
                                            name='Tutorial'
                                            placeholder='Tutorial'></Field>
                                        <ErrorMessage
                                            className={style.error}
                                            name='Tutorial'
                                            component='div' />
                                    </div>
                                    <div className={style.ActiveBatch}>
                                        <label forhtml='ActiveBatch'>Active Batch:</label>
                                        <Field
                                            type='number'
                                            name='ActiveBatch'
                                            placeholder='Active Batch'

                                        ></Field>
                                        <ErrorMessage
                                            className={style.error}
                                            name='ActiveBatch'
                                            component='div' />
                                    </div>
                                    <div className={style.ActiveSemister}>
                                        <label forhtml='ActiveSemister'>Active Semister:</label>
                                        <Field
                                            type='number'
                                            name='ActiveSemister'
                                            placeholder='Active Semister'></Field>
                                        <ErrorMessage
                                            className={style.error}
                                            name='ActiveSemister'
                                            component='div' />
                                    </div>
                                    <div className={style.College}>
                                        <label htmlFor='College'>College:</label>
                                        <Field as='select' name='College' onChange={(e) => {
                                            const selectedCollege = e.target.value;
                                            setFieldValue('College', selectedCollege);
                                            setFieldValue('Department', ''); // Reset Department when College changes
                                        }}>
                                            <option value="">---Select College---</option>
                                            {collegeData && collegeData.map((college, index) => (
                                                <option key={index} value={college.college_name}>{college.college_name}</option>
                                            ))}
                                        </Field>

                                    </div>
                                    <div className={style.Department}>
                                        <label htmlFor='Department'>Department:</label>
                                        <Field as='select' name='Department'>
                                            <option value="">---Select College First---</option>
                                            {data && data.filter(dept => dept.college === values.College)
                                                .map((dept, index) => (
                                                    <option key={index} value={dept.department_name}>{dept.department_name}</option>
                                                ))}
                                        </Field>
                                    </div>
                                </div>
                                <div className={style.btn}>
                                    <button type="submit" className='btn btn-primary rounded-0'>Submit</button>
                                    <button type='reset' className='btn btn-danger rounded-0'>Reset</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </>
        )
    } else {
        Navigate('/')
    }
}

export default CourseRegistration