import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Global stylings
import './styles/theme.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

import App from './App.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
