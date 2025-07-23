import React, { Suspense, lazy, FC } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Auth = lazy(() => import('auth/Auth'));
const Ticket = lazy(() => import('ticket/Ticket'));
const Notification = lazy(() => import('notification/Notification'));

const App: FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
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
          </ul>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/notification" element={<Notification />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
