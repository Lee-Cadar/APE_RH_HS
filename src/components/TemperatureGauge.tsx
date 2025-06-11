import React from 'react';
import { PerformanceState } from '../types/ape';
import { Thermometer, AlertTriangle } from 'lucide-react';

interface TemperatureGaugeProps {
  temperature: number;
  performanceState: PerformanceState;
}

export function TemperatureGauge({ temperature, performanceState }: TemperatureGaugeProps) {
  const getTemperatureColor = () => {
    if (temperature < 60) return 'text-green-400';
    if (temperature < 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGaugeColor = () => {
    if (temperature < 60) return 'stroke-green-400';
    if (temperature < 80) return 'stroke-yellow-400';
    return 'stroke-red-400';
  };

  const getGlowColor = () => {
    if (temperature < 60) return 'drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]';
    if (temperature < 80) return 'drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]';
    return 'drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]';
  };

  const gaugeRadius = 60;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugeProgress = Math.min(temperature / 100, 1);
  const strokeDasharray = gaugeCircumference;
  const strokeDashoffset = gaugeCircumference * (1 - gaugeProgress);

  const getPerformanceStateColor = () => {
    switch (performanceState) {
      case 'performance': return 'bg-green-500 shadow-green-500/50';
      case 'balanced': return 'bg-yellow-500 shadow-yellow-500/50';
      case 'powersave': return 'bg-red-500 shadow-red-500/50';
      default: return 'bg-gray-500 shadow-gray-500/50';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 h-full">
      {/* Compact Temperature Gauge */}
      <div className="relative">
        {/* Outer Glow Ring */}
        <div className={`absolute inset-0 rounded-full ${getGlowColor()} animate-pulse opacity-50`}>
          <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
        </div>
        
        <svg width="140" height="140" className="transform -rotate-90 relative z-10">
          {/* Background Circle */}
          <circle
            cx="70"
            cy="70"
            r={gaugeRadius}
            fill="none"
            stroke="rgb(30, 41, 59)"
            strokeWidth="8"
            className="opacity-50"
          />
          
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="temperatureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={temperature < 60 ? '#10b981' : temperature < 80 ? '#f59e0b' : '#ef4444'} />
              <stop offset="100%" stopColor={temperature < 60 ? '#34d399' : temperature < 80 ? '#fbbf24' : '#f87171'} />
            </linearGradient>
          </defs>
          
          {/* Progress Circle */}
          <circle
            cx="70"
            cy="70"
            r={gaugeRadius}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="url(#temperatureGradient)"
            className={`transition-all duration-1000 ease-out ${getGlowColor()}`}
            style={{
              strokeDasharray,
              strokeDashoffset,
              filter: 'drop-shadow(0 0 8px currentColor)'
            }}
          />

          {/* Temperature Markers */}
          {[0, 25, 50, 75, 100].map((temp, index) => {
            const angle = (temp / 100) * 360 - 90;
            const x1 = 70 + (gaugeRadius - 10) * Math.cos(angle * Math.PI / 180);
            const y1 = 70 + (gaugeRadius - 10) * Math.sin(angle * Math.PI / 180);
            const x2 = 70 + (gaugeRadius - 5) * Math.cos(angle * Math.PI / 180);
            const y2 = 70 + (gaugeRadius - 5) * Math.sin(angle * Math.PI / 180);
            
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgb(148, 163, 184)"
                strokeWidth="1"
                className="opacity-60"
              />
            );
          })}
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-3xl font-bold font-mono ${getTemperatureColor()} transition-colors duration-500 ${getGlowColor()}`}>
            {temperature.toFixed(0)}°
          </div>
          <div className="text-cyan-400 text-xs font-mono tracking-wider">CORE</div>
          {temperature > 85 && (
            <div className="flex items-center space-x-1 mt-1 animate-pulse">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span className="text-xs font-mono text-red-400">CRIT</span>
            </div>
          )}
        </div>

        {/* Scanning Effect */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping"></div>
      </div>

      {/* Performance State Indicator - Compact */}
      <div className={`flex items-center space-x-2 bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-lg px-3 py-2 border border-cyan-400/30 shadow-lg`}>
        <div className={`w-3 h-3 rounded-full ${getPerformanceStateColor()} animate-pulse`}></div>
        <span className="text-sm font-mono font-bold text-cyan-100 tracking-wider uppercase">
          {performanceState}
        </span>
        <div className="flex space-x-1">
          <div className={`w-1 h-1 rounded-full ${performanceState === 'performance' ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`}></div>
          <div className={`w-1 h-1 rounded-full ${performanceState === 'balanced' ? 'bg-yellow-400 animate-pulse' : 'bg-slate-600'}`}></div>
          <div className={`w-1 h-1 rounded-full ${performanceState === 'powersave' ? 'bg-red-400 animate-pulse' : 'bg-slate-600'}`}></div>
        </div>
      </div>

      {/* Temperature Zones - Compact */}
      <div className="grid grid-cols-3 gap-2 w-full">
        <div className="text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-2 border border-green-400/30">
          <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-1 shadow-lg shadow-green-400/50 animate-pulse"></div>
          <div className="text-xs text-green-400 font-mono font-bold">OPT</div>
          <div className="text-xs text-green-300 font-mono">{'<60°'}</div>
        </div>
        <div className="text-center bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg p-2 border border-yellow-400/30">
          <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto mb-1 shadow-lg shadow-yellow-400/50 animate-pulse"></div>
          <div className="text-xs text-yellow-400 font-mono font-bold">WARN</div>
          <div className="text-xs text-yellow-300 font-mono">60-80°</div>
        </div>
        <div className="text-center bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-lg p-2 border border-red-400/30">
          <div className="w-3 h-3 bg-red-400 rounded-full mx-auto mb-1 shadow-lg shadow-red-400/50 animate-pulse"></div>
          <div className="text-xs text-red-400 font-mono font-bold">CRIT</div>
          <div className="text-xs text-red-300 font-mono">{'>80°'}</div>
        </div>
      </div>
    </div>
  );
}