import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ModePage.css';

function Breathing478() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const audioRef = useRef(new Audio('https://www.soundjay.com/button/beep-07.wav'));

  const phases = {
    inhale: { next: 'holdIn', message: 'Inhale', duration: 4 },
    holdIn: { next: 'exhale', message: 'Hold', duration: 7 },
    exhale: { next: 'inhale', message: 'Exhale', duration: 8 }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
            const nextPhase = phases[phase].next;
            setPhase(nextPhase);
            return phases[nextPhase].duration;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  const handleStart = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setTimeLeft(phases.inhale.duration);
      setPhase('inhale');
    }
  };

  const getAnimationClass = () => {
    if (!isActive) return '';
    switch (phase) {
      case 'inhale': return 'expanding';
      case 'holdIn': return 'expanded';
      case 'exhale': return 'contracting';
      default: return 'contracted';
    }
  };

  return (
    <div className="mode-page box-breathing">
      <div className="mode-navigation">
        <button className="back-button" onClick={() => navigate('/')}>← Back</button>
      </div>

      <div className="breathing-content">
        <h1>4-7-8 Breathing</h1>
        <p className="breathing-info">Inhale (4s) → Hold (7s) → Exhale (8s)</p>
        
        <div className="animation-container">
          <div 
            className={`breathing-box ${getAnimationClass()}`} 
            style={{ 
              '--animation-duration': `${phases[phase].duration}s`,
              transition: `all ${phases[phase].duration}s ease-in-out`
            }} 
          />
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

export default Breathing478;
