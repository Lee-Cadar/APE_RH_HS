import React from 'react';
import { Wifi, Upload, Download, Globe, Signal } from 'lucide-react';

interface NetworkMonitorProps {
  networkMetrics: {
    downloadSpeed: number;
    uploadSpeed: number;
    latency: number;
    packetsReceived: number;
    packetsSent: number;
    signalStrength: number;
    connectionType: string;
  };
}

export function NetworkMonitor({ networkMetrics }: NetworkMonitorProps) {
  const getSignalColor = () => {
    if (networkMetrics.signalStrength > 80) return 'text-green-400';
    if (networkMetrics.signalStrength > 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getLatencyColor = () => {
    if (networkMetrics.latency < 50) return 'text-green-400';
    if (networkMetrics.latency < 100) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B/s`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB/s`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB/s`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/90 via-green-900/90 to-slate-800/90 backdrop-blur-md rounded-xl border border-green-400/30 p-4 shadow-xl shadow-green-500/20 h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-cyan-100 font-mono tracking-wider flex items-center">
          <Wifi className="w-4 h-4 mr-2 text-green-400" />
          NETWORK
        </h3>
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full animate-pulse ${getSignalColor().replace('text-', 'bg-')}`}></div>
          <span className="text-xs font-mono text-green-300">{networkMetrics.connectionType}</span>
        </div>
      </div>

      {/* Speed Meters - Compact */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Download Speed */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-3 border border-blue-400/20">
          <div className="flex items-center justify-between mb-1">
            <Download className="w-4 h-4 text-blue-400" />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-sm font-bold text-cyan-100 font-mono">
            {formatBytes(networkMetrics.downloadSpeed)}
          </div>
          <div className="text-xs text-blue-400 font-mono">DOWN</div>
          <div className="w-full bg-slate-700/50 rounded-full h-1 mt-1">
            <div 
              className="bg-gradient-to-r from-blue-400 to-cyan-500 h-1 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((networkMetrics.downloadSpeed / (10 * 1024 * 1024)) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Upload Speed */}
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-400/20">
          <div className="flex items-center justify-between mb-1">
            <Upload className="w-4 h-4 text-green-400" />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-sm font-bold text-cyan-100 font-mono">
            {formatBytes(networkMetrics.uploadSpeed)}
          </div>
          <div className="text-xs text-green-400 font-mono">UP</div>
          <div className="w-full bg-slate-700/50 rounded-full h-1 mt-1">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-1 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((networkMetrics.uploadSpeed / (5 * 1024 * 1024)) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Network Stats - Compact */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Latency */}
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-400/20">
          <div className="flex items-center justify-between mb-1">
            <Signal className="w-4 h-4 text-yellow-400" />
            <div className={`w-2 h-2 rounded-full animate-pulse ${getLatencyColor().replace('text-', 'bg-')}`}></div>
          </div>
          <div className={`text-sm font-bold font-mono ${getLatencyColor()}`}>
            {networkMetrics.latency}ms
          </div>
          <div className="text-xs text-yellow-400 font-mono">PING</div>
        </div>

        {/* Signal Strength */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-3 border border-purple-400/20">
          <div className="flex items-center justify-between mb-1">
            <Globe className="w-4 h-4 text-purple-400" />
            <div className={`w-2 h-2 rounded-full animate-pulse ${getSignalColor().replace('text-', 'bg-')}`}></div>
          </div>
          <div className={`text-sm font-bold font-mono ${getSignalColor()}`}>
            {networkMetrics.signalStrength}%
          </div>
          <div className="text-xs text-purple-400 font-mono">SIGNAL</div>
        </div>
      </div>

      {/* Signal Strength Bars - Compact */}
      <div className="mb-3">
        <div className="text-xs font-mono text-green-300 mb-1">SIGNAL STRENGTH</div>
        <div className="flex items-end space-x-1">
          {[1, 2, 3, 4, 5].map((bar) => (
            <div
              key={bar}
              className={`w-2 rounded-t transition-all duration-300 ${
                bar <= (networkMetrics.signalStrength / 20)
                  ? networkMetrics.signalStrength > 80
                    ? 'bg-green-400 shadow-lg shadow-green-400/50'
                    : networkMetrics.signalStrength > 50
                    ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                    : 'bg-red-400 shadow-lg shadow-red-400/50'
                  : 'bg-slate-600/50'
              }`}
              style={{ height: `${bar * 4}px` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Packet Statistics - Compact */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-800/50 rounded-lg p-2 border border-green-400/20">
          <div className="text-xs text-green-400 font-mono">RX</div>
          <div className="text-sm font-bold text-cyan-100 font-mono">
            {(networkMetrics.packetsReceived / 1000).toFixed(0)}K
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-2 border border-green-400/20">
          <div className="text-xs text-green-400 font-mono">TX</div>
          <div className="text-sm font-bold text-cyan-100 font-mono">
            {(networkMetrics.packetsSent / 1000).toFixed(0)}K
          </div>
        </div>
      </div>
    </div>
  );
}