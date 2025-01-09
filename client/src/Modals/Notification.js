import { React, useEffect, useState } from 'react';
import { BsRepeat } from 'react-icons/bs';
import { FaBell, FaEnvelope } from 'react-icons/fa';
import Modal from 'react-modal';
import style from '../linkafter.module.css';
import ViewMessage from '../ViewMessage';
Modal.setAppElement('#root');

const Notification = ({ isOpen, onRequestClose, user }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/inner_pages/Announcement');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching announcements:', error);
                setData('No Notification!!')
            }
        };
        fetchData();
    }, []);
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
                        top: '15%',
                        left: '90%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-60%,-40%)',
                        width: '15rem',
                        height: '6rem',
                        padding: '20px',
                        overflowY: 'none',
                    },
                }}
            >
                <div className={style.notify}>
                    <div>
                        <BsRepeat
                            className={style.refresh}
                            onClick={() => { }} />
                    </div>
                    <div className={style.header}>
                        {data.map((d, i) => (
                            <div className='dynamic_notification' key={i}><FaEnvelope className='message-icon' />
                                {/* {d.title} <Link to='../ViewMessage'></Link> */}
                            </div>
                        ))}
                        <FaBell className={style.icon} />
                        <span onClick={() => { return (<ViewMessage />) }}>See All Notification</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default Notification