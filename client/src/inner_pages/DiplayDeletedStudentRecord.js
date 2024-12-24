import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from '../Styles/display_student_iformation.module.css';
function DiplayDeletedStudentRecord() {
    const Navigate = useNavigate()
    const Role = localStorage.getItem('Role')
    const user = localStorage.getItem('username')
    const [data, setdata] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/inner_pages/DiplayDeletedStudentRecord')
            .then(res => res.json())
            .then(data => setdata(data))
            .catch(err => console.log(err));
    }, [])
    const getDayName = (date) => {
        const option = { weekday: 'long' }
        return new Intl.DateTimeFormat('en-US', option).format(date);
    }
    const currentdate = new Date();
    const dayname = getDayName(currentdate);
    const todayDelete = data.filter(d => d.deletedday === dayname)
    const beforeTodayDelete = data.filter(d => d.deletedday !== dayname)
    if (user && Role === 'admin') {
        return (
            <>
                <div className='main-container'>
                    <h4 className={style.page_header}>
                        Deleted student's
                    </h4>
                    <hr></hr>
                    <div className='table-responsive'>
                        <table className="table table-bordered table-group-divider table-striped">
                            <thead>
                                <tr className={style.header}>
                                    <th scope="col">Student Id</th>
                                    <th scope='col'>Deleter username</th>
                                    <th scope="col">Deleted by</th>
                                    <th scope="col">Deleted Date</th>
                                    <th scope="col">Deleted day</th>
                                </tr>
                            </thead>
                            <tbody className={style.body}>
                                {todayDelete.length > 0 ? (<p className='text-primary'>Delete Today</p>) : (<></>)}
                                {todayDelete && todayDelete.map((d, i) => (
                                    <tr key={i} >
                                        <td >{d.deletedid}</td>
                                        <td>{d.deleterusername}</td>
                                        <td >{d.deletdby}</td>
                                        <td>{d.deletedday}</td>
                                        <td >{d.deletedtime}</td>
                                    </tr>
                                ))}
                                {beforeTodayDelete.length > 0 ? (<p className='text-primary'>older Delete</p>) : (<></>)}
                                {beforeTodayDelete && beforeTodayDelete.map((d, i) => (
                                    <tr key={i} >
                                        <td >{d.deletedid}</td>
                                        <td>{d.deleterusername}</td>
                                        <td >{d.deletdby}</td>
                                        <td>{d.deletedday}</td>
                                        <td >{d.deletedtime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    } else {
        Navigate('/')
    }
}
export default DiplayDeletedStudentRecord
