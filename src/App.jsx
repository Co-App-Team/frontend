import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuthContext } from './contexts/AuthContext.js';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import GlobalNavbar from './components/common/GlobalNavbar.jsx';
import RateMyCoop from './pages/RateMyCoop.jsx';
import ConfirmEmailPage from './pages/ConfirmEmailPage.jsx';
import DemoPage from './pages/DemoPage.jsx';
import { AnimatePresence } from 'framer-motion';
import AccountPage from './pages/AccountPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import PreAuthRoute from './components/PreAuthRoute.jsx';

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <AnimatePresence>
      <Routes>
        {/* Globally accessible routes */}
        <Route
          path="/demo"
          element={<DemoPage />}
        />

        {/* Globally accessible routes with app header */}
        <Route element={<GlobalNavbar />}>
          {/* Not found page for non mapped routings, must not be grouped under */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>

        {/* Unprotected routes that require the user be unauthenticated to access (blocks access if logged in) */}
        <Route element={<PreAuthRoute isAuthenticated={isLoggedIn} />}>
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/signup"
            element={<SignupPage />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            path="/reset-password"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/confirm-email"
            element={<ConfirmEmailPage />}
          />
        </Route>

        {/* Protected (requires auth) routes */}
        <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} />}>
          {/* Protected routes with app header */}
          <Route element={<GlobalNavbar />}>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              element={<AccountPage />}
              path="/account"
            />
            <Route
              path="rate-my-co-op"
              element={<RateMyCoop />}
            />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
