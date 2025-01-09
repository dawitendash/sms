import { React, useEffect, useState } from 'react';
import { BsFillBellFill, BsJustify, BsPerson, BsSearch } from 'react-icons/bs';
import { FaAngleDown } from 'react-icons/fa';
import './App.css';
import woldia from './image/woldia-logo.jpg';
import Notification from './Modals/Notification';
import UserDropDownInformation from './Modals/UserDropDownInformation';
function Header({ opensidebar }) {
  const [notisopen, setnotisopen] = useState(false);
  const [userprofile, setuserprofile] = useState(false);
  const seeuserprofile = () => {
    setuserprofile(true)
  }
  const closeuserprofile = () => {
    setuserprofile(false)
  }
  const opennotify = () => {
    setnotisopen(true)
  }
  const closenotify = () => {
    setnotisopen(false)
  }
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role')
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch('http://localhost:5000/countNotificatin').then(res => res.json()).then((data) => {
      setCount(data.count);
    })
  }, [])
  return (


    <header className='header' >
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={opensidebar} />
      </div>
      <div className='header-logo'>
        <img src={woldia} alt='woldia-logo'></img>
      </div>

      <div className='header-left'>
        <input type='text' placeholder='search'></input>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        <span className='notification'>
          <BsFillBellFill className='icon' />
          <FaAngleDown onClick={opennotify} className='icon' />
          <span className='count_notification'>
            {count}
          </span>
        </span>
        <span className='profile btn btn-primary'>
          <span className='role'>
            <BsPerson />
            {Role.toLocaleUpperCase()}
          </span>
          <FaAngleDown onClick={seeuserprofile} className='icon' />
        </span>
        <UserDropDownInformation
          isOpen={userprofile}
          onRequestClose={closeuserprofile}
          user={user}
        />
        <Notification
          isOpen={notisopen}
          onRequestClose={closenotify}
          user={user}
        />
      </div>
    </header>

  )
}

export default Header 