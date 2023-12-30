import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Loading from './Components/Loading';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingOpacity, setLoadingOpacity] = useState(1);

  useEffect(() => {
    // Commencer la transition d'opacité pour diminuer
    const fadeOutTimer = setTimeout(() => {
      setLoadingOpacity(0);
    }, 4000);

    // Commencer la transition d'opacité pour augmenter
    const fadeInTimer = setTimeout(() => {
      setLoadingOpacity(1);
    }, 7000);

    // Enlever le loading après la fin de la transition
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(fadeInTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return (
    <Router>
      <div style={{ opacity: loadingOpacity, transition: 'opacity 1s ease' }} 
           className={`App transition-all duration-1000 ${darkMode ? 'bg-dark text-dark-light' : 'bg-dark-light text-dark'}`}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="checkbox-container">
              <label className="checkbox-label" style={{ color: darkMode ? 'white' : 'black' }}>
                <div className="checkbox-text">Dark</div>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="fake-checkbox"></div>
              </label>
              <label className="checkbox-label" style={{ color: darkMode ? 'white' : 'black' }}>
                <div className="checkbox-text">Light</div>
                <input
                  type="checkbox"
                  checked={!darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="fake-checkbox"></div>
              </label>
            </div>
            <Routes>
              <Route path="/" element={<Home darkMode={darkMode} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
