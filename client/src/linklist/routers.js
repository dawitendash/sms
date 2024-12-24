import { Route, Routes } from "react-router-dom";
import ErrorPage from '../ErrorPage/ErrorPage';
import AssignTeacherToCourse from '../Head/AssignTeacherToCourse';
import Class from '../Head/Class';
import DisplayDepartmentStudent from '../Head/StudentList';
import DisplayTeacherInDepartment from '../Head/TeacherList';
import Announcement from '../inner_pages/Announcement';
import ChangePassword from '../inner_pages/ChangePassword';
import CollegeRegistration from '../inner_pages/college_registration';
import CourseRegistration from '../inner_pages/CourseRegistration';
import Dashboard from '../inner_pages/dashboard';
import DepartmentRegistartion from '../inner_pages/DepartmentRegistartion';
import DiplayDeletedStudentRecord from '../inner_pages/DiplayDeletedStudentRecord';
import Displaystudent from "../inner_pages/display_student_information";
import DisplayDeleteTeacherRecord from '../inner_pages/DisplayDeleteTeacherRecord';
import DisplayDepartment from '../inner_pages/DisplayDepartment';
import DisplayTeacher from '../inner_pages/DisplayTeacher';
import HeadRegistration from '../inner_pages/HeadRegistration';
import SearchStudent from '../inner_pages/SearchStudent';
import StudentRegistration from '../inner_pages/student_registration';
import TeacherRegistartion from '../inner_pages/TeacherRegistartion';
import Login from "../login";
import Aboutus from "../pages/Aboutus";
import Contactus from "../pages/Contactus";
import Forgetpassword from "../pages/forget_password";
import Home from "../pages/Home";
import NewUserRegistration from "../pages/NewUserRegistration";
import StudentClass from '../Student/Class';
import Clearlance from '../Student/Clearlance';
import Course from '../Student/Course';
import GradeView from '../Student/GradeView';
import Placement from '../Student/Placement';
import Schedule from '../Student/schedule';
import Assigment from '../Teacher/Assigment';
import MakeGrade from '../Teacher/MakeGrade';
import Report from '../Teacher/Report';
import Resourses from '../Teacher/Resourses';
import Verfication from '../Verfication';
import ViewMessage from '../ViewMessage';
function RoutersList() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/src/login" element={<Login />} />
        <Route path="/ErrorPage/ErrorPage" element={<ErrorPage />} />
        <Route path="/pages/Contactus" element={<Contactus />} />
        <Route path="/pages/forget_password" element={<Forgetpassword />} />
        <Route path="/pages/Aboutus" element={<Aboutus />} />
        <Route path="/ViewMessage" element={<ViewMessage />} />
        <Route path="/Teacher/Assigment" element={<Assigment />} />
        <Route path="/Teacher/Resourses" element={<Resourses />} />
        <Route path="/Teacher/Report" element={<Report />} />
        <Route path="/Teacher/MakeGrade" element={<MakeGrade />} />
        <Route path="/Student/Placement" element={<Placement />} />
        <Route path="/Student/Clearlance" element={<Clearlance />} />
        <Route path="/Student/GradeView" element={<GradeView />} />
        <Route path="/Student/schedule" element={<Schedule />} />
        <Route path="/Student/Course" element={<Course />} />
        <Route path="/Student/Class" element={<StudentClass />} />
        <Route path="/Verfication" element={<Verfication />} />
        <Route path="/Head/AssignTeacherToCourse" element={<AssignTeacherToCourse />} />
        <Route path="/Head/Class" element={<Class />} />
        <Route path="/Head/TeacherList" element={<DisplayTeacherInDepartment />} />
        <Route path="/Head/DisplayDepartmentStudent" element={<DisplayDepartmentStudent />} />
        <Route path="/inner_pages/DisplayDepartment" element={<DisplayDepartment />} />
        <Route path="/inner_pages/DisplayDeleteTeacherRecord" element={<DisplayDeleteTeacherRecord />} />
        <Route path="/inner_pages/ChangePassword" element={<ChangePassword />} />
        <Route path="/inner_pages/HeadRegistration" element={<HeadRegistration />} />
        <Route path="/inner_pages/CourseRegistration" element={<CourseRegistration />} />
        <Route path="/inner_pages/DiplayDeletedStudentRecord" element={<DiplayDeletedStudentRecord />} />

        <Route path="/pages/NewUserRegistration"
          element={<NewUserRegistration />} />
        <Route path="/inner_pages/Announcement"
          element={<Announcement />} />
        <Route path="/inner_pages/DisplayTeacher"
          element={<DisplayTeacher />} />
        <Route path="/src/login" element={<Login />} />
        <Route
          path="/inner_pages/DepartmentRegistartion"
          element={<DepartmentRegistartion />}
        ></Route>
        <Route
          path="/inner_pages/display_student_information"
          element={<Displaystudent />}
        ></Route>
        <Route
          path="/inner_pages/student_registration"
          element={<StudentRegistration />}
        ></Route>
        <Route
          path="/inner_pages/TeacherRegistartion"
          element={<TeacherRegistartion />}
        ></Route>
        <Route
          path="/inner_pages/college_registration"
          element={<CollegeRegistration />}
        ></Route>
        <Route path="/inner_pages/dashboard" element={<Dashboard />} />
        <Route path="/inner_pages/SearchStudent" element={<SearchStudent />} />
        <Route
          path="*"
          element={<h5 className="not-found">Page not found!!</h5>}
        />
      </Routes>
    </div>
  );
}

export default RoutersList;
