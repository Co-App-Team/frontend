import './App.css';
import { useAuthContext } from './contexts/AuthContext.js';

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      {isLoggedIn ? (
        // TODO: Replace with actual logged-in content
        <h2>Logged In</h2>
      ) : (
        // TODO: Replace with actual logged-out content
        <h2>Not Logged In</h2>
      )}
    </>
  );
}

export default App;
