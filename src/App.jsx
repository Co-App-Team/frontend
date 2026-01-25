import './App.css';
import LoginPage from './components/LoginPage.jsx';
import { useAuthContext } from './contexts/AuthContext.js';

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      {isLoggedIn ? (
        // TODO: Replace with actual logged-in content
        <h2>Logged In</h2>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
