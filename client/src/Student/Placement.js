import React from 'react';
import { useNavigate } from 'react-router-dom';
function Placement() {
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role');
  const Navigate = useNavigate();
  if (user && Role === 'student') {
    return (
      <div className='main-container'>
        <div className='not-found'>
          No Placement Yet!!
        </div>
      </div>
    )
  } else if (user && Role === 'admin') {
    const confirmPlacement = () => {
      const confirm = window.confirm('Are You Sure To Open The Placement?')
      if (confirm) {
        localStorage.setItem('placement', true)
      }
    }
    return (
      <div className='main-container'>
        Open the placement for students
        <button className='btn btn-primary' onClick={confirmPlacement}>open </button >
        <button className='btn btn-danger' onClick={localStorage.removeItem('placement')}>Close
        </button>
      </div>
    )
  } else {
    Navigate('/');
  }
}

export default Placement
