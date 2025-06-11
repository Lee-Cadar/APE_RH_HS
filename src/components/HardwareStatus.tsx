import React from 'react';
import { PerformanceState } from '../types/ape';
import { Fan, Lightbulb, Gauge, Cpu, HardDrive } from 'lucide-react';

interface HardwareStatusProps {
  fanSpeed: number;
  ledColor: string;
  performanceState: PerformanceState;
  systemMetrics: any;
}

export function HardwareStatus({ fanSpeed, ledColor, performanceState, systemMetrics }: HardwareStatusProps) {
  const getLEDColorClass = () => {
    switch (ledColor) {
      case 'green': return 'bg-green-400 shadow-green-400/50';
      case 'yellow': return 'bg-yellow-400 shadow-yellow-400/50';
      case 'red': return 'bg-red-400 shadow-red-400/50';
      default: return 'bg-gray-400 shadow-gray-400/50';
    }
  };

  const getFanSpeedColor = () => {
    if (fanSpeed < 30) return 'text-green-400';
    if (fanSpeed < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getFanGradient = () => {
    if (fanSpeed < 30) return 'from-green-400 to-green-600';
    if (fanSpeed < 70) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/90 via-blue-900/90 to-slate-800/90 backdrop-blur-md rounded-xl border border-cyan-400/30 p-4 shadow-xl shadow-cyan-500/20 h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-cyan-100 font-mono tracking-wider flex items-center">
          <Fan className="w-4 h-4 mr-2 text-cyan-400" />
          COOLING
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-mono text-cyan-300">ACTIVE</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Fan Speed Display - Compact */}
        <div className="text-center mb-4">
          <div className={`text-2xl font-bold font-mono ${getFanSpeedColor()} mb-1`}>
            {fanSpeed}%
          </div>
          <div className="text-xs text-cyan-400 font-mono">EFFICIENCY</div>
        </div>

        {/* Fan Speed Gauge - Compact */}
        <div className="relative">
          <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden">
            <div 
              className={`h-4 rounded-full transition-all duration-1000 bg-gradient-to-r ${getFanGradient()} shadow-lg`}
              style={{ width: `${fanSpeed}%` }}
            >
              <div className="h-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs font-mono text-white font-bold drop-shadow-lg">
              {fanSpeed}%
            </div>
          </div>
        </div>

        {/* Status LED Array - Compact */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-3 border border-purple-400/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <Lightbulb className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono text-purple-300">STATUS</span>
            </div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* Main LED Display - Compact */}
          <div className="flex items-center justify-center mb-3">
            <div className="relative">
              <div className={`w-8 h-8 rounded-full ${getLEDColorClass()} shadow-xl animate-pulse`}>
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm font-bold font-mono text-cyan-100 capitalize">{ledColor}</div>
            <div className="text-xs text-cyan-400 font-mono">
              {ledColor === 'green' && 'OPTIMAL'}
              {ledColor === 'yellow' && 'WARNING'}
              {ledColor === 'red' && 'CRITICAL'}
            </div>
          </div>
        </div>

        {/* System Controller - Compact */}
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-400/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <Gauge className="w-4 h-4 text-green-400" />
              <span className="text-xs font-mono text-green-300">CONTROLLER</span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800/50 rounded-lg p-2 border border-green-400/20">
              <div className="text-xs text-green-400 font-mono">STATUS</div>
              <div className="text-xs font-mono text-green-300">ACTIVE</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-2 border border-green-400/20">
              <div className="text-xs text-green-400 font-mono">PORT</div>
              <div className="text-xs font-mono text-green-300">USB0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}