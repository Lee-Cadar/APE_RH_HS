import React from 'react';
import { PerformanceState } from '../types/ape';
import { RetroGauge } from './RetroGauge';
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
  fontSizes: any;
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
  aiMode,
  fontSizes
}: ControlCenterProps) {
  
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes.toFixed(1)} B/s`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB/s`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB/s`;
  };

  // Get color based on value and thresholds
  const getMetricColor = (value: number, good: number, bad: number) => {
    if (value <= good) return '#34c759'; // Green for good
    if (value >= bad) return '#ff3b30'; // Red for bad
    return '#ff9500'; // Orange for warning
  };

  // Modern Unified Panel Component with Clean Design
  const ModernPanel = ({ 
    title, 
    icon: Icon, 
    metrics, 
    onClick,
    color = '#007aff'
  }: {
    title: string;
    icon: any;
    metrics: Array<{label: string; value: string | number; unit?: string; color?: string}>;
    onClick: () => void;
    color?: string;
  }) => {
    return (
      <button
        onClick={onClick}
        className="modern-metrics-panel transition-all duration-300 transform hover:scale-105 active:scale-95 group p-6"
        style={{ height: '280px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}20` }}>
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <h3 className="font-medium modern-font tracking-tight" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
              {title}
            </h3>
          </div>
          <div className="w-2 h-2 animate-pulse rounded-full" 
               style={{ 
                 backgroundColor: color,
                 boxShadow: `0 0 8px ${color}`
               }}></div>
        </div>
        
        {/* Metrics Grid - Clean 2x2 layout */}
        <div className="grid grid-cols-2 gap-6 h-48">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col justify-center items-center text-center">
              <div className="font-bold mb-2" 
                   style={{ 
                     color: metric.color || color,
                     fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                     fontSize: fontSizes.value
                   }}>
                {metric.value}{metric.unit || ''}
              </div>
              <div className="modern-font opacity-80" 
                   style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Status indicator */}
        <div className="mt-4 flex justify-center">
          <div className="w-4 h-4 animate-pulse rounded-full" 
               style={{ 
                 backgroundColor: color,
                 boxShadow: `0 0 12px ${color}50`
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

      {/* Main Grid Layout - Cleaner spacing */}
      <div className="relative z-10 space-y-8">
        
        {/* Top Row - Key Metrics */}
        <div className="grid grid-cols-4 gap-6">
          
          {/* CPU Panel */}
          <ModernPanel
            title="CPU Core"
            icon={Cpu}
            color="#007aff"
            onClick={() => onMetricClick('cpu')}
            metrics={[
              { 
                label: 'Usage', 
                value: systemMetrics.cpuUsage.toFixed(1), 
                unit: '%', 
                color: getMetricColor(systemMetrics.cpuUsage, 50, 85) 
              },
              { 
                label: 'Temperature', 
                value: temperature.toFixed(1), 
                unit: '°C', 
                color: getMetricColor(temperature, 60, 80) 
              },
              { 
                label: 'Load Avg', 
                value: systemMetrics.loadAverage 
              },
              { 
                label: 'Available', 
                value: (100 - systemMetrics.cpuUsage).toFixed(1), 
                unit: '%',
                color: '#34c759'
              }
            ]}
          />

          {/* GPU Panel */}
          <ModernPanel
            title="GPU Core"
            icon={Monitor}
            color="#5856d6"
            onClick={() => onMetricClick('gpu')}
            metrics={[
              { 
                label: 'Usage', 
                value: gpuMetrics.usage.toFixed(1), 
                unit: '%', 
                color: getMetricColor(gpuMetrics.usage, 60, 90) 
              },
              { 
                label: 'Temperature', 
                value: gpuMetrics.temperature.toFixed(1), 
                unit: '°C', 
                color: getMetricColor(gpuMetrics.temperature, 60, 80) 
              },
              { 
                label: 'VRAM', 
                value: ((gpuMetrics.memoryUsed/gpuMetrics.memoryTotal)*100).toFixed(1), 
                unit: '%' 
              },
              { 
                label: 'Power', 
                value: gpuMetrics.powerDraw.toFixed(0), 
                unit: 'W',
                color: '#ff9500'
              }
            ]}
          />

          {/* Memory Panel */}
          <ModernPanel
            title="Memory"
            icon={HardDrive}
            color="#34c759"
            onClick={() => onMetricClick('memory')}
            metrics={[
              { 
                label: 'Usage', 
                value: systemMetrics.memoryUsage.toFixed(1), 
                unit: '%', 
                color: getMetricColor(systemMetrics.memoryUsage, 70, 90) 
              },
              { 
                label: 'Available', 
                value: (100 - systemMetrics.memoryUsage).toFixed(1), 
                unit: '%',
                color: '#34c759'
              },
              { 
                label: 'Processes', 
                value: systemMetrics.processes 
              },
              { 
                label: 'Uptime', 
                value: systemMetrics.uptime 
              }
            ]}
          />

          {/* Network Panel */}
          <ModernPanel
            title="Network"
            icon={Wifi}
            color="#ff9500"
            onClick={() => onMetricClick('network')}
            metrics={[
              { 
                label: 'Signal', 
                value: networkMetrics.signalStrength.toFixed(1), 
                unit: '%', 
                color: getMetricColor(100 - networkMetrics.signalStrength, 20, 50) 
              },
              { 
                label: 'Latency', 
                value: networkMetrics.latency.toFixed(1), 
                unit: 'ms', 
                color: getMetricColor(networkMetrics.latency, 50, 150) 
              },
              { 
                label: 'Download', 
                value: formatBytes(networkMetrics.downloadSpeed).split(' ')[0], 
                unit: formatBytes(networkMetrics.downloadSpeed).split(' ')[1] 
              },
              { 
                label: 'Upload', 
                value: formatBytes(networkMetrics.uploadSpeed).split(' ')[0], 
                unit: formatBytes(networkMetrics.uploadSpeed).split(' ')[1] 
              }
            ]}
          />
        </div>

        {/* Bottom Row - Gauges and Status */}
        <div className="grid grid-cols-3 gap-8">
          
          {/* CPU Gauge */}
          <div className="flex items-center justify-center">
            <RetroGauge
              value={systemMetrics.cpuUsage}
              max={100}
              label="CPU UTILIZATION"
              unit="%"
              color={getMetricColor(systemMetrics.cpuUsage, 50, 85)}
              size={200}
              fontSizes={fontSizes}
            />
          </div>

          {/* GPU Gauge */}
          <div className="flex items-center justify-center">
            <RetroGauge
              value={gpuMetrics.usage}
              max={100}
              label="GPU UTILIZATION"
              unit="%"
              color={getMetricColor(gpuMetrics.usage, 60, 90)}
              size={200}
              fontSizes={fontSizes}
            />
          </div>
          
          {/* System Status Panel */}
          <div className="modern-display p-6 flex flex-col justify-center">
            <div className="text-center mb-6">
              <h3 className="font-medium modern-font mb-4" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                System Status
              </h3>
              
              {/* AI Mode Display */}
              <div className="mb-4">
                <div className="font-bold mb-2" 
                     style={{ 
                       color: aiMode === 'optimal' ? '#34c759' : 
                              aiMode === 'gaming' ? '#ff3b30' : 
                              aiMode === 'cinema' ? '#5856d6' : '#ff9500',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: fontSizes.value
                     }}>
                  {aiMode.toUpperCase()}
                </div>
                <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                  AI Mode Active
                </div>
              </div>

              {/* Thermal Status */}
              <div className="mb-4">
                <div className="font-bold mb-2" 
                     style={{ 
                       color: getMetricColor(temperature, 60, 80),
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: fontSizes.value
                     }}>
                  {temperature < 60 ? 'OPTIMAL' : temperature < 80 ? 'WARM' : 'HOT'}
                </div>
                <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                  Thermal State
                </div>
              </div>

              {/* Performance State */}
              <div>
                <div className="font-bold mb-2" 
                     style={{ 
                       color: performanceState === 'performance' ? '#34c759' : 
                              performanceState === 'balanced' ? '#ff9500' : '#ff3b30',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: fontSizes.value
                     }}>
                  {performanceState.toUpperCase()}
                </div>
                <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                  Performance Mode
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Report Button */}
        <div className="flex justify-center">
          <button
            onClick={() => onSendReport('all')}
            className="modern-button px-8 py-4 transition-all duration-300 flex items-center space-x-3 modern-font font-medium hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(0, 122, 255, 0.1)',
              color: '#007aff',
              borderColor: 'rgba(0, 122, 255, 0.3)',
              boxShadow: '0 0 20px rgba(0, 122, 255, 0.2)',
              fontSize: fontSizes.h2
            }}
          >
            <Mail className="w-5 h-5" />
            <span>GENERATE COMPREHENSIVE REPORT</span>
          </button>
        </div>
      </div>

      {/* Enhanced Modern CSS animations */}
      <style jsx>{`
        .modern-metrics-panel {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
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
        
        .modern-display {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(20px);
        }
        
        .modern-font {
          font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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