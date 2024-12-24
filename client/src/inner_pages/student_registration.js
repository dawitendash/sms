import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamation } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import StudentValidation from '../formvalidation/StudentValidation';
import style from '../Styles/student_registration.module.css';
const initialValues = {
  fname: "",
  lname: "",
  university_id: "",
  birth_date: '',
  gender: '',
  region: '',
  disabled: '',
  entrance: '',
  gpa: "",
  batch: "",
  College: "",
  department: "",
  role: '',
};
function StudentRegistration() {
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role')
  const [success, setsuccess] = useState('')
  const Navigate = useNavigate();
  const [err, setErr] = useState('');
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
  const handleSubmit = async (value) => {
    const url = "http://localhost:5000/inner_pages/student_registration";
    const { fname, lname, university_id, birth_date, gender, region, disabled, entrance, gpa, batch, College, department, role } = value;
    console.log({ fname, lname, university_id, birth_date, gender, region, disabled, entrance, gpa, batch, College, department, role })
    try {
      await axios.post(url, value).then(res => {
        console.log(res)
        if (res.data.register) {
          setproccesing(true)
          console.log('success');
          setTimeout(() => {
            setproccesing(false)
            setsuccess('Register Successfully')
            setTimeout(() => {
              setErr('')
              setsuccess('')
            }, 4000)
          }, 4000)
        } else {
          setproccesing(true)
          console.log('unscusssuccess');
          setTimeout(() => {
            setproccesing(false)
            setErr('Student is already exist')
            setTimeout(() => {
              setErr('')
              setsuccess('')
            }, 4000)
          }, 4000)
        }
      })
    } catch (error) {
      setErr('Check the network');
    }
  };
  if (user && Role === 'admin') {
    return (<>
      {
        proccecing ? (
          <p
            id={style.err_message}
            className='alert alert-primary'>
            <span className={style.loader}></span>
            <span>Request Proccessing....</span>
          </p>
        )
          : (<>
            {
              err && <p
                id={style.err_message}
                className='alert alert-danger'>
                <FaExclamation className={style.error} /> {err}
              </p>
            }
            {
              success && <p
                id={style.err_message}
                className='alert alert-success'>
                <FaCheckCircle className={style.register} />
                <span className={style.err}></span>
                {success}</p>

            }
          </>
          )
      }
      <div className='main-container'>
        <Formik
          initialValues={initialValues}
          validationSchema={StudentValidation}
          onSubmit={handleSubmit}
        >
          {({ isValid, setFieldValue, values }) => (
            <Form className={style.registration}>
              <h4>Student Registration</h4>
              <div className={style.flex}>
                <div className={style.fname}>
                  <label htmlFor='fname'>First Name:</label>
                  <Field type="text" name="fname" placeholder='First Name' />
                  <ErrorMessage className={style.error} name="fname" component="div" />
                </div>
                <div className={style.lname}>
                  <label htmlFor='lname'>Last Name:</label>
                  <Field type="text" name="lname" placeholder='Last Name' />
                  <ErrorMessage className={style.error} name="lname" component="div" />
                </div>
                <div className={style.disabled}>
                  <label htmlFor="disabled">Diabled:</label>
                  <Field type='radio' name='disabled' value='yes'></Field> Yes
                  <Field type='radio' name='disabled' value='no'></Field> No
                  <ErrorMessage className={style.error} name="disabled" component='div' />
                </div>
                <div className={style.gender}>
                  <label htmlFor="Gender">Gender:</label>
                  <Field type='radio' name='gender' value='male'></Field> Male
                  <Field type='radio' name='gender' value='female'></Field> Female
                  <Field type='radio' name='gender' value='other'></Field> Other
                  <ErrorMessage name='gender' component='div' className={style.error} />
                </div>
                <div className={style.region}>
                  <label htmlFor="region">Region:</label>
                  <Field as='select' name='region' >
                    <option name='region'>Tigray</option>
                    <option name='region'>Afar</option>
                    <option name='region'>Amhara</option>
                    <option name='region'>Oromia</option>
                    <option name='region'>Somalia</option>
                    <option name='region'>Benishangul Gumz</option>
                    <option name='region'>Gambela</option>
                    <option name='region'>Harari</option>
                    <option name='region'>SNNP</option>
                    <option name='region'>Adiss Abeba</option>
                    <option name='region'>Dire Dawa</option>
                  </Field>
                  <ErrorMessage name="region" component='div' className={style.error} />
                </div>
                <div className={style.entranceMark}>
                  <label htmlFor='entrance'>Entrance Score:</label>
                  <Field type="number" name="entrance" placeholder="Enter your entrance score" />
                  <ErrorMessage name="entrance" component='div' className={style.error} />
                </div>
                <div className={style.batch}>
                  <label>Birth Data:</label>
                  <Field type="date" name="birth_date" placeholder='Batch'></Field>
                  <ErrorMessage className={style.error} name='birth_date' component='div' />
                </div>
                <div className={style.university_id}>
                  <label htmlFor='university_id'>University ID:</label>
                  <Field type="text" name="university_id" placeholder='University ID' />
                  <ErrorMessage className={style.error} name="university_id" component="div" />
                </div>
                <div className={style.gpa}>
                  <label htmlFor='gpa'>GPA:</label>
                  <Field type="number" name="gpa" min="2" max="4" step='0.01' placeholder='GPA' />
                  <ErrorMessage className={style.error} name="gpa" component="div" />
                </div>
                <div className={style.batch}>
                  <label htmlFor='batch'>Batch:</label>
                  <Field type="number" name="batch" min="1" max="6" placeholder='Batch' />
                  <ErrorMessage className={style.error} name="batch" component="div" />
                </div>
                <div className={style.College}>
                  <label htmlFor='College'>College:</label>
                  <Field as='select' name='College' onChange={(e) => {
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
                  <label htmlFor='Department'>Department:</label>
                  <Field as='select' name='department'>
                    <option value="">---Select College First---</option>
                    {data && data
                      .filter(dept => dept.college === values.College)
                      .map((dept, index) => (
                        <option key={index} value={dept.department_name}>{dept.department_name}</option>
                      ))}
                  </Field>
                  <ErrorMessage className={style.error} name="department" component='div' />
                </div>
                <div className={style.role}>
                  <label htmlFor='Role'>Role:</label>
                  <Field type='text' value='student' name='role'></Field>
                </div>
              </div>
              <div className={style.btn}>
                <button type="submit" className='btn btn-primary rounded-0'>Submit</button>
                <button type='reset' className='btn btn-danger rounded-0'>Reset</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
    );
  } else {
    return (
      Navigate('/')
    )
  }
}
export default StudentRegistration;
