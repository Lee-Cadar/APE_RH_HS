import React from 'react';
import { PerformanceState, APEConfig } from '../types/ape';
import { Cpu, Zap, Battery, TrendingUp, Shield, Activity } from 'lucide-react';

interface PerformancePanelProps {
  performanceState: PerformanceState;
  temperature: number;
  config: APEConfig;
  systemMetrics: any;
}

export function PerformancePanel({ performanceState, temperature, config, systemMetrics }: PerformancePanelProps) {
  const getGovernorInfo = () => {
    switch (performanceState) {
      case 'performance':
        return {
          name: 'MAXIMUM PERFORMANCE',
          description: 'All systems at maximum efficiency',
          frequency: '1.8 GHz',
          icon: Zap,
          color: 'text-green-400',
          bgColor: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
          borderColor: 'border-green-400/50',
          shadowColor: 'shadow-green-500/30'
        };
      case 'balanced':
        return {
          name: 'TACTICAL BALANCE',
          description: 'Adaptive frequency scaling',
          frequency: '1.2 GHz',
          icon: TrendingUp,
          color: 'text-yellow-400',
          bgColor: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20',
          borderColor: 'border-yellow-400/50',
          shadowColor: 'shadow-yellow-500/30'
        };
      case 'powersave':
        return {
          name: 'EMERGENCY PROTOCOL',
          description: 'Reduced power mode',
          frequency: '0.6 GHz',
          icon: Battery,
          color: 'text-red-400',
          bgColor: 'bg-gradient-to-br from-red-500/20 to-pink-500/20',
          borderColor: 'border-red-400/50',
          shadowColor: 'shadow-red-500/30'
        };
      default:
        return {
          name: 'UNKNOWN STATE',
          description: 'System state unknown',
          frequency: 'N/A',
          icon: Cpu,
          color: 'text-gray-400',
          bgColor: 'bg-gradient-to-br from-gray-500/20 to-slate-500/20',
          borderColor: 'border-gray-400/50',
          shadowColor: 'shadow-gray-500/30'
        };
    }
  };

  const governorInfo = getGovernorInfo();
  const Icon = governorInfo.icon;

  const getNextThreshold = () => {
    if (temperature < config.temperature_thresholds.normal) {
      return { next: 'TACTICAL BALANCE', temp: config.temperature_thresholds.normal };
    }
    if (temperature < config.temperature_thresholds.warning) {
      return { next: 'EMERGENCY PROTOCOL', temp: config.temperature_thresholds.warning };
    }
    return { next: 'SYSTEM SHUTDOWN', temp: 100 };
  };

  const thresholdInfo = getNextThreshold();

  return (
    <div className="bg-gradient-to-br from-slate-800/90 via-blue-900/90 to-slate-800/90 backdrop-blur-md rounded-xl border border-cyan-400/30 p-4 shadow-xl shadow-cyan-500/20 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-cyan-100 font-mono tracking-wider flex items-center">
          <Shield className="w-4 h-4 mr-2 text-cyan-400" />
          PERFORMANCE
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-mono text-cyan-300">OPERATIONAL</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Current State - Compact */}
        <div className={`${governorInfo.bgColor} rounded-lg p-3 border ${governorInfo.borderColor} shadow-lg ${governorInfo.shadowColor}`}>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 rounded-lg bg-slate-800/50 border border-cyan-400/30">
              <Icon className={`w-5 h-5 ${governorInfo.color}`} />
            </div>
            <div>
              <h4 className="font-bold text-sm font-mono text-cyan-100">{governorInfo.name}</h4>
              <p className="text-xs text-cyan-400 font-mono">ACTIVE</p>
            </div>
          </div>
          <p className="text-xs text-cyan-300 mb-3 font-mono">{governorInfo.description}</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800/50 rounded-lg p-2 border border-cyan-400/20">
              <div className="text-xs text-cyan-400 font-mono">FREQ</div>
              <div className={`text-sm font-bold font-mono ${governorInfo.color}`}>
                {governorInfo.frequency}
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-2 border border-cyan-400/20">
              <div className="text-xs text-cyan-400 font-mono">MODE</div>
              <div className={`text-sm font-bold font-mono ${governorInfo.color} uppercase`}>
                {performanceState.slice(0, 4)}
              </div>
            </div>
          </div>
        </div>

        {/* Threat Assessment - Compact */}
        <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-lg p-3 border border-cyan-400/30">
          <h4 className="font-bold text-sm font-mono text-cyan-100 mb-3">THREAT ASSESSMENT</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-cyan-400 font-mono">NEXT THRESHOLD</span>
              <span className="text-xs font-bold text-orange-400 font-mono">
                {thresholdInfo.temp}°C
              </span>
            </div>
            <div className="w-full bg-slate-600/50 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-1000 shadow-lg"
                style={{
                  width: `${Math.min((temperature / thresholdInfo.temp) * 100, 100)}%`
                }}
              >
                <div className="h-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-cyan-400 font-mono">
              <span>{temperature.toFixed(1)}°C</span>
              <span>{((temperature / thresholdInfo.temp) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* System Metrics - Compact */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-2 border border-green-400/30 text-center">
            <div className="flex items-center justify-center mb-1">
              <Activity className="w-3 h-3 text-green-400 mr-1" />
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-sm font-bold text-green-400 font-mono">{systemMetrics.uptime}</div>
            <div className="text-xs text-green-300 font-mono">UPTIME</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-2 border border-blue-400/30 text-center">
            <div className="flex items-center justify-center mb-1">
              <Cpu className="w-3 h-3 text-blue-400 mr-1" />
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-sm font-bold text-blue-400 font-mono">{systemMetrics.cpuUsage}%</div>
            <div className="text-xs text-blue-300 font-mono">CPU</div>
          </div>
        </div>
      </div>
    </div>
  );
}