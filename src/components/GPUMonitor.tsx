import React from 'react';
import { Monitor, Thermometer, Activity, HardDrive } from 'lucide-react';

interface GPUMonitorProps {
  gpuMetrics: {
    usage: number;
    temperature: number;
    memoryUsed: number;
    memoryTotal: number;
    clockSpeed: number;
    powerDraw: number;
  };
}

export function GPUMonitor({ gpuMetrics }: GPUMonitorProps) {
  const memoryPercentage = (gpuMetrics.memoryUsed / gpuMetrics.memoryTotal) * 100;

  const getTemperatureColor = () => {
    if (gpuMetrics.temperature > 80) return 'text-red-400';
    if (gpuMetrics.temperature > 65) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getUsageColor = () => {
    if (gpuMetrics.usage > 90) return 'from-red-400 to-red-600';
    if (gpuMetrics.usage > 70) return 'from-yellow-400 to-orange-500';
    return 'from-green-400 to-green-600';
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/90 via-purple-900/90 to-slate-800/90 backdrop-blur-md rounded-xl border border-purple-400/30 p-4 shadow-xl shadow-purple-500/20 h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-cyan-100 font-mono tracking-wider flex items-center">
          <Monitor className="w-4 h-4 mr-2 text-purple-400" />
          GPU CORE
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-mono text-purple-300">ONLINE</span>
        </div>
      </div>

      {/* GPU Usage Gauge - Compact */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-purple-300">UTILIZATION</span>
          <span className="text-sm font-bold text-purple-100 font-mono">{gpuMetrics.usage}%</span>
        </div>
        <div className="relative">
          <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${getUsageColor()} shadow-lg`}
              style={{ width: `${gpuMetrics.usage}%` }}
            >
              <div className="h-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* GPU Metrics Grid - Compact */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Temperature */}
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg p-3 border border-orange-400/20">
          <div className="flex items-center justify-between mb-1">
            <Thermometer className="w-4 h-4 text-orange-400" />
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              gpuMetrics.temperature > 80 ? 'bg-red-400' : 
              gpuMetrics.temperature > 65 ? 'bg-yellow-400' : 'bg-green-400'
            }`}></div>
          </div>
          <div className="text-lg font-bold text-cyan-100 font-mono">{gpuMetrics.temperature}°C</div>
          <div className="text-xs text-orange-400 font-mono">TEMP</div>
        </div>

        {/* Clock Speed */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg p-3 border border-cyan-400/20">
          <div className="flex items-center justify-between mb-1">
            <Activity className="w-4 h-4 text-cyan-400" />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-lg font-bold text-cyan-100 font-mono">{gpuMetrics.clockSpeed}</div>
          <div className="text-xs text-cyan-400 font-mono">MHz</div>
        </div>
      </div>

      {/* Memory Usage - Compact */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <HardDrive className="w-3 h-3 text-purple-400" />
            <span className="text-xs font-mono text-purple-300">VRAM</span>
          </div>
          <span className="text-xs font-mono text-purple-100">
            {(gpuMetrics.memoryUsed/1024).toFixed(1)}GB / {(gpuMetrics.memoryTotal/1024).toFixed(1)}GB
          </span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-500 shadow-lg"
            style={{ width: `${memoryPercentage}%` }}
          >
            <div className="h-full bg-gradient-to-r from-white/20 to-transparent animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Power Draw - Compact */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-400/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-yellow-300">POWER</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-yellow-100 font-mono">{gpuMetrics.powerDraw}W</div>
          </div>
        </div>
      </div>
    </div>
  );
}