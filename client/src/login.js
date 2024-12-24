import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaInfoCircle, FaLock, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Loginvalidation } from "./formvalidation/Loginvalidation";
import style from "./Styles/login.module.css";
const initialValue = {
  username: "",
  password: "",
  remember: false,
};
function Login() {
  localStorage.removeItem('username')
  localStorage.removeItem('Role')
  const [loading, setloading] = useState(false); // for loading the page when it
  const [err, seterr] = useState('');// for set the error in state when it is occurs
  const Navigate = useNavigate(); // to navigate the other page  
  const loginsubmit = (values) => {
    //axios.defaults.withCredentials = true;
    setloading(true)
    setTimeout(() => {
      setloading(false);
      const { username, password } = values;
      console.log({ username, password });
      const url = "http://localhost:5000/";
      axios.post(
        url, values
      ).then(res => {
        console.log(res)
        console.log(res.data.Data[0].fname)
        if (res.data.Login && res.data.isAdmin) {
          Navigate('/Verfication')
          console.log(`Dear ${res.data.Data[0].fname} This is otp code for you : ` + res.data.otp)
          localStorage.setItem('username', username);
          localStorage.setItem('Role', res.data.Role);
          localStorage.setItem('fname', res.data.Data[0].fname);
          localStorage.setItem('lname', res.data.Data[0].lname);
          localStorage.setItem('email', res.data.Data[0].email);
        } else if (res.data.Login && res.data.isStudent) {
          console.log(res.data)
          Navigate('/Verfication');
          console.log(`Dear ${res.data.Data[0].fname} This is otp code for you : ` + res.data.otp)
          localStorage.setItem('username', username);
          localStorage.setItem('Role', res.data.Role);
          localStorage.setItem('fname', res.data.Data[0].fname);
          localStorage.setItem('lname', res.data.Data[0].lname);
          localStorage.setItem('email', res.data.Data[0].email);
          localStorage.setItem('department', res.data.department);
        }
        else if (res.data.Login && res.data.isTeacher) {
          Navigate('/Verfication')
          console.log(`Dear ${res.data.Data[0].fname} This is otp code for you : ` + res.data.otp)
          localStorage.setItem('username', username);
          localStorage.setItem('Role', res.data.Role);
          localStorage.setItem('fname', res.data.Data[0].fname);
          localStorage.setItem('lname', res.data.Data[0].lname);
          localStorage.setItem('email', res.data.Data[0].email);
          localStorage.setItem('department', res.data.department);
          sessionStorage.setItem('id', res.data.id)
        }
        else if (res.data.Login && res.data.isHead) {
          Navigate('/Verfication')
          console.log(`Dear ${res.data.Data[0].fname} This is otp code for you : ` + res.data.otp)
          localStorage.setItem('username', username);
          localStorage.setItem('Role', res.data.Role);
          localStorage.setItem('fname', res.data.Data[0].fname);
          localStorage.setItem('lname', res.data.Data[0].lname);
          localStorage.setItem('email', res.data.Data[0].email);
          localStorage.setItem('department', res.data.department);
        } else {
          seterr('Please enter valid username and password');
        }
      }).catch((err) => {
        if (!err?.response || err.response.status === 500) {
          Navigate('/ErrorPage/ErrorPage')
          console.log(err)
        }
      })
    }, 2000)
  };

  return (
    <div className={style.form_content}>
      <Formik
        initialValues={initialValue}
        validationSchema={Loginvalidation}
        onSubmit={loginsubmit}
      >
        {({ isSubmitting }) => (
          <Form className={style.login_form}>
            <div>
              {err && (
                <p className="alert alert-danger w-1" id={style.errors}>
                  <FaInfoCircle className='m-2' style={{ color: 'black' }} />{err}
                </p>
              )}
              <h2>
                Sign in
                <FaSignInAlt className={style.icon} />
              </h2>
              <div className={style.username}>
                <label
                  htmlFor="username">Username: </label>
                <Field name="username" type="text" placeholder='username' />
                <FaUser className={style.InputIcons} />
                <ErrorMessage
                  className={style.error} name="username" component="div" />
              </div>
              <div className={style.password}>
                <label htmlFor="password">Password:</label>
                <Field type="password" name="password" placeholder='password' />
                <FaLock className={style.InputIcons} />
                <ErrorMessage
                  className={style.error} name="password" component="div" />
              </div>
              <div className={style.checkbox}>
                <Field type="checkbox" name="remember" />
                <label>Remember Me.</label>
                <Link
                  className={style.forget_password_tag}
                  to="/pages/forget_password"
                >
                  Forget Password?
                </Link>
                <ErrorMessage
                  id={style.block_meg}
                  className={style.error} name="remember" component="div" />
              </div>
              <div className={style.button}>
                <button type="submit" name="submit" disabled={loading}>
                  {
                    loading ? (
                      <>
                        <span className='loader'></span>
                        Please wait...
                      </>
                    ) : (
                      'Login'
                    )
                  }
                </button>
              </div>
              <div className={style.have_no_account}>
                <span>Don't have an account? </span>
                <Link
                  className={style.registration_tag}
                  to="/pages/NewUserRegistration"
                >
                  Register
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default Login;