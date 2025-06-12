import React, { useState, useEffect } from 'react';
import { Wifi, Activity, TrendingUp, BarChart3, Signal, Download, Upload, Globe, Zap } from 'lucide-react';

interface NetworkAnalyzerProps {
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

export function NetworkAnalyzer({ networkMetrics }: NetworkAnalyzerProps) {
  const [realtimeData, setRealtimeData] = useState<Array<{
    timestamp: number;
    download: number;
    upload: number;
    latency: number;
    signal: number;
  }>>([]);

  const [selectedTimeframe, setSelectedTimeframe] = useState('60s');

  // Generate real-time data points
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newDataPoint = {
        timestamp: now,
        download: networkMetrics.downloadSpeed + (Math.random() - 0.5) * 1024 * 1024,
        upload: networkMetrics.uploadSpeed + (Math.random() - 0.5) * 512 * 1024,
        latency: networkMetrics.latency + (Math.random() - 0.5) * 20,
        signal: networkMetrics.signalStrength + (Math.random() - 0.5) * 10
      };

      setRealtimeData(prev => {
        const updated = [...prev, newDataPoint];
        // Keep only last 120 points (2 minutes at 1 point per second)
        return updated.slice(-120);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [networkMetrics]);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes.toFixed(1)} B/s`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB/s`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB/s`;
  };

  const getMaxValue = (data: number[]) => Math.max(...data, 1);

  const renderGraph = (data: number[], color: string, label: string) => {
    if (data.length < 2) return null;

    const maxValue = getMaxValue(data);
    const width = 400; // 4x wider than before (was 100)
    const height = 80; // Slightly taller for better visibility
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (value / maxValue) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="modern-display p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg modern-font font-bold" style={{ color: '#ffffff' }}>{label}</span>
          <span className="text-sm modern-font" style={{ color: color }}>
            {label.includes('Download') ? formatBytes(data[data.length - 1] || 0) :
             label.includes('Upload') ? formatBytes(data[data.length - 1] || 0) :
             label.includes('Latency') ? `${(data[data.length - 1] || 0).toFixed(1)}ms` :
             `${(data[data.length - 1] || 0).toFixed(1)}%`}
          </span>
        </div>
        <div className="relative">
          <svg width="100%" height="80" viewBox={`0 0 ${width} ${height}`} className="w-full">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map(percent => (
              <line
                key={percent}
                x1="0"
                y1={height * (percent / 100)}
                x2={width}
                y2={height * (percent / 100)}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
            ))}
            
            {/* Data line */}
            <polyline
              points={points}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: `drop-shadow(0 0 6px ${color})` }}
            />
            
            {/* Fill area */}
            <polygon
              points={`0,${height} ${points} ${width},${height}`}
              fill={`url(#gradient-${label.replace(/\s+/g, '-')})`}
              opacity="0.3"
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id={`gradient-${label.replace(/\s+/g, '-')}`} x1="0%\" y1="0%\" x2="0%\" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.8"/>
                <stop offset="100%" stopColor={color} stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  };

  const downloadData = realtimeData.map(d => d.download);
  const uploadData = realtimeData.map(d => d.upload);
  const latencyData = realtimeData.map(d => d.latency);
  const signalData = realtimeData.map(d => d.signal);

  return (
    <div className="h-full space-y-8 relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles"></div>
      </div>

      {/* Header */}
      <div className="relative modern-panel-header p-8 shadow-lg"
           style={{ 
             height: '100px',
             background: 'rgba(255, 255, 255, 0.05)',
             borderColor: 'rgba(255, 255, 255, 0.1)',
             borderWidth: '1px'
           }}>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-6">
            <div className="modern-button p-4"
                 style={{ 
                   backgroundColor: 'rgba(52, 199, 89, 0.1)',
                   borderColor: 'rgba(52, 199, 89, 0.3)',
                 }}>
              <Activity className="w-9 h-9" style={{ color: '#34c759' }} />
            </div>
            <div>
              <h2 className="text-2xl font-medium modern-font tracking-tight" style={{ color: '#ffffff' }}>
                Network Performance Analyzer
              </h2>
              <p className="modern-font text-base" style={{ color: '#8e8e93' }}>Real-time network monitoring and analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="modern-input px-4 py-3 modern-font text-base"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
              }}
            >
              <option value="60s">Last 60 seconds</option>
              <option value="5m">Last 5 minutes</option>
              <option value="1h">Last hour</option>
            </select>
            
