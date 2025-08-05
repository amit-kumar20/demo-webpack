import React, { Suspense, lazy, FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ToastWrapper } from './components/ToastWrapper';
import useCustomToast from '@shared-utils/hooks/useCustomToast';
import { store, setUser } from '@shared-utils';
import authApi from '@shared-utils/api/authApi';
import { shouldVerifyToken, clearLoggedIn } from '@shared-utils/utils/auth';
import Navbar from './Navbar';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import HelpCenter from './pages/HelpCenter';
import Home from './pages/Home';
import './App.css';

const Auth = lazy(() => import("auth/Auth"));
const Ticket = lazy(() => import("ticket/Ticket"));
const Notification = lazy(() => import("notification/Notification"));

const MyTicketsWrapper = lazy(async () => {
  const [{ default: MyTickets }, { default: store }] = await Promise.all([
    import("ticket/MyTickets"),
    import("ticket/store"),
  ]);
  const { Provider } = await import("react-redux");

  return {
    default: () => (
      <Provider store={store}>
        <MyTickets />
      </Provider>
    ),
  };
});

const queryClient = new QueryClient();

const AppContent: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showErrorToast } = useCustomToast();
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    console.log('AppContent Redux state:', { auth: { user } });
  }, [user]);

  const handleAuthError = (error: any) => {
    console.error('Auth error:', error);
    dispatch(setUser(null));
    clearLoggedIn();
    
    if (error.response?.status === 401) {
      console.log('Session expired or invalid token');
      navigate('/auth');
    } else if (error.response?.status === 403) {
      console.log('Access forbidden');
      showErrorToast('Access denied');
    } else {
      console.log('Authentication error');
      showErrorToast('Authentication failed');
    }
  };

  useEffect(() => {
    // Only verify token if user might be logged in
    const verifyAuth = async () => {
      if (!shouldVerifyToken()) {
        console.log('Skipping token verification - no login indicator');
        return;
      }

      try {
        const response = await authApi.verifyToken();
        if (response.success && response.data) {
          dispatch(setUser(response.data));
          console.log('Verified and dispatched user to Redux store');
        } else {
          handleAuthError(new Error(response.message || 'Token verification failed'));
        }
      } catch (error: any) {
        handleAuthError(error);
      }
    };

    verifyAuth();
  }, [dispatch]);

  useEffect(() => {
    console.log('AppContent user state:', user);
  }, [user]);

  return (
    <div className="app-container">
      <Navbar />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/ticket/mine" element={<MyTicketsWrapper />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/dashboard" element={<AnalyticsDashboard />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastWrapper>
        <Router>
          <AppContent />
        </Router>
      </ToastWrapper>
    </QueryClientProvider>
  );
};

export default App;
