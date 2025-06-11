import React from 'react';
import { Cpu, HardDrive, Activity, Clock, Users, Zap, Server, Shield, ArrowLeft, Mail } from 'lucide-react';

interface SystemDetailsProps {
  systemMetrics: {
    cpuUsage: number;
    memoryUsage: number;
    uptime: string;
    processes: number;
    loadAverage: string;
  };
  onBack: () => void;
  onSendReport: (category: string) => void;
}

export function SystemDetails({ systemMetrics, onBack, onSendReport }: SystemDetailsProps) {
  
  const getUsageColor = (usage: number, thresholds: { good: number; warning: number }) => {
    if (usage <= thresholds.good) return '#34c759';
    if (usage <= thresholds.warning) return '#ff9500';
    return '#ff3b30';
  };

  const getLoadColor = () => {
    const load = parseFloat(systemMetrics.loadAverage);
    if (load < 1.0) return '#34c759';
    if (load < 2.0) return '#ff9500';
    return '#ff3b30';
  };

  return (
    <div className="h-full space-y-6 relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles"></div>
      </div>

      {/* Header */}
      <div className="relative modern-panel-header p-6 shadow-lg"
           style={{ 
             background: 'rgba(255, 255, 255, 0.05)',
             borderColor: 'rgba(255, 255, 255, 0.1)',
             borderWidth: '1px'
           }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="modern-button p-3 transition-all duration-300"
              style={{ 
                backgroundColor: 'rgba(255, 59, 48, 0.1)',
                borderColor: 'rgba(255, 59, 48, 0.3)',
              }}
            >
              <ArrowLeft className="w-6 h-6" style={{ color: '#ff3b30' }} />
            </button>
            <div className="modern-button p-3"
                 style={{ 
                   backgroundColor: 'rgba(88, 86, 214, 0.1)',
                   borderColor: 'rgba(88, 86, 214, 0.3)',
                 }}>
              <Shield className="w-8 h-8" style={{ color: '#5856d6' }} />
            </div>
            <div>
              <h2 className="text-3xl font-bold modern-font tracking-tight" style={{ color: '#ffffff' }}>
                System Core
              </h2>
              <p className="modern-font text-lg" style={{ color: '#8e8e93' }}>System resources and performance metrics</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onSendReport('system')}
              className="modern-button px-6 py-3 transition-all duration-300 flex items-center space-x-2 modern-font text-sm font-semibold"
              style={{ 
                backgroundColor: 'rgba(52, 199, 89, 0.1)',
                borderColor: 'rgba(52, 199, 89, 0.3)',
                color: '#34c759'
              }}
            >
              <Mail className="w-4 h-4" />
              <span>Send Report</span>
            </button>
            <div className="modern-display px-4 py-2 modern-font text-sm font-semibold"
                 style={{ 
                   backgroundColor: 'rgba(52, 199, 89, 0.1)',
                   borderColor: 'rgba(52, 199, 89, 0.3)',
                   color: '#34c759',
                 }}>
              Operational
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-8 h-[calc(100%-140px)]">
        {/* Unified Processing Panel */}
        <div className="modern-panel p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-3 rounded-2xl mr-4" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                <Cpu className="w-8 h-8" style={{ color: '#007aff' }} />
              </div>
              Processing
            </h3>
            <div className="w-3 h-3 animate-pulse rounded-full" 
                 style={{ 
                   backgroundColor: '#007aff',
                   boxShadow: '0 0 8px #007aff'
                 }}></div>
          </div>

          {/* Unified Processing Metrics */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold modern-font mb-3" 
                     style={{ 
                       color: getUsageColor(systemMetrics.cpuUsage, { good: 50, warning: 80 }),
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {systemMetrics.cpuUsage.toFixed(1)}%
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>CPU Usage</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold modern-font mb-3" 
                     style={{ 
                       color: getUsageColor(systemMetrics.memoryUsage, { good: 70, warning: 85 }),
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {systemMetrics.memoryUsage.toFixed(1)}%
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Memory</div>
              </div>
            </div>

            {/* Load Average */}
            <div className="modern-display p-6">
              <div className="text-center">
                <div className="text-4xl font-bold modern-font mb-3" 
                     style={{ 
                       color: getLoadColor(),
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {systemMetrics.loadAverage}
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Load Average</div>
              </div>
            </div>
          </div>
        </div>

        {/* Unified System Panel */}
        <div className="modern-panel p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-3 rounded-2xl mr-4" style={{ backgroundColor: 'rgba(255, 149, 0, 0.2)' }}>
                <Server className="w-8 h-8" style={{ color: '#ff9500' }} />
              </div>
              System
            </h3>
            <div className="w-3 h-3 animate-pulse rounded-full" 
                 style={{ 
                   backgroundColor: '#ff9500',
                   boxShadow: '0 0 8px #ff9500'
                 }}></div>
          </div>

          {/* Unified System Metrics */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold modern-font mb-3" 
                     style={{ 
                       color: '#ff9500',
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {systemMetrics.uptime}
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold modern-font mb-3" 
                     style={{ 
                       color: '#007aff',
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {systemMetrics.processes}
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Processes</div>
              </div>
            </div>

            {/* System Status */}
            <div className="modern-display p-6">
              <h4 className="text-lg font-bold modern-font mb-6" style={{ color: '#ffffff' }}>Status</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-base modern-font">
                  <span style={{ color: '#8e8e93' }}>Kernel</span>
                  <span style={{ color: '#ffffff' }}>Linux</span>
                </div>
                <div className="flex justify-between text-base modern-font">
                  <span style={{ color: '#8e8e93' }}>Architecture</span>
                  <span style={{ color: '#ffffff' }}>ARM64</span>
                </div>
                <div className="flex justify-between text-base modern-font">
                  <span style={{ color: '#8e8e93' }}>State</span>
                  <span style={{ color: '#34c759' }}>Running</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Performance Panel */}
        <div className="modern-panel p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-3 rounded-2xl mr-4" style={{ backgroundColor: 'rgba(88, 86, 214, 0.2)' }}>
                <Zap className="w-8 h-8" style={{ color: '#5856d6' }} />
              </div>
              Metrics
            </h3>
            <div className="w-3 h-3 animate-pulse rounded-full" 
                 style={{ 
                   backgroundColor: '#5856d6',
                   boxShadow: '0 0 8px #5856d6'
                 }}></div>
          </div>

          {/* Unified Performance Metrics */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="modern-display p-4 text-center">
                <div className="text-2xl font-bold modern-font" 
                     style={{ 
                       color: '#34c759',
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {((100 - systemMetrics.cpuUsage) / 100 * 100).toFixed(1)}%
                </div>
                <div className="text-xs modern-font" style={{ color: '#8e8e93' }}>CPU Available</div>
              </div>

              <div className="modern-display p-4 text-center">
                <div className="text-2xl font-bold modern-font" 
                     style={{ 
                       color: '#5856d6',
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {((100 - systemMetrics.memoryUsage) / 100 * 100).toFixed(1)}%
                </div>
                <div className="text-xs modern-font" style={{ color: '#8e8e93' }}>RAM Free</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="modern-display p-4 text-center">
                <div className="text-2xl font-bold modern-font" 
                     style={{ 
                       color: '#ff9500',
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {(systemMetrics.processes / 10).toFixed(1)}
                </div>
                <div className="text-xs modern-font" style={{ color: '#8e8e93' }}>Proc/Core</div>
              </div>

              <div className="modern-display p-4 text-center">
                <div className="text-2xl font-bold modern-font" 
                     style={{ 
                       color: '#007aff',
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {(parseFloat(systemMetrics.loadAverage) * 100).toFixed(0)}%
                </div>
                <div className="text-xs modern-font" style={{ color: '#8e8e93' }}>Load Norm</div>
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
            radial-gradient(circle at 20% 20%, rgba(0, 122, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 149, 0, 0.02) 0%, transparent 50%),
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