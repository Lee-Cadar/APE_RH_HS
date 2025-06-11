import React from 'react';
import { PerformanceState } from '../types/ape';
import { Shield, Cpu, Thermometer, Activity, Zap } from 'lucide-react';

interface SystemOverviewProps {
  temperature: number;
  performanceState: PerformanceState;
  systemMetrics: any;
  gpuMetrics: any;
}

export function SystemOverview({ temperature, performanceState, systemMetrics, gpuMetrics }: SystemOverviewProps) {
  const getSystemStatusColor = () => {
    if (temperature > 80) return 'text-red-400';
    if (temperature > 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getSystemStatusText = () => {
    if (temperature > 80) return 'CRITICAL';
    if (temperature > 60) return 'WARNING';
    return 'OPTIMAL';
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-cyan-100 font-mono tracking-wider flex items-center">
          <Shield className="w-4 h-4 mr-2 text-cyan-400" />
          SYSTEM STATUS
        </h3>
        <div className={`px-2 py-1 rounded-full border font-mono text-xs font-bold ${
          getSystemStatusColor() === 'text-green-400' 
            ? 'bg-green-500/20 border-green-400/50 text-green-400' 
            : getSystemStatusColor() === 'text-yellow-400'
            ? 'bg-yellow-500/20 border-yellow-400/50 text-yellow-400'
            : 'bg-red-500/20 border-red-400/50 text-red-400'
        }`}>
          {getSystemStatusText()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* CPU Status */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg p-3 border border-cyan-400/20">
          <div className="flex items-center justify-between mb-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-cyan-100 font-mono">{systemMetrics.cpuUsage}%</div>
            <div className="text-xs text-cyan-400 font-mono">CPU</div>
            <div className="w-full bg-slate-700/50 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${systemMetrics.cpuUsage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg p-3 border border-orange-400/20">
          <div className="flex items-center justify-between mb-2">
            <Thermometer className="w-4 h-4 text-orange-400" />
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              temperature > 80 ? 'bg-red-400' : temperature > 60 ? 'bg-yellow-400' : 'bg-green-400'
            }`}></div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-cyan-100 font-mono">{temperature.toFixed(0)}°C</div>
            <div className="text-xs text-orange-400 font-mono">TEMP</div>
            <div className="w-full bg-slate-700/50 rounded-full h-1">
              <div 
                className={`h-1 rounded-full transition-all duration-500 ${
                  temperature > 80 ? 'bg-gradient-to-r from-red-400 to-red-600' :
                  temperature > 60 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                  'bg-gradient-to-r from-green-400 to-green-500'
                }`}
                style={{ width: `${Math.min(temperature, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Memory */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-3 border border-purple-400/20">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-cyan-100 font-mono">{systemMetrics.memoryUsage}%</div>
            <div className="text-xs text-purple-400 font-mono">RAM</div>
            <div className="w-full bg-slate-700/50 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${systemMetrics.memoryUsage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Power State */}
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-400/20">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-4 h-4 text-green-400" />
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              performanceState === 'performance' ? 'bg-green-400' :
              performanceState === 'balanced' ? 'bg-yellow-400' : 'bg-red-400'
            }`}></div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-bold text-cyan-100 font-mono uppercase">{performanceState.slice(0, 4)}</div>
            <div className="text-xs text-green-400 font-mono">MODE</div>
            <div className="flex space-x-1">
              <div className={`w-1 h-1 rounded-full ${performanceState === 'performance' ? 'bg-green-400' : 'bg-slate-600'}`}></div>
              <div className={`w-1 h-1 rounded-full ${performanceState === 'balanced' ? 'bg-yellow-400' : 'bg-slate-600'}`}></div>
              <div className={`w-1 h-1 rounded-full ${performanceState === 'powersave' ? 'bg-red-400' : 'bg-slate-600'}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* System Vitals - Compact */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="bg-slate-800/50 rounded-lg p-2 border border-cyan-400/20 text-center">
          <div className="text-xs text-cyan-400 font-mono">UPTIME</div>
          <div className="text-sm font-bold text-cyan-100 font-mono">{systemMetrics.uptime}</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-2 border border-cyan-400/20 text-center">
          <div className="text-xs text-cyan-400 font-mono">PROC</div>
          <div className="text-sm font-bold text-cyan-100 font-mono">{systemMetrics.processes}</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-2 border border-cyan-400/20 text-center">
          <div className="text-xs text-cyan-400 font-mono">LOAD</div>
          <div className="text-sm font-bold text-cyan-100 font-mono">{systemMetrics.loadAverage}</div>
        </div>
      </div>
    </div>
  );
}