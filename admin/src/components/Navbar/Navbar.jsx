import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import profileIcon from '../../assets/icon/profile.jpg'



const Navbar = () => {
    return (
        <nav className='flex-div'>
            <div className="nav-left flex-div">
                <p className='logo' alt="logo">Admin - Savoy Distribution</p>
            </div>
            <div className="nav-middle flex-div">

            </div>
            <div className="nav-right flex-div">
                <img className='profile' src={profileIcon} alt="" />
            </div>
        </nav>
    );
};

export default Navbar;