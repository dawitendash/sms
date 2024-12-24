import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamation } from 'react-icons/fa';
import TeacherAssignValidation from '../formvalidation/TeacherAssignValidation';
import styles from '../Styles/display_student_iformation.module.css';
import style from '../Styles/student_registration.module.css';
function AssignTeacherToCourse() {
    const [teacherIds, setTeacherIds] = useState([]);
    const [courses, setCourses] = useState([]);
    const [success, setsuccess] = useState('');
    const [Err, setErr] = useState('');
    const [proccecing, setproccesing] = useState(false);
    const [assignedTeacher, setAssignedTeacher] = useState([]);
    const department = localStorage.getItem('department')
    useEffect(() => {
        fetch('http://localhost:5000/Teacher/selectTeacherId')
            .then(res => res.json())
            .then(data => {
                console.log('Teacher IDs:', data); // Log the response
                if (Array.isArray(data)) {
                    setTeacherIds(data);
                } else {
                    console.error('Expected an array of teacher IDs');
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/Department/Course')
            .then(res => res.json())
            .then(data => {
                console.log('Courses:', data); // Log the response
                if (Array.isArray(data)) {
                    setCourses(data);
                } else {
                    console.error('Expected an array of courses');
                }
            })
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        fetch('http://localhost:5000/head/DisplayAssignTeacher')
            .then(res => res.json())
            .then(assignedTeacher => setAssignedTeacher(assignedTeacher))
            .catch(err => console.log(err));
    }, [])
    const filteredCourse = courses.filter(d => d.department_id === department)
    console.log(department)
    console.log(filteredCourse)
    const handleSubmit = async (values) => {
        const { TeacherId, Course } = values;
        console.log({ TeacherId, Course });
        const URL = 'http://localhost:5000/head/TeacherAssign';
        try {
            await axios.post(URL, { TeacherId, Course }).then(res => {
                if (res.data.Assigned) {
                    setproccesing(true);
                    setTimeout(() => {
                        setproccesing(false)
                        setsuccess('Assign Successfully')
                        setTimeout(() => {
                            setsuccess('')
                        }, 2000)
                    }, 4000)
                } else {
                    setproccesing(true);
                    setTimeout(() => {
                        setproccesing(false)
                        setErr('Teacher is Already Assigned  ')
                        setTimeout(() => {
                            setErr('')
                        }, 4000)
                    }, 4000)
                }
            })
        } catch (error) {
            setErr('Check the network');
            console.log(error)
        }
    }
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
                    initialValues={{ TeacherId: '', Course: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={TeacherAssignValidation}
                >
                    {({ isValid }) => (
                        <Form className={style.assignform} >
                            <h4 className={style.ASsignTeacherhead}>Assign Teacher To Course</h4>
                            <div className={style.assignTeacherFlex}>
                                <div className={style.TeacherId}>
                                    <label htmlFor='Teacher Id'>Teacher Id:</label>
                                    <Field as='select' name='TeacherId'>
                                        <option value="">---Select Teacher Id---</option>
                                        {Array.isArray(teacherIds) && teacherIds.map((id, index) => (
                                            <option key={index} value={id.University_Id}>{id.University_Id}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name='TeacherId' className={style.assignError} component='div' />
                                </div>
                                <div className={style.CourseList}>
                                    <label htmlFor='Course'>Course:</label>
                                    <Field as='select' name='Course'>
                                        <option value="">---Select Course Title---</option>
                                        {Array.isArray(filteredCourse) && filteredCourse.map((course, i) => (
                                            <option key={i} value={course.course_title}>{course.course_title}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name='Course' className={style.assignError} component='div' />             </div>
                                <div className={style.AssignBtn}>
                                    <button type="submit" className='rounded-0' >Assign</button>
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>

            </div>

            <div className='main-container'>
                <h4 className={style.ASsignTeacherhead}> Assigned Teachers</h4>
                <div className={styles.DisplayAssignedValue}>
                    <table className="table" >
                        <thead>
                            <tr className={styles.header}>
                                <th scope="col">Teacher Id</th>
                                <th scope="col">Teacher Name</th>
                                <th scope="col">Assigned Course</th>
                            </tr>
                        </thead>
                        <tbody className={styles.body}>
                            {assignedTeacher.map((d, i) => (
                                <tr key={i}>
                                    <td >{d.teacher_id}</td>
                                    <td >{d.teacher_name}</td>
                                    <td >{d.course}</td>

                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary rounded-0"
                                        > update</button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
}

export default AssignTeacherToCourse;
