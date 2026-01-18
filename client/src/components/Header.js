import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaTachometerAlt, FaCompass, FaPlusSquare, FaUser, FaSignOutAlt, FaInfoCircle, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import './Header.css';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return null;
    return `/${user.role}/dashboard`;
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🥘 FOODLOOP
        </Link>

        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <FaCompass className="menu-icon" />
            Explore
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
            <FaInfoCircle className="menu-icon" />
            About Us
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
            <FaEnvelope className="menu-icon" />
            Contact Us
          </Link>
          
          {user ? (
            <>
              <Link to={getDashboardPath()} onClick={() => setMobileMenuOpen(false)}>
                <FaTachometerAlt className="menu-icon" />
                Dashboard
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                <FaSignOutAlt className="menu-icon" />
                Logout
              </button>
            </>
          ) : (
            <Link to="/join" onClick={() => setMobileMenuOpen(false)} className="join-link">
              <FaUserPlus className="menu-icon" />
              Join
            </Link>
          )}
        </nav>

        <div className="header-actions">
          {/* Theme toggle placed in the header */}
          <DarkModeToggle />

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
