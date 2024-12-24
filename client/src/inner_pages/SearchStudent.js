import React from 'react'
import style from '../Styles/searchstudent.module.css'
function SearchStudent() {
  return (
    <div className='main-container'>
      <div className={style.search}>
        <input type='search' placeholder='Seach here' name='search' ></input>
        <button type='submit' className={style.btn}>Search</button>
      </div>
      <table className='table'>
        <thead>
          <th scope="col">University Id</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">GPA</th>
          <th scope="col">Batch</th>
          <th scope="col">Department</th>
          <th scope="col">Action</th>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}

export default SearchStudent
