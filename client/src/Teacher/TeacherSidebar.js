import React, { useEffect, useState } from 'react';
import { BsBook, BsFillGearFill, BsFillGrid1X2Fill, BsFillPeopleFill, BsMessenger } from 'react-icons/bs';
import { FaAngleDown, FaSignOutAlt } from 'react-icons/fa';
import { Link, BrowserRouter as Router } from "react-router-dom";
import '../App.css';
import w from '../image/woldia-logo.jpg';
import RoutersList from "../linklist/routers";
import style from '../Styles/studentsidebar.module.css';
function TeacherSidebar({ opensidebartoggle, opensidebar }) {
    const Role = localStorage.getItem('Role')
    const [Action, setAction] = useState('Dashboard');
    const user = localStorage.getItem('username')
    const [courseDropDown, setCourseDropDown] = useState(false)
    const department = localStorage.getItem('department')
    const [data, setData] = useState([])
    const id = sessionStorage.getItem('id')
    const [profileImage, setProfileImage] = useState(localStorage.getItem(`${user}profileImage`) || w);
    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const newImage = reader.result;
                setProfileImage(newImage);
                localStorage.setItem(`${user}profileImage`, newImage);
                //there is no need of the database to store the profile picture and there is no need of the backend code ,it is  easy to make 
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        fetch('http://localhost:5000/inner_pages/SelectCourseToTeacher')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, [])
    const filteredCourse = data.filter(d => d.teacher_id === id)
    if (user && Role === 'teacher') {
        console.log(filteredCourse)
        console.log(id)
        return (
            <Router>
                <aside
                    id="sidebar"
                    className={opensidebartoggle ? "sidebar-responsive" : ""}>
                    <div
                        className='sidebar-title'>
                        <div
                            className='sidebar-brand'
                            id={style.sidebrand}>
                            <div>
                                <label htmlFor="profileInput">
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className={style.profileImage}
                                        title="Click to update profile picture"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="profileInput"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleProfileChange}
                                />
                            </div>
                            <div className={style.role}>
                                : {department.toUpperCase()} {Role.toUpperCase()}
                            </div>
                            <span
                                className='icon close-icon '
                                onClick={opensidebar}>
                                X
                            </span>
                        </div>

                    </div>
                    <ul
                        className='sidebar-list'>
                        <li
                            id='top'
                            className={Action === 'Dashboard' ? 'sidebar-list-item  active' : 'sidebar-list-item '} >
                            <Link
                                onClick={() => { setAction('Dashboard') }}
                                to="/inner_pages/dashboard">
                                <BsFillGrid1X2Fill className='icon' />Dashboard
                            </Link>
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'RecordDetail' ? 'sidebar-list-item  active' : 'sidebar-list-item'} > {filteredCourse.length !== 0 ?
                                (filteredCourse.map((d, i) => (
                                    <>

                                        <Link key={i}
                                            onClick={() => { setAction('RecordDetail') }}
                                            to="/Teacher/Resourses"> {d.course}
                                        </Link>
                                        <FaAngleDown
                                            onClick={() => setCourseDropDown((prev) => !prev)} className='dropdown-icon' />
                                    </>
                                ))
                                ) : (<></>)
                            }
                            {courseDropDown && (
                                <ul className='dropdown sidebar-list'>
                                    <hr className='horizontalline'></hr>
                                    <li
                                        className={Action === 'Resources' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                                        <Link
                                            onClick={() => { setAction('Resources') }}
                                            to="/Teacher/Resourses">
                                            <BsFillPeopleFill className='icon' />Resources
                                        </Link>
                                    </li>
                                    <hr className='horizontalline'></hr>
                                    <li
                                        className={Action === 'Assigment' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                                        <Link
                                            onClick={() => { setAction('Assigment') }}
                                            to="/Teacher/Assigment">
                                            <BsFillPeopleFill className='icon' />Assigment
                                        </Link>
                                    </li>
                                    <hr className='horizontalline'></hr>
                                    <li
                                        className={Action === 'Grade' ? 'dropdown-list-item active' : 'dropdown-list-item'}   >
                                        <Link
                                            onClick={() => { setAction('Grade') }}
                                            to="/Head/DisplayDepartmentStudent">
                                            <BsBook className='icon' />Grade
                                        </Link>
                                    </li>

                                </ul>
                            )
                            }
                            <hr className='horizontalline'></hr>
                        </li>

                        <li
                            className={Action === 'Report' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('Report') }}
                                to="/Teacher/Report">
                                <BsBook className='icon' />Report
                            </Link>
                            <FaAngleDown className='dropdown-icon' />
                        </li>
                        <hr className='horizontalline'></hr>
                        <li className='sidebar-list-item'>
                            <Link to="/inner_pages/student_registration">
                                <BsFillGearFill className='icon' />Setting
                            </Link>
                        </li>
                        <li className='sidebar-list-item'>
                            <Link to="/inner_pages/Announcement">
                                <BsMessenger className='icon' />Anouncement
                            </Link>
                        </li>
                        <li className='sidebar-list-item' onClick={() => {
                            localStorage.removeItem('username');
                            window.location.reload()
                        }} >
                            <Link>
                                <FaSignOutAlt className='icon' />Logout</Link>
                        </li>
                    </ul>
                </aside>
                <RoutersList />
            </Router>
        )
    }
}
export default TeacherSidebar
