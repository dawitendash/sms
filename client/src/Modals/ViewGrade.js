import { React } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import GradeView from '../Student/GradeView';
import style from '../Styles/display_student_iformation.module.css';
Modal.setAppElement('#root');
const GradeViewModal = ({ isOpen, onRequestClose, ModalData }) => {
    const initialValues = {
        studentID: ModalData.university_id,
        StudentName: `${ModalData.fname} ${ModalData.lname}`,
        studentDepartment: ModalData.department,
        Course: '',
        quiz: '',
        midexam: '',
        project: '',
        finalexam: '',
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
                        left: '65%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-60%,-40%)',
                        width: '50rem',
                        height: '30rem',
                        padding: '20px',
                        animation: 'slidshow 0.5s forwards',
                    },
                }}
            >
                <div className='main-container'>
                    <div className="justify-content-end text-end border-3"
                        onClick={onRequestClose}>
                        <FaTimes className=" " />
                    </div>
                    <GradeView />

                </div >
            </Modal >
        </div >
    )
}

export default GradeViewModal;