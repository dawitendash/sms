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
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const { email, id, name } = values;
    console.log({
      email, id, name
    });
    const url = "http://localhost:8080/demo_war_exploded/ForgetPassword";

    try {
      const res = await axios.post(url, { email, id, name }, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },);
      console.log(res);
      console.log(res.data.user.Role);
      console.log(res.data.status);
      console.log(res.data.user)
      if (res.data.status) {
        console.log("this is enetered")
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("Role", res.data.user.Role);
        localStorage.setItem("fname", res.data.user.fname);
        localStorage.setItem("lname", res.data.user.lname);
        localStorage.setItem("email", res.data.user.email);
        if (res.data.user.isStudent) {
          localStorage.setItem("department", res.data.user.department);
          navigate("../Verfication");
        } else if (res.data.user.isTeacher || res.data.user.isHead) {
          localStorage.setItem("department", res.data.user.department);
          sessionStorage.setItem("id", res.data.user.id);
          navigate("../Verfication");
        } else if (res.data.user.isAdmin) {
          navigate("../Verfication");
        }
        console.log(`Dear ${res.data.user.fname}, this is your OTP: ${res.data.user.otp}`);
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      if (!err.response || err.response.status === 500) {
        setError("Unexpected error occurs");
      } else if (err.response.status === 404) {
        setError("Server error");
      } else {
        navigate("/ErrorPage/ErrorPage");
      }
    }
  };
  return (
    <div className="text-center">
      <Formik
        initialValues={initialValues}
        validationSchema={fogetPasswordValidayion}
        onSubmit={handleSubmit}
      >
        <div className={styles.container}>
          {error && <span className={styles.error}>{error}</span>}
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
              <button type="reset" className='btn btn-danger'>
                Reset
              </button>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
}
export default Forgetpassword;
