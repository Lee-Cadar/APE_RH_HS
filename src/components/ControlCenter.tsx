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
    postcode: string;
    what3words: string;
  };
  aiMode: string;
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
  locationInfo,
  aiMode
}: ControlCenterProps) {
  
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes.toFixed(1)} B/s`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB/s`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB/s`;
  };

  // Get unified color based on danger level
  const getMetricColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return '#007aff'; // Blue for normal
    if (value <= thresholds.warning) return '#007aff'; // Keep blue for warning
    return '#ff3b30'; // Red only for dangerous
  };

  // Modern Unified Panel Component with Technology Font
  const ModernPanel = ({ 
    title, 
    icon: Icon, 
    metrics, 
    onClick 
  }: {
    title: string;
    icon: any;
    metrics: Array<{label: string; value: string | number; unit?: string; isDangerous?: boolean}>;
    onClick: () => void;
  }) => {
    return (
      <button
        onClick={onClick}
        className="modern-metrics-panel transition-all duration-500 transform hover:scale-105 active:scale-95 group p-6"
        style={{ height: '200px' }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
              <Icon className="w-6 h-6" style={{ color: '#007aff' }} />
            </div>
            <h3 className="text-lg font-medium tech-font tracking-tight" style={{ color: '#ffffff' }}>
              {title}
            </h3>
          </div>
          <div className="w-2 h-2 animate-pulse rounded-full" 
               style={{ 
                 backgroundColor: '#007aff',
                 boxShadow: '0 0 8px #007aff'
               }}></div>
        </div>
        
        {/* Perfect 2x2 grid for 4 metrics */}
        <div className="grid grid-cols-2 gap-4 h-24">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center flex flex-col justify-center">
              <div className="text-xl font-medium tech-font mb-1" 
                   style={{ 
                     color: metric.isDangerous ? '#ff3b30' : '#007aff',
                     fontFamily: 'Technology, "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace'
                   }}>
                {metric.value}{metric.unit || ''}
              </div>
              <div className="text-xs tech-font opacity-70" 
                   style={{ color: '#ffffff', fontSize: '10px' }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Status indicator */}
        <div className="mt-4 flex justify-center">
          <div className="w-4 h-4 animate-pulse rounded-full" 
               style={{ 
                 backgroundColor: '#007aff',
                 boxShadow: '0 0 12px rgba(0, 122, 255, 0.5)'
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

      {/* Header with Generate Report Button - Moved to Bottom */}
      <div className="relative z-10 grid grid-cols-2 gap-6" 
           style={{ height: 'calc(100% - 80px)' }}>
        
        {/* Top Left - Processing */}
        <div className="w-full">
          <ModernPanel
            title="Processing"
            icon={Cpu}
            onClick={() => onMetricClick('cpu')}
            metrics={[
              { label: 'CPU Usage', value: systemMetrics.cpuUsage.toFixed(1), unit: '%', isDangerous: systemMetrics.cpuUsage > 85 },
              { label: 'CPU Temp', value: temperature.toFixed(1), unit: '°C', isDangerous: temperature > 80 },
              { label: 'GPU Usage', value: gpuMetrics.usage.toFixed(1), unit: '%', isDangerous: gpuMetrics.usage > 90 },
              { label: 'GPU Temp', value: gpuMetrics.temperature.toFixed(1), unit: '°C', isDangerous: gpuMetrics.temperature > 80 }
            ]}
          />
        </div>
        
        {/* Top Right - Network */}
        <div className="w-full">
          <ModernPanel
            title="Network"
            icon={Wifi}
            onClick={() => onMetricClick('network')}
            metrics={[
              { label: 'Signal', value: networkMetrics.signalStrength.toFixed(1), unit: '%', isDangerous: networkMetrics.signalStrength < 30 },
              { label: 'Latency', value: networkMetrics.latency.toFixed(1), unit: 'ms', isDangerous: networkMetrics.latency > 150 },
              { label: 'Download', value: formatBytes(networkMetrics.downloadSpeed).split(' ')[0], unit: formatBytes(networkMetrics.downloadSpeed).split(' ')[1] },
              { label: 'Upload', value: formatBytes(networkMetrics.uploadSpeed).split(' ')[0], unit: formatBytes(networkMetrics.uploadSpeed).split(' ')[1] }
            ]}
          />
        </div>

        {/* Bottom Left - Thermal */}
        <div className="w-full">
          <ModernPanel
            title="Thermal"
            icon={Thermometer}
            onClick={() => onMetricClick('temperature')}
            metrics={[
              { label: 'Core Temp', value: temperature.toFixed(1), unit: '°C', isDangerous: temperature > 80 },
              { label: 'Fan Speed', value: fanSpeed.toFixed(1), unit: '%' },
              { label: 'Status', value: ledColor === 'green' ? 'Optimal' : ledColor === 'yellow' ? 'Warning' : 'Critical', isDangerous: ledColor === 'red' },
              { label: 'Mode', value: aiMode.charAt(0).toUpperCase() + aiMode.slice(1) }
            ]}
          />
        </div>

        {/* Bottom Right - System */}
        <div className="w-full">
          <ModernPanel
            title="System"
            icon={HardDrive}
            onClick={() => onMetricClick('memory')}
            metrics={[
              { label: 'Memory', value: systemMetrics.memoryUsage.toFixed(1), unit: '%', isDangerous: systemMetrics.memoryUsage > 90 },
              { label: 'Processes', value: systemMetrics.processes, isDangerous: systemMetrics.processes > 250 },
              { label: 'Uptime', value: systemMetrics.uptime },
              { label: 'Load Avg', value: systemMetrics.loadAverage, isDangerous: parseFloat(systemMetrics.loadAverage) > 2.0 }
            ]}
          />
        </div>
      </div>

      {/* Generate Report Button - Bottom Center */}
      <div className="relative z-10 mt-6 flex justify-center">
        <button
          onClick={() => onSendReport('all')}
          className="modern-button px-8 py-3 transition-all duration-300 flex items-center space-x-3 tech-font text-sm font-medium hover:scale-105"
          style={{ 
            backgroundColor: 'rgba(0, 122, 255, 0.1)',
            color: '#007aff',
            borderColor: 'rgba(0, 122, 255, 0.3)',
            boxShadow: '0 0 20px rgba(0, 122, 255, 0.2)'
          }}
        >
          <Mail className="w-5 h-5" />
          <span>GENERATE COMPREHENSIVE REPORT</span>
        </button>
      </div>

      {/* Enhanced Modern CSS animations with perfect symmetry */}
      <style jsx>{`
        .modern-metrics-panel {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.5s ease;
          width: 100%;
        }
        
        .modern-metrics-panel:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transform: translateY(-2px) scale(1.02);
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
          animation: floatElements 60s linear infinite;
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