import React from 'react';
import { PerformanceState } from '../types/ape';
import { 
  Cpu, 
  Monitor, 
  Thermometer, 
  Fan, 
  Wifi, 
  HardDrive, 
  Activity, 
  Clock,
  Users,
  Zap,
  Signal,
  Download,
  Upload,
  Shield,
  Mail,
  MapPin,
  Globe,
  Satellite,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

interface ControlCenterProps {
  temperature: number;
  performanceState: PerformanceState;
  fanSpeed: number;
  ledColor: string;
  gpuMetrics: any;
  networkMetrics: any;
  systemMetrics: any;
  onMetricClick: (metricType: string) => void;
  onSendReport: (category: string) => void;
  locationInfo: {
    coordinates: string;
    address: string;
    city: string;
    district: string;
    country: string;
    timezone: string;
    elevation: string;
    isp: string;
  };
}

export function ControlCenter({
  temperature,
  performanceState,
  fanSpeed,
  ledColor,
  gpuMetrics,
  networkMetrics,
  systemMetrics,
  onMetricClick,
  onSendReport,
  locationInfo
}: ControlCenterProps) {
  
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes.toFixed(1)} B/s`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB/s`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB/s`;
  };

  // Modern Unified Panel Component
  const ModernPanel = ({ 
    title, 
    icon: Icon, 
    metrics, 
    color = '#007aff',
    onClick 
  }: {
    title: string;
    icon: any;
    metrics: Array<{label: string; value: string | number; unit?: string; subColor?: string}>;
    color?: string;
    onClick: () => void;
  }) => {
    return (
      <button
        onClick={onClick}
        className="modern-metrics-panel h-full transition-all duration-500 transform hover:scale-105 active:scale-95 group p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl" style={{ backgroundColor: `${color}20` }}>
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <h3 className="text-lg font-bold modern-font tracking-tight" style={{ color: '#ffffff' }}>
              {title}
            </h3>
          </div>
          <div className="w-2 h-2 animate-pulse rounded-full" 
               style={{ 
                 backgroundColor: color,
                 boxShadow: `0 0 8px ${color}`
               }}></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold modern-font mb-2" 
                   style={{ 
                     color: metric.subColor || color,
                     fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                   }}>
                {metric.value}{metric.unit || ''}
              </div>
              <div className="text-xs modern-font opacity-70" 
                   style={{ color: '#ffffff', fontSize: '11px' }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Status indicator */}
        <div className="mt-4 flex justify-center">
          <div className="w-6 h-6 animate-pulse rounded-full" 
               style={{ 
                 backgroundColor: color,
                 boxShadow: `0 0 15px ${color}50`
               }}></div>
        </div>
      </button>
    );
  };

  return (
    <div className="h-full relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-elements"></div>
      </div>

      {/* Central Logo with modern breathing effect - MOVED TO BACK */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <div className="relative">
          <img 
            src="/triangle2.png" 
            alt="APE Logo" 
            className="object-contain opacity-3"
            style={{ 
              width: '150px', 
              height: '150px',
              filter: 'brightness(0) saturate(100%) invert(100%)',
              animation: 'modernLogoBreath 6s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              background: 'radial-gradient(circle, #007aff 0%, transparent 70%)',
              animation: 'modernGlowPulse 6s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="modern-panel-header p-4 shadow-lg mb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight modern-font" style={{ color: '#ffffff' }}>
              Command Center
            </h2>
            <p className="font-medium text-sm modern-font mt-1" style={{ color: '#8e8e93' }}>
              Real-time system monitoring and control
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onSendReport('all')}
              className="modern-button px-6 py-2 transition-all duration-300 flex items-center space-x-2 modern-font text-sm font-semibold"
              style={{ 
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                color: '#007aff',
                borderColor: 'rgba(0, 122, 255, 0.3)'
              }}
            >
              <Mail className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
            <div className="modern-display px-4 py-2 font-semibold text-sm modern-font" 
            style={{ 
              backgroundColor: temperature < 60 ? 'rgba(52, 199, 89, 0.1)' : temperature < 80 ? 'rgba(255, 149, 0, 0.1)' : 'rgba(255, 59, 48, 0.1)',
              color: temperature < 60 ? '#34c759' : temperature < 80 ? '#ff9500' : '#ff3b30',
              borderColor: temperature < 60 ? 'rgba(52, 199, 89, 0.3)' : temperature < 80 ? 'rgba(255, 149, 0, 0.3)' : 'rgba(255, 59, 48, 0.3)'
            }}>
              {temperature < 60 ? 'Optimal' : temperature < 80 ? 'Warning' : 'Critical'}
            </div>
          </div>
        </div>
      </div>

      {/* FIXED: Centered Modern Metrics Grid Layout - NO OVERLAPPING */}
      <div className="relative h-[calc(100%-140px)] z-10 flex items-center justify-center px-4" 
           style={{ minHeight: '350px' }}>
        
        <div className="grid grid-cols-2 grid-rows-2 gap-6 max-w-5xl w-full h-full">
          {/* Processing Units Panel - TOP LEFT */}
          <div className="col-span-1 row-span-1 h-full">
            <ModernPanel
              title="Processing"
              icon={Cpu}
              color="#007aff"
              onClick={() => onMetricClick('cpu')}
              metrics={[
                { label: 'CPU Usage', value: systemMetrics.cpuUsage.toFixed(1), unit: '%' },
                { label: 'CPU Temp', value: temperature.toFixed(1), unit: '°C', subColor: temperature < 60 ? '#34c759' : temperature < 80 ? '#ff9500' : '#ff3b30' },
                { label: 'GPU Usage', value: gpuMetrics.usage.toFixed(1), unit: '%', subColor: '#5856d6' },
                { label: 'GPU Temp', value: gpuMetrics.temperature.toFixed(1), unit: '°C', subColor: gpuMetrics.temperature < 60 ? '#34c759' : gpuMetrics.temperature < 80 ? '#ff9500' : '#ff3b30' }
              ]}
            />
          </div>
          
          {/* Thermal Control Panel - TOP RIGHT */}
          <div className="col-span-1 row-span-1 h-full">
            <ModernPanel
              title="Thermal"
              icon={Thermometer}
              color="#ff9500"
              onClick={() => onMetricClick('temperature')}
              metrics={[
                { label: 'Core Temp', value: temperature.toFixed(1), unit: '°C', subColor: temperature < 60 ? '#34c759' : temperature < 80 ? '#ff9500' : '#ff3b30' },
                { label: 'Fan Speed', value: fanSpeed.toFixed(1), unit: '%', subColor: '#007aff' },
                { label: 'Status', value: ledColor === 'green' ? 'Optimal' : ledColor === 'yellow' ? 'Warning' : 'Critical', subColor: ledColor === 'green' ? '#34c759' : ledColor === 'yellow' ? '#ff9500' : '#ff3b30' },
                { label: 'Mode', value: performanceState === 'performance' ? 'Performance' : performanceState === 'balanced' ? 'Balanced' : 'Power Save', subColor: performanceState === 'performance' ? '#34c759' : performanceState === 'balanced' ? '#ff9500' : '#ff3b30' }
              ]}
            />
          </div>

          {/* Network Command Panel - BOTTOM LEFT */}
          <div className="col-span-1 row-span-1 h-full">
            <ModernPanel
              title="Network"
              icon={Wifi}
              color="#34c759"
              onClick={() => onMetricClick('network')}
              metrics={[
                { label: 'Signal', value: networkMetrics.signalStrength.toFixed(1), unit: '%', subColor: networkMetrics.signalStrength > 80 ? '#34c759' : networkMetrics.signalStrength > 50 ? '#ff9500' : '#ff3b30' },
                { label: 'Latency', value: networkMetrics.latency.toFixed(1), unit: 'ms', subColor: networkMetrics.latency < 50 ? '#34c759' : networkMetrics.latency < 100 ? '#ff9500' : '#ff3b30' },
                { label: 'Download', value: formatBytes(networkMetrics.downloadSpeed).split(' ')[0], unit: formatBytes(networkMetrics.downloadSpeed).split(' ')[1], subColor: '#007aff' },
                { label: 'Upload', value: formatBytes(networkMetrics.uploadSpeed).split(' ')[0], unit: formatBytes(networkMetrics.uploadSpeed).split(' ')[1], subColor: '#5856d6' }
              ]}
            />
          </div>

          {/* System Core Panel - BOTTOM RIGHT */}
          <div className="col-span-1 row-span-1 h-full">
            <ModernPanel
              title="System"
              icon={HardDrive}
              color="#5856d6"
              onClick={() => onMetricClick('memory')}
              metrics={[
                { label: 'Memory', value: systemMetrics.memoryUsage.toFixed(1), unit: '%', subColor: systemMetrics.memoryUsage < 70 ? '#34c759' : systemMetrics.memoryUsage < 85 ? '#ff9500' : '#ff3b30' },
                { label: 'Processes', value: systemMetrics.processes, subColor: '#007aff' },
                { label: 'Uptime', value: systemMetrics.uptime, subColor: '#34c759' },
                { label: 'Load Avg', value: systemMetrics.loadAverage, subColor: parseFloat(systemMetrics.loadAverage) < 1.0 ? '#34c759' : parseFloat(systemMetrics.loadAverage) < 2.0 ? '#ff9500' : '#ff3b30' }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Modern CSS animations */}
      <style jsx>{`
        .modern-panel-header {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .modern-metrics-panel {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.5s ease;
          min-height: 160px;
        }
        
        .modern-metrics-panel:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transform: translateY(-2px) scale(1.02);
        }
        
        .floating-elements {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(0, 122, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(52, 199, 89, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 149, 0, 0.01) 0%, transparent 50%);
          animation: floatElements 50s linear infinite;
        }
        
        @keyframes modernLogoBreath {
          0% { 
            opacity: 0.03; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.08; 
            transform: scale(1.05);
          }
          100% { 
            opacity: 0.03; 
            transform: scale(1);
          }
        }
        
        @keyframes modernGlowPulse {
          0% { 
            opacity: 0.03; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.1; 
            transform: scale(1.2);
          }
          100% { 
            opacity: 0.03; 
            transform: scale(1);
          }
        }
        
        @keyframes floatElements {
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