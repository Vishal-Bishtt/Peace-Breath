import './App.css';
import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('meditation');
  const [selectedMode, setSelectedMode] = useState(null);

  const meditationModes = [
    { id: 'guided', title: 'Guided Meditation', icon: '🎧', 
      description: 'Guided Meditation helps you relax, focus, and find calm through gentle step-by-step practice' },
    { id: 'nature', title: 'Nature Immersion', icon: '🌳',
      description: 'Relaxing nature sounds including forest, rain, ocean waves, and birds' },
    { id: 'mantra', title: 'Mantra Meditation', icon: '🕉️',
      description: 'Practice meditation with traditional or custom mantras' },
    { id: 'focus', title: 'Focus Mode', icon: '⏱️',
      description: 'Pomodoro technique combined with meditation (25/5 mins cycles)' },
    { id: 'chakra', title: 'Chakra Healing', icon: '🛞',
      description: 'Focus on 7 chakras with corresponding colors and frequencies' },
    { id: 'walking', title: 'Mindful Walking', icon: '🚶',
      description: 'Guided mindfulness while walking with body awareness' }
  ];

  const breathingModes = [
    { id: 'box', title: 'Box Breathing', icon: '⬛',
      description: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s' },
    { id: '478', title: '4-7-8 Breathing', icon: '🌙',
      description: 'Inhale 4s → Hold 7s → Exhale 8s' },
    { id: 'wim', title: 'Wim Hof Method', icon: '❄️',
      description: '30 quick breaths → deep hold → recovery breath' },
    { id: 'nostril', title: 'Alternate Nostril', icon: '👃',
      description: 'Balance energy through alternating nostril breathing' },
    { id: 'resonance', title: 'Resonance Breathing', icon: '〰️',
      description: 'Inhale 5.5s → Exhale 5.5s' },
    { id: 'belly', title: 'Deep Belly Breathing', icon: '🫁',
      description: 'Visual guide for diaphragmatic breathing' }
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleModeSelect = (modeId) => {
    setSelectedMode(modeId);
    navigate(`/${activeSection}/${modeId}`);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className="theme-toggle">
        <button className="theme-toggle-button" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {isHomePage && (
        <header className="meditation-header">
          <div className="header-text">
            <h1>Peace & Breath</h1>
            <p>Your guide to mindfulness and conscious breathing</p>
          </div>
          <div className="section-toggle">
            <button 
              className={activeSection === 'meditation' ? 'active' : ''}
              onClick={() => setActiveSection('meditation')}>
              Meditation Modes
            </button>
            <button 
              className={activeSection === 'breathing' ? 'active' : ''}
              onClick={() => setActiveSection('breathing')}>
              Breathing Modes
            </button>
          </div>
        </header>
      )}

      <main>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <div className="modes-grid">
                {(activeSection === 'meditation' ? meditationModes : breathingModes).map(mode => (
                  <div 
                    key={mode.id} 
                    className={`mode-card ${selectedMode === mode.id ? 'selected' : ''}`}
                    onClick={() => handleModeSelect(mode.id)}>
                    <span className="mode-icon">{mode.icon}</span>
                    <h3>{mode.title}</h3>
                    <p>{mode.description}</p>
                  </div>
                ))}
              </div>
            } />
            {meditationModes.map(mode => (
              <Route 
                key={mode.id}
                path={`/meditation/${mode.id}`} 
                element={
                  <Suspense fallback={<div className="loading">Loading...</div>}>
                    {React.createElement(React.lazy(() => import(`./pages/meditation/${mode.id}`)))}
                  </Suspense>
                }
              />
            ))}
            {breathingModes.map(mode => (
              <Route 
                key={mode.id}
                path={`/breathing/${mode.id}`}
                element={
                  <Suspense fallback={<div className="loading">Loading...</div>}>
                    {React.createElement(React.lazy(() => import(`./pages/breathing/${mode.id}`)))}
                  </Suspense>
                }
              />
            ))}
          </Routes>
        </Suspense>
      </main>
      
      {isHomePage && (
        <footer>
          <p>Practice daily for best results</p>
        </footer>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
