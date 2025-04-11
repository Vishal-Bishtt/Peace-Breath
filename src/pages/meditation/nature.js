import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ModePage.css';

function NatureMeditation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(new Audio('https://www.soundjay.com/button/beep-07.wav'));
  const ambientSoundRef = useRef(new Audio('/nature-sounds/forest-ambient.mp3'));

  const natureSteps = [
    {
      title: "Settle into Nature",
      instructions: "Find a quiet spot. Sit or lie down comfortably.\nClose your eyes and take a few deep breaths.\nLet the sound of nature gently fill your awareness.",
      duration: 30,
      ambientSound: "forest"
    },
    {
      title: "Focus on the Environment",
      instructions: "Imagine yourself in nature — a forest, by the sea, or on a mountain.\nListen closely to each sound: birds chirping, leaves rustling, waves crashing.\nLet the sounds guide you deeper into calm.",
      duration: 90,
      ambientSound: "birds"
    },
    {
      title: "Connect with Your Breath",
      instructions: "Breathe in slowly… and breathe out fully.\nAs you breathe, imagine you're inhaling the fresh air of this natural place.\nWith every exhale, release tension and distractions.",
      duration: 120,
      ambientSound: "waves"
    },
    {
      title: "Feel Grounded",
      instructions: "Visualize the ground beneath you — solid, calm, safe.\nFeel your body connected to the earth.\nLet the natural world hold you gently.",
      duration: 120,
      ambientSound: "rain"
    },
    {
      title: "Be Present with Nature",
      instructions: "Let thoughts drift by like passing clouds.\nReturn your focus to the gentle rhythm of nature.\nLet it wash over you and bring you peace.",
      duration: 120,
      ambientSound: "stream"
    },
    {
      title: "Return Gently",
      instructions: "Slowly bring your awareness back to your surroundings.\nTake a few deep breaths… feel your body…\nWhen you're ready, open your eyes — calm and refreshed.",
      duration: 60,
      ambientSound: "soft"
    },
    {
      title: "✨ Session Complete",
      instructions: "Carry this sense of connection and calm into the rest of your day. 🌳",
      duration: 0,
      ambientSound: null
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
      ambientSoundRef.current.pause();
    }
    return () => {
      clearInterval(interval);
      ambientSoundRef.current.pause();
    };
  }, [isActive, timeLeft]);

  const handleNext = () => {
    if (currentStep < natureSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeLeft(natureSteps[currentStep + 1].duration);
      setIsActive(true);
      
      // Change ambient sound
      if (natureSteps[currentStep + 1].ambientSound) {
        ambientSoundRef.current.src = `/nature-sounds/${natureSteps[currentStep + 1].ambientSound}.mp3`;
        ambientSoundRef.current.loop = true;
        ambientSoundRef.current.volume = 0.3;
        ambientSoundRef.current.play().catch(e => console.log('Ambient sound failed:', e));
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mode-page nature-meditation">
      <div className="mode-navigation">
        <button className="back-button" onClick={() => {
          ambientSoundRef.current.pause();
          navigate('/');
        }}>← Back</button>
      </div>
      
      <div className="meditation-guide">
        <h2>{natureSteps[currentStep].title}</h2>
        {timeLeft > 0 && (
          <div className="timer">
            {formatTime(timeLeft)}
          </div>
        )}
        <div className="instructions">
          {natureSteps[currentStep].instructions.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        {currentStep < natureSteps.length - 1 && (
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

export default NatureMeditation;
