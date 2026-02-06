import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuthContext } from './contexts/AuthContext.js';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import GlobalNavbar from './components/common/GlobalNavbar.jsx';
import RateMyCoop from './pages/RateMyCoop.jsx';
import SignupPage from './pages/SignupPage.jsx';

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <GlobalNavbar />
      <Routes>
        {/* Unprotected routes */}
        <Route
          path="/signup"
          element={<SignupPage />}
        />

        {/* Not found page for non mapped routings */}
        <Route
          path="*"
          element={<NotFoundPage />}
        />

        {/* Rate My Co-op Screen. TODO: Move to protected route once authentication is implemented */}
        <Route
          path="rate-my-co-op"
          element={<RateMyCoop />}
        />

        {/* Protected (requires auth) routes */}
        <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} />}>
          <Route
            path="/"
            element={<HomePage />}
          />
          {/* Add real protected routes here */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
