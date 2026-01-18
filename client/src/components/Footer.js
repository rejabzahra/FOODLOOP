import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhoneAlt, FaMapMarkedAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-logo">🍴 FOOD LOOP</h3>
            <p className="footer-description">
              Connecting surplus food with those in need, creating a zero-waste circular food economy.
            </p>
            <p className="footer-tagline">Made with care for our community</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">For Restaurants</Link></li>
              <li><Link to="/">For Volunteers</Link></li>
              <li><Link to="/">How It Works</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><Link to="/contact">FAQ</Link></li>
              <li><Link to="/">Guidelines</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              <li>
                <a href="mailto:contact@foodloop.org" className="contact-link">
                  <FaEnvelope className="contact-icon" />
                  <span>contact@foodloop.org</span>
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="contact-link">
                  <FaPhoneAlt className="contact-icon" />
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li>
                <a href="https://www.google.com/maps/search/123+Community+Street+City+State+12345" target="_blank" rel="noreferrer" className="contact-link contact-location">
                  <FaMapMarkedAlt className="contact-icon" />
                  <span>123 Community Street<br />City, State 12345</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; All rights reserved – FOOD LOOP</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
