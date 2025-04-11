import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ModePage.css';

function ChakraMeditation() {
  const navigate = useNavigate();
  const chakras = [
    { name: 'Root', color: '#FF0000', frequency: '432 Hz' },
    { name: 'Sacral', color: '#FFA500', frequency: '417 Hz' },
    { name: 'Solar Plexus', color: '#FFFF00', frequency: '528 Hz' },
    { name: 'Heart', color: '#00FF00', frequency: '639 Hz' },
    { name: 'Throat', color: '#0000FF', frequency: '741 Hz' },
    { name: 'Third Eye', color: '#4B0082', frequency: '852 Hz' },
    { name: 'Crown', color: '#9400D3', frequency: '963 Hz' }
  ];

  return (
    <div className="mode-page">
      <div className="mode-navigation">
        <button className="back-button" onClick={() => navigate('/')}>← Back</button>
      </div>
      <div className="chakra-grid">
        {chakras.map((chakra, index) => (
          <div 
            key={index} 
            className="chakra-card"
            style={{ backgroundColor: chakra.color + '20' }}
          >
            <h3>{chakra.name} Chakra</h3>
            <p>Frequency: {chakra.frequency}</p>
            <button className="start-button">Begin Healing</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChakraMeditation;
