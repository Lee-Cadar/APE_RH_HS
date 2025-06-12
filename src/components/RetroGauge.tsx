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
  // Increase size by 40%
  const actualSize = size * 1.4;
  const percentage = Math.min((value / max) * 100, 100);
  const angle = (percentage / 100) * 180; // 180 degrees for half circle
  const radius = actualSize / 2 - 15;
  const circumference = Math.PI * radius; // Half circle circumference
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center" style={{ width: actualSize, height: actualSize * 0.8 }}>
      {/* Gauge SVG */}
      <svg width={actualSize} height={actualSize * 0.7} className="transform rotate-180">
        {/* Background Arc */}
        <path
          d={`M 15 ${actualSize * 0.55} A ${radius} ${radius} 0 0 1 ${actualSize - 15} ${actualSize * 0.55}`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        
        {/* Progress Arc */}
        <path
          d={`M 15 ${actualSize * 0.55} A ${radius} ${radius} 0 0 1 ${actualSize - 15} ${actualSize * 0.55}`}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 10px ${color})`
          }}
        />

        {/* Tick Marks */}
        {[0, 25, 50, 75, 100].map((tick, index) => {
          const tickAngle = (tick / 100) * 180;
          const tickRadians = (tickAngle * Math.PI) / 180;
          const x1 = 15 + radius - Math.cos(tickRadians) * (radius - 20);
          const y1 = actualSize * 0.55 - Math.sin(tickRadians) * (radius - 20);
          const x2 = 15 + radius - Math.cos(tickRadians) * (radius - 8);
          const y2 = actualSize * 0.55 - Math.sin(tickRadians) * (radius - 8);
          
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}

        {/* Needle */}
        <g transform={`translate(${actualSize/2}, ${actualSize * 0.55})`}>
          <line
            x1="0"
            y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * (radius - 25)}
            y2={-Math.sin((angle * Math.PI) / 180) * (radius - 25)}
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${color})`
            }}
          />
          {/* Needle Center */}
          <circle
            cx="0"
            cy="0"
            r="6"
            fill={color}
            style={{
              filter: `drop-shadow(0 0 8px ${color})`
            }}
          />
        </g>
      </svg>

      {/* Digital Display */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 modern-display px-4 py-2">
        <div className="text-center">
          <div className="font-bold modern-font" 
               style={{ 
                 color: value > max * 0.8 ? '#ff3b30' : color,
                 fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                 fontSize: '22px'
               }}>
            {value.toFixed(1)}{unit}
          </div>
          <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>
            {label}
          </div>
        </div>
      </div>

      {/* Warning Indicators */}
      {value > max * 0.8 && (
        <div className="absolute top-3 right-3">
          <div className="w-4 h-4 rounded-full animate-pulse" 
               style={{ backgroundColor: '#ff3b30', boxShadow: '0 0 10px #ff3b30' }}></div>
        </div>
      )}

      <style jsx>{`
        .modern-display {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
}