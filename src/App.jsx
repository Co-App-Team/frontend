import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuthContext } from './contexts/AuthContext.js';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';

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

        {/* Not found page for non mapped routings */}
        <Route
          path="*"
          element={<NotFoundPage />}
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
