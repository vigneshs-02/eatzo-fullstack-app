import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({ onLogout }) => {

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">

        {/* Logo */}
        <h1 className="admin-logo">
          EATZO
          <span className="admin-badge">
            Admin
          </span>
        </h1>

        {/* Right Side */}
        <div className="admin-navbar-right">
          <div className="admin-profile">
            <div className="admin-avatar">
              A
            </div>
            <div className="admin-info">
              <p className="admin-name">
                Admin
              </p>
              <p className="admin-role">
                Restaurant Manager
              </p>
            </div>
          </div>

          {/* ✅ Logout Button */}
          <button
            className="admin-logout-btn"
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('userId')
              window.location.reload()
            }}>
            Logout
          </button>

        </div>
      </div>
    </nav>
  )
}

export default Navbar