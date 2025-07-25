import React, { Suspense, lazy, FC } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; 

const Auth = lazy(() => import('auth/Auth'));
const Ticket = lazy(() => import('ticket/Ticket'));
const Notification = lazy(() => import('notification/Notification'));
const FormValidationExample = lazy(() => import('./components/FormValidationExample'));

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
              <Link to="/ticket">Ticket</Link>
            </li>
            <li>
              <Link to="/notification">Notification</Link>
            </li>
            <li>
              <Link to="/form-validation">Form Validation</Link>
            </li>
          </ul>
        </nav>

        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<div className="home">Home</div>} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/form-validation" element={<FormValidationExample />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
