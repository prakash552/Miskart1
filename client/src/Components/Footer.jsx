import React, { useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from 'react-icons/fa';
import '../Styles/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    // Simulate API call or subscription service
    setMessage('Thank you for subscribing! You will receive updates on new products.');
    setEmail('');
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section about">
          <h3>About GiftStore</h3>
          <p>
            GiftStore is your go-to destination for premium gifts, unique collections,
            and delightful surprises for every occasion.
          </p>
          {/* Social Icons */}
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://pinterest.com" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
              <FaPinterestP />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section-contact">
          <h3>Contact Us</h3>
          <p>Email: support@giftstore.com</p>
          <p>Phone: +91 8743821921</p>
          <p>Address: 123, Gift Street, Mumbai, India</p>
        </div>

        {/* Newsletter Subscribe */}
        <div className="footer-section subscribe">
          <h3>Subscribe to Newsletter</h3>
          <form onSubmit={handleSubscribe} className="subscribe-form">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address for newsletter subscription"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage('');
              }}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {message && <p className="subscription-message">{message}</p>}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GiftStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
