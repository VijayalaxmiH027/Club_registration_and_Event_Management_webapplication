// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  return (
    <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: '#9b111e', color: '#ffffff' }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        <img src={logo} alt="KLE TECH Logo" style={{ width: '40px', height: '40px', marginRight: '10px', borderRadius: '10%' }} />
        KLE TECH
      </div>
      <nav className="navigation" aria-label="Main Navigation">
        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
          <li style={{ fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            <Link to="/Homepage" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          </li>
          <li style={{ fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            <Link to="/events" style={{ color: 'white', textDecoration: 'none' }}>Events</Link>
          </li>
          <li style={{ fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
          </li>
          <li style={{ fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            <Link to="/feedback" style={{ color: 'white', textDecoration: 'none' }}>Feedback</Link>
          </li>
          <li style={{ fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
          </li>
          <li style={{ fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</Link>
          </li>
        </ul>
      </nav>
      <div className="search-box">
        <input type="text" placeholder="Search..." aria-label="Search box" style={{ width: '200px', padding: '8px 10px', border: '2px solid #ecc6ca', borderRadius: '5px', outline: 'none', fontSize: '16px', color: 'rgba(155, 17, 30, 0.6)' }} />
      </div>
    </header>
  );
};

export default Navbar;
