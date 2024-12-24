import { useState } from "react";
import HeadSidebar from './Head/HeadSidebar';
import Header from './header';
import "./link.css";
import Nav from './nav';
import Sidebar from "./sidebar";
import StuedntSidebar from './Student/Sidebar';
import TeacherSidebar from './Teacher/TeacherSidebar';
const user = localStorage.getItem('username');
const Role = localStorage.getItem('Role')
const Login = localStorage.getItem('login')
function removeAfterLimitedTime() {
  const remove = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('Role');
    localStorage.removeItem('email');
    localStorage.removeItem('lname');
    localStorage.removeItem('fname');
    localStorage.removeItem('login')
  }
  window.addEventListener('beforeunload', remove)
}
function Navigation() {
  const [opensidebartoggle, setsidebartoggle] = useState(false);
  const opensidebar = () => {
    setsidebartoggle(!opensidebartoggle);
  }
  if ((user && Role === 'admin') && (Login)) {
    removeAfterLimitedTime()
    return (
      <div className="grid-container">
        <Header opensidebar={opensidebar} />
        <Sidebar opensidebartoggle={opensidebartoggle} opensidebar={opensidebar} />
      </div>
    )
  } else if ((user && Role === 'teacher') && (Login)) {
    removeAfterLimitedTime()
    return (
      <div className="grid-container">
        <Header opensidebar={opensidebar} />
        <TeacherSidebar opensidebartoggle={opensidebartoggle} opensidebar={opensidebar} />
      </div>
    )
  } else if ((user && Role === 'head') && (Login)) {
    removeAfterLimitedTime()
    return (
      <div className="grid-container">
        <Header opensidebar={opensidebar} />
        <HeadSidebar opensidebartoggle={opensidebartoggle} opensidebar={opensidebar} />
      </div>
    )
  } else if ((user && Role === 'student') && (Login)) {
    removeAfterLimitedTime()
    return (
      <div className="grid-container">
        <Header opensidebar={opensidebar} />
        <StuedntSidebar opensidebartoggle={opensidebartoggle} opensidebar={opensidebar} />
      </div>
    )
  } else {
    return (
      <Nav />
    )
  }
}
export default Navigation


