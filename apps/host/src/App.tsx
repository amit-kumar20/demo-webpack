import React, { Suspense, lazy, FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ToastWrapper } from './components/ToastWrapper';
import useCustomToast from '@shared-utils/hooks/useCustomToast';
import { store, setUser } from '@shared-utils';
import authApi from '@shared-utils/api/authApi';
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

interface RootState {
  auth: {
    user: any;
    isVerified: boolean;
  };
}

const AppContent: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showErrorToast } = useCustomToast();
  const [isLoading, setIsLoading] = React.useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthPage = window.location.pathname.startsWith('/auth');

  useEffect(() => {
    const initializeAuth = () => {
      setIsLoading(true);
      // Initialize auth from localStorage
      authApi.initializeAuth();
      setIsLoading(false);
    };

    // Only initialize auth when component mounts
    initializeAuth();
  }, []);

  // Protect routes that require authentication
  if (!isAuthPage && !user) {
    navigate('/auth');
    return null;
  }

  // Redirect to home if already logged in and trying to access auth pages
  if (isAuthPage && user) {
    navigate('/');
    return null;
  }

  // Protected route wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (isLoading) return <div className="loading">Verifying authentication...</div>;
    if (!user && !isAuthPage) return <Navigate to="/auth" replace />;
    return <>{children}</>;
  };

  return (
    <div className="app-container">
      <Navbar />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/ticket" element={
            <ProtectedRoute>
              <Ticket />
            </ProtectedRoute>
          } />
          <Route path="/ticket/mine" element={
            <ProtectedRoute>
              <MyTicketsWrapper />
            </ProtectedRoute>
          } />
          <Route path="/notification" element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AnalyticsDashboard />
            </ProtectedRoute>
          } />
          <Route path="/help" element={
            <ProtectedRoute>
              <HelpCenter />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const App: FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastWrapper>
          <Router>
            <AppContent />
          </Router>
        </ToastWrapper>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
