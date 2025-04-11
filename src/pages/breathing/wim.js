import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ModePage.css';

function WimHofMethod() {
  const navigate = useNavigate();
  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState('power-breathing');

  return (
    <div className="mode-page">
      <button className="back-button" onClick={() => navigate('/')}>← Back</button>
      <h1>❄️ Wim Hof Method</h1>
      <div className="wim-hof-exercise">
        <div className="round-info">Round {round}/3</div>
        <div className="phase-display">
          <h2>{phase === 'power-breathing' ? 'Power Breathing' : 
               phase === 'retention' ? 'Breath Retention' : 'Recovery Breath'}</h2>
        </div>
        <button className="start-button">Start Method</button>
      </div>
    </div>
  );
}

export default WimHofMethod;
