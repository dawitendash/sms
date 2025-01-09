import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FaEnvelope, FaIdCard, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import signupValidation from '../formvalidation/new_user_registration_validation';
import style from '../Styles/new_user_registration.module.css';
const initialValues = {
  firstName: "",
  lastName: "",
  idnumber: '',
  email: "",
  phone: "",
  userName: "",
  password: "",
  agree: false,
};
function NewUserRegistration() {
  const [proccecing, setproccesing] = useState(false);
  const [err, setErr] = useState('');
  const handleSubmit = async (values) => {
    const { firstName, lastName, idnumber, email, phone, userName, password } = values;
    console.log({ firstName, lastName, idnumber, email, phone, userName, password });
    const url = "http://localhost:8080/demo_war_exploded/NewUserRegistartion";
    try {
      const res = await axios.post(url, values)
      console.log(res);
      if (res.data.register) {
        setproccesing(true)
        setTimeout(() => {
          setproccesing(false)
        }, 3000)
      } else {
        console.log("errr")
        setErr(res.data.msg)
      }

    } catch (err) {
      if (!err?.response || err.response.status === 500) {
        setErr('server is not avaliable due to maintenace')
      } else if (err.response.status === 404) {
        setErr('Registration Failed ')
      } else {
        navigator('/ErrorPage/ErrorPage')
      }
    };
  };
  return (
    <Formik
      className={style.all}
      initialValues={initialValues}
      validationSchema={signupValidation}
      onSubmit={handleSubmit}
    >
      {({ isvalid }) => (
        <Form  >
          <div className={style.container}>
            {
              proccecing ? (
                <div className='alert alert-primary'>
                  <span className={style.loader}></span>
                  <span>Request Proccessing....</span>
                </div>
              )
                : (<>
                  {err && <span id={style.err_message} className='alert alert-danger'>
                    <span className={style.err}>!</span>
                    {err}</span>}
                </>
                )
            }
            <h3>Registration</h3>
            <div className={style.fname}>
              <label htmlFor="firstName">First Name:</label>
              <Field type="text" id="firstName" name="firstName" />
              <FaIdCard className={style.icon} />
              <ErrorMessage className={style.errors} name="firstName" component="div" />
            </div>
            <div className={style.lname}>
              <label htmlFor="lastName">Last Name:</label>
              <Field type="text" id="lastName" name="lastName" />
              <FaIdCard className={style.icon} />
              <ErrorMessage className={style.errors} name="lastName" component="div" />
            </div>
            <div className={style.university_id}>
              <label htmlFor="idnumber">Id Number:</label>
              <Field type="text" id="idnumber" name="idnumber" />
              <FaIdCard className={style.icon} />
              <ErrorMessage className={style.errors} name="idnumber" component="div" />
            </div>
            <div className={style.email}>
              <label htmlFor="email">Email:</label>
              <Field type="email" id={style.email} name="email" />
              <FaEnvelope className={style.icon} />
              <ErrorMessage className={style.errors} name="email" component="div" />
            </div>
            <div className={style.phone}>
              <label htmlFor="phone">Phone:</label>
              <Field type="tel" id={style.phone} name="phone" />
              <FaPhone className={style.icon} />
              <ErrorMessage className={style.errors} name="phone" component="div" />
            </div>
            <div className={style.username}>
              <label htmlFor="userName">User Name:</label>
              <Field type="text" id="userName" name="userName" />
              <FaUser className={style.icon} />
              <ErrorMessage className={style.errors} name="userName" component="div" />
            </div>
            <div className={style.password}>
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" />
              <FaLock className={style.icon} />
              <ErrorMessage className={style.errors} name="password" component="div" />
            </div>
            <div className={style.agree} >
              <Field className={style.checkbox} type="checkbox" id="agree" name="agree" />
              <label htmlFor="agree">I agree to the terms and conditions</label>
              <ErrorMessage className={style.errors} name="agree" component="div" />
            </div>
            <div className={style.button}>
              <button className="" type="submit" disabled={isvalid}>Register</button>
            </div>
            <div className={style.have_account}>
              Already have an account?
              <Link className={style.ancoh_tag} to="/src/login">Login</Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NewUserRegistration;
