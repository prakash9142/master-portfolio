import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent >= 95) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 800);
    }
  }, [percent]);

  useEffect(() => {
    if (isLoaded) {
      setClicked(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  }, [isLoaded, setIsLoading]);

  useEffect(() => {
    // 8-second failsafe to prevent getting stuck
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Calculate circle stroke parameters
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className={`loading-screen ${clicked ? "loading-out" : ""}`}>
      {/* Top Branding Header */}
      <div className="loading-header-brand">
        <span className="brand-logo">PKA</span>
        <div className="sys-status">
          <span className="pulse-dot"></span>
          <span>SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Main Loader Content */}
      <div className="loader-center-content">
        {/* Glowing Circular Progress */}
        <div className="progress-ring-container">
          <svg className="progress-ring" width="120" height="120">
            <circle
              className="progress-ring-bg"
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="4"
              fill="transparent"
              r={radius}
              cx="60"
              cy="60"
            />
            <circle
              className="progress-ring-indicator"
              stroke="url(#neon-gradient)"
              strokeWidth="4"
              fill="transparent"
              r={radius}
              cx="60"
              cy="60"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="progress-value">
            <span className="percentage">{percent}</span>
            <span className="percent-symbol">%</span>
          </div>
        </div>

        {/* Tech Console Details */}
        <div className="console-logs">
          <div className="console-line line-1">// INITIALIZING PORTFOLIO SYSTEM...</div>
          <div className="console-line line-2">
            {percent < 40 && "// LOADING 3D WORKSPACE ENGINE..."}
            {percent >= 40 && percent < 75 && "// RESOLVING TEXTURES & SHADERS..."}
            {percent >= 75 && percent < 95 && "// COMPILING INTERACTIVE UI..."}
            {percent >= 95 && "// SYSTEM READY"}
          </div>
        </div>
      </div>

      {/* Decorative Grid Lines */}
      <div className="grid-lines"></div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;
  const interval = setInterval(() => {
    const rand = Math.floor(Math.random() * 8) + 1;
    percent += rand;
    if (percent >= 100) {
      percent = 100;
      clearInterval(interval);
    }
    setLoading(percent);
  }, 40);
};
