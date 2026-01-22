import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhoneAlt, FaInstagram, FaFacebook, FaLinkedin, FaUtensils } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/support">Support</Link>
          <Link to="/company">About Company</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        <div className="footer-icons">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="instagram">
            <span className="icon-wrapper"><FaInstagram /></span>
          </a>
          <a href="mailto:contact@foodloop.org" className="email">
            <span className="icon-wrapper"><FaEnvelope /></span>
          </a>
          <a href="tel:+1234567890" className="phone">
            <span className="icon-wrapper"><FaPhoneAlt /></span>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="facebook">
            <span className="icon-wrapper"><FaFacebook /></span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="linkedin">
            <span className="icon-wrapper"><FaLinkedin /></span>
          </a>
        </div>
        <div className="footer-brand">
          <FaUtensils /> FOODLOOP
        </div>
        <div className="footer-bottom">
          <p>@ 2026 All rights reserved | FOODLOOP</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
