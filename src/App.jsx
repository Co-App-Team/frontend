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
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <AnimatePresence>
      <Routes>
        {/* Unprotected routes */}
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
        <Route
          path="/demo"
          element={<DemoPage />}
        />

        <Route
          path="/demo"
          element={<DemoPage />}
        />

        {/* Unprotected routes with app header */}
        <Route element={<GlobalNavbar />}>
          {/* Not found page for non mapped routings, must not be grouped under */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />

          {/* Rate My Co-op Screen. TODO: Move to protected route once authentication is implemented */}
          <Route
            path="rate-my-co-op"
            element={<RateMyCoop />}
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
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
