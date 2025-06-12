import React from 'react';
import { Wifi, Upload, Download, Globe, Signal, Activity, Zap, Shield, ArrowLeft, Mail } from 'lucide-react';

interface NetworkDetailsProps {
  networkMetrics: {
    downloadSpeed: number;
    uploadSpeed: number;
    latency: number;
    packetsReceived: number;
    packetsSent: number;
    signalStrength: number;
    connectionType: string;
  };
  onBack: () => void;
  onSendReport: (category: string) => void;
}

export function NetworkDetails({ networkMetrics, onBack, onSendReport }: NetworkDetailsProps) {
  const getSignalColor = () => {
    if (networkMetrics.signalStrength > 80) return '#34c759';
    if (networkMetrics.signalStrength > 50) return '#ff9500';
    return '#ff3b30';
  };

  const getLatencyColor = () => {
    if (networkMetrics.latency < 50) return '#34c759';
    if (networkMetrics.latency < 100) return '#ff9500';
    return '#ff3b30';
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes.toFixed(1)} B/s`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB/s`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB/s`;
  };

  return (
    <div className="h-full space-y-8 relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles"></div>
      </div>

      {/* Header - Consistent Height */}
      <div className="relative modern-panel-header p-8 shadow-lg"
           style={{ 
             height: '100px',
             background: 'rgba(255, 255, 255, 0.05)',
             borderColor: 'rgba(255, 255, 255, 0.1)',
             borderWidth: '1px'
           }}>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-6">
            <button
              onClick={onBack}
              className="modern-button p-4 transition-all duration-300"
              style={{ 
                backgroundColor: 'rgba(255, 59, 48, 0.1)',
                borderColor: 'rgba(255, 59, 48, 0.3)',
              }}
            >
              <ArrowLeft className="w-7 h-7" style={{ color: '#ff3b30' }} />
            </button>
            <div className="modern-button p-4"
                 style={{ 
                   backgroundColor: 'rgba(52, 199, 89, 0.1)',
                   borderColor: 'rgba(52, 199, 89, 0.3)',
                 }}>
              <Shield className="w-9 h-9" style={{ color: '#34c759' }} />
            </div>
            <div>
              <h2 className="text-2xl font-medium modern-font tracking-tight" style={{ color: '#ffffff' }}>
                Network Command
              </h2>
              <p className="modern-font text-base" style={{ color: '#8e8e93' }}>Network performance and connectivity monitoring</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onSendReport('network')}
              className="modern-button px-8 py-4 transition-all duration-300 flex items-center space-x-3 modern-font text-base font-semibold"
              style={{ 
                backgroundColor: 'rgba(52, 199, 89, 0.1)',
                borderColor: 'rgba(52, 199, 89, 0.3)',
                color: '#34c759'
              }}
            >
              <Mail className="w-5 h-5" />
              <span>Send Report</span>
            </button>
            <div className="modern-display px-6 py-3 modern-font text-base font-semibold"
                 style={{ 
                   backgroundColor: `${getSignalColor()}20`,
                   borderColor: `${getSignalColor()}50`,
                   color: getSignalColor(),
                 }}>
              {networkMetrics.connectionType}
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-10 h-[calc(100%-180px)]">
        {/* Unified Bandwidth Panel */}
        <div className="modern-panel p-10 shadow-lg">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-medium modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-4 rounded-2xl mr-5" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                <Activity className="w-9 h-9" style={{ color: '#007aff' }} />
              </div>
              Bandwidth
            </h3>
            <div className="w-4 h-4 animate-pulse rounded-full" 
                 style={{ 
                   backgroundColor: '#007aff',
                   boxShadow: '0 0 8px #007aff'
                 }}></div>
          </div>

          {/* Unified Bandwidth Metrics */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 gap-10">
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: '#007aff',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {formatBytes(networkMetrics.downloadSpeed).split(' ')[0]}
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>
                  {formatBytes(networkMetrics.downloadSpeed).split(' ')[1]} Download
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: '#ff9500',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {formatBytes(networkMetrics.uploadSpeed).split(' ')[0]}
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>
                  {formatBytes(networkMetrics.uploadSpeed).split(' ')[1]} Upload
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="modern-display p-6 text-center">
                <div className="text-base font-bold modern-font" style={{ color: '#007aff' }}>Max Down</div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>10 MB/s</div>
              </div>
              <div className="modern-display p-6 text-center">
                <div className="text-base font-bold modern-font" style={{ color: '#ff9500' }}>Max Up</div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>5 MB/s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Signal Panel */}
        <div className="modern-panel p-10 shadow-lg">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-medium modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-4 rounded-2xl mr-5" style={{ backgroundColor: 'rgba(52, 199, 89, 0.2)' }}>
                <Signal className="w-9 h-9" style={{ color: '#34c759' }} />
              </div>
              Signal
            </h3>
            <div className="w-4 h-4 animate-pulse rounded-full"
                 style={{ 
                   backgroundColor: getSignalColor(),
                   boxShadow: `0 0 8px ${getSignalColor()}`
                 }}></div>
          </div>

          {/* Unified Signal Metrics */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 gap-10">
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: getSignalColor(),
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {networkMetrics.signalStrength.toFixed(1)}%
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Strength</div>
              </div>
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: getLatencyColor(),
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {networkMetrics.latency.toFixed(1)}ms
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Latency</div>
              </div>
            </div>

            {/* Signal Bars */}
            <div className="flex items-end justify-center space-x-4">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  className="w-5 transition-all duration-300 rounded-t-lg"
                  style={{ 
                    height: `${bar * 15}px`,
                    backgroundColor: bar <= (networkMetrics.signalStrength / 20) ? getSignalColor() : 'rgba(142, 142, 147, 0.3)',
                    boxShadow: bar <= (networkMetrics.signalStrength / 20) ? `0 0 8px ${getSignalColor()}80` : 'none'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Unified Packet Statistics Panel */}
        <div className="modern-panel p-10 shadow-lg">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-medium modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-4 rounded-2xl mr-5" style={{ backgroundColor: 'rgba(88, 86, 214, 0.2)' }}>
                <Globe className="w-9 h-9" style={{ color: '#5856d6' }} />
              </div>
              Packets
            </h3>
            <div className="w-4 h-4 animate-pulse rounded-full" 
                 style={{ 
                   backgroundColor: '#5856d6',
                   boxShadow: '0 0 8px #5856d6'
                 }}></div>
          </div>

          {/* Unified Packet Metrics */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 gap-10">
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: '#007aff',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {(networkMetrics.packetsReceived / 1000).toFixed(0)}K
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Received</div>
              </div>
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: '#ff9500',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {(networkMetrics.packetsSent / 1000).toFixed(0)}K
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Sent</div>
              </div>
            </div>

            {/* Connection Info */}
            <div className="modern-display p-8">
              <h4 className="text-xl font-bold modern-font mb-8" style={{ color: '#ffffff' }}>Connection</h4>
              <div className="space-y-6">
                <div className="flex justify-between text-base modern-font">
                  <span style={{ color: '#8e8e93' }}>Type</span>
                  <span style={{ color: '#ffffff' }}>{networkMetrics.connectionType}</span>
                </div>
                <div className="flex justify-between text-base modern-font">
                  <span style={{ color: '#8e8e93' }}>Status</span>
                  <span style={{ color: '#34c759' }}>Connected</span>
                </div>
                <div className="flex justify-between text-base modern-font">
                  <span style={{ color: '#8e8e93' }}>Protocol</span>
                  <span style={{ color: '#ffffff' }}>TCP/IP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Modern Styles */}
      <style jsx>{`
        .modern-panel {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .modern-panel-header {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .modern-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }
        
        .modern-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }
        
        .modern-display {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(20px);
        }
        
        .floating-particles {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(52, 199, 89, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 122, 255, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(88, 86, 214, 0.01) 0%, transparent 50%);
          animation: floatParticles 40s linear infinite;
        }
        
        @keyframes floatParticles {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-2%, -2%) rotate(90deg); }
          50% { transform: translate(-4%, 0%) rotate(180deg); }
          75% { transform: translate(-2%, 2%) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}