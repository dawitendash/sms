import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from './Styles/Verification.module.css';
const initialValue = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
};
function Verification() {
    const user = localStorage.getItem('username');
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const inputRefs = useRef([]);
    useEffect(() => {
        if (timeLeft === 0) {
            alert("OTP has expired!");
            navigate('/');
        }
        const timerId = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(prevTime => prevTime - 1);
            }
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, navigate]);
    const handleSubmit = async (values) => {
        const enteredOtp = values.code1 + values.code2 + values.code3 + values.code4 + values.code5;
        const email = localStorage.getItem('email');
        console.log(enteredOtp)
        console.log(email)
        await axios.post(`http://localhost:5000/login/verifyOtp?email=${email}`, { values }).then((res) => {
            console.log("may be")
            console.log(res)
            try {
                if (res.data.verify) {
                    localStorage.setItem('login', true);
                    navigate('/inner_pages/dashboard');
                    window.location.reload();
                } else {
                    setErr(res.data.meg);
                }
            } catch (err) {
                console.log(err)
            }
        })
        // console.log(enteredOtp);
        // if (otp === enteredOtp) {
        //     localStorage.removeItem('otp');
        //     localStorage.setItem('login', true);
        //     navigate('/inner_pages/dashboard');
        //     window.location.reload();
        // } else {
        //     alert("Invalid OTP! Please try again.");
        // }
    };
    const handleChange = (index, setFieldValue) => (e) => {
        const { value } = e.target;
        if (/^[0-9]$/.test(value) || value === '') {
            setFieldValue(`code${index + 1}`, value);
            if (value && index < 4) {
                inputRefs.current[index + 1].focus();
            }
        }
    };
    const handleKeyDown = (index) => (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    if (user) {
        return (
            <div className={style.verification_code}  >
                <Formik
                    initialValues={initialValue}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            {
                                err && (<p className="text-center text-bg-danger " >{err}</p>)
                            }
                            <h2>Enter OTP please</h2>
                            <div className={style.verification_code_container}>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Field
                                        key={index}
                                        type="text"
                                        maxLength='1'
                                        className={style.input}
                                        name={`code${index + 1}`}
                                        innerRef={(el) => (inputRefs.current[index] = el)}
                                        onChange={handleChange(index, setFieldValue)}
                                        onKeyDown={handleKeyDown(index)}
                                    />
                                ))}
                            </div>
                            <div className={style.button_container}>
                                <button type='submit' className='btn btn-primary' disabled={isSubmitting || timeLeft === 0}>Verify</button>
                            </div>
                            <div className={timeLeft < 10 ? 'last_ten' : 'time_counter'}>
                                Time left: {timeLeft}s
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    } else {
        navigate('/');
    }
}
export default Verification;