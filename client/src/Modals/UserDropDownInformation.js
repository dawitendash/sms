import { React, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import w from '../image/woldia-logo.jpg';
import style from '../linkafter.module.css';
import styles from '../Styles/studentsidebar.module.css';
Modal.setAppElement('#root');
const UserDropDownInformation = ({ isOpen, onRequestClose, user }) => {
    const username = localStorage.getItem('username')
    const fname = localStorage.getItem('fname');
    const lname = localStorage.getItem('lname');
    const email = localStorage.getItem('email');
    const [profileImage, setProfileImage] = useState(localStorage.getItem(`${username}profileImage`) || w);
    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const newImage = reader.result;
                setProfileImage(newImage);
                localStorage.setItem(`${username}profileImage`, newImage);
            };
            reader.readAsDataURL(file);
        }
    };
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
                        top: '40%',
                        left: '90%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-60%,-40%)',
                        width: '15rem',
                        height: '30rem',
                        padding: '20px'
                    },
                }}
            >
                <div className={style.userprofile}>
                    <div className={style.username}>
                        <div className={style.name}>
                            <label htmlFor="profileInput">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className={styles.profileImage}

                                    title="Click to update profile picture"
                                    style={{ cursor: 'pointer' }}
                                />
                            </label>
                            <input
                                type="file"
                                id="profileInput"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleProfileChange}
                            />
                        </div>
                    </div>
                    <div className='flex-column flex'>
                        <div className='m-5'>
                            <div className='h-50  '>
                                {email}
                            </div>
                            <div className='h-50 '>
                                {fname} {lname}
                            </div>
                        </div>
                        <div className='flex flex-lg-row '>
                            <button className='btn btn-info'>
                                <BsFillGearFill />  Setting
                            </button>
                        </div>
                        <div className='flex flex-lg-row text-end m-5 text-lg-end'>
                            <button title='logout'
                                className='btn btn-primary w-100 '
                                onClick={() => {
                                    localStorage.removeItem('username');
                                    localStorage.removeItem('Role');
                                    localStorage.removeItem('email');
                                    localStorage.removeItem('lname');
                                    localStorage.removeItem('fname');
                                    localStorage.removeItem('login')
                                    window.location.reload();
                                }}
                            >
                                <FaSignOutAlt className='icon' />  LogOut
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default UserDropDownInformation