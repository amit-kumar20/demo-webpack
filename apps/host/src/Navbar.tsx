import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      
      navigate(`/ticket/mine?search=${encodeURIComponent(searchTerm.trim())}`);
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
        <li><Link to="/auth">Auth</Link></li>
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
    </nav>
  );
};

export default Navbar;
