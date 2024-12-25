"use client";

import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Confetti from "react-confetti";
import Image from "next/image";

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
        scale: 1,
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
        <Image
          src={currentTemplate.image}
          alt="Christmas Background"
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
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
    </div>
  );
};

export default ChristmasCard;
