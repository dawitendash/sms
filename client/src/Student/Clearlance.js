import React from 'react'
import { useNavigate } from 'react-router-dom';

function Clearlance() {
 const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role');
  const Navigate = useNavigate();
  if (user && Role) {
    return (
      <div className='main-container'>
        <div className='not-found'>
          The Class End is Coming Soon!!
        </div>
      </div>
    )
  } else {
    Navigate('/');
  }
}

export default Clearlance
