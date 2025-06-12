import React from 'react';

interface RetroGaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color: string;
  size?: number;
}

export function RetroGauge({ value, max, label, unit, color, size = 120 }: RetroGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const angle = (percentage / 100) * 180; // 180 degrees for half circle
  const radius = size / 2 - 10;
  const circumference = Math.PI * radius; // Half circle circumference
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size * 0.7 }}>
      {/* Gauge SVG */}
      <svg width={size} height={size * 0.6} className="transform rotate-180">
        {/* Background Arc */}
        <path
          d={`M 10 ${size * 0.5} A ${radius} ${radius} 0 0 1 ${size - 10} ${size * 0.5}`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Progress Arc */}
        <path
          d={`M 10 ${size * 0.5} A ${radius} ${radius} 0 0 1 ${size - 10} ${size * 0.5}`}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${color})`
          }}
        />

        {/* Tick Marks */}
        {[0, 25, 50, 75, 100].map((tick, index) => {
          const tickAngle = (tick / 100) * 180;
          const tickRadians = (tickAngle * Math.PI) / 180;
          const x1 = 10 + radius - Math.cos(tickRadians) * (radius - 15);
          const y1 = size * 0.5 - Math.sin(tickRadians) * (radius - 15);
          const x2 = 10 + radius - Math.cos(tickRadians) * (radius - 5);
          const y2 = size * 0.5 - Math.sin(tickRadians) * (radius - 5);
          
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}

        {/* Needle */}
        <g transform={`translate(${size/2}, ${size * 0.5})`}>
          <line
            x1="0"
            y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * (radius - 20)}
            y2={-Math.sin((angle * Math.PI) / 180) * (radius - 20)}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 4px ${color})`
            }}
          />
          {/* Needle Center */}
          <circle
            cx="0"
            cy="0"
            r="4"
            fill={color}
            style={{
              filter: `drop-shadow(0 0 6px ${color})`
            }}
          />
        </g>
      </svg>

      {/* Digital Display */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 modern-display px-3 py-1">
        <div className="text-center">
          <div className="text-lg font-bold tech-font" 
               style={{ 
                 color: value > max * 0.8 ? '#ff3b30' : color,
                 fontFamily: 'Technology, "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
               }}>
            {value.toFixed(1)}{unit}
          </div>
          <div className="text-xs tech-font" style={{ color: '#8e8e93' }}>
            {label}
          </div>
        </div>
      </div>

      {/* Warning Indicators */}
      {value > max * 0.8 && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 rounded-full animate-pulse" 
               style={{ backgroundColor: '#ff3b30', boxShadow: '0 0 8px #ff3b30' }}></div>
        </div>
      )}

      <style jsx>{`
        .modern-display {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
}