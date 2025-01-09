import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamation } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DepartmentValidation from '../formvalidation/DepartmentValidation';
import style from '../Styles/student_registration.module.css';
const initialValues = {
  dep_name: '',
  dep_id: '',
  college: '',
  max_capacity: '',
  min_capacity: '',
  total_course: '',
  total_teacher: '',
  location: '',
}
function DepartmentRegistartion() {
  const [success, setsuccess] = useState('');
  const [Err, setErr] = useState('');
  const [proccecing, setproccesing] = useState(false);
  const [collegeData, setCOllegeData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/DisplayDepartment')
      .then(res => res.json())
      .then(collegeData => setCOllegeData(collegeData))
      .catch(err => console.log(err));
  }, [])
  const handleSubmit = async (values) => {
    const url = "http://localhost:8080/demo_war_exploded/displayDepartment";
    const { dep_name, dep_id, college, max_capacity, min_capacity, total_course, total_teacher, location } = values;
    console.log({ dep_name, dep_id, college, max_capacity, min_capacity, total_course, total_teacher, location })
    setproccesing(true);
    try {
      const res = await axios.post(url, values, {
        headers: {
          "Content-Type": "application/json",
        }
      }
      )
      console.log(res)
      if (res.data.register) {
        setTimeout(() => {
          setproccesing(false)
          setsuccess('Register Successfully')
          setTimeout(() => {
            setsuccess('')
          }, 2000)
        }, 4000)
      } else {
        setTimeout(() => {
          setproccesing(false)
          setErr('Department is already exist')
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
  const Role = localStorage.getItem('Role')
  const Navigate = useNavigate()
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
            validationSchema={DepartmentValidation}
            onSubmit={handleSubmit}
          >
            {({ isValid }) => (
              <Form
                className={style.registration}>
                <h4>
                  Department Registration
                </h4>
                <div
                  className={style.flex}>
                  <div
                    className={style.depratment_name}>
                    <label
                      htmlFor='Department Name'>Department Name:</label>
                    <Field
                      type="text"
                      name="dep_name"
                      placeholder='Department Name '
                    ></Field>
                    <ErrorMessage className={style.error} name='dep_name' component='div' />
                  </div>
                  <div className={style.department_id}>
                    <label htmlFor='Department Id'>Department Id:</label>
                    <Field type="text" name="dep_id" placeholder='Department Id'
                    ></Field>
                    <ErrorMessage className={style.error} name='dep_id' component='div' />
                  </div>
                  <div className={style.College}>
                    <label htmlFor='college'>College:</label>
                    <Field as='select' type="text" name="college"  >
                      <option>---select college---</option>
                      {collegeData.map((d, i) => (
                        <option key={i} name={d.college_name}>{d.college_name}</option>
                      ))}
                    </Field>
                    <ErrorMessage
                      className={style.error}
                      name='college'
                      component='div' />
                  </div>
                  <div className={style.max_capacity}>
                    <label htmlFor='maxmimum capacity'>maxmimum capacity:</label>
                    <Field type="number" name="max_capacity" min="30" placeholder='maxmimum capacity' ></Field>
                    <ErrorMessage className={style.error} name='max_capacity' component='div' />
                  </div>
                  <div className={style.min_capacity}>
                    <label htmlFor='minimum capacity'>minimum capacity:</label>
                    <Field type="number" name="min_capacity" min='30' placeholder='minimun capcity'></Field>
                    <ErrorMessage className={style.error} name='min_capacity' component='div' />
                  </div>
                  <div className={style.total_course}>
                    <label htmlFor='Total course'>Total course:</label>
                    <Field type="number" name="total_course" placeholder='total course'></Field>
                    <ErrorMessage className={style.error} name='total_course' component='div' />
                  </div>
                  <div className={style.total_teacher}>
                    <label htmlFor='Total teacher'>Total teachers:</label>
                    <Field type="number" name="total_teacher" placeholder='total teacher'></Field>
                    <ErrorMessage className={style.error} name='total_teacher' component='div' />
                  </div>
                  <div className={style.location}>
                    <label html='Location'>Location:</label>
                    <Field type="text" name="location" placeholder='Location'></Field>
                    <ErrorMessage className={style.error} name='location' component='div' />
                  </div>
                </div>
                <div className={style.btn}>
                  <button type='submit' className='btn btn-primary rounded-0'>submit</button>
                  <button type='reset' className='btn btn-danger rounded-0'  >reset</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </>
    )
  } else {
    Navigate('/')
  }
}
export default DepartmentRegistartion
