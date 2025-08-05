import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser } from '@shared-utils/store/authSlice';
import authApi from '@shared-utils/api/authApi';
import useCustomToast from '@shared-utils/hooks/useCustomToast';
import { RootState } from '@shared-utils/store';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      
      navigate(`/ticket/mine?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const { showSuccessToast, showErrorToast } = useCustomToast();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      // Clear Redux state
      dispatch(setUser(null));
      // Show success message
      showSuccessToast('Logged out successfully');
      // Redirect to login
      navigate('/auth');
    } catch (error) {
      showErrorToast('Logout failed. Please try again.');
      // Still clear local state even if API call fails
      dispatch(setUser(null));
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="/telus-logo.jpg" alt="Telus Logo" className="logo" />
        </Link>
      </div>
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/ticket">Submit Ticket</Link></li>
        <li><Link to="/ticket/mine">My Tickets</Link></li>
        <li><Link to="/notification">Notification</Link></li>
      </ul>
      <div className="nav-search">
        <input
          type="text"
          placeholder="Search"
          className="nav-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="nav-search-btn" onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 
              1.415-1.414l-3.85-3.85zM6.5 11a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
          </svg>
        </button>
      </div>
      <div className="user-profile">
        {user ? (
          <div className="user-menu">
            <div 
              className="user-icon" 
              onClick={() => setShowDropdown(!showDropdown)}
              title={user.full_name}
            >
              {user.full_name.split(' ').map((name: string) => name[0]).join('').toUpperCase()}
            </div>
            {showDropdown && (
              <div className="dropdown show" ref={dropdownRef}>
                <div className="dropdown-header">
                  <strong>{user.full_name}</strong>
                  <small>{user.email}</small>
                  <small>Role: {user.role}</small>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item">
                  <i className="fas fa-user"></i> Profile Settings
                </Link>
                <Link to="/notification" className="dropdown-item">
                  <i className="fas fa-bell"></i> Notifications
                </Link>
                <div className="dropdown-divider"></div>
                <a onClick={handleLogout} className="dropdown-item">
                  <i className="fas fa-sign-out-alt"></i> Sign Out
                </a>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth" className="nav-link">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
