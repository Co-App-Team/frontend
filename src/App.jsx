import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

function App() {
  const [count, setCount] = useState(0);

  const test = () => {
    // Test eslint: https://eslint.org/docs/latest/rules/no-compare-neg-zero
    if (1 === -0) {
      console.log('This will never happen');
    }
  };

  return (
    <>
      <h1>React Bootstrap Button</h1>
      <Button>I am a bootstrap button</Button>
      <div>
        <a
          href="https://vite.dev"
          target="_blank">
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
