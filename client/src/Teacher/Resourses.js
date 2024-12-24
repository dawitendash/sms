import React from 'react';
import { useNavigate } from 'react-router-dom';
function Resourses() {
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role');
  const Navigate = useNavigate();
  if (user && Role) {
    return (
      <div className='main-container'>
        <div className='not-found'>
          There is no resources yet!!
        </div>
      </div>
    )
  } else {
    Navigate('/');
  }
}

export default Resourses
