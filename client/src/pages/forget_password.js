import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FaEnvelope, FaIdCard, FaUserAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/forget_password.module.css";
import { fogetPasswordValidayion } from '../formvalidation/fogetPasswordValidayion';
let initialValues = {
  id: "",
  name: "",
  email: "",
}
function Forgetpassword() {
  const Navigate = useNavigate();
  const [err, seterr] = useState('');
  const handleSubmit = (values) => {
    const { email, id, name } = values;
    console.log({
      email, id, name
    });
    const url = "http://localhost:5000/pages/forget_password";
    axios.post(
      url, values
    ).then(res => {
      if (res.data.Login && res.data.isAdmin) {
        const num = Math.floor(Math.random() * 90000) + 10000;
        localStorage.setItem('otp', num)
        Navigate('../Verfication')
        localStorage.setItem('username', name);
        localStorage.setItem('Role', res.data.Role);
        localStorage.setItem('fname', res.data.fname);
        localStorage.setItem('lname', res.data.lname);
        localStorage.setItem('email', res.data.email);
        console.log('succes')
      } else if (res.data.Login && res.data.isStudent) {
        const num = Math.floor(Math.random() * 90000) + 10000;
        localStorage.setItem('otp', num)
        Navigate('../Verfication')
        localStorage.setItem('username', name);
        localStorage.setItem('Role', res.data.Role);
        localStorage.setItem('fname', res.data.fname);
        localStorage.setItem('lname', res.data.lname);
        localStorage.setItem('department', res.data.department);
        console.log('succes')
      }
      else if (res.data.Login && res.data.isTeacher) {
        const num = Math.floor(Math.random() * 90000) + 10000;
        localStorage.setItem('otp', num)
        Navigate('../Verfication')
        localStorage.setItem('username', name);
        localStorage.setItem('Role', res.data.Role);
        localStorage.setItem('fname', res.data.fname);
        localStorage.setItem('lname', res.data.lname);
        localStorage.setItem('department', res.data.department);
        console.log('succes')
      }
      else if (res.data.Login && res.data.isHead) {
        const num = Math.floor(Math.random() * 90000) + 10000;
        localStorage.setItem('otp', num)
        Navigate('../Verfication')
        localStorage.setItem('username', name);
        localStorage.setItem('Role', res.data.Role);
        localStorage.setItem('fname', res.data.fname);
        localStorage.setItem('lname', res.data.lname);
        localStorage.setItem('department', res.data.department);
        console.log('succes')
      } else if (res.data.Login === false) {
        console.log(res.data.Result)
        console.log('false credential')
        seterr('Invalid email');
      }
    }).catch(err => {
      if (!err?.response) {
        Navigate('/ErrorPage/ErrorPage')
      } else if (err.response.status === 404) {
        Navigate('/ErrorPage/ErrorPage')
      } else if (err.reponse.status === 500) {
        Navigate('/ErrorPage/ErrorPage')
      }
    })
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={fogetPasswordValidayion}
      onSubmit={handleSubmit}
    >

      <div className={styles.container}>
        {err && <span className={styles.error}>{err}</span>}
        <h3>Forget Password</h3>
        <Form className={styles.forget_password} >
          <div className={styles.name}>
            <label htmlFor="name">Name:</label>
            <Field
              type="text"
              name="name"
              placeholder="Name..."

            />
            <FaUserAlt className={styles.icon} />
            <ErrorMessage className={styles.error} name='name' component="div" />
          </div>
          <div className={styles.email}>
            <label htmlFor="email">Email:</label>
            <Field
              type="email"
              name="email"
              placeholder="Email...."
            />
            <FaEnvelope className={styles.icon} />
            <ErrorMessage className={styles.error} name='email' component="div" />
          </div>
          <div className={styles.id}>
            <label htmlFor="id">ID: </label>
            <Field
              type="text"
              name="id"
              placeholder="id..."
            />
            <FaIdCard className={styles.icon} />
            <ErrorMessage className={styles.error} name='id' component="div" />
          </div>
          <div className={styles.btn}>
            <button type="submit" className='btn btn-success'>
              Submit
            </button>
            <button type="button" className='btn btn-danger'>
              Reset
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  );
}
export default Forgetpassword;
