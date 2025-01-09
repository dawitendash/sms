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
  localStorage.clear();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginsubmit = async (values) => {
    setLoading(true);
    setError("");

    const { username, password } = values;
    const url = "http://localhost:8080/demo_war_exploded/Login";

    try {
      const res = await axios.post(url, { username, password }, {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
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
          navigate("./Verfication");
        } else if (res.data.user.isTeacher || res.data.user.isHead) {
          localStorage.setItem("department", res.data.user.department);
          sessionStorage.setItem("id", res.data.user.id);
          navigate("./Verfication");
        } else if (res.data.user.isAdmin) {
          navigate("./Verfication");
        }

        console.log(`Dear ${res.data.user.fname}, this is your OTP: ${res.data.user.otp}`);
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      if (!err.response || err.response.status === 500) {
        setError("Server is not available due to maintenance.");
      } else if (err.response.status === 404) {
        setError("Login failed. Please check your credentials.");
      } else {
        navigate("/ErrorPage/ErrorPage");
      }
    } finally {
      setLoading(false);
    }
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
              {error && (
                <p className="alert alert-danger w-1" id={style.errors}>
                  <FaInfoCircle className="m-2" style={{ color: "black" }} />
                  {error}
                </p>
              )}
              <h2>
                Sign in
                <FaSignInAlt className={style.icon} />
              </h2>
              <div className={style.username}>
                <label htmlFor="username">Username:</label>
                <Field name="username" type="text" placeholder="Username" />
                <FaUser className={style.InputIcons} />
                <ErrorMessage className={style.error} name="username" component="div" />
              </div>
              <div className={style.password}>
                <label htmlFor="password">Password:</label>
                <Field type="password" name="password" placeholder="Password" />
                <FaLock className={style.InputIcons} />
                <ErrorMessage className={style.error} name="password" component="div" />
              </div>
              <div className={style.checkbox}>
                <Field type="checkbox" name="remember" />
                <ErrorMessage name="remember" component="div" className={style.error} />
                <label>Remember Me</label>
                <Link className={style.forget_password_tag} to="/pages/forget_password">
                  Forget Password?
                </Link>
              </div>
              <div className={style.button}>
                <button type="submit" name="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="loader"></span> Please wait...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <div className={style.have_no_account}>
                <span>Don't have an account? </span>
                <Link className={style.registration_tag} to="/pages/NewUserRegistration">
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
