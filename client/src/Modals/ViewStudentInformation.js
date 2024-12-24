import { FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import style from '../Styles/display_student_iformation.module.css';
Modal.setAppElement('#root');
const ViewStudentInformation = ({ isOpen, onRequestClose, ModalData }) => {
    const today = new Date();
    const birthdate = new Date(ModalData.birthdate)
    const age = today.getFullYear() - birthdate.getFullYear()
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
                        top: '45%',
                        left: '55%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-60%,-40%)',
                        transition: 'transform 6s',
                        width: '35rem',
                        height: '28rem',
                        padding: '20px',
                    },
                }}
            >
                <div className={style.times_container}>
                    <FaTimes className={style.times} onClick={onRequestClose} />
                </div>
                <h4 className={style.viewDetailHead}> student Detail information : {ModalData.university_id}</h4>
                <div className={style.detailInfoContainer}>
                    <div >
                        Student Name :
                        <span>{ModalData.fname} {ModalData.lname}</span>
                    </div>
                    <div>
                        Entrance Mark: <span>{ModalData.entrancemark}</span>
                    </div>
                    <div>
                        Age: <span>{age}</span>
                    </div>

                    <div>
                        CGPA: <span>{ModalData.gpa}</span>

                    </div>
                    <div>
                        Region: <span >{ModalData.region}</span>
                    </div>
                    <div>
                        Have Disable :  <span> {ModalData.disabled}</span>
                    </div>
                    <div>

                        Batch:<span>{ModalData.bacth}</span>
                    </div>
                    <div>

                        College: <span>{ModalData.college}
                        </span>
                    </div>
                    <div>
                        Department:<span>{ModalData.department}</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ViewStudentInformation