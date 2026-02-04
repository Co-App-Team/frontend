import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import GlobalNavbar from './components/common/GlobalNavbar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <GlobalNavbar></GlobalNavbar>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
