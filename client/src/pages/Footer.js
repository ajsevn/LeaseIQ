import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We provide the best leasing solutions for residential and commercial properties.</p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: info@leaseiq.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 1234 Street Name, City, Country</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li><a href="#" aria-label="Facebook">Facebook</a></li>
            <li><a href="#" aria-label="Twitter">Twitter</a></li>
            <li><a href="#" aria-label="LinkedIn">LinkedIn</a></li>
            <li><a href="#" aria-label="Instagram">Instagram</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LeaseIQ. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
