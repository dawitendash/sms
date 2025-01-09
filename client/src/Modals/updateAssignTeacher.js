import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { React } from 'react';
import { FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import styles from '../Styles/DisplayTeacher.module.css';
import style from '../Styles/display_student_iformation.module.css';
Modal.setAppElement('#root');
const updateAssignTeacher = ({ isOpen, onRequestClose, ModalData }) => {
    const initialValues = {
        teacher_id: ModalData.teacher_id,
        course_title: ModalData.course_title,
        max_capacity: ModalData.max_capacity,
         
    }

    const handleUpdate = async (values) => {
        const { department_name, min_capacity, max_capacity, total_course, total_teacher, location, college } = values
        console.log({ department_name, min_capacity, max_capacity, total_course, total_teacher, location, college })
        await axios.put('http://localhost:5000/updateDepartmentValues' + ModalData.department_id, { department_name, min_capacity, max_capacity, total_course, total_teacher, location, college }).then(res =>
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
                >{({ isvalid, setFieldValue,  }) => (
                    <Form className={styles.updateform}>
                        <h4 className={style.editHead}> update Asigned Teacher:<spna className='text-info'>{ModalData.department_id}</spna> </h4>
                        <div className={styles.fname}>
                            <label htmlFor="department_name">Teacher Name:</label>
                            <Field type="text" name="department_name" ></Field>
                        </div>
                        <div clas   sName={styles.lname}>
                            <label htmlFor="min_capacity">Couser Title:</label>
                            <Field as='select' type="text" name="min_capacity" ></Field>
                        </div>
                        <div className={styles.lname}>
                            <label htmlFor="max_capacity">:</label>
                            <Field type="text" name="max_capacity" ></Field>
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

export default updateAssignTeacher
