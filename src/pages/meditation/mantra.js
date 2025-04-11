import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ModePage.css';

function MantraMeditation() {
  const navigate = useNavigate();
  const [customMantra, setCustomMantra] = useState('');
  const presetMantras = [
    { text: 'Om Shanti Om', meaning: 'Peace Within and Without' },
    { text: 'So Hum', meaning: 'I am That' },
    { text: 'Om Mani Padme Hum', meaning: 'The Jewel in the Lotus' }
  ];

  return (
    <div className="mode-page">
      <button className="back-button" onClick={() => navigate('/')}>← Back</button>
      <h1>🕉️ Mantra Meditation</h1>
      <div className="mantra-section">
        <div className="preset-mantras">
          {presetMantras.map((mantra, index) => (
            <div key={index} className="mantra-card">
              <h3>{mantra.text}</h3>
              <p>{mantra.meaning}</p>
              <button className="start-button">Practice This Mantra</button>
            </div>
          ))}
        </div>
        <div className="custom-mantra">
          <h3>Create Your Own Mantra</h3>
          <input 
            type="text" 
            value={customMantra}
            onChange={(e) => setCustomMantra(e.target.value)}
            placeholder="Enter your mantra"
          />
          <button className="start-button">Start Practice</button>
        </div>
      </div>
    </div>
  );
}

export default MantraMeditation;
