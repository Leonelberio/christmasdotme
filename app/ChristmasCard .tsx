/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Confetti from "react-confetti";

type TemplateKey = "template1" | "template2" | "template3" | "template4";

const ChristmasCard = () => {
  const [name, setName] = useState("");
  const [template, setTemplate] = useState<TemplateKey>("template1");
  const [showConfetti, setShowConfetti] = useState(false);
  const [, setTimeLeft] = useState("");
  const [timeToMidnight, setTimeToMidnight] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [, setConfettiConfig] = useState({ width: 0, height: 0 });

  // Ensure Confetti covers the entire screen
  useEffect(() => {
    const updateConfettiConfig = () => {
      setConfettiConfig({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateConfettiConfig(); // Set initial dimensions
    window.addEventListener("resize", updateConfettiConfig); // Adjust on resize

    return () => window.removeEventListener("resize", updateConfettiConfig);
  }, []);
  // Countdown Timer Logic for Christmas
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const christmas = new Date(now.getFullYear(), 11, 25); // December 25
      const timeDiff = christmas.getTime() - now.getTime();

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        setTimeLeft(`${days} jours avant Noël ! 🎅`);
      } else {
        setTimeLeft("Joyeux Noël ! 🎄");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Countdown Timer Logic for Midnight
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0
      ); // Next midnight
      const timeDiff = midnight.getTime() - now.getTime();

      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      setTimeToMidnight(
        `Il reste ${hours}h ${minutes}m ${seconds}s pour tes souhaits ✨`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle Download with Confetti and Fireworks
  const handleDownload = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false); // Stop Confetti after 5 seconds
    }, 10000);
    const preview = document.getElementById("preview");

    if (preview) {
      html2canvas(preview, {
        scale: 2,
        useCORS: true, // Allow cross-origin images
        allowTaint: true, // Prevent image tainting
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "ChristmasCard.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
      });
    }
  };

  // Handle Share
  const handleShare = async () => {
    const preview = document.getElementById("preview");
    if (preview) {
      const shareText = `Cher(e) ${name}, je passe par ce présent te souhaiter un merveilleux Noël rempli de joie, d'amour et de bonheur. 🎄🎁✨
      
Créez aussi votre carte personnalisée pour vos amis sur : https://christmas.lesprosdelatech.com`;

      html2canvas(preview, { scale: 2 }).then(async (canvas) => {
        const dataUrl = canvas.toDataURL("image/png");
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "ChristmasCard.png", {
          type: "image/png",
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator
            .share({
              files: [file],
              title: "Joyeux Noël !",
              text: shareText,
            })
            .then(() => console.log("Shared successfully!"))
            .catch((error) => console.error("Sharing failed:", error));
        } else {
          alert(
            "Le partage n’est pas pris en charge par votre appareil ou navigateur."
          );
        }
      });
    }
  };

  // Handle Music Toggle
  const handleMusicToggle = () => {
    const audio = document.getElementById(
      "background-music"
    ) as HTMLAudioElement;
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setMusicPlaying(!musicPlaying);
  };

  // Template Styles
  const templates: Record<
    TemplateKey,
    {
      image: string;
      nameStyle: React.CSSProperties;
      paragraphStyle: React.CSSProperties;
    }
  > = {
    template1: {
      image: "/template1.png",
      nameStyle: {
        width: "80%",
        position: "absolute",
        top: "42%",
        left: "10%",
        display: "flex",
        justifyContent: "flex-end",
        fontSize: "24px",
        fontFamily: "Montserrat, sans-serif",
        color: "#ff0000",
      },
      paragraphStyle: {
        width: "60%",
        position: "absolute",
        top: "51%",
        right: "10%",
        display: "flex",
        justifyContent: "flex-end",
        fontSize: "15px",
        fontFamily: "Montserrat, sans-serif",
        color: "#333",
        textAlign: "right",
      },
    },
    template2: {
      image: "/template2.png",
      nameStyle: {
        width: "80%",
        position: "absolute",
        top: "54%",
        left: "10%",
        display: "flex",
        justifyContent: "flex-start",
        fontSize: "24px",
        fontFamily: "Montserrat, sans-serif",
        color: "#006400",
      },
      paragraphStyle: {
        width: "60%",
        position: "absolute",
        top: "63%",
        left: "10%",
        display: "flex",
        justifyContent: "flex-start",
        fontSize: "15px",
        fontFamily: "Montserrat, sans-serif",
        color: "#333",
        textAlign: "left",
      },
    },
    template3: {
      image: "/template3.png",
      nameStyle: {
        width: "80%",
        position: "absolute",
        top: "52%",
        left: "10%",
        display: "flex",
        justifyContent: "center",
        fontSize: "24px",
        fontFamily: "Montserrat, sans-serif",
        color: "#FFD700",
      },
      paragraphStyle: {
        width: "60%",
        position: "absolute",
        top: "61%",
        left: "20%",
        display: "flex",
        justifyContent: "center",
        fontSize: "15px",
        fontFamily: "Montserrat, sans-serif",
        color: "#fff",
        textAlign: "center",
      },
    },
    template4: {
      image: "/template4.png",
      nameStyle: {
        width: "80%",
        position: "absolute",
        top: "37%",
        left: "10%",
        display: "flex",
        justifyContent: "center",
        fontSize: "24px",
        fontFamily: "Montserrat, sans-serif",
        color: "#FFD700",
      },
      paragraphStyle: {
        width: "60%",
        position: "absolute",
        top: "47%",
        left: "20%",
        display: "flex",
        justifyContent: "center",
        fontSize: "15px",
        fontFamily: "Montserrat, sans-serif",
        color: "#FFFFFF",
        textAlign: "center",
      },
    },
  };

  const currentTemplate = templates[template];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative">
      {/* Background Snowfall Effect */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: "url(/snow03.gif)",
          backgroundRepeat: "repeat-x",
          backgroundSize: "contain",
          opacity: 0.2,
        }}
      ></div>

      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}

      {/* Countdown Timer */}
      <p className="text-yellow-400 text-lg font-bold mb-4">{timeToMidnight}</p>

      {/* Title */}
      <h1 className="text-5xl font-bold text-center mb-8 animate-bounce">
        Joyeux Noël 2024! 🎄
      </h1>

      {/* Background Music */}
      <button
        onClick={handleMusicToggle}
        className="bg-gradient-to-r from-blue-500 to-purple-600 py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity mb-4"
      >
        {musicPlaying ? "🔇 Stop Music" : "🎵 Play Music"}
      </button>
      <audio id="background-music" src="/jingle-bells.mp3" loop></audio>

      {/* Template Switcher */}
      <div className="mb-4">
        <p className="mb-2">Choisissez un modèle :</p>
        <div className="flex space-x-4">
          {Object.keys(templates).map((key) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="radio"
                name="template"
                value={key}
                checked={template === key}
                onChange={(e) => setTemplate(e.target.value as TemplateKey)}
                className="accent-red-500"
              />
              <span>{`Modèle ${key.slice(-1)}`}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Main Card Container */}
      <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl glowing-border">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Votre nom</label>
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
            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Partager
            </button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div
        id="preview"
        className="relative mt-8 max-w-md w-full bg-black overflow-hidden shadow-xl"
        style={{ aspectRatio: "1 / 1" }}
      >
        <img
          src={currentTemplate.image}
          alt="Christmas Background"
          className="w-full h-full object-cover"
        />

        {/* Name Overlay */}
        {name && <div style={currentTemplate.nameStyle}>{name}</div>}

        {/* Paragraph */}
        {name ? (
          <div style={currentTemplate.paragraphStyle}>
            Cher(e) {name}, je passe par ce présent te souhaiter un merveilleux
            Noël rempli de joie, d&apos;amour et de bonheur. 🎄🎁✨
          </div>
        ) : (
          <div style={currentTemplate.paragraphStyle}>
            Joyeux Noël à tous ! Que votre journée soit remplie de bonheur et de
            magie. 🎄🎁✨
          </div>
        )}
      </div>
      <footer className="bg-gray-900 text-white py-4 flex flex-col items-center pt-6">
        <p className="mb-2">© 2024 Christmas.me. Tous droits réservés.</p>
        <div className="flex items-center space-x-4">
          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/leoneladagbe/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex items-center"
          >
            Connectez-vous avec moi sur LinkedIn
          </a>
          {/* GitHub Link */}
          <a
            href="https://github.com/Leonelberio/christmasdotme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.045c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.47-2.381 1.236-3.221-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.484 11.484 0 0 1 3.004-.404 11.48 11.48 0 0 1 3.004.404c2.293-1.552 3.301-1.23 3.301-1.23.653 1.653.24 2.873.118 3.176.768.84 1.236 1.911 1.236 3.221 0 4.61-2.807 5.623-5.479 5.92.43.372.823 1.102.823 2.222v3.293c0 .319.217.694.824.576C20.565 22.092 24 17.593 24 12.297c0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="ml-2">GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ChristmasCard;
