import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ModePage.css';

function ResonanceBreathing() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="mode-page">
      <button className="back-button" onClick={() => navigate('/')}>← Back</button>
      <h1>〰️ Resonance Breathing</h1>
      <div className="breathing-exercise">
        <div className={`breathing-circle ${isActive ? 'animate' : ''}`}>
          <div className="timer">5.5s</div>
        </div>
        <button className="start-button" onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Stop' : 'Start'} Exercise
        </button>
      </div>
    </div>
  );
}

export default ResonanceBreathing;
