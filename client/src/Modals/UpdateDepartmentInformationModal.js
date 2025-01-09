import axios from "axios";
import { Field, Form, Formik } from "formik";
import { React, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import styles from '../Styles/DisplayTeacher.module.css';
import style from '../Styles/display_student_iformation.module.css';
Modal.setAppElement('#root');
const UpdateDepartmentInformationModal = ({ isOpen, onRequestClose, ModalData }) => {
    const initialValues = {
        department_name: ModalData.department_name,
        min_capacity: ModalData.min_capacity,
        max_capacity: ModalData.max_capacity,
        total_course: ModalData.total_course,
        total_teacher: ModalData.total_teacher,
        location: ModalData.location,
        college: ModalData.college

    }
    const [collegeData, setCOllegeData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/DisplayDepartment')
            .then(res => res.json())
            .then(collegeData => setCOllegeData(collegeData))
            .catch(err => console.log(err));
    }, [])
    const handleUpdate = async (values) => {
        const { department_name, min_capacity, max_capacity, total_course, total_teacher, location, college } = values
        console.log({ department_name, min_capacity, max_capacity, total_course, total_teacher, location, college })
        try {
            const res = await axios.put(`http://localhost:8080/demo_war_exploded/updateDepartmentInfo?id=${ModalData.department_id}`, { department_name, min_capacity, max_capacity, total_course, total_teacher, location, college })
            console.log(res)
            if (res.data.update) {
                window.alert("update Succussfully")
                onRequestClose()

            } else {
                window.alert("failed to update")
                onRequestClose()
            }
        } catch (err) {
            console.log(err)
        }
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
                        animation: 'slidshow 1s forwards',
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
                        <h4 className={style.editHead}> update department Detail:<spna className='text-info'>{ModalData.department_id}</spna> </h4>
                        <div className={styles.fname}>
                            <label htmlFor="department_name">Department Name:</label>
                            <Field type="text" name="department_name" ></Field>
                        </div>
                        <div className={styles.lname}>
                            <label htmlFor="min_capacity">Minimum Student Capacity:</label>
                            <Field type="text" name="min_capacity" ></Field>
                        </div>
                        <div className={styles.lname}>
                            <label htmlFor="max_capacity">Maxmum Student Capacity:</label>
                            <Field type="text" name="max_capacity" ></Field>
                        </div>
                        <div className={styles.birthdata}>
                            <label htmlfor='total_course'>Total Course:</label>
                            <Field type="text" name="total_course"></Field>
                        </div>
                        <div className={styles.birthdata}>
                            <label htmlfor='total_teacher'>Total Teacher</label>
                            <Field type="text" name="total_teacher"></Field>
                        </div>
                        <div className={styles.col}>
                            <label htmlFor='college'>College:</label>
                            <Field as='select' type="text" name="college" >
                                {
                                    collegeData.map((d, i) => (
                                        <option key={i} name='college'>{d.college_name}</option>
                                    ))
                                }

                            </ Field>
                        </div>
                        <div className={styles.birthdata}>
                            <label htmlFor="location">Location:</label>
                            <Field type="text" name="location" ></Field>
                        </div>
                        <div className={styles.btn}>
                            <button type="submit" className="btn btn-primary" >Update</button>
                        </div>
                    </Form>
                )}</Formik>
            </Modal>
        </div>
    )
}

export default UpdateDepartmentInformationModal;