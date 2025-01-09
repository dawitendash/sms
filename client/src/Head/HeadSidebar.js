import React, { useState } from 'react';
import { BsBook, BsFillGearFill, BsFillGrid1X2Fill, BsFillPeopleFill, BsMessenger } from 'react-icons/bs';
import { FaAngleDown, FaSignOutAlt } from 'react-icons/fa';
import { Link, BrowserRouter as Router } from "react-router-dom";
import '../App.css';
import style from '../Styles/studentsidebar.module.css';
import w from '../image/woldia-logo.jpg';
import RoutersList from "../linklist/routers";

function HeadSidebar({ opensidebartoggle, opensidebar }) {
    const Role = localStorage.getItem('Role')
    const [Action, setAction] = useState('dashboared');
    const user = localStorage.getItem('username');
    const department = localStorage.getItem('department')
    const login = localStorage.getItem('login')
    const [profileImage, setprofileImage] = useState(localStorage.getItem(`${user}profileImage`) || w)
    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const newImage = reader.result;
                setprofileImage(newImage);
                localStorage.setItem(`${user}profileImage`, newImage);
            }
            reader.readAsDataURL(file);
        }
    }


    if ((user && Role === 'head') && login) {
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
                            <div
                                className='icon close-icon'
                                onClick={opensidebar}>
                                X
                            </div>
                        </div>
                    </div>
                    <ul
                        className='sidebar-list'>
                        <li
                            className={Action === 'Dashboard' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('Dashboard') }}
                                to="/inner_pages/dashboard">
                                <BsFillGrid1X2Fill className='icon' />Dashboard
                            </Link>
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'Course' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('Course') }}
                                to="/Head/TeacherList">
                                <BsFillPeopleFill className='icon' />Teacher List
                            </Link>
                            <FaAngleDown className='dropdown-icon' />
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'Teacher Assign ' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('TeacherAssign ') }}
                                to="/Head/AssignTeacherToCourse">
                                <BsFillPeopleFill className='icon' />Teacher Assign
                            </Link>
                            <FaAngleDown className='dropdown-icon' />
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'ClassSchedule ' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('ClassSchedule ') }}
                                to="/Head/Class">
                                <BsFillPeopleFill className='icon' />Class Schedule
                            </Link>
                            <FaAngleDown className='dropdown-icon' />
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'Report' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('Report') }}
                                to="/Head/DisplayDepartmentStudent">
                                <BsBook className='icon' />Student List
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
                            localStorage.clear(); 
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
export default HeadSidebar 
