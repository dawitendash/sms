import axios from "axios";
import { Field, Form, Formik } from "formik";
import { React, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import styles from '../Styles/DisplayTeacher.module.css';
import style from '../Styles/display_student_iformation.module.css';
Modal.setAppElement('#root');
const UpdateStudentInformationModal = ({ isOpen, onRequestClose, ModalData }) => {
    const initialValues = {
        fname: ModalData.fname,
        lname: ModalData.lname,
        gender: ModalData.gender,
        diabled: ModalData.disabled,
        region: ModalData.region,
        birthdate: ModalData.birth_date,
        bacth: ModalData.bacth,
        College: ModalData.college,
        Department: ModalData.department,

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
    const handleUpdate = async (values) => {
        const { fname, lname, gender, diabled, region, birthdate, bacth, College, Department } = values
        console.log({ fname, lname, gender, diabled, region, birthdate, bacth, College, Department })
        await axios.put('http://localhost:5000/updateStudentValues' + ModalData.university_id, { fname, lname, gender, diabled, region, birthdate, bacth, College, Department }).then(res =>
            console.log(res.data.Message)
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
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleUpdate}
                >{({ isvalid, setFieldValue, values }) => (
                    <Form className={styles.updateform}>
                        <h4 className={style.editHead}> update student Detail:{ModalData.university_id} </h4>
                        <div className={styles.fname}>
                            <label htmlFor="FirstName">First Name:</label>
                            <Field type="text" name="fname" ></Field>
                        </div>
                        <div className={styles.lname}>
                            <label htmlFor="lastname">Last Name:</label>
                            <Field type="text" name="lname"
                            ></Field>
                        </div>
                        <div className={styles.gender}>
                            <label htmlfor='gender'>Gender:</label>
                            <Field type="radio" name="gender" value='male' ></Field>Male
                            <Field type="radio" name="gender" value='female'  ></Field> Female
                        </div>
                        <div className={styles.gender}>
                            <label htmlfor='gender'>Disabled:</label>
                            <Field type="radio" name="diabled" value='yes'></Field>Yes
                            <Field type="radio" name="diabled" value='no'  >
                            </Field>No
                        </div>
                        <div className={styles.region}>
                            <label htmlFor="Region">Region:</label>
                            <Field as='select' name='region' >
                                <option name='region'>Tigray</option>
                                <option name='region'>Afar</option>
                                <option name='region'>Amhara</option>
                                <option name='region'>Oromia</option>
                                <option name='region'>Somalia</option>
                                <option name='region'>Benishangul Gumz</option>
                                <option name='region'>Gambela</option>
                                <option name='region'>Harari</option>
                                <option name='region'>SNNP</option>
                                <option name='region'>Adiss Abeba</option>
                                <option name='region'>Dire Dawa</option>
                            </Field>
                        </div>
                        <div className={styles.birthdata}>
                            <label htmlFor='BirthDate'>BirthDate:</label>
                            <Field type="date" name="birthdate" ></ Field>
                        </div>
                        <div className={styles.birthdata}>
                            <label htmlFor="Bacth">Bacth:</label>
                            <Field type="number" name="bacth" min="1" max="6" ></Field>
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
                        <div className={styles.btn}>
                            <button type="submit" className="btn btn-primary" onClick={onRequestClose.closemodal}>Update</button>
                        </div>
                    </Form>
                )}</Formik>
            </Modal>
        </div>
    )
}

export default UpdateStudentInformationModal;