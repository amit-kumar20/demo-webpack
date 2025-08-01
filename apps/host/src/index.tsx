import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

async function bootstrap() {
  const { store } = await import('shared/remoteStore');
  const container = document.getElementById('root');
  if (!container) throw new Error('Root element not found');

  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

bootstrap();
