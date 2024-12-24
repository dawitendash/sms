import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import style from '../Styles/display_student_iformation.module.css';
import styles from '../Styles/DisplayTeacher.module.css';
Modal.setAppElement('#root');
const UpdateTeacherInformationModal = ({ isOpen, onRequestClose, ModalData }) => {
    const intialValues = {
        fname: ModalData.FirstName,
        lname: ModalData.LastName,
        gender: ModalData.gender,
        BirthData: ModalData.BirthData,
        experince: ModalData.experince,
        Level: ModalData.Level,
        College: ModalData.college,
        Department: ModalData.Department,
        Role: ModalData.Role
    }
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
    const updateTeacher = async (values) => {
        const { fname, lname, gender, birthdata, experince, Level, college, Department, Role } = values;
        console.log({ fname, lname, gender, birthdata, experince, Level, college, Department, Role })
        await axios.put('http://localhost:5000/updateTeacherValues' + ModalData.University_Id, { fname, lname, gender, birthdata, experince, Level, college, Department, Role }).then(res => {
            if (res) {
                console.log(res.data.Message)
            }
        }
        )
    }


    return (
        <div className={style.modal}>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel='profile detail'
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                    content: {
                        top: '41%',
                        left: '55%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-60%,-40%)',
                        width: '35rem',
                        height: '34rem',
                        padding: '20px',
                        animation: 'slidshow 0.5s forwards',
                    },
                }}
            >
                <div className={style.times_container}>
                    <FaTimes className={style.times} onClick={onRequestClose} />
                </div>
                <Formik initialValues={intialValues}
                    onSubmit={updateTeacher}
                >
                    {({ isValid, setFieldValue, values }) => (
                        <Form className={styles.updateTeacherInfo}>
                            <h4 className={styles.editHead}> update Teacher Detail: {ModalData.University_Id}</h4>
                            <div className={styles.fname}>
                                <label htmlfor='firstName'>First Name:</label>
                                <Field type="text" name="fname" ></Field>
                            </div>
                            <div className={styles.lname}>
                                <label htmlfor='lastName'>Last Name:</label>
                                <Field type="text" name="lname"></Field>
                            </div>
                            <div className={styles.gender}>
                                <label htmlfor='gender'>Gender:</label>
                                <Field type="radio" name="gender" value='male' ></Field>Male
                                <Field type="radio" name="gender" value='female'></Field> Female
                            </div>
                            <div className={styles.birthdata}>
                                <label htmlFor='BirthDate'>BirthDate:</label>
                                <Field type="date" name="BirthData"  ></ Field>
                            </div>
                            <div className={styles.experince}>
                                <label htmlfor='experince'>Experince :</label>
                                <Field type="number" name="experince" min="0" ></ Field>
                            </div>
                            <div className={styles.Level}>
                                <label htmlfor='level'>Level :</label>
                                <Field type="text" name="Level"></Field>
                            </div>
                            <div className={styles.col}>
                                <label htmlFor='College'>College:</label>
                                <Field as='select' name='College' onChange={(e) => {
                                    const selectedCollege = e.target.value;
                                    setFieldValue('College', selectedCollege);
                                    setFieldValue('Department', '');
                                }}>
                                    {collegeData && collegeData.map((college, index) => (
                                        <option key={index} value={college.college_name}>{college.college_name}</option>
                                    ))}
                                </Field>

                            </div>
                            <div className={styles.dep}>
                                <label htmlFor='Department'>Department:</label>
                                <Field as='select' name='Department'>
                                    {data && data
                                        .filter(dept => dept.college === values.College)
                                        .map((dept, index) => (
                                            <option key={index} value={dept.department_name}>{dept.department_name}</option>
                                        ))}
                                </Field>
                            </div>
                            <div className={styles.Department}>
                                <label htmlFor='Role'>Role :</label>
                                <Field type="text" name="Role" ></Field>
                            </div>
                            <div className={styles.btn}>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    )
}


export default UpdateTeacherInformationModal