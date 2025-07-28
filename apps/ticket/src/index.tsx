import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Ticket from './Ticket';
import MyTickets from './MyTickets';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ticket/submit" />} />
        <Route path="/ticket/submit" element={<Ticket />} />
        <Route path="/ticket/mine" element={<MyTickets />} />
        <Route path="*" element={<div style={{ padding: 20 }}>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
