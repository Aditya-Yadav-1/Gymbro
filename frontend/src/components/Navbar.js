import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from './Images/man.png';
import { admincontext } from '../contexts/AdminData';

const Navbar = () => {
  const {admin} = useContext(admincontext);
  const navigate = useNavigate();
  let [display, setdisplay] = useState('none');
  const handleLogout = (e) => {
    localStorage.removeItem('authtoken');
    navigate('/');
    // console.log("logout");
  }

  const handleProfile = (e) =>{
    e.preventDefault();
    if(display === "block"){
      setdisplay("none");
    }
    else if(display === "none"){
      setdisplay("block");
    }
  }
  
  useEffect(()=>{
    if(!localStorage.getItem('authtoken')){
      navigate('/')
    }
  },[localStorage]);
  
  return (
    <nav>
        <div className="navbar-container">
            <div className="gymbro">GYMBRO</div>
            <Link to="/home" className="nav-item">Home</Link>
            <Link to="/contact" className="nav-item">Contact</Link>

            <img className='show-profile' src={profile} onClick={handleProfile} alt='profile-icon'/>
            <div className="sub-menu-wrap" style={{display: display}}>
              <div className="details">
                <div className='info' style={{fontSize:"larger", fontWeight:"500"}}>{admin.name}</div>
                <div className='info'>{admin.email}</div>
                <div className='info'>{admin.gym_name}</div>
              </div>
              <div className="functionality-section">
                <button className='logout-button' onClick={handleLogout}>Logout</button>
              </div>
              {/* <div className="dark-mode-button">Dark Mode Button</div>  */}
            </div>
        </div>
    </nav>
  )
}

export default Navbar
