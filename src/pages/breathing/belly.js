import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ModePage.css';

function BellyBreathing() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="mode-page">
      <button className="back-button" onClick={() => navigate('/')}>← Back</button>
      <h1>🫁 Deep Belly Breathing</h1>
      <div className="breathing-exercise">
        <div className="belly-animation">
          {/* Add belly breathing animation */}
        </div>
        <div className="instructions">
          <p>Place one hand on your chest and the other on your belly</p>
          <p>Breathe deeply into your belly, feeling it expand</p>
          <p>Exhale slowly, feeling your belly fall</p>
        </div>
        <button className="start-button" onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Stop' : 'Start'} Practice
        </button>
      </div>
    </div>
  );
}

export default BellyBreathing;
