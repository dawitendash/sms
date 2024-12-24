import React from 'react';
import { useNavigate } from 'react-router-dom';
function Course() {
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role');
  const Navigate = useNavigate();
  if (user && Role) {
    return (
      <div className='main-container'>
        <div className='not-found'>
          NO Course!!
        </div>
      </div>

    )
  } else {
    Navigate('/');
  }
}

export default Course
