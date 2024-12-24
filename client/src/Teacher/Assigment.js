import React from 'react';
import { useNavigate } from 'react-router-dom';

function Assigment() {
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role');
  const Navigate = useNavigate();
  if (user && Role) {
    return (
      <div className='main-container'>
        <div className='not-found'>
          There is no Assigment yet!!
        </div>
      </div>

    )
  } else {
    Navigate('/');
  }
}

export default Assigment
