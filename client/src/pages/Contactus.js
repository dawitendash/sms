import React from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { FaEnvelope, FaFacebook, FaInstagram, FaMap, FaPhone, FaTelegram, FaTiktok,  FaYoutube } from 'react-icons/fa'; 

function Contactus() {
  return (
    <div className="container-fluid m-4">
      <h4>Contact us</h4>
      <ul className='list '>
        <li className='list-group-item mb-1'>
          < FaInstagram className="" /><span>insta/woldia university</span>
        <li className='list-group-item mb-1'>
            < BsTwitterX className= ""/><span> twitter/woldia university</span>
        </li>
        </li>
        <li className='list-group-item mb-1'>
          <FaFacebook className= ""/><span>www.woldia university.fb</span>
        </li>
        <li className='list-group-item mb-1'>
           <FaTiktok className= ""  /><span>woldia university</span>
        </li>
        <li className='list-group-item mb-1'>
          <FaTelegram className= ""/><span>t/me.woldia university</span>
        </li>
        <li className='list-group-item mb-1'>
           < FaPhone className= ""/><span>  +251 33 111 1341</span>
        </li>
        <li className='list-group-item mb-1'>
           <  FaEnvelope className= ""/><span>  woldiauniversity@gmail.com</span>
        </li>
        <li className='list-group-item mb-1'>
           <  FaYoutube className= ""/><span>  youtub/woldiauniversity.com</span>
        </li>
        <li className='list-group-item mb-1'>
           <  FaMap className= ""/><span> Jeneto , Woldia , Amhara , 
              Ethiopia</span>
        </li>
      </ul> 

    </div>
  )
}

export default Contactus
