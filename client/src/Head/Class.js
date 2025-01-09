import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamation } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AddClassValidation from '../formvalidation/AddClassValidation';
import style from '../Styles/Class.module.css';
function Class() {

  const [courses, setCourses] = useState([]);
  const [success, setsuccess] = useState('');
  const [Err, setErr] = useState('');
  const [Addclass, setAddClass] = useState([]);
  const [proccecing, setproccesing] = useState(false);
  const login = localStorage.getItem('login');
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role');
  const Navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/demo_war_exploded/ClassMake')
      .then(res => res.json())
      .then(Addclass => setAddClass(Addclass))
      .catch(err => console.log(err));
  }, [])
  useEffect(() => {
    fetch('http://localhost:5000/Department/Course')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error('Expected an array of courses');
        }
      })
      .catch(err => console.log(err));
  }, []);
  const handleSubmit = async (values) => {
    const { StartTime, EndTime, Day, Course } = values;
    console.log({ StartTime, EndTime, Day, Course });
    const URL = 'http://localhost:8080/demo_war_exploded/ClassMake';
    setproccesing(true);
    try {
      const res = await axios.post(URL, { StartTime, EndTime, Day, Course })
      console.log(res)
      if (res.data.register) {
        setTimeout(() => {
          setproccesing(false)
          setsuccess('Class Add Successfully')
          setTimeout(() => {
            setsuccess('')
          }, 2000)
        }, 4000)
      } else {
        setproccesing(true);
        setTimeout(() => {
          setproccesing(false)
          setErr('Class is Already Add  ')
          setTimeout(() => {
            setErr('')
          }, 4000)
        }, 4000)
      }
    } catch (error) {
      setErr('Check the network');
      console.log(error)
    }
  }
  if (login) {
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
        {(user && Role === 'head') ? (
          <div className='main-container '>
            <Formik
              initialValues={{ StartTime: '', EndTime: '', Day: '', Course: '' }}
              onSubmit={handleSubmit}
              validationSchema={AddClassValidation}

            >
              {({ isValid }) => (
                <Form className={style.assignform} >
                  <h4 className={style.AddClassHead}>Make Class</h4>
                  <div className={style.ClassSedhule}>
                    <div className={style.StartTime}>
                      <label htmlFor='Time'>Start Time:</label>
                      <Field type='time' name='StartTime' />
                      <ErrorMessage name='StartTime' component='div' className={style.error} />
                    </div>
                    <div className={style.EndTime}>
                      <label htmlFor='Time'>End Time:</label>
                      <Field type='time' name='EndTime' />
                      <ErrorMessage name='EndTime' component='div' className={style.error} />
                    </div>
                    <div className={style.Day}>
                      <label htmlFor='Day'>Day:</label>
                      <Field as='select' name='Day' >
                        <option>---Select Day---</option>
                        <option name='day'>Monday</option>
                        <option name='day'>Thusday</option>
                        <option name='day'>Wensday</option>
                        <option name='day'>Tursday</option>
                        <option name='day'>Friday</option>
                      </Field >
                      <ErrorMessage name='Day' component='div' className={style.error} />
                    </div>
                    <div className={style.CourseList}>
                      <label htmlFor='Course'>Course:</label>
                      <Field as='select' name='Course'>
                        <option value="">---Select Course Title---</option>
                        {Array.isArray(courses) && courses.map((course, i) => (
                          <option key={i} value={course.course_title}>{course.course_title}</option>
                        ))}
                      </Field>
                      <ErrorMessage name='Course' className={style.error} component='div' />
                    </div>
                    <div className={style.AddClass}>
                      <button type="submit" >Add Class</button>
                    </div>
                  </div>

                </Form>
              )}
            </Formik>
          </div>
        ) : (<></>)}
        {(user && Role === 'head') || (user && Role === 'student') ? (
          <div className='main-container'>
            <h4 className={style.classHeader}> Sechuled Class</h4>
            <div className={style.DisplayClass}>
              <div className={style.Time}>
                <div>Day
                  <div className={style.day}>
                    <div>Monday</div>
                    <div>Thusday</div>
                    <div>Wensday</div>
                    <div>Tursday</div>
                    <div>Wensday</div>
                  </div>
                </div>
                <div className={style.time1}>2:00 - 4:00
                  <div>
                    {
                      Addclass.map((d, i) => (
                        <tr key={i} >
                          {
                            (d.day === 'Monday') && (d.starttime >= '02:00:00' && d.endtime <= '04:00:00') ? (
                              <td className={style.border}>
                                {d.course}
                                <span className={style.timeblock}>
                                  {d.starttime} - {d.endtime}
                                </span>
                              </td>
                            ) : (
                              (d.day === 'Thusday') && (d.starttime >= '02:00:00' && d.endtime <= '04:00:00') ? (
                                <td className={style.border}>
                                  {d.course}
                                  <span className={style.timeblock}>
                                    {d.starttime} - {d.endtime}
                                  </span>
                                </td>
                              ) :
                                (
                                  (d.day === 'Wensday') && (d.starttime >= '02:00:00' && d.endtime <= '04:00:00') ? (
                                    <td className={style.border}>
                                      {d.course}
                                      <span className={style.timeblock}>
                                        {d.starttime} - {d.endtime}
                                      </span>
                                    </td>
                                  ) : (<>
                                  </>)

                                )
                            )
                          }


                        </tr>
                      ))
                    }


                  </div>
                </div>
                <div >4:00 - 6:00
                  <div>
                    {
                      Addclass.map((d, i) => (
                        <tr key={i} >
                          {
                            (d.day === 'Monday') && (d.starttime >= '04:00:00' && d.endtime <= '06:00:00') ? (
                              <td className={style.border}>
                                {d.course}
                                <span className={style.timeblock}>
                                  {d.starttime} - {d.endtime}
                                </span>
                              </td>
                            ) : (
                              (d.day === 'Thusday') && (d.starttime >= '04:00:00' && d.endtime <= '06:00:00') ? (
                                <td className={style.border}>
                                  {d.course}
                                  <span className={style.timeblock}>
                                    {d.starttime} - {d.endtime}
                                  </span>
                                </td>
                              ) :
                                (
                                  (d.day === 'Wensday') && (d.starttime >= '04:00:00' && d.endtime <= '06:00:00') ? (
                                    <td >
                                      {d.course}
                                      <span className={style.timeblock}>
                                        {d.starttime} - {d.endtime}
                                      </span>
                                    </td>
                                  ) : (<>
                                  </>)

                                )
                            )
                          }


                        </tr>
                      ))
                    }

                  </div>
                </div>
                <div >6:00 - 8:00</div>
                <div >8:00 - 9:00
                  {
                    Addclass.map((d, i) => (
                      <tr key={i} >
                        {
                          (d.day === 'Monday') && (d.starttime >= '08:00:00' && d.endtime <= '09:00:00') ? (
                            <td className={style.border}>
                              {d.course}
                              <span className={style.timeblock}>
                                {d.starttime} - {d.endtime}
                              </span>
                            </td>
                          ) : (
                            (d.day === 'Thusday') && (d.starttime >= '08:00:00' && d.endtime <= '09:00:00') ? (
                              <td className={style.border}>
                                {d.course}
                                <span className={style.timeblock}>
                                  {d.starttime} - {d.endtime}
                                </span>
                              </td>
                            ) :
                              (
                                (d.day === 'Wensday') && (d.starttime >= '08:00:00' && d.endtime <= '09:00:00') ? (
                                  <td className={style.border}>
                                    {d.course}
                                    <span className={style.timeblock}>
                                      {d.starttime} - {d.endtime}
                                    </span>
                                  </td>
                                ) : (<>
                                </>)

                              )
                          )
                        }


                      </tr>
                    ))
                  }
                </div>
                <div >9:00 - 11:00</div>
                <div > Action</div>
              </div>
            </div>
            {/* <h4 className={style.ASsignTeacherhead}> Sechuled Class</h4> */}
            {/* <div className={styles.DisplayAssignedValue}>
          <table className="table" >
            <thead>
              <tr className={styles.header}>
                <th scope="col m">Day</th>
                <th scope="col" colspan='3'>Class</th>
              </tr>

            </thead>
            <tbody className={styles.body}>
              {Addclass.map((d, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td >{d.day}</td>
                  <td >
                    {d.course}
                    <span className={style.timeblock}>
                      {d.starttime} - {d.endtime}
                    </span>
                  </td>


                  <td>
                    <button
                      type="button"
                      className="btn btn-primary "
                    > update</button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div> */}
          </div>
        ) : (<></>)}
      </>
    );

  } else {
    Navigate('/');
  }

}

export default Class;