            <div className="modern-display px-6 py-3 modern-font text-base font-semibold"
                 style={{ 
                   backgroundColor: 'rgba(52, 199, 89, 0.1)',
                   borderColor: 'rgba(52, 199, 89, 0.3)',
                   color: '#34c759',
                 }}>
              {networkMetrics.connectionType}
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Graphs - 2x2 Grid */}
      <div className="relative grid grid-cols-2 gap-8 h-[calc(100%-280px)]">
        {/* Download Speed Graph */}
        {renderGraph(downloadData, '#007aff', 'Download Speed')}

        {/* Upload Speed Graph */}
        {renderGraph(uploadData, '#34c759', 'Upload Speed')}

        {/* Latency Graph */}
        {renderGraph(latencyData, '#ff9500', 'Latency')}

        {/* Signal Strength Graph */}
        {renderGraph(signalData, '#5856d6', 'Signal Strength')}
      </div>

      {/* Current Stats Bar */}
      <div className="relative modern-panel p-6 shadow-lg">
        <div className="grid grid-cols-6 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Download className="w-5 h-5 mr-2" style={{ color: '#007aff' }} />
              <span className="text-sm modern-font" style={{ color: '#8e8e93' }}>Download</span>
            </div>
            <div className="font-bold" 
                 style={{ 
                   color: '#007aff',
                   fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                   fontSize: '22px'
                 }}>
              {formatBytes(networkMetrics.downloadSpeed)}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Upload className="w-5 h-5 mr-2" style={{ color: '#34c759' }} />
              <span className="text-sm modern-font" style={{ color: '#8e8e93' }}>Upload</span>
            </div>
            <div className="font-bold" 
                 style={{ 
                   color: '#34c759',
                   fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                   fontSize: '22px'
                 }}>
              {formatBytes(networkMetrics.uploadSpeed)}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 mr-2" style={{ color: '#ff9500' }} />
              <span className="text-sm modern-font" style={{ color: '#8e8e93' }}>Latency</span>
            </div>
            <div className="font-bold" 
                 style={{ 
                   color: '#ff9500',
                   fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                   fontSize: '22px'
                 }}>
              {networkMetrics.latency.toFixed(1)}ms
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Signal className="w-5 h-5 mr-2" style={{ color: '#5856d6' }} />
              <span className="text-sm modern-font" style={{ color: '#8e8e93' }}>Signal</span>
            </div>
            <div className="font-bold" 
                 style={{ 
                   color: '#5856d6',
                   fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                   fontSize: '22px'
                 }}>
              {networkMetrics.signalStrength.toFixed(1)}%
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="w-5 h-5 mr-2" style={{ color: '#ff3b30' }} />
              <span className="text-sm modern-font" style={{ color: '#8e8e93' }}>Packets RX</span>
            </div>
            <div className="font-bold" 
                 style={{ 
                   color: '#ff3b30',
                   fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                   fontSize: '22px'
                 }}>
              {(networkMetrics.packetsReceived / 1000).toFixed(0)}K
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 mr-2" style={{ color: '#ff59b3' }} />
              <span className="text-sm modern-font" style={{ color: '#8e8e93' }}>Packets TX</span>
            </div>
            <div className="font-bold" 
                 style={{ 
                   color: '#ff59b3',
                   fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                   fontSize: '22px'
                 }}>
              {(networkMetrics.packetsSent / 1000).toFixed(0)}K
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
        
        .modern-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }
        
        .modern-input:focus {
          outline: none;
          border-color: rgba(0, 122, 255, 0.5);
          box-shadow: 0 0 20px rgba(0, 122, 255, 0.2);
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