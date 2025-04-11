import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ModePage.css';

function FocusMode() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  return (
    <div className="mode-page">
      <button className="back-button" onClick={() => navigate('/')}>← Back</button>
      <h1>⏱️ Focus Mode</h1>
      <div className="pomodoro-timer">
        <div className="timer-display">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        <div className="timer-controls">
          <button onClick={() => setIsActive(!isActive)}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={() => setTimeLeft(25 * 60)}>Reset</button>
        </div>
        <p>{isBreak ? 'Break Time' : 'Focus Time'}</p>
      </div>
    </div>
  );
}

export default FocusMode;
