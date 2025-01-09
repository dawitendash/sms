import axios from "axios";
import { Field, Form, Formik } from "formik";
import { FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import styles from '../Styles/DisplayTeacher.module.css';
import style from '../Styles/display_student_iformation.module.css';
Modal.setAppElement('#root');
const updateCollegeDetail = ({ isOpen, onRequestClose, ModalData }) => {
    const initialValues = {
        college_name: ModalData.college_name

    }
    const handleSubmit = async (values) => {
        const { college_name } = values;
        console.log({ college_name });
        const url = `http://localhost:8080/demo_war_exploded/updateCollegeInfo?id=${ModalData.college_id}`
        const res = await axios.put(url, { college_name })
        console.log(res);
        if (res.data.update) {
            window.alert("updated successfully");
        } else {
            window.alert("update Failed");
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
                        height: '20rem',
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
                    onSubmit={handleSubmit}
                >{({ isValid }) => (
                    <Form className={styles.updateform}>
                        <h4 className={style.editHead}> update Collge Detail:<spna className='text-info'>{ModalData.college_id}</spna> </h4>
                        <div className={styles.fname}>
                            <label htmlFor="college_name">college Name:</label>
                            <Field type="text" name="college_name" ></Field>
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

export default updateCollegeDetail
