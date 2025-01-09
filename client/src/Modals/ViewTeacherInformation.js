import { FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import style from '../Styles/display_student_iformation.module.css';
Modal.setAppElement('#root');
const ViewTeacherInformation = ({ isOpen, onRequestClose, ModalData }) => {
    const today = new Date();
    const birthdate = new Date(ModalData.BirthData)
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
                <h4 className={style.viewDetailHead}>
                    <span className='text-info'> Teacher Detail information : {ModalData.University_Id}</span>

                </h4>
                <div className={style.detailInfoContainer}>
                    <div>
                        Teacher Name :
                        <span>{ModalData.FirstName} {ModalData.LastName}</span>
                    </div>
                    <div>
                        Gender : <span>{ModalData.gender}</span>
                    </div>
                    <div>
                        Age: <span>{age}</span>
                    </div>

                    <div>
                        Experince: <span>{ModalData.experince}</span>

                    </div>
                    <div>
                        Level: <span >{ModalData.Level}</span>
                    </div>
                    <div>
                        College  :  <span> {ModalData.college}</span>
                    </div>
                    <div>

                        Department:<span>{ModalData.Department}</span>
                    </div>

                </div>
            </Modal>
        </div>
    )
}

export default ViewTeacherInformation