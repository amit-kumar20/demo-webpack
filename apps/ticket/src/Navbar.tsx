
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link
        to="/ticket/submit"
        className={location.pathname === '/ticket/submit' ? 'active' : ''}
      >
        Submit Ticket
      </Link>
      <Link
        to="/ticket/mine"
        className={location.pathname === '/ticket/mine' ? 'active' : ''}
      >
        My Tickets
      </Link>
    </nav>
  );
};

export default Navbar;
