import React from 'react'
import logo from '../assets/nitc logo.png'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css' // Assuming you have a CSS file for styling the Navbar

const Navbar = () => {
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Logo" className='navbar-logo'/>
      </div>
      <div className="navbar">
        <Link to="/">Heading 1</Link>
        <Link to="/">Heading 2</Link>
        <Link to="/">Heading 3</Link>
        <Link to="/">Heading 4</Link>
        <button className="login-button">Login</button>
      </div>
    </div>
  )
}

export default Navbar
