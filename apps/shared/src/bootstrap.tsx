import React from 'react';
import { createRoot } from 'react-dom/client';

// Initialize the shared module
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <div>
      Shared App - This page intentionally left blank.
      The shared app exists only to expose components, hooks, and utilities.
    </div>
  );
}
