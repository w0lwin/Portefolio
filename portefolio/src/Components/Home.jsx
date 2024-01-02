import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Pixel3DAnimation from './Pixel3DAnimation';
import ProjectList from './ProjectList';
import About from './About';
import ButtonContact from './ButtonContact';

const Home = ({ darkMode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // Augmenter le délai pour une meilleure expérience utilisateur
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (buttonName) => {
    setActiveButton(buttonName);
  };

  const textColorClass = darkMode ? 'text-white' : 'text-black';
  const infosClass = darkMode ? 'dark-infos' : '';

  const projectList = [
    { name: "Starpeggio", year: "2023", category: "Commission", subcategory: "Special" },
    { name: "BNN Online Store", year: "2023", category: "Commission", subcategory: "Corporate" },
    { name: "BNN Online Store", year: "2023", category: "Commission", subcategory: "Corporate" },
    { name: "BNN Online Store", year: "2023", category: "Commission", subcategory: "Corporate" },
    { name: "BNN Online Store", year: "2023", category: "Commission", subcategory: "Corporate" },
    { name: "BNN Online Store", year: "2023", category: "Commission", subcategory: "Corporate" },
    { name: "BNN Online Store", year: "2023", category: "Commission", subcategory: "Corporate" },
    { name: "BNN Online Store", year: "2023", category: "Commission", subcategory: "Corporate" },
    { name: "BNN Online Store", year: "2023", category: "Commission", subcategory: "Corporate" },
    
  ];
  
  if (isLoading) return <Loading />;

  return (
    <div className={`relative border transition-all duration-500 ${darkMode ? 'border' : 'dark-border'}`}>
      <Pixel3DAnimation isDarkTheme={darkMode}/>
      {activeButton === 'projets' && <ProjectList projects={projectList} />}
      {activeButton === 'about' && <About />}
      <div className='contact-section'>
        {activeButton === 'contact' && <ButtonContact link="https://www.linkedin.com/in/t%C3%A9o-bacher-9667ba210/" name='linkedin'/>}
        {activeButton === 'contact' && <ButtonContact link="https://www.instagram.com/teo.bacher/" name='instagram'/>}
      </div>
     

      <div className={`infos absolute top-0 left-0 right-0 text-center transition-all duration-500 ${infosClass}`} style={{ zIndex: 2, margin: '4vh' }}>
        <h1 className={`text-3xl transition-all duration-500 ${textColorClass} font-bold`}>Téo Bacher</h1>
        <h6 className={`transition-all duration-500 ${textColorClass} text-sm`}>Développeur fullstack</h6>
        <div className="infos mt-4">
          {['home', 'projets', 'about', 'contact'].map((button) => (
            <button key={button} onClick={() => handleNavigation(button)}>
              {button === activeButton ? <span>•</span> : button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
