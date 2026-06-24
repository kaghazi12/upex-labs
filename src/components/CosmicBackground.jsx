import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export const CosmicBackground = () => {
  const { isDarkMode } = useTheme();
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    // Generate static stars
    const newStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: `${Math.random() * 2 + 1}px`,
      animationDelay: `${Math.random() * 3}s`,
    }));
    setStars(newStars);

    // Generate meteors
    const newMeteors = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      animationDelay: `${Math.random() * 5 + 0.2}s`,
      animationDuration: `${Math.random() * 8 + 4}s`,
    }));
    setMeteors(newMeteors);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-background">
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="star animate-pulse-subtle"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.animationDelay,
            opacity: isDarkMode ? 0.7 : 0.3,
          }}
        />
      ))}
      
      {meteors.map((meteor) => (
        <div
          key={`meteor-${meteor.id}`}
          className="meteor animate-meteor"
          style={{
            left: meteor.left,
            top: meteor.top,
            width: '100px',
            height: '2px',
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
            opacity: isDarkMode ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
};
