'use client';

import html2canvas from 'html2canvas';
import React, { useState } from 'react';

const ChristmasCard = () => {
  const [name, setName] = useState('');

  const handleDownload = () => {
    const preview = document.getElementById('preview');
    if (preview) {
      // Increase canvas resolution for better quality
      html2canvas(preview, { scale: 2 }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'ChristmasCard.png';
        link.href = canvas.toDataURL('image/png', 1.0); // Ensure PNG format with full quality
        link.click();
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Joyeux Noël 2024!',
          text: `Joyeux Noël, ${name}!`,
          url: window.location.href, // Replace with your app's URL
        })
        .catch((error) => console.error('Error sharing', error));
    } else {
      alert('Sharing is not supported in your browser.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative">
      {/* Background image */}

      <h1 className="text-5xl font-bold text-center mb-8 animate-bounce">
          Joyeux Noël 2024! 🎄
        </h1>
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/particle.gif)',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'contain',
          opacity: 0.2,
        }}
      ></div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
     
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Votre nom
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/20 backdrop-blur focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Entrez votre nom"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Télécharger
            </button>
           
          </div>
        </div>
      </div>

      {/* Preview area */}
      <div
        id="preview"
        className="relative mt-8 max-w-md w-full bg-black overflow-hidden shadow-xl"
        style={{ aspectRatio: '1 / 1' }}
      >
        {/* Background image */}
        <img
          src="/merry-christmas.png" // Replace with your image path
          alt="Christmas Background"
          className="w-full h-full object-cover"
        />

        {/* Name overlay in the red rectangle */}
        {name && (
          <div
            className="absolute"
            style={{
              top: '55%', // Adjust to align with the red rectangle
              left: '50%',
              transform: 'translate(-45%, 60%) rotate(-8deg)', // Add slight rotation
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'white',
              background: 'linear-gradient(to right, #ff4d4d, #ff0000)',
              padding: '4px 10px',
              borderRadius: '2px',
              boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <span className="relative">

            {name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChristmasCard;
