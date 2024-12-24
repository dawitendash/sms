import React from 'react';
import { useNavigate } from 'react-router-dom';
import Class from '../Head/Class';
function StudentClass() {
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role');
  const Navigate = useNavigate();
  if (user && Role === 'student') {
    return (
      <div className='main-container'>
        <Class />
      </div>
    )
  } else {
    Navigate('/');
  }
}

export default StudentClass
