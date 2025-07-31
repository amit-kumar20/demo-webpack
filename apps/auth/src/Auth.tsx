import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@shared-utils/store';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';

const Auth: React.FC = () => {
  const location = useLocation();
  const isRootPath = location.pathname === '/auth' || location.pathname === '/auth/';

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            {isRootPath && <Route path="/" element={<Navigate to="signin" replace />} />}
          </Routes>
        </div>
      </div>
    </Provider>
  );
};

export default Auth;
