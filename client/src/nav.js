import React from 'react';
import { FaHome, FaInfo, FaPhone } from "react-icons/fa";
import { Link, BrowserRouter as Router } from "react-router-dom";
// import Language from './Language/changer';
import "./link.css";
import RoutersList from "./linklist/routers";
function Nav() {
  return (
    <Router>
      <nav class="navbar navbar-expand-lg   ">
        <div class="container-fluid ">
          <button class="navbar-toggler text-white text-bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon text-white"></span>
          </button>
          <div class="collapse navbar-collapse  " id="navbarNav">

            <ul class="navbar-nav "  >
              <li class="nav-item p-1 " >
                <Link class="nav-link av-link-lg " aria-current="page" to="/">
                  <FaHome className=' pb-1' />
                  Home
                </Link>
              </li>
              <li class="nav-item p-1 ">
                <Link className="nav-link" to="/pages/Contactus">
                  <FaPhone className=' pb-1' />
                  Contact us
                </Link>
              </li>
              <li class="nav-item p-1">
                <Link class="nav-link" to="/pages/Aboutus">
                  <FaInfo className=' pb-1' />
                  About us
                </Link>
              </li>


            </ul>
          </div>
        </div>
      </nav>
      <RoutersList />
    </Router>
  )
}

export default Nav

/*  <Router>
 <nav class="navbar navbar-expand-lg bg-primary">
  <div class="container-fluid"> 
 
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarNav">
      <ul class="navbar-nav active "  >
        <li class="nav-item" > 
          <Link class="nav-link av-link-lg active" aria-current="page"  to="/">
              <FaHome className="icon" />
              Home
            </Link>
        </li>
        <li class="nav-item"> 
           <Link className="nav-link" to="/pages/Contactus">
              <FaPhone className="icon" />
              Contact us
            </Link>
        </li>
        <li class="nav-item"> 
          <Link class="nav-link" to="/pages/Aboutus">
              <FaInfo className="icon" />
              About us
            </Link>
        </li>
         
      </ul>
    </div>
  </div>
</nav>
<RoutersList/>
</Router> */