// import axios from "axios";
import { React, useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ViewTeacherInformation from '../Modals/ViewTeacherInformation';
import style from '../Styles/display_student_iformation.module.css';
function DisplayTeacherInDepartment() {
  const [modalisopen, setmodalisopen] = useState(false);
  const [showmore, setshowmmore] = useState('')
  const [ModalData, setModalData] = useState('');
  const openmodal = (d) => {
    setModalData(d)
    setmodalisopen(true)
  }
  const closemodal = () => {
    setmodalisopen(false)
  }
  const Navigate = useNavigate();
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role')
  const department = localStorage.getItem('department')
  const [searchItem, setSearchItem] = useState('');
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/inner_pages/DisplayTeacher')
      .then(res => res.json())
      .then(data => setdata(data))
      .catch(err => console.log(err));
  }, [])
  const fiterData = data.filter(dept => dept.Department === department)
  const display5Teacher = showmore ? fiterData : fiterData.slice(0, 5)
  const searchTeacher = display5Teacher.filter(teach => teach.University_Id.toLowerCase().includes(searchItem.toLowerCase())
    || teach.FirstName.toLowerCase().includes(searchItem.toLowerCase())
    || teach.LastName.toLowerCase().includes(searchItem.toLowerCase())
    || teach.BirthData.toLowerCase().includes(searchItem.toLowerCase())
    || teach.Level.toLowerCase().includes(searchItem.toLowerCase())
  )
  if (user && Role === 'head') {
    return (
      <>
        <div className='main-container'>
          <h3 className={style.page_header}>
            Teachers List
          </h3>
          <p className={style.search} >
            <input type='search' placeholder="Search here" value={searchItem} onChange={(e) => setSearchItem(e.target.value)}></input>
          </p>
          <hr></hr>
          <table className="table" id={style.table}>
            <thead>
              <tr className={style.header}>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Level</th>
                <th scope="col">Birth Data</th>
                <th scope="col">Department</th>
              </tr>
            </thead>
            <tbody className={style.body}>
              {
                searchTeacher.length === 0 ? (
                  <tr colSpan='7'>
                    No Record is Found Yet!!!
                  </tr>
                ) :
                  (
                    searchTeacher.map((d) => (
                      <tr key={d.University_Id}>
                        <td >{d.University_Id}</td>
                        <td >{d.FirstName} {d.LastName}</td>
                        <td>{d.Level}</td>
                        <td >{d.BirthData}</td>
                        <td >{d.Department}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary "
                            onClick={() => openmodal(d)}
                          ><BsEye className={style.icon} />
                          </button>
                        </td>

                      </tr>
                    )))
              }
            </tbody>
          </table>
          <button className="btn bg-info" onClick={() => setshowmmore(!showmore)}>
            {showmore ? 'showless' : 'showmore'}
          </button>

          <ViewTeacherInformation
            isOpen={modalisopen}
            onRequestClose={closemodal}
            ModalData={ModalData}
          />
        </div>
      </>
    );
  } else {
    Navigate('/')
  }
}

export default DisplayTeacherInDepartment;



