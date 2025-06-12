import React from 'react';
import { PerformanceState, APEConfig } from '../types/ape';
import { Cpu, Monitor, Thermometer, Activity, Zap, HardDrive, Shield, ArrowLeft, Mail } from 'lucide-react';

interface ProcessingDetailsProps {
  temperature: number;
  performanceState: PerformanceState;
  systemMetrics: any;
  gpuMetrics: any;
  config: APEConfig;
  onBack: () => void;
  onSendReport: (category: string) => void;
}

export function ProcessingDetails({ 
  temperature, 
  performanceState, 
  systemMetrics, 
  gpuMetrics, 
  config,
  onBack,
  onSendReport
}: ProcessingDetailsProps) {
  
  const getPerformanceColor = () => {
    switch (performanceState) {
      case 'performance': return '#34c759';
      case 'balanced': return '#ff9500';
      case 'powersave': return '#ff3b30';
      default: return '#8e8e93';
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 60) return '#34c759';
    if (temp < 80) return '#ff9500';
    return '#ff3b30';
  };

  return (
    <div className="h-full space-y-6 relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles"></div>
      </div>

      {/* Header - Consistent Height */}
      <div className="relative modern-panel-header p-6 shadow-lg"
           style={{ 
             height: '80px',
             background: 'rgba(255, 255, 255, 0.05)',
             borderColor: 'rgba(255, 255, 255, 0.1)',
             borderWidth: '1px'
           }}>
        <div className="flex items-center justify-between h-full">
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
                   backgroundColor: 'rgba(0, 122, 255, 0.1)',
                   borderColor: 'rgba(0, 122, 255, 0.3)',
                 }}>
              <Shield className="w-8 h-8" style={{ color: '#007aff' }} />
            </div>
            <div>
              <h2 className="text-xl font-medium modern-font tracking-tight" style={{ color: '#ffffff' }}>
                Processing Units
              </h2>
              <p className="modern-font text-sm" style={{ color: '#8e8e93' }}>CPU and GPU performance monitoring</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onSendReport('processing')}
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
                   backgroundColor: `${getPerformanceColor()}20`,
                   borderColor: `${getPerformanceColor()}50`,
                   color: getPerformanceColor(),
                 }}>
              {performanceState.charAt(0).toUpperCase() + performanceState.slice(1)}
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-8 h-[calc(100%-140px)]">
        {/* CPU Details */}
        <div className="modern-panel p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-medium modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-3 rounded-2xl mr-4" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                <Cpu className="w-8 h-8" style={{ color: '#007aff' }} />
              </div>
              CPU Core
            </h3>
            <div className="modern-display px-4 py-2 modern-font text-sm font-semibold"
                 style={{ 
                   backgroundColor: `${getPerformanceColor()}20`,
                   borderColor: `${getPerformanceColor()}50`,
                   color: getPerformanceColor(),
                 }}>
              {performanceState.charAt(0).toUpperCase() + performanceState.slice(1)}
            </div>
          </div>

          {/* Unified CPU Metrics */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold modern-font mb-3" 
                     style={{ 
                       color: '#007aff',
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {systemMetrics.cpuUsage.toFixed(1)}%
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Utilization</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold modern-font mb-3" 
                     style={{ 
                       color: getTemperatureColor(temperature),
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {temperature.toFixed(1)}°C
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Temperature</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold modern-font mb-3" 
                     style={{ 
                       color: '#ff9500',
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  1800
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>MHz</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold modern-font mb-3" 
                     style={{ 
                       color: '#34c759',
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {systemMetrics.loadAverage}
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Load Average</div>
              </div>
            </div>
          </div>

          {/* Performance Thresholds */}
          <div className="mt-8 modern-display p-6">
            <h4 className="text-lg font-bold modern-font mb-6" style={{ color: '#ffffff' }}>Thermal Thresholds</h4>
            <div className="space-y-4">
              <div className="flex justify-between text-base modern-font">
                <span style={{ color: '#34c759' }}>Optimal</span>
                <span style={{ color: '#ffffff' }}>{'< '}{config.temperature_thresholds.normal}°C</span>
              </div>
              <div className="flex justify-between text-base modern-font">
                <span style={{ color: '#ff9500' }}>Warning</span>
                <span style={{ color: '#ffffff' }}>{config.temperature_thresholds.normal}-{config.temperature_thresholds.warning}°C</span>
              </div>
              <div className="flex justify-between text-base modern-font">
                <span style={{ color: '#ff3b30' }}>Critical</span>
                <span style={{ color: '#ffffff' }}>{'> '}{config.temperature_thresholds.warning}°C</span>
              </div>
            </div>
          </div>
        </div>

        {/* GPU Details */}
        <div className="modern-panel p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-medium modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-3 rounded-2xl mr-4" style={{ backgroundColor: 'rgba(88, 86, 214, 0.2)' }}>
                <Monitor className="w-8 h-8" style={{ color: '#5856d6' }} />
              </div>
              GPU Core
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 animate-pulse rounded-full" 
                   style={{ 
                     backgroundColor: '#34c759',
                     boxShadow: '0 0 8px #34c759'
                   }}></div>
              <span className="text-sm modern-font" style={{ color: '#34c759' }}>Online</span>
            </div>
          </div>

          {/* Unified GPU Metrics */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold modern-font mb-3" 
                     style={{ 
                       color: '#5856d6',
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {gpuMetrics.usage.toFixed(1)}%
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Utilization</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold modern-font mb-3" 
                     style={{ 
                       color: getTemperatureColor(gpuMetrics.temperature),
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {gpuMetrics.temperature.toFixed(1)}°C
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Temperature</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold modern-font mb-3" 
                     style={{ 
                       color: '#007aff',
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {gpuMetrics.clockSpeed.toFixed(0)}
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>MHz</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold modern-font mb-3" 
                     style={{ 
                       color: '#ff3b30',
                       fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                     }}>
                  {gpuMetrics.powerDraw.toFixed(1)}W
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Power</div>
              </div>
            </div>
          </div>

          {/* Memory Usage */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <HardDrive className="w-5 h-5" style={{ color: '#5856d6' }} />
                <span className="text-base modern-font" style={{ color: '#ffffff' }}>VRAM</span>
              </div>
              <span className="text-base modern-font" style={{ color: '#8e8e93' }}>
                {(gpuMetrics.memoryUsed/1024).toFixed(1)}GB / {(gpuMetrics.memoryTotal/1024).toFixed(1)}GB
              </span>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold modern-font mb-3" 
                   style={{ 
                     color: '#5856d6',
                     fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                   }}>
                {((gpuMetrics.memoryUsed/gpuMetrics.memoryTotal)*100).toFixed(1)}%
              </div>
              <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Memory Usage</div>
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
            radial-gradient(circle at 80% 80%, rgba(88, 86, 214, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 149, 0, 0.01) 0%, transparent 50%);
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