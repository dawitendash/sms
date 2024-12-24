import { FaChalkboardTeacher, FaPhone } from "react-icons/fa";
import { BrowserRouter as Router, Link } from "react-router-dom";
import style from './inner_header.module.css'; 
function InnerNavigation() {
  const user = localStorage.getItem('username');
  return (
    <>
      <Router>
        <div className={style.links}>
          <div className={style.all_anchor_tag}>
             <div className={style.profile}>
          {user}
          </div>
          {/* <img src={woldia_logo} alt="loading.." /> */}
          <Link className={style.ancoh_tag} to="">
            Department
          </Link>
          <Link className={style.ancoh_tag} to="./inner_page/college_registration">
            <FaPhone className="icon" />
            Student
          </Link>
          <Link className={style.ancoh_tag} to="/teacher">
            <FaChalkboardTeacher className="icon" />
            Teacher
          </Link>
          <Link
            className={style.ancoh_tag}
            to="/inner_pages/display_student_information"
          >
            Display
            </Link>
            <div className={style.logout}>
            Logout
        </div>
          </div>
      </div>
      </Router>
      </>
  );
}

export default InnerNavigation;
