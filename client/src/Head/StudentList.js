import { React, useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InsertGrade from '../Modals/InsertGrade';
import GradeViewModal from '../Modals/ViewGrade';
import ViewStudentInformation from '../Modals/ViewStudentInformation';
import style from '../Styles/display_student_iformation.module.css';
function DisplayDepartmentStudent() {
    const [modalisopen, setmodalisopen] = useState(false);
    const [showmore, setshowmmore] = useState('')
    const [ModalData, setModalData] = useState('');
    const [gradeModalIsOpen, setGradeModalIsOpen] = useState(false);
    const department = localStorage.getItem('department')
    const Navigate = useNavigate();
    const user = localStorage.getItem('username');
    const Role = localStorage.getItem('Role')
    const [data, setdata] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    const openViewGrade = (d) => {
        setModalData(d);
        setGradeModalIsOpen(true);
    }

    const closeViewGrade = () => {
        setGradeModalIsOpen(false)
    }
    const openmodal = (d) => {
        setmodalisopen(true)
        setModalData(d)
    }
    const closemodal = () => {
        setmodalisopen(false)
    }

    useEffect(() => {

        fetch(`http://localhost:5000/inner_pages/display_student_information `)
            .then(res => res.json())
            .then(data => setdata(data))
            .catch(err => console.log(err));
    }, [])
    const filterdate = data.filter(dept => dept.department === department.toLowerCase())
    const diplay5Student = showmore ? filterdate : filterdate.slice(0, 5)
    const student = diplay5Student.filter(stud => stud.university_id.toLowerCase().includes(searchItem.toLowerCase())
        || stud.fname.toLowerCase().includes(searchItem.toLowerCase())
        || stud.lname.toLowerCase().includes(searchItem.toLowerCase())
        || stud.bacth.toString().includes(searchItem.toString())
        || stud.gpa.toString().includes(searchItem.toString())
    )
    if ((user && Role === 'head') || (user && Role === 'teacher')) {
        return (
            <>
                <div className='main-container'>
                    <h3 className={style.page_header}>
                        Student List
                    </h3>
                    <p className={style.search} >
                        <input type='search' placeholder="Search here" name="search" value={searchItem} onChange={(event) => setSearchItem(event.target.value)}></input>

                    </p>
                    <hr></hr>

                    <table className="table" id={style.table}>
                        <thead>
                            <tr className={style.header}>
                                <th scope="col">University Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">GPA</th>
                                <th scope="col">Batch</th>
                                <th scope='col'>college</th>
                                <th scope="col">Department</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className={style.body}>
                            {
                                student.length === 0 ? (
                                    <tr >
                                        <td colSpan='6'>No Student record Founed in {department}</td>
                                    </tr>
                                ) : (
                                    student.map(d => (
                                        <tr key={d.university_id}>
                                            <td >{d.university_id}</td>
                                            <td >{d.fname} {d.lname}</td>
                                            <td >{d.gpa}</td>
                                            <td >{d.bacth}</td>
                                            <td >{d.college}</td>
                                            <td >{d.department}</td>
                                            <td>
                                                {Role === 'head' ? (
                                                    <>
                                                        <button onClick={() => openmodal(d)} className="btn btn-primary">
                                                            <BsEye className={style.icon} />
                                                        </button>
                                                        <button onClick={() => openViewGrade(d)} className="btn btn-primary">
                                                            Grade
                                                        </button>
                                                    </>
                                                ) : (<button title='insert grade'
                                                    onClick={() => openmodal(d)} className="btn btn-primary">
                                                    <FaUpload className={style.icon} />

                                                </button>)

                                                }
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>

                    </table>
                    <button className="btn bg-info" onClick={() => setshowmmore(!showmore)}>
                        {showmore ? 'showless' : 'showmore'}
                    </button>

                </div>
                {
                    Role === 'head' ? (
                        <>
                            < ViewStudentInformation
                                isOpen={modalisopen}
                                onRequestClose={closemodal}
                                ModalData={ModalData}
                            />
                            <GradeViewModal
                                isOpen={gradeModalIsOpen}
                                onRequestClose={closeViewGrade}
                                ModalData={ModalData}
                            />
                        </>
                    ) :
                        (
                            <InsertGrade
                                isOpen={modalisopen}
                                onRequestClose={closemodal}
                                ModalData={ModalData} />
                        )
                }
            </>
        );
    } else {
        Navigate('/')
    }
}

export default DisplayDepartmentStudent;





// const [users, setuser] = useState([]);
// useEffect(() => {}, []);
// function getuser() {
//   axios.get("http://localhost/my-react-app/backend/index.php")
//     .then(function (response) {
//       console.log(response.data);
//     });
// }
// <tbody>
//   {users.map((user, key) => (
//     <tr key={key}>
//       <td>{user.u_id}</td>
//       <td>{user.fname}</td>
//       <td>{user.lname}</td>
//       <td>{user.batch}</td>
//       <td>{user.gpa}</td>
//       <td>{user.d_id}</td>
//     </tr>
//   ))
// </tbody>