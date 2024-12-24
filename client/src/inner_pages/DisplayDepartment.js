import React, { useEffect, useState } from 'react';
import { FaPen, FaSort, FaTrash } from 'react-icons/fa';
import UpdateDepartmentInformationModal from '../Modals/UpdateDepartmentInformationModal';
import style from '../Styles/display_student_iformation.module.css';
function DisplayDepartment() {
  const [data, setData] = useState([]);
  const [showmore, setshowmmore] = useState('')
  const [searchItem, setSearchItem] = useState('');
  const [modalisopen, setmodalisopen] = useState(false);
  const [ModalData, setModalDate] = useState('');
  const [message, setMessage] = useState('');
  const [sortItem, setSortItem] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const handlePrevoius = () => {
    setCurrentPages((prevpage) => Math.max(prevpage - 1, 1));
  }
  const handleNext = () => {
    setCurrentPages((prevpage) => prevpage + 1);
  }
  const openmodal = (d) => {
    setModalDate(d)
    setmodalisopen(true)
  }
  const closemodal = () => {
    setmodalisopen(false)
  }
  const fetchDepartment = async (page) => {
    const pages = Number(page); // Ensure page is a number

    if (!Number.isNaN(pages)) {
      console.log("Fetching data for page:", pages);

      try {
        const response = await fetch(`http://localhost:5000/inner_pages/DisplayDepartment?page=${pages}`);
        const data = await response.json();

        console.log("Data received:", data);

        if (Array.isArray(data)) {
          setData(data); // Assuming setData updates the data state
          setCurrentPages(pages); // Update current page
        } else {
          console.error("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    } else {
      console.error("Invalid page number:", page);
    }
  };

  useEffect(() => {
    fetchDepartment(currentPages);
  }, [currentPages]);


  const searchDepartment = data.filter(item =>
    item.department_id.toLowerCase().includes(searchItem.toLowerCase())
    || item.department_name.toLowerCase().includes(searchItem.toLowerCase())
    || item.location.toLowerCase().includes(searchItem.toLowerCase())
  )
  const sortByAge = () => {
    const sorted = [...data].sort((a, b) => a.min_capacity - b.min_capacity)
    setData(sorted);
  }
  const sortByName = () => {
    const sorted = [...data].sort((a, b) => a.department_name.localeCompare(b.department_name));
    setData(sorted);
  }
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`Do you want to delete ${id}?`)
    if (confirmDelete) {
      await fetch('http://localhost:5000/deleteDepartment' + id, { method: 'DELETE' }).then(res => {
        const filterdata = data.filter(dep => dep.department_id !== id);
        setData(filterdata);
        setMessage('Deleted Successfully!!');
        setTimeout(() => {
          setMessage('')
        }, 3000)
      })
    }
  }
  return (
    <>
      {
        message && (<div className='alert alert-success m-2'>{message}</div>)
      }
      <div className='main-container'>
        <h3 className={style.page_header}>
          Department List
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
              <button className="btn btn-primary" onClick={sortByAge}>byCapacity</button>
            </div>
            ) : (<></>)
          }
        </div>
        <table className="table table-bordered table-group-divider table-striped ">
          <thead>
            <tr className={style.header}>
              <th scope="col"> Dep. Name</th>
              <th scope="col"> Dep .Id</th>
              <th scope="col">Max cpacity</th>
              <th scope="col">Min capacity</th>
              <th scope="col">Location</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className={style.body}>{
            searchDepartment.length === 0 ? (
              <tr >
                <td colSpan='7'>There is no record Yet!!</td>
              </tr>
            ) :
              (data.map((d, i) => (
                <tr key={i}>
                  <td >{d.department_name}</td>
                  <td >{d.department_id}</td>
                  <td >{d.max_capacity}</td>
                  <td >{d.min_capacity}</td>
                  <td>{d.location}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={() => openmodal(d)}
                    ><FaPen className={style.icon} />
                    </button>

                    <button
                      type="button" className="btn btn-danger"
                      onClick={() => handleDelete(d.department_id)}
                    ><FaTrash className={style.icon} />
                    </button>

                  </td>
                </tr>
              )))}
          </tbody>
        </table>
        <UpdateDepartmentInformationModal
          isOpen={modalisopen}
          onRequestClose={closemodal}
          ModalData={ModalData}
        />
        <button onClick={() => handlePrevoius()}>prev </button>
        <span>{currentPages}</span>
        <button onClick={() => { handleNext() }}>next</button>
        <button className="btn bg-info" onClick={() => setshowmmore(!showmore)}>
          {showmore ? 'showless' : 'showmore'}
        </button>
      </div>

    </>
  );
}

export default DisplayDepartment
