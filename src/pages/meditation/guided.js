import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ModePage.css';

function GuidedMeditation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(new Audio('https://www.soundjay.com/button/beep-07.wav'));

  const meditationSteps = [
    {
      title: "Get Comfortable",
      instructions: "Sit or lie down in a quiet space. Close your eyes gently. Let your hands rest comfortably.",
      duration: 30
    },
    {
      title: "Focus on Your Breath",
      instructions: "Take a deep breath in... and slowly breathe out.\nInhale through your nose… exhale through your mouth.\nFeel the air entering and leaving your body.",
      duration: 60
    },
    {
      title: "Relax Your Body",
      instructions: "Let your shoulders drop.\nUnclench your jaw.\nFeel the tension melting from your neck, arms, and legs.\nLet your body become heavier with each breath.",
      duration: 90
    },
    {
      title: "Notice Your Thoughts",
      instructions: "If your mind wanders, gently bring your attention back to your breath.\nIt's okay to have thoughts — just notice them and let them pass like clouds in the sky.",
      duration: 120
    },
    {
      title: "Bring in Positivity",
      instructions: "On each inhale, invite calm.\nOn each exhale, release tension.\nRepeat silently: I am calm. I am present.",
      duration: 120
    },
    {
      title: "Slowly Return",
      instructions: "Gently bring awareness back to your body. Wiggle your fingers and toes.\nTake a final deep breath… and when you're ready, open your eyes.",
      duration: 60
    },
    {
      title: "✨ Session Complete",
      instructions: "Take a moment to notice how you feel. Carry this calm energy with you throughout your day.",
      duration: 0
    }
  ];

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleNext = () => {
    if (currentStep < meditationSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeLeft(meditationSteps[currentStep + 1].duration);
      setIsActive(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mode-page">
      <div className="mode-navigation">
        <button className="back-button" onClick={() => navigate('/')}>← Back</button>
      </div>
      
      <div className="meditation-guide">
        <h2>{meditationSteps[currentStep].title}</h2>
        {timeLeft > 0 && (
          <div className="timer">
            {formatTime(timeLeft)}
          </div>
        )}
        <div className="instructions">
          {meditationSteps[currentStep].instructions.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        {currentStep < meditationSteps.length - 1 && (
          <button 
            className="next-button"
            onClick={handleNext}
            disabled={timeLeft > 0}
          >
            Next Step
          </button>
        )}
      </div>
    </div>
  );
}

export default GuidedMeditation;
