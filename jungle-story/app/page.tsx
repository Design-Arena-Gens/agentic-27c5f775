'use client';

import { useState, useEffect } from 'react';

export default function JungleStory() {
  const [scene, setScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenes = [
    {
      text: "Deep in the jungle, a wise old owl sat on a high branch...",
      characters: ['owl'],
      background: 'from-green-900 to-green-700'
    },
    {
      text: "Below, a brave lion roamed through the trees.",
      characters: ['lion'],
      background: 'from-green-800 to-amber-900'
    },
    {
      text: "And a curious rabbit hopped along the forest floor.",
      characters: ['rabbit'],
      background: 'from-green-700 to-emerald-800'
    },
    {
      text: "One day, the rabbit got lost in the thick jungle.",
      characters: ['rabbit'],
      background: 'from-gray-800 to-green-900'
    },
    {
      text: "The owl saw everything from above and flew down to help.",
      characters: ['owl', 'rabbit'],
      background: 'from-blue-900 to-green-800'
    },
    {
      text: "The lion heard the commotion and came to investigate.",
      characters: ['lion', 'owl', 'rabbit'],
      background: 'from-amber-800 to-green-800'
    },
    {
      text: "Together, the owl guided them with wisdom from above...",
      characters: ['owl', 'lion', 'rabbit'],
      background: 'from-purple-900 to-green-700'
    },
    {
      text: "The lion led the way with courage and strength...",
      characters: ['lion', 'owl', 'rabbit'],
      background: 'from-orange-900 to-green-700'
    },
    {
      text: "And the rabbit learned that friends come in all sizes.",
      characters: ['lion', 'owl', 'rabbit'],
      background: 'from-green-600 to-emerald-700'
    },
    {
      text: "From that day on, they were the best of friends in the jungle!",
      characters: ['lion', 'owl', 'rabbit'],
      background: 'from-yellow-600 to-green-600'
    }
  ];

  useEffect(() => {
    if (isPlaying && scene < scenes.length - 1) {
      const timer = setTimeout(() => {
        setScene(scene + 1);
      }, 3500);
      return () => clearTimeout(timer);
    } else if (scene === scenes.length - 1) {
      setIsPlaying(false);
    }
  }, [scene, isPlaying, scenes.length]);

  const startStory = () => {
    setScene(0);
    setIsPlaying(true);
  };

  const nextScene = () => {
    if (scene < scenes.length - 1) {
      setScene(scene + 1);
    }
  };

  const prevScene = () => {
    if (scene > 0) {
      setScene(scene - 1);
    }
  };

  const currentScene = scenes[scene];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-center mb-8 text-amber-400 animate-pulse">
          🌴 The Jungle Friends 🌴
        </h1>

        <div className={`bg-gradient-to-br ${currentScene.background} rounded-3xl shadow-2xl p-8 min-h-[500px] relative overflow-hidden transition-all duration-1000`}>
          {/* Stars/fireflies effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Characters Container */}
          <div className="relative h-64 mb-8 flex items-end justify-center gap-8">
            {currentScene.characters.includes('lion') && (
              <div className="animate-bounce-slow">
                <div className="text-8xl transform hover:scale-110 transition-transform cursor-pointer filter drop-shadow-2xl"
                     style={{ animationDelay: '0s' }}>
                  🦁
                </div>
              </div>
            )}
            {currentScene.characters.includes('rabbit') && (
              <div className="animate-bounce-slow">
                <div className="text-7xl transform hover:scale-110 transition-transform cursor-pointer filter drop-shadow-2xl"
                     style={{ animationDelay: '0.3s' }}>
                  🐰
                </div>
              </div>
            )}
            {currentScene.characters.includes('owl') && (
              <div className="animate-bounce-slow">
                <div className="text-8xl transform hover:scale-110 transition-transform cursor-pointer filter drop-shadow-2xl"
                     style={{ animationDelay: '0.6s' }}>
                  🦉
                </div>
              </div>
            )}
          </div>

          {/* Story Text */}
          <div className="bg-black bg-opacity-50 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-2xl text-white text-center font-medium leading-relaxed animate-fade-in">
              {currentScene.text}
            </p>
          </div>

          {/* Scene Counter */}
          <div className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm">
            <span className="text-white font-bold">{scene + 1} / {scenes.length}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prevScene}
            disabled={scene === 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            ← Previous
          </button>

          {!isPlaying ? (
            <button
              onClick={startStory}
              className="px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              {scene === 0 ? '▶ Start Story' : '▶ Play'}
            </button>
          ) : (
            <button
              onClick={() => setIsPlaying(false)}
              className="px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
            >
              ⏸ Pause
            </button>
          )}

          <button
            onClick={nextScene}
            disabled={scene === scenes.length - 1}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
