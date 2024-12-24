import React from 'react';
import { useNavigate } from 'react-router-dom';

function Schedule() {
  const Navigate = useNavigate();
  const userName = localStorage.getItem('username')
  const Role = localStorage.getItem('Role');
  if (userName && Role) {
    return (
      <div className='main-container'>
        <div className='not-found'>
          No Schedule Yet!!
        </div>
      </div>
    )
  } else {
    Navigate('/');
  }
}
export default Schedule
