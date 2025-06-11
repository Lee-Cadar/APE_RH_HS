import React from 'react';
import { PerformanceState } from '../types/ape';
import { Thermometer, Fan, Lightbulb, Cpu, Monitor, Wifi } from 'lucide-react';

interface StatusBarProps {
  temperature: number;
  performanceState: PerformanceState;
  fanSpeed: number;
  ledColor: string;
  gpuMetrics: any;
  networkMetrics: any;
}

export function StatusBar({ temperature, performanceState, fanSpeed, ledColor, gpuMetrics, networkMetrics }: StatusBarProps) {
  const getTemperatureColor = () => {
    if (temperature < 60) return 'text-green-400';
    if (temperature < 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getLEDColorClass = () => {
    switch (ledColor) {
      case 'green': return 'bg-green-400';
      case 'yellow': return 'bg-yellow-400';
      case 'red': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  const getPerformanceStateColor = () => {
    switch (performanceState) {
      case 'performance': return 'text-green-400';
      case 'balanced': return 'text-yellow-400';
      case 'powersave': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getNetworkColor = () => {
    if (networkMetrics.signalStrength > 80) return 'text-green-400';
    if (networkMetrics.signalStrength > 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="flex items-center space-x-8">
      {/* CPU Temperature */}
      <div className="flex items-center space-x-2">
        <Thermometer className={`w-4 h-4 ${getTemperatureColor()}`} />
        <div className="text-right">
          <div className={`text-sm font-bold font-mono ${getTemperatureColor()}`}>
            {temperature.toFixed(1)}°C
          </div>
          <div className="text-xs text-cyan-400 font-mono">CPU</div>
        </div>
      </div>

      {/* GPU Temperature */}
      <div className="flex items-center space-x-2">
        <Monitor className="w-4 h-4 text-purple-400" />
        <div className="text-right">
          <div className="text-sm font-bold font-mono text-purple-400">
            {gpuMetrics.temperature}°C
          </div>
          <div className="text-xs text-cyan-400 font-mono">GPU</div>
        </div>
      </div>

      {/* Performance State */}
      <div className="flex items-center space-x-2">
        <Cpu className={`w-4 h-4 ${getPerformanceStateColor()}`} />
        <div className="text-right">
          <div className={`text-sm font-bold font-mono ${getPerformanceStateColor()} uppercase`}>
            {performanceState}
          </div>
          <div className="text-xs text-cyan-400 font-mono">MODE</div>
        </div>
      </div>

      {/* Fan Speed */}
      <div className="flex items-center space-x-2">
        <Fan className="w-4 h-4 text-blue-400" />
        <div className="text-right">
          <div className="text-sm font-bold font-mono text-blue-400">
            {fanSpeed}%
          </div>
          <div className="text-xs text-cyan-400 font-mono">FAN</div>
        </div>
      </div>

      {/* Network Status */}
      <div className="flex items-center space-x-2">
        <Wifi className={`w-4 h-4 ${getNetworkColor()}`} />
        <div className="text-right">
          <div className={`text-sm font-bold font-mono ${getNetworkColor()}`}>
            {networkMetrics.signalStrength}%
          </div>
          <div className="text-xs text-cyan-400 font-mono">NET</div>
        </div>
      </div>

      {/* Status LED */}
      <div className="flex items-center space-x-2">
        <div className={`w-4 h-4 rounded-full ${getLEDColorClass()} animate-pulse shadow-lg`}></div>
        <div className="text-right">
          <div className="text-sm font-bold font-mono text-cyan-100 capitalize">
            {ledColor}
          </div>
          <div className="text-xs text-cyan-400 font-mono">LED</div>
        </div>
      </div>
    </div>
  );
}