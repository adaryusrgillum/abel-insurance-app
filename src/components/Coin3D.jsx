import React, { useEffect, useRef, useState } from 'react';
import './Coin3D.css';

const Coin3D = ({ size = 200, emblemSrc = '/emblem.png' }) => {
  const [isTossing, setIsTossing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference);
      return () => mediaQuery.removeEventListener('change', updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const handleMouseMove = (event) => {
      if (isTossing || !containerRef.current) {
        return;
      }

      const xAxis = (window.innerWidth / 2 - event.pageX) / 40;
      const yAxis = (window.innerHeight / 2 - event.pageY) / 40;
      containerRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isTossing, prefersReducedMotion]);

  const handleToss = () => {
    if (isTossing || prefersReducedMotion) {
      return;
    }

    setIsTossing(true);
    window.setTimeout(() => setIsTossing(false), 2500);
  };

  return (
    <div className="coin-perspective" style={{ width: size, height: size }} aria-hidden="true">
      <div
        ref={containerRef}
        className={`coin-container ${isTossing ? 'tossing' : ''} ${
          prefersReducedMotion ? 'reduce-motion' : ''
        }`}
        onDoubleClick={handleToss}
      >
        <div className="coin-object">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="coin-edge-layer"
              style={{ transform: `translateZ(${10 - index}px)` }}
            />
          ))}
          <div className="coin-face coin-front" style={{ transform: 'translateZ(10.5px)' }}>
            <img src={emblemSrc} alt="" />
            <div className="shimmer" />
          </div>
          <div className="coin-face coin-back" style={{ transform: 'translateZ(-10.5px) rotateY(180deg)' }}>
            <img src={emblemSrc} alt="" />
            <div className="shimmer" />
          </div>
        </div>
        <div className="coin-glow" />
      </div>
    </div>
  );
};

export default Coin3D;
