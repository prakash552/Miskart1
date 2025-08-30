import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillHome, AiOutlineShoppingCart, AiOutlineUser, AiOutlineInfoCircle } from 'react-icons/ai';
import { MdCategory } from 'react-icons/md';
import { FiLogIn } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useCart } from '../context/CartContext.jsx';
import '../Styles/Navbar.css';
import logo from '../assets/GIFT-LOGO.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  // User login state simulation
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideDropdown);
    return () => document.removeEventListener('mousedown', handleClickOutsideDropdown);
  }, []);

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutsideMenu);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setDropdownOpen(false);
    navigate('/login');
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    navigate('/profile');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Miskart Logo" />
        Miskart
      </div>

    

      {/* New container for hamburger and cart icon */}
      <div className="mobile-controls">
   <NavLink to="/cart" className="mobile-cart-icon" aria-label="Go to Cart">
          <AiOutlineShoppingCart size={26} color="#dba1a1" />
          {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
        </NavLink>
        


        <div
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <GiHamburgerMenu size={24} />
        </div>

       </div>
    

      <ul ref={menuRef} className={`nav-links ${menuOpen ? 'nav-active' : ''}`}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setMenuOpen(false)}
          >
            <AiFillHome className="nav-icon" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setMenuOpen(false)}
          >
            <MdCategory className="nav-icon" /> Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineInfoCircle className="nav-icon" /> About us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineShoppingCart className="nav-icon" /> Cart
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </NavLink>
        </li>

        {user ? (
          <li className="nav-user-dropdown" ref={dropdownRef}>
            <div
              className="nav-link user-name"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setDropdownOpen(!dropdownOpen);
              }}
            >
              <AiOutlineUser className="nav-icon" /> {user.name} &#x25BC;
            </div>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li
                  onClick={handleProfile}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleProfile();
                  }}
                >
                  Edit Profile
                </li>
                <li
                  onClick={handleLogout}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleLogout();
                  }}
                >
                  Logout
                </li>
              </ul>
            )}
          </li>
        ) : (
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setMenuOpen(false)}
            >
              <FiLogIn className="nav-icon" /> Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
