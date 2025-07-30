import React, { Suspense, lazy, FC } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastWrapper } from './components/ToastWrapper';
import Navbar from "./Navbar";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import HelpCenter from "./pages/HelpCenter";
import Home from "./pages/Home";
import './App.css';

const Auth = lazy(() => import("auth/Auth"));
const Ticket = lazy(() => import("ticket/Ticket"));
const MyTickets = lazy(() => import("ticket/MyTickets"));
const Notification = lazy(() => import("notification/Notification"));

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastWrapper>
        <Router>
          <div className="app-container">
            <Navbar />
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/*" element={<Auth />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/ticket/mine" element={<MyTickets />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/dashboard" element={<AnalyticsDashboard />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ToastWrapper>
    </QueryClientProvider>
  );
};

export default App;
