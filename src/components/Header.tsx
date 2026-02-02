import { useState, useEffect } from 'react';

export function Header() {
  const [time, setTime] = useState(new Date());
  const [glitchText, setGlitchText] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 100);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo-container">
            <span className="logo-bracket">[</span>
            <h1 className={`logo-text ${glitchText ? 'glitch' : ''}`} data-text="GITTREND">
              GITTREND
            </h1>
            <span className="logo-bracket">]</span>
          </div>
          <p className="tagline">
            <span className="cursor">{'>'}</span> Discovering the best open-source projects
          </p>
        </div>

        <div className="header-right">
          <div className="status-indicator">
            <span className="status-dot" />
            <span className="status-text">LIVE</span>
          </div>
          <div className="time-display">
            <span className="time-label">SYS_TIME</span>
            <span className="time-value">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
          </div>
        </div>
      </div>

      <div className="header-border" />
    </header>
  );
}
