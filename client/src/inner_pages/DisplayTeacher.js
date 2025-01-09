import axios from 'axios';
import { format } from 'date-fns';
import { React, useEffect, useState } from "react";
import { BsTrash } from 'react-icons/bs';
import { FaPen, FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UpdateTeacherInformationModal from '../Modals/UpdateTeacherInformationModal';
import style from '../Styles/display_student_iformation.module.css';

function DisplayTeacher() {

  const Navigate = useNavigate();
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role')
  const [data, setdata] = useState([]);
  const [deleteMessge, setdeleteMessge] = useState('')
  const [modalisopen, setmodalisopen] = useState(false);
  const [ModalData, setModalDate] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [showmore, setshowmmore] = useState('');
  const [sortItem, setSortItem] = useState(false);;
  const openmodal = (d) => {
    setModalDate(d)
    setmodalisopen(true)
  }
  const closemodal = () => {
    setmodalisopen(false)
  }
  useEffect(() => { // fecth the data from the database 
    fetch('http://localhost:8080/demo_war_exploded/displayTeacher')
      .then(res => res.json())
      .then(data => setdata(data))
      .catch(err => console.log(err));
  }, [])
  //used for the record
  const deletedTeacherRecord = async (id) => {
    const getDayName = (date) => {
      const option = { weekday: 'long' }
      return new Intl.DateTimeFormat('en-US', option).format(date);
    }
    const currentdate = new Date();
    const deleteday = format(currentdate, ' MMMM dd , yyyy');
    const deletetime = getDayName(currentdate);
    const Role = localStorage.getItem('Role')
    await axios.post('http://localhost:5000/inner_pages/DeleteTeacherRecord', { id, user, Role, deleteday, deletetime }).then(res => {
      console.log({ id, user, Role, deleteday, deletetime })
      console.log(res)
    })

  }

  const handleDelete = (id) => {
    const confirm = window.confirm(`Do you want to delete : ${id} ?`);
    console.log(id)
    if (confirm) {
      const res = axios.delete(`http://localhost:8080/demo_war_exploded/deleteTeacherInfo?id=${id}`, { method: 'DELETE' })
      console.log(res)
      if (res) {
        const filetrTheDeleteTecaher = data.filter(teacher => teacher.University_Id === id)
        deletedTeacherRecord(id)
        setdata(filetrTheDeleteTecaher)
        setdeleteMessge('Delete succussfully')
        setTimeout(() => {
          setdeleteMessge('')
        }, 3000);
      }
    } else {
      setdeleteMessge("delete canceled!!")
      setTimeout(() => {
        setdeleteMessge('');
      }, 2000);
    }


  }
  const LimitDisplay = showmore ? data :
    data.slice(0, 5);
  const searchTeacher = LimitDisplay.filter(item =>
    item.University_Id.toLowerCase().includes(searchItem.toLowerCase())
    || item.FirstName.toLowerCase().includes(searchItem.toLowerCase())
    || item.LastName.toLowerCase().includes(searchItem.toLowerCase())
    || item.Department.toLowerCase().includes(searchItem.toLowerCase())
    || item.Role.toLowerCase().includes(searchItem.toLowerCase())
    || item.Level.toLowerCase().includes(searchItem.toLowerCase())
  )
  const sortByAge = () => {
    const sorted = [...data].sort((a, b) => a.min_capacity - b.min_capacity)
    setdata(sorted);
  }
  const sortByName = () => {
    const sorted = [...data].sort((a, b) => a.FirstName.localeCompare(b.FirstName));
    setdata(sorted);
  }
  if (user && Role === 'admin') {
    return (
      <>
        {
          deleteMessge && (<p className="alert alert-success">{deleteMessge}</p>)
        }
        <div className='main-container'>
          <h3 className={style.page_header}>
            Teachers List
          </h3>
          <p className={style.search} >
            <input type='search' placeholder="Search here" value={searchItem} onChange={(e) => setSearchItem(e.target.value)}></input>
          </p>
          <hr></hr>
          <div>
            <FaSort className='text-black text-xxl'
              onClick={() => setSortItem(prev => !prev)} />
            {
              sortItem ? (<div className={style.sortdropdown}>
                <button className="btn btn-primary" onClick={sortByName}>byname</button>
                <button className="btn btn-primary" onClick={sortByAge}>bylevel</button>
              </div>
              ) : (<></>)
            }
          </div>
          <div class="table-responsive">
            <table className="table table-bordered table-group-divider table-striped" >
              <thead>
                <tr className={style.header}>
                  <th scope="col"> Id</th>
                  <th scope="col"> Name</th>
                  <th scope="col">Level</th>
                  <th scope="col">Birth Data</th>
                  <th scope="col">Department</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className={style.body}>
                {
                  searchTeacher.length === 0 ? (
                    <tr >
                      <td colSpan='7'>There is no record Yet!!</td>
                    </tr>
                  ) :
                    (searchTeacher.map((d, i) => (
                      <tr key={i}>
                        <td >{d.University_Id}</td>
                        <td >{d.FirstName} {d.LastName}</td>
                        <td>{d.Level}</td>
                        <td >{d.BirthData}</td>
                        <td >{d.Department}</td>
                        <td >{d.Role}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary "
                            onClick={() => openmodal(d)}   >
                            <FaPen className={style.icon} />
                          </button>
                          <button
                            type="button" className="btn btn-danger"
                            onClick={() => handleDelete(d.University_Id)}
                          ><BsTrash className={style.icon} />  </button>
                        </td>
                      </tr>)
                    ))}
              </tbody>
            </table>
          </div>
          <button className="btn bg-info" onClick={() => setshowmmore(!showmore)}>
            {showmore ? 'showless' : 'showmore'}
          </button>
          <UpdateTeacherInformationModal
            isOpen={modalisopen}
            onRequestClose={closemodal}
            ModalData={ModalData} />
        </div>
      </>
    );
  } else {
    Navigate('/')
  }
}

export default DisplayTeacher;


