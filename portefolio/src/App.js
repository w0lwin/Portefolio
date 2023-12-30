import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return (
    <Router>
      <div className={`transition-all duration-1000 ${darkMode ? 'bg-dark text-dark-light' : 'bg-dark-light text-dark'}`}>
      <div className="checkbox-container">
  <label className="checkbox-label" style={{ color: darkMode ? 'white' : 'black' }}>
    <div className="checkbox-text">Dark</div>
    <input
      type="checkbox"
      checked={darkMode}
      onChange={() => setDarkMode(true)}
    />
    <div className="fake-checkbox"></div>
  </label>
  <label className="checkbox-label" style={{ color: darkMode ? 'white' : 'black' }}>
    <div className="checkbox-text">Light</div>
    <input
      type="checkbox"
      checked={!darkMode}
      onChange={() => setDarkMode(false)}
    />
    <div className="fake-checkbox"></div>
  </label>
</div>






        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
