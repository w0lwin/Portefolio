// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './Components/Home';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleMode() {
    setDarkMode(!darkMode);
  }

  return (
    <Router>
      <div className={`transition-all duration-1000 ${darkMode ? 'bg-dark text-dark-light' : 'bg-dark-light text-dark'}`}>
        <button
          className={`rounded-md py-2 px-4 ${darkMode ? 'bg-dark-light text-dark' : 'bg-dark text-dark-light'}`}
          onClick={toggleMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <Routes>
          <Route
              path="/"
              element={<Home darkMode={darkMode} />}/>      
          </Routes>
      </div>
    </Router>

  );
}

export default App;
