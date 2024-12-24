import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from 'react';
import { FaCheckCircle, FaExclamation } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Annonce from '../formvalidation/Annonce';
import style from '../Styles/Announcement.module.css';
const initialValues = {
    title: '',
    time: '',
    message: '',
}
function Announcement() {
    const user = localStorage.getItem('username');
    const Navigate = useNavigate();
    const Role = localStorage.getItem('Role')
    const [success, setsuccess] = useState('');
    const [Err, setErr] = useState('');
    const [proccecing, setproccesing] = useState(false);
    const handleSubmit = async (values) => {
        const { title, time, message } = values;
        console.log({ title, time, message })
        const url = 'http://localhost:5000/announce'
        try {
            await axios.post(url, { title, time, message }).then(res => {
                if (res.data.register) {
                    setproccesing(true);
                    setTimeout(() => {
                        setproccesing(false)
                        setsuccess('Send Successfully')
                        setTimeout(() => {
                            setsuccess('')
                        }, 2000)
                    }, 4000)
                } else {
                    setproccesing(true);
                    setTimeout(() => {
                        setproccesing(false)
                        setErr('Message is already distributed  ')
                        setTimeout(() => {
                            setErr('')
                        }, 4000)
                    }, 4000)
                }
            })
        } catch (error) {
            setErr('Check the network');
        }
    };


    if (user && Role === 'admin') {
        return (
            <>
                {
                    proccecing ? (
                        <p id={style.err_message} className='alert alert-primary'>
                            <span className={style.loader}></span>
                            <span>Request Proccessing....</span>
                        </p>
                    )
                        : (<>
                            {Err && <p id={style.err_message} className='alert alert-danger'>
                                <FaExclamation className={style.error} />
                                {Err}
                            </p>

                            }
                            {success && <p id={style.err_message} className='alert alert-success'>
                                <FaCheckCircle className={style.register} />
                                <span className={style.err}></span>
                                {success}</p>}
                        </>
                        )
                }
                <div className='main-container'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Annonce}
                        onSubmit={handleSubmit}
                    >
                        {({ isValid }) => (
                            <>
                                <h4 className={style.hr_line}> Make Annoncement</h4>
                                <Form className={style.flex}>

                                    <div className={style.sender}>
                                        <label htmlFor='Title'>Title:</label>
                                        <Field type='text' placeholder='title' name='title'></Field>
                                        <ErrorMessage className={style.error} component='div' name='title' />
                                    </div>
                                    <div className={style.time}>
                                        <label htmlFor='Time'>Time:</label>
                                        <Field type='date' placeholder='time' name='time'></Field>
                                        <ErrorMessage className={style.error} component='div' name='time' />
                                    </div>
                                    <div className={style.Message}>
                                        <label htmlFor='Message'>Message</label>
                                        <Field as='textarea' type='text' cols='20' placeholder='Message' name='message'></Field>
                                        <ErrorMessage className={style.error} component='div' name='message' />
                                    </div>
                                    <br></br>
                                    <div className={style.btn}>
                                        <button type='submit' className='btn btn-primary rounded-0'>Send</button>
                                        <button type='reset' className='btn btn-danger rounded-0'>Reset</button>
                                    </div>
                                </Form>
                            </>
                        )}
                    </Formik>
                </div>
            </>
        )
    } else {
        Navigate('/')
    }
}

export default Announcement
