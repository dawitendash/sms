import { React } from "react";
import Modal from 'react-modal';
import style from '../Styles/display_student_iformation.module.css';
Modal.setAppElement('#root');
const DeleteModal = ({ isOpen, onRequestClose, ModalData }) => {
    const handleDelete = async (id) => {
        console.log(id)
        await fetch('http://localhost:5000/inner_pages/DeleteStudent' + id, { method: 'DELETE' }).then(res => {
            try {
                if (res) {
                    console.log('deleted')
                } else {
                    console.log('error')
                }
            } catch (err) {
                console.log(err)
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
                        width: '20rem',
                        height: '10rem',
                        padding: '20px',
                        animation: 'slidshow 0.5s forwards',
                    },
                }}
            >
                <div className='justify-content-center text-center m-2'>
                    Do You want to delete {ModalData.university_id}? <br />

                    <div className="mt-3">
                        <button type="" className="btn btn-primary m-2" onClick={() => handleDelete(ModalData.university_id)} >Yes</button>
                        <button type="" className="btn btn-danger m-3" onClick={onRequestClose}>No</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default DeleteModal;