import React from 'react';
import { useNavigate } from 'react-router-dom';

function Class() {
  const Navigate = useNavigate;
  const user = localStorage.getItem('username')
  const Role = localStorage.getItem('Role')
  if (user && Role === 'teacher') {
    return (
      <div className='main-container'>
        <div className='not-found'>
          No Class Yet!!
        </div>
      </div>

    )

  } else {
    Navigate('/')
  }
}

export default Class
