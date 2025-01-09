import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { React, useState } from 'react';
import { FaCheckCircle, FaExclamation } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CollegeValidation from '../formvalidation/collegevalidation';
import style from '../Styles/college_registration.module.css';
const initialValues = {
  college_name: '',
  college_id: ''
}
function CollegeRegistration() {
  const [success, setsuccess] = useState('');
  const [Err, setErr] = useState('');
  const [proccecing, setproccesing] = useState(false);
  const handleSubmit = async (values) => {
    const url = "http://localhost:8080/demo_war_exploded/collgeRegistraion";
    const { college_name, college_id } = values;
    console.log({ college_name, college_id })
    try {
    const res= await axios.post(url, values)
    console.log(res)  
        if (res.data.register) {
          setproccesing(true);
          setTimeout(() => {
            setproccesing(false)
            setsuccess('Register Successfully')
            setTimeout(() => {
              setsuccess('')
            }, 2000)
          }, 4000)
        } else {
          setproccesing(true);
          setTimeout(() => {
            setproccesing(false)
            setErr('College is already exist')
            setTimeout(() => {
              setErr('')
            }, 4000)
          }, 4000)
        } 
    } catch (error) {
      setErr('Check the network');
    }
  };
  const user = localStorage.getItem('username');
  const Navigate = useNavigate()
  const Role = localStorage.getItem('Role')
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
          <Formik initialValues={initialValues}
            validationSchema={CollegeValidation}
            onSubmit={handleSubmit}
          >
            <Form className={style.container}>
              <h4>College Registration</h4>
              <div className={style.flex}>
                <div className={style.col_name}>
                  <label>College Name:</label>
                  <Field type="text" name="college_name" placeholder='college Name...'></Field>
                  <ErrorMessage className={style.error} name='college_name' component='div' />
                </div>
                <div className={style.col_id}>
                  <label>College Id:</label>
                  <Field type="text" name="college_id" placeholder='college id....' ></Field>
                  <ErrorMessage className={style.error} name='college_id' component='div' />
                </div>
              </div>
              <div className={style.btn}>
                <button type='submit' className="btn btn-primary rounded-0">submit</button>
                <button type='reset' className={"btn btn-danger rounded-0"}>reset</button>
              </div>
            </Form>
          </Formik>
        </div>
      </>
    )
  } else {
    Navigate('/')
  }
}

export default CollegeRegistration;
