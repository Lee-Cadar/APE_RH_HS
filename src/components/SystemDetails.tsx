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
                   backgroundColor: 'rgba(88, 86, 214, 0.1)',
                   borderColor: 'rgba(88, 86, 214, 0.3)',
                 }}>
              <Shield className="w-9 h-9" style={{ color: '#5856d6' }} />
            </div>
            <div>
              <h2 className="text-2xl font-medium modern-font tracking-tight" style={{ color: '#ffffff' }}>
                System Core
              </h2>
              <p className="modern-font text-base" style={{ color: '#8e8e93' }}>System resources and performance metrics</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onSendReport('system')}
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
                   backgroundColor: 'rgba(52, 199, 89, 0.1)',
                   borderColor: 'rgba(52, 199, 89, 0.3)',
                   color: '#34c759',
                 }}>
              Operational
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-10 h-[calc(100%-180px)]">
        {/* Unified Processing Panel */}
        <div className="modern-panel p-10 shadow-lg">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-medium modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-4 rounded-2xl mr-5" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                <Cpu className="w-9 h-9" style={{ color: '#007aff' }} />
              </div>
              Processing
            </h3>
            <div className="w-4 h-4 animate-pulse rounded-full" 
                 style={{ 
                   backgroundColor: '#007aff',
                   boxShadow: '0 0 8px #007aff'
                 }}></div>
          </div>

          {/* Unified Processing Metrics */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 gap-10">
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: getUsageColor(systemMetrics.cpuUsage, { good: 50, warning: 80 }),
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {systemMetrics.cpuUsage.toFixed(1)}%
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>CPU Usage</div>
              </div>
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: getUsageColor(systemMetrics.memoryUsage, { good: 70, warning: 85 }),
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {systemMetrics.memoryUsage.toFixed(1)}%
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Memory</div>
              </div>
            </div>

            {/* Load Average */}
            <div className="modern-display p-8">
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: getLoadColor(),
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {systemMetrics.loadAverage}
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Load Average</div>
              </div>
            </div>
          </div>
        </div>

        {/* Unified System Panel */}
        <div className="modern-panel p-10 shadow-lg">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-medium modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-4 rounded-2xl mr-5" style={{ backgroundColor: 'rgba(255, 149, 0, 0.2)' }}>
                <Server className="w-9 h-9" style={{ color: '#ff9500' }} />
              </div>
              System
            </h3>
            <div className="w-4 h-4 animate-pulse rounded-full" 
                 style={{ 
                   backgroundColor: '#ff9500',
                   boxShadow: '0 0 8px #ff9500'
                 }}></div>
          </div>

          {/* Unified System Metrics */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 gap-10">
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: '#ff9500',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {systemMetrics.uptime}
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Uptime</div>
              </div>
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: '#007aff',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {systemMetrics.processes}
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Processes</div>
              </div>
            </div>

            {/* System Status */}
            <div className="modern-display p-8">
              <h4 className="text-xl font-bold modern-font mb-8" style={{ color: '#ffffff' }}>Status</h4>
              <div className="space-y-6">
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
        <div className="modern-panel p-10 shadow-lg">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-medium modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-4 rounded-2xl mr-5" style={{ backgroundColor: 'rgba(88, 86, 214, 0.2)' }}>
                <Zap className="w-9 h-9" style={{ color: '#5856d6' }} />
              </div>
              Metrics
            </h3>
            <div className="w-4 h-4 animate-pulse rounded-full" 
                 style={{ 
                   backgroundColor: '#5856d6',
                   boxShadow: '0 0 8px #5856d6'
                 }}></div>
          </div>

          {/* Unified Performance Metrics */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="modern-display p-6 text-center">
                <div className="text-xl font-bold modern-font" 
                     style={{ 
                       color: '#34c759',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {((100 - systemMetrics.cpuUsage) / 100 * 100).toFixed(1)}%
                </div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>CPU Available</div>
              </div>

              <div className="modern-display p-6 text-center">
                <div className="text-xl font-bold modern-font" 
                     style={{ 
                       color: '#5856d6',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {((100 - systemMetrics.memoryUsage) / 100 * 100).toFixed(1)}%
                </div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>RAM Free</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="modern-display p-6 text-center">
                <div className="text-xl font-bold modern-font" 
                     style={{ 
                       color: '#ff9500',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {(systemMetrics.processes / 10).toFixed(1)}
                </div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>Proc/Core</div>
              </div>

              <div className="modern-display p-6 text-center">
                <div className="text-xl font-bold modern-font" 
                     style={{ 
                       color: '#007aff',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {(parseFloat(systemMetrics.loadAverage) * 100).toFixed(0)}%
                </div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>Load Norm</div>
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