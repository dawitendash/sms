import React, { useState } from 'react';
import { BsBook, BsFillGearFill, BsFillGrid1X2Fill, BsFillPeopleFill, BsMessenger, BsPerson } from 'react-icons/bs';
import { FaAngleDown, FaRecordVinyl, FaSignOutAlt } from 'react-icons/fa';
import { Link, BrowserRouter as Router } from "react-router-dom";
import style from './Styles/studentsidebar.module.css';
import w from './image/woldia-logo.jpg';
import RouterList from './linklist/routers';

function Sidebar({ opensidebartoggle, opensidebar }) {
    const [dropdowncourse, setdropdowncourse] = useState(false);
    const [dropdownteacher, setdropdownteacher] = useState(false);
    const [dropdownstudent, setdropdownstudent] = useState(false);
    const [dropdowndepartment, setdropdowndepartment] = useState(false);
    const [dropDownRecord, setdropDownRecord] = useState(false);
    const Role = localStorage.getItem('Role');
    const [Action, setAction] = useState('dashboared');
    const user = localStorage.getItem('username');
    const username = localStorage.getItem('username');
    const [profileImage, setProfileImage] = useState(localStorage.getItem(`${username}profileImage`) || w);

    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const newImage = reader.result;
                setProfileImage(newImage);
                localStorage.setItem(`${username}profileImage`, newImage); // Save to localStorage
            };
            reader.readAsDataURL(file);
        }
    };

    // Corrected dropdown toggle logic
    const toggleDropdown = (dropdown) => {
        if (dropdown === 'course') {
            setdropdowncourse(!dropdowncourse);
        } else if (dropdown === 'teacher') {
            setdropdownteacher(!dropdownteacher);
        } else if (dropdown === 'student') {
            setdropdownstudent(!dropdownstudent);
        } else if (dropdown === 'department') {
            setdropdowndepartment(!dropdowndepartment);
        } else if (dropdown === 'record') {
            setdropDownRecord(!dropDownRecord);
        }
    };

    if (user && Role === 'admin') {
        return (
            <Router>
                <aside id="sidebar" className={opensidebartoggle ? "sidebar-responsive" : ""}>
                    <div className='sidebar-title'>
                        <div className='sidebar-brand' id={style.sidebrand}>
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
                            <div className={style.role}> : {Role.toUpperCase()}</div>
                            <div className='icon close-icon' onClick={opensidebar}>X</div>
                        </div>
                    </div>

                    <ul className='sidebar-list'>
                        <li className={Action === 'dashboared' ? 'sidebar-list-item active' : 'sidebar-list-item'}>
                            <Link onClick={() => setAction('dashboared')} to="/inner_pages/dashboard">
                                <BsFillGrid1X2Fill className='icon' />Dashboard
                            </Link>
                        </li>

                        <li className={Action === 'Course' ? 'sidebar-list-item active' : 'sidebar-list-item'}>
                            <Link onClick={() => setAction('Course')} to="/inner_pages/CourseRegistration">
                                <BsBook className='icon' />Course
                            </Link>
                            <FaAngleDown onClick={() => toggleDropdown('course')} className='dropdown-icon' />
                            {dropdowncourse && (
                                <ul className='dropdown sidebar-list'>
                                    <li className='dropdown-list-item'>
                                        <Link to="/inner_pages/student_registration">
                                            <BsBook className='icon' />Display Course
                                        </Link>
                                    </li>
                                    <li className='dropdown-list-item'>Blocked course</li>
                                    <li className='dropdown-list-item'>Main course</li>
                                    <li className='dropdown-list-item'>Minor course</li>
                                </ul>
                            )}
                        </li>

                        <li className={Action === 'Department' ? 'sidebar-list-item active' : 'sidebar-list-item'}>
                            <Link onClick={() => setAction('Department')} to="/inner_pages/DepartmentRegistartion">
                                <BsBook className='icon' />Department
                            </Link>
                            <FaAngleDown onClick={() => toggleDropdown('department')} className='dropdown-icon' />
                            {dropdowndepartment && (
                                <ul className='dropdown sidebar-list'>
                                    <li className='dropdown-list-item'>
                                        <Link to="/inner_pages/DisplayDepartment">
                                            <BsBook className='icon' />Display Department
                                        </Link>
                                    </li>
                                    <li className='dropdown-list-item'>Closed course</li>
                                    <li className='dropdown-list-item'>Display course</li>
                                </ul>
                            )}
                        </li>

                        <li className={Action === 'Student' ? 'sidebar-list-item active' : 'sidebar-list-item'}>
                            <Link onClick={() => setAction('Student')} to="/inner_pages/student_registration">
                                <BsPerson className='icon' />Student
                            </Link>
                            <FaAngleDown onClick={() => toggleDropdown('student')} className='dropdown-icon' />
                            {dropdownstudent && (
                                <ul className='dropdown sidebar-list'>
                                    <li className='dropdown-list-item'>
                                        <Link to="/inner_pages/display_student_information">
                                            <BsBook className='icon' />Display Student
                                        </Link>
                                    </li>
                                    <li className='dropdown-list-item'>Display course</li>
                                    <li className='dropdown-list-item'>Display course</li>
                                </ul>
                            )}
                        </li>

                        <li className={Action === 'Teacher' ? 'sidebar-list-item active' : 'sidebar-list-item'}>
                            <Link onClick={() => setAction('Teacher')} to="/inner_pages/TeacherRegistartion">
                                <BsFillPeopleFill className='icon' />Teacher
                            </Link>
                            <FaAngleDown onClick={() => toggleDropdown('teacher')} className='dropdown-icon' />
                            {dropdownteacher && (
                                <ul className='dropdown sidebar-list'>
                                    <li className='dropdown-list-item'>
                                        <Link to="/inner_pages/DisplayTeacher">
                                            <BsBook className='icon' />Display Teacher
                                        </Link>
                                    </li>
                                    <li className='dropdown-list-item'>Display course</li>
                                    <li className='dropdown-list-item'>Display course</li>
                                </ul>
                            )}
                        </li>

                        <li className={Action === 'Anouncement' ? 'sidebar-list-item active' : 'sidebar-list-item'}>
                            <Link onClick={() => setAction('Anouncement')} to="/inner_pages/Anouncement">
                                <BsMessenger className='icon' />Anouncement
                            </Link>
                        </li>

                        <li className={Action === 'RecordDetail' ? 'sidebar-list-item active' : 'sidebar-list-item'}>
                            <Link onClick={() => setAction('RecordDetail')} to="/inner_pages/TeacherRegistartion">
                                <FaRecordVinyl className='icon' />Record Detail
                            </Link>
                            <FaAngleDown onClick={() => toggleDropdown('record')} className='dropdown-icon' />
                            {dropDownRecord && (
                                <ul className='dropdown sidebar-list'>
                                    <li className='dropdown-list-item'>
                                        <Link to="/inner_pages/DisplayDeleteTeacherRecord">
                                            <BsBook className='icon' />Teacher Delete Record
                                        </Link>
                                    </li>
                                    <li className='dropdown-list-item'>
                                        <Link to="/inner_pages/DiplayDeletedStudentRecord">
                                            <BsBook className='icon' />Student Delete Record
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li className={Action === 'Setting' ? 'sidebar-list-item active' : 'sidebar-list-item'}>
                            <Link onClick={() => setAction('Setting')} to="/inner_pages/ChangePassword">
                                <BsFillGearFill className='icon' />Setting
                            </Link>
                        </li>

                        <li className='sidebar-list-item'>
                            <Link onClick={() => {
                                localStorage.removeItem('username');
                                localStorage.removeItem('Role');
                                window.location.reload();
                            }} to="/">
                                <FaSignOutAlt className='icon' />Logout
                            </Link>
                        </li>
                    </ul>
                </aside>
                <RouterList />
            </Router>
        );
    } else {
        return null;
    }
}

export default Sidebar;
