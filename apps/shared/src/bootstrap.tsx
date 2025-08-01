import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

// Initialize the shared module
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <div>
        Shared App - This page intentionally left blank.
        The shared app exists only to expose components, hooks, and utilities.
      </div>
    </Provider>
  );
}
