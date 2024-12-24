import React from 'react';
import { useNavigate } from 'react-router-dom';

function Schedule() {
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role');
  const Navigate = useNavigate();
  if (user && Role) {
    return (
      <div>

      </div>
    )
  } else {
    Navigate('/');
  }
}

export default Schedule
