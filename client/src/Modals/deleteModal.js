import axios from "axios";
import { React } from "react";
import Modal from 'react-modal';
import style from '../Styles/display_student_iformation.module.css';
Modal.setAppElement('#root');
const DeleteModal = ({ isOpen, onRequestClose, ModalData }) => {
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/students/${id}`, { method: 'DELETE' })
            console.log(id)
            console.log(res)
            if (res.data.delete) {
            } else {
                console.log('error')
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
                        width: '22rem',
                        height: '10rem',
                        padding: '20px',
                        animation: 'slidshow 0.5s forwards',
                    },
                }}
            >
                <div className='justify-content-center text-center m-2'>
                    Do You want to delete<spna className='text-info'>{ModalData.university_id}</spna>? <br />

                    <div className="mt-3">
                        <button type="" className="btn btn-primary m-2" onClick={() => {
                            handleDelete(ModalData.university_id);
                            onRequestClose()
                        }
                        } >Yes</button>
                        <button type="" className="btn btn-danger m-3" onClick={onRequestClose}>No</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default DeleteModal;