import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Global stylings
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/theme.scss';
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
