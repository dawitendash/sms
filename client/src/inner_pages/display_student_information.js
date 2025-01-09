import axios from "axios";
import { format } from "date-fns";
import { React, useEffect, useState } from "react";
import { BsTrash } from 'react-icons/bs';
import { FaPen, FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteModal from '../Modals/deleteModal';
import UpdateStudentInformationModal from '../Modals/UpdateStudentInformationModal';
import style from '../Styles/display_student_iformation.module.css';
function Displaystudent() {
  const Navigate = useNavigate();
  const [ModalData, setModalData] = useState('')
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role')
  const [data, setdata] = useState([]);
  const [modalisopen, setmodalisopen] = useState(false);
  const [showmore, setshowmmore] = useState('')
  const [deleteMessage, setDeleteMessage] = useState('')
  const [searhItem, setSearchItem] = useState('');
  const [openConfirm, setopenConfirm] = useState(false)
  const [sortItem, setSortItem] = useState(false);;
  const confirm = (d) => {
    setModalData(d)
    setopenConfirm(true)
    console.log(d)
    const updateSudenetvalues = data.filter(student => student.university_id !== d)
    setdata(updateSudenetvalues);
    insertDeleteStudentRecord(d)
    setDeleteMessage('Delete succussfully')
    setTimeout(() => {
      setDeleteMessage('')
    }, 3000);
  }
  const confirmClose = () => {
    setopenConfirm(false)
  }
  const openmodal = (d) => {
    setModalData(d)
    setmodalisopen(true)

  }
  const closemodal = () => {
    setmodalisopen(false)
  }

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setdata(data)
        } else {
          console.log('the expected value is must be an array')
        }
      }

      )
      .catch(err => console.log(err));
  }, [])

  const insertDeleteStudentRecord = async (d) => {

    const u_id = d.university_id;
    const getDayName = (date) => {
      const option = { weekday: 'long' }
      return new Intl.DateTimeFormat('en-US', option).format(date);
    }
    const currentdate = new Date();
    const deleteday = format(currentdate, ' MMMM dd , yyyy');
    const deletetime = getDayName(currentdate);
    await axios.post('http://localhost:5000/inner_pages/DeletestudentRecord', { u_id, user, Role, deleteday, deletetime })
  }
  const LimitDisplay = showmore ? data :
    data.slice(0, 5);
  const searchStudent = LimitDisplay.filter(search =>
    search.university_id.toLowerCase().includes(searhItem.toLowerCase())
    || search.fname.toLowerCase().includes(searhItem.toLowerCase())
    || search.lname.toLowerCase().includes(searhItem.toLowerCase())
    || search.college.toLowerCase().includes(searhItem.toLowerCase())
    || search.department.toLowerCase().includes(searhItem.toLowerCase())
  )

  const sortByName = () => {
    const sorted = [...data].sort((a, b) => a.fname.localeCompare(b.fname));
    setdata(sorted);
  }
  const sortByAge = () => {
    const sored = [...data].sort((a, b) => a.gpa.localeCompare(b.gpa));
    setdata(sored);
  }
  if (user && Role === 'admin') {
    return (
      <>
        {deleteMessage && <p className="alert alert-success"> {deleteMessage}  </p>}
        <div className='main-container'>
          <h3 className={style.page_header}>
            Student List
          </h3>
          <p className={style.search} >
            <input type='search' placeholder="Search here" value={searhItem} onChange={(e) => setSearchItem(e.target.value)} name="search" ></input>
          </p>
          <hr></hr>
          <div class="table-responsive">
            <div>
              <FaSort className='text-black text-xxl'
                onClick={() => setSortItem(prev => !prev)} />
              {
                sortItem ? (<div className={style.sortdropdown}>
                  <button className="btn btn-primary" onClick={() => sortByName([...data])} >byname</button>
                  <button className="btn btn-primary" onClick={() => sortByAge([...data])}>bygpa</button>
                </div>
                ) : (<></>)
              }
            </div>
            <table className="table table-bordered table-group-divider table-striped">
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
                  searchStudent.length === 0 ? (
                    <tr>
                      <td colSpan='7'>There is no record yet!!</td>
                    </tr>
                  ) : (
                    Array.isArray(searchStudent) && searchStudent.map((d, i) => (
                      <tr key={i}>
                        <td >{d.university_id}</td>
                        <td >{d.fname} {d.lname}</td>
                        <td >{d.gpa}</td>
                        <td >{d.batch}</td>
                        <td >{d.college}</td>
                        <td >{d.department}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => openmodal(d)}  ><FaPen className={style.icon} /></button>
                          <button
                            type="button" className="btn btn-danger" onClick={() => confirm(d)} ><BsTrash className={style.icon} />
                          </button>
                        </td>
                      </tr>)
                    ))}
              </tbody>

            </table>
          </div>
          <button className="btn bg-info" onClick={() => setshowmmore(!showmore)}>
            {showmore ? 'showless' : 'showmore'}
          </button>
          <DeleteModal
            isOpen={openConfirm}
            onRequestClose={confirmClose}
            ModalData={ModalData} />
          < UpdateStudentInformationModal
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
export default Displaystudent;