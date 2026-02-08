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

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <>
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
    </>
  );
}

export default App;
