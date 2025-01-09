import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamation } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import TeacherValidation from '../formvalidation/TeacherValidation';
import style from '../Styles/student_registration.module.css';
const initialValues = {
  fname: '',
  lname: '',
  gender: '',
  university_id: '',
  experince: '',
  level: '',
  birth_date: '',
  college: '',
  department: '',
  role: '',
}
function TeacherRegistartion() {
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role')
  const Navigate = useNavigate();
  const [err, setErr] = useState('');
  const [success, setsuccess] = useState('')
  const [proccecing, setproccesing] = useState(false);
  const [data, setdata] = useState([]);
  const [collegeData, setCOllegeData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/inner_pages/DisplayDepartment')
      .then(res => res.json())
      .then(data => setdata(data))
      .catch(err => console.log(err));
  }, [])
  useEffect(() => {
    fetch('http://localhost:5000/DisplayDepartment')
      .then(res => res.json())
      .then(collegeData => setCOllegeData(collegeData))
      .catch(err => console.log(err));
  }, [])
  const handleSubmit = async (values) => {
    console.log('hello')
    const { fname, lname, gender, university_id, experince, level, birth_date, college, department, role } = values;
    const url = "http://localhost:8080/teachers";
    console.log({ fname, lname, gender, university_id, experince, level, birth_date, college, department, role })
    setproccesing(true);
    try {
      const res = await axios.post(url, values, {
        headers: {
        "Content-Type": "application/json",
      }})
      console.log(res)
      if (res.data.status) {
        console.log('success');
        setTimeout(() => {
          setproccesing(false)
          setsuccess('Register Successfully')
          setTimeout(() => {
            setErr('')
          }, 2000)
        }, 4000)
      } else if (res.data.teacherFullMessage) {
        setTimeout(() => {
          setproccesing(false)
          setsuccess('')
          setErr(`Maximum Teacher Registeration is full in ${department} Department`)
          setTimeout(() => {
            setErr('')
          }, 4000)
        }, 4000)
      } else {
        setTimeout(() => {
          setproccesing(false)
          setErr('Teacher is Already Exist')
          setTimeout(() => {
            setErr('')
          }, 2000)
        }, 4000)
      }
    } catch (err) {
      console.log(err)
      setErr('Check the network');
      console.log('err')
    }
  };
  if (user && Role === 'admin') {
    return (
      <>  {
        proccecing ? (
          <p id={style.err_message} className='alert alert-primary'>
            <span className={style.loader}></span>
            <span>Request Proccessing....</span>
          </p>
        )
          : (<>
            {
              err && <p id={style.err_message} className='alert alert-danger'>
                <FaExclamation className={style.error} /> {err}
              </p>
            }
            {
              success && <p id={style.err_message} className='alert alert-success'>
                <FaCheckCircle className={style.register} />
                <span className={style.err}></span>
                {success}</p>}
          </>
          )
      }
        <div className='main-container'>
          <Formik
            initialValues={initialValues}
            validationSchema={TeacherValidation}
            onSubmit={handleSubmit}>
            {({ isValid, setFieldValue, values }) => (
              <Form className={style.registration}>
                <h4> Teacher Registration</h4>
                <div className={style.flex}>
                  <div className={style.fname}>
                    <label>First Name:</label>
                    <Field type="text" name="fname" placeholder='First Name'
                    >
                    </Field>
                    <ErrorMessage className={style.error} name='fname' component='div' />
                  </div>
                  <div className={style.lname}>
                    <label>Last Name:</label>
                    <Field type="text" name="lname" placeholder='Last Name'
                    ></Field>
                    <ErrorMessage className={style.error} name='lname' component='div' />
                  </div>
                  <div className={style.gender}>
                    <label htmlFor="Gender">Gender:</label>
                    <Field type='radio' name='gender' value='male'></Field> Male
                    <Field type='radio' name='gender' value='female'></Field> Female
                    <Field type='radio' name='gender' value='other'></Field> Other
                    <ErrorMessage name='gender' component='div' className={style.error} />
                  </div>
                  <div className={style.university_id}>
                    <label>University ID:</label>
                    <Field type="text" name="university_id" placeholder='University id' ></Field>
                    <ErrorMessage className={style.error} name='university_id' component='div' />
                  </div>
                  <div className={style.experince}>
                    <label>Experince:</label>
                    <Field type="number" min='0' name="experince" placeholder='Experince' ></Field>
                    <ErrorMessage className={style.error} name='experince' component='div' />
                  </div>
                  <div className={style.gpa}>
                    <label>Level:</label>
                    <Field type="text" name="level" placeholder='Level' ></Field>
                    <ErrorMessage className={style.error} name='level' component='div' />
                  </div>
                  <div className={style.batch}>
                    <label>Birth Data:</label>
                    <Field type="date" name="birth_date" placeholder='Batch'></Field>
                    <ErrorMessage className={style.error} name='birth_date' component='div' />
                  </div>
                  <div className={style.College}>
                    <label htmlFor='college'>College:</label>
                    <Field as='select' name='college' onChange={(e) => {
                      const selectedCollege = e.target.value;
                      setFieldValue('College', selectedCollege);
                      setFieldValue('Department', ''); // Reset Department when College changes
                    }}>
                      <option value="">---Select College---</option>
                      {collegeData && collegeData.map((college, index) => (
                        <option key={index} value={college.college_name} >{college.college_name}</option>
                      ))}
                    </Field>
                    <ErrorMessage className={style.error} name="College" component='div' />
                  </div>
                  <div className={style.Department}>
                    <label htmlFor='department'>Department:</label>
                    <Field as='select' name='department'>
                      <option value="">---Select College First---</option>
                      {data && data
                        .filter(dept => dept.college === values.College)
                        .map((dept, index) => (
                          <option key={index} value={dept.department_name}>{dept.department_name}</option>
                        ))}
                    </Field>
                    <ErrorMessage className={style.error} name="Department" component='div' />
                  </div>
                  <div className={style.role}>
                    <label>Role:</label>
                    <Field type="text" name="role" placeholder='Role'></Field>
                    <ErrorMessage className={style.error} name='role' component='div' />
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

export default TeacherRegistartion
