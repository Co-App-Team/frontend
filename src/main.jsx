import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import GlobalNavBar from './components/common/GlobalNavBar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <GlobalNavBar></GlobalNavBar>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
