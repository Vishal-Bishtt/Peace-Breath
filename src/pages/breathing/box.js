import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ModePage.css';

function BoxBreathing() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [duration, setDuration] = useState(4);
  const [timeLeft, setTimeLeft] = useState(duration);
  const audioRef = useRef(new Audio('https://www.soundjay.com/button/beep-07.wav'));

  const phases = {
    inhale: { next: 'holdIn', message: 'Inhale' },
    holdIn: { next: 'exhale', message: 'Hold' },
    exhale: { next: 'holdOut', message: 'Exhale' },
    holdOut: { next: 'inhale', message: 'Hold' }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
            setPhase(phases[phase].next);
            return duration;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase, duration]);

  const handleStart = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setTimeLeft(duration);
      setPhase('inhale');
    }
  };

  const getAnimationClass = () => {
    if (!isActive) return '';
    switch (phase) {
      case 'inhale': return 'expanding';
      case 'holdIn': return 'expanded';
      case 'exhale': return 'contracting';
      case 'holdOut': return 'contracted';
      default: return '';
    }
  };

  return (
    <div className="mode-page box-breathing">
      <div className="mode-navigation">
        <button className="back-button" onClick={() => navigate('/')}>← Back</button>
      </div>

      <div className="breathing-content">
        <h1>Box Breathing</h1>
        
        <div className="duration-selector">
          <label>Select Duration (seconds):</label>
          <select 
            value={duration} 
            onChange={(e) => setDuration(Number(e.target.value))}
            disabled={isActive}
          >
            <option value={4}>4-4-4-4 (Default)</option>
            <option value={5}>5-5-5-5 (Intermediate)</option>
            <option value={6}>6-6-6-6 (Advanced)</option>
          </select>
        </div>

        <div className="animation-container">
          <div className={`breathing-box ${getAnimationClass()}`} />
          <div className="phase-text">{phases[phase].message}</div>
          <div className="timer">{timeLeft}</div>
        </div>

        <button 
          className={`control-button ${isActive ? 'active' : ''}`} 
          onClick={handleStart}
        >
          {isActive ? 'Stop' : 'Start'} Breathing
        </button>
      </div>
    </div>
  );
}

export default BoxBreathing;
