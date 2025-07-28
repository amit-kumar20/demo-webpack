import React, { Suspense, lazy, FC } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

const Auth = lazy(() => import('auth/Auth'));
const Ticket = lazy(() => import('ticket/Ticket'));
const MyTickets = lazy(() => import('ticket/MyTickets')); 
const Notification = lazy(() => import('notification/Notification'));

const App: FC = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/auth">Auth</Link>
            </li>
            <li>
              <Link to="/ticket">Submit Ticket</Link>
            </li>
            <li>
              <Link to="/ticket/mine">My Tickets</Link> 
            </li>
            <li>
              <Link to="/notification">Notification</Link>
            </li>
          </ul>
        </nav>

        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<div className="home">Home</div>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/ticket/mine" element={<MyTickets />} /> 
            <Route path="/notification" element={<Notification />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
