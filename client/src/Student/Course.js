import React from 'react'
import style from '../Styles/Course.module.css'
function Course() {
    const user = localStorage.getItem('username')
    const Role = localStorage.getItem('Role')
    if (user && Role === 'student') {
        return (
            <div className='main-container'>
                <div className={style.header}>
                    <h3>Woldia University</h3>
                    <h5>School of Computing</h5>
                </div>
                <div className={style.student_information}>
                    <div>Department:</div>
                    <div>Year:</div>
                    <div>Adm.Classfication:</div>
                    <div>Semester:</div>
                    <div>Program:</div>
                    <div>AC.Year:</div>
                    <div>Student's Name:</div>
                    <div>ID No.:</div>
                </div>
                <div className={style.main_content}>
                    <div className={style.main_content_header}>
                        <div>
                            I am applying to be registered for the following course
                        </div>
                        <div>
                            Signature:
                        </div>
                    </div>
                    <div className={style.main_content_table}>
                        <table className='table '>
                            <th>
                                <tr>
                                    <td >Course Title</td>
                                    <td>Course code</td>
                                    <td>CP</td>
                                    <td>Lec.Hr</td>
                                    <td>Lab.Hr</td>
                                    <td>Tur.Hr</td>
                                    <td>HS.Hr</td>
                                    <td>Catagory</td>
                                    <td>Option</td>
                                    <td>Remark</td>
                                </tr>
                            </th>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div className={style.table_bottom}>
                        <div>
                            <h5>Adivsor Name:</h5>
                        </div>
                        <div>
                            <h5>REgistration Date:</h5>
                        </div>
                        <div>
                            <h5>Semister Load:</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {

    }
}

export default Course
