import React, { useState } from 'react';
import { ArrowLeft, Shield, Globe, Wifi, Signal, Download, Upload, MapPin, Zap, Lock, CheckCircle, AlertCircle, Map, Satellite } from 'lucide-react';

interface VPNPageProps {
  onBack: () => void;
  locationInfo: any;
  onLocationChange: (newLocation: any) => void;
  fontSizes: any;
}

export function VPNPage({ onBack, locationInfo, onLocationChange, fontSizes }: VPNPageProps) {
  const [selectedVPN, setSelectedVPN] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [bandwidthData, setBandwidthData] = useState({
    download: 45.2,
    upload: 12.8,
    latency: 28
  });

  // Store original IP for comparison
  const [originalIP, setOriginalIP] = useState('192.168.1.45');
  const [currentIP, setCurrentIP] = useState('192.168.1.45');

  const vpnServers = [
    { 
      id: 'uk-london', 
      name: 'United Kingdom', 
      city: 'London', 
      flag: '🇬🇧', 
      ping: '12ms', 
      load: 23,
      coords: { lat: 51.5074, lng: -0.1278 },
      premium: false,
      ip: '185.243.112.45',
      mapPosition: { x: 52, y: 25 }
    },
    { 
      id: 'us-newyork', 
      name: 'United States', 
      city: 'New York', 
      flag: '🇺🇸', 
      ping: '85ms', 
      load: 67,
      coords: { lat: 40.7128, lng: -74.0060 },
      premium: false,
      ip: '104.238.167.89',
      mapPosition: { x: 25, y: 35 }
    },
    { 
      id: 'de-frankfurt', 
      name: 'Germany', 
      city: 'Frankfurt', 
      flag: '🇩🇪', 
      ping: '28ms', 
      load: 34,
      coords: { lat: 50.1109, lng: 8.6821 },
      premium: false,
      ip: '89.187.142.33',
      mapPosition: { x: 55, y: 30 }
    },
    { 
      id: 'jp-tokyo', 
      name: 'Japan', 
      city: 'Tokyo', 
      flag: '🇯🇵', 
      ping: '156ms', 
      load: 45,
      coords: { lat: 35.6762, lng: 139.6503 },
      premium: true,
      ip: '103.79.141.67',
      mapPosition: { x: 85, y: 40 }
    },
    { 
      id: 'au-sydney', 
      name: 'Australia', 
      city: 'Sydney', 
      flag: '🇦🇺', 
      ping: '198ms', 
      load: 78,
      coords: { lat: -33.8688, lng: 151.2093 },
      premium: true,
      ip: '45.121.209.156',
      mapPosition: { x: 88, y: 75 }
    },
    { 
      id: 'sg-singapore', 
      name: 'Singapore', 
      city: 'Singapore', 
      flag: '🇸🇬', 
      ping: '142ms', 
      load: 56,
      coords: { lat: 1.3521, lng: 103.8198 },
      premium: true,
      ip: '128.199.248.91',
      mapPosition: { x: 78, y: 55 }
    },
    { 
      id: 'ca-toronto', 
      name: 'Canada', 
      city: 'Toronto', 
      flag: '🇨🇦', 
      ping: '92ms', 
      load: 41,
      coords: { lat: 43.6532, lng: -79.3832 },
      premium: false,
      ip: '142.93.130.78',
      mapPosition: { x: 22, y: 28 }
    },
    { 
      id: 'nl-amsterdam', 
      name: 'Netherlands', 
      city: 'Amsterdam', 
      flag: '🇳🇱', 
      ping: '35ms', 
      load: 29,
      coords: { lat: 52.3676, lng: 4.9041 },
      premium: false,
      ip: '178.62.225.134',
      mapPosition: { x: 50, y: 27 }
    }
  ];

  const handleVPNConnect = async (server: any) => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    setConnectionStatus('connecting');
    setSelectedVPN(server.id);
    
    // Simulate VPN connection process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update location info and IP
    const newLocationInfo = {
      coordinates: `${server.coords.lat.toFixed(4)}°${server.coords.lat >= 0 ? 'N' : 'S'}, ${Math.abs(server.coords.lng).toFixed(4)}°${server.coords.lng >= 0 ? 'E' : 'W'}`,
      address: "VPN Protected Location",
      city: server.city,
      district: server.name,
      country: server.name,
      timezone: "UTC",
      elevation: "0m",
      isp: "APE VPN Service",
      postcode: "VPN-001",
      what3words: "///secure.tunnel.active"
    };
    
    onLocationChange(newLocationInfo);
    setCurrentIP(server.ip);
    setConnectionStatus('connected');
    setIsConnecting(false);
    
    // Update bandwidth data based on server
    setBandwidthData({
      download: Math.random() * 50 + 30,
      upload: Math.random() * 20 + 10,
      latency: parseInt(server.ping)
    });
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
    setSelectedVPN(null);
    setCurrentIP(originalIP);
    
    // Reset to original location
    const originalLocation = {
      coordinates: "53.5074°N, 2.3372°W",
      address: "32 Hereford Drive",
      city: "Swinton, M27 5PT",
      district: "Greater Manchester",
      country: "United Kingdom",
      timezone: "GMT",
      elevation: "45m",
      isp: "BT Business",
      postcode: "M27 5PT",
      what3words: "///hiking.stream.closed"
    };
    onLocationChange(originalLocation);
  };

  const getLoadColor = (load: number) => {
    if (load < 40) return '#34c759';
    if (load < 70) return '#ff9500';
    return '#ff3b30';
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return '#34c759';
      case 'connecting': return '#ff9500';
      default: return '#8e8e93';
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black overflow-hidden"
         style={{ 
           width: '100vw', 
           height: '100vh',
           margin: '0',
           padding: '10px'
         }}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="vpn-grid"></div>
        <div className="vpn-waves"></div>
        <div className="vpn-particles"></div>
      </div>

      {/* Header */}
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
                   backgroundColor: 'rgba(88, 86, 214, 0.1)',
                   borderColor: 'rgba(88, 86, 214, 0.3)',
                 }}>
              <Shield className="w-7 h-7" style={{ color: '#5856d6' }} />
            </div>
            <div>
              <h2 className="font-medium modern-font tracking-tight" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                VPN Security Center
              </h2>
              <p className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>Secure connection and location masking</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {connectionStatus === 'connected' && (
              <button
                onClick={handleDisconnect}
                className="modern-button px-6 py-3 transition-all duration-300 flex items-center space-x-2 modern-font font-semibold"
                style={{ 
                  backgroundColor: 'rgba(255, 59, 48, 0.1)',
                  borderColor: 'rgba(255, 59, 48, 0.3)',
                  color: '#ff3b30',
                  fontSize: fontSizes.h2
                }}
              >
                <Lock className="w-4 h-4" />
                <span>Disconnect</span>
              </button>
            )}
            
            <div className="modern-display px-4 py-2 modern-font font-semibold"
                 style={{ 
                   backgroundColor: `${getConnectionStatusColor()}20`,
                   borderColor: `${getConnectionStatusColor()}50`,
                   color: getConnectionStatusColor(),
                   fontSize: fontSizes.h2
                 }}>
              {connectionStatus === 'connected' ? 'PROTECTED' : 
               connectionStatus === 'connecting' ? 'CONNECTING' : 'UNPROTECTED'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex h-[calc(100%-100px)] gap-4 p-4">
        {/* Left Side - Interactive World Map */}
        <div className="w-2/3">
          <div className="modern-panel p-6 shadow-lg h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium modern-font flex items-center" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                <Map className="w-5 h-5 mr-2" style={{ color: '#007aff' }} />
                Global Server Network
              </h3>
              <div className="flex items-center space-x-2">
                <Satellite className="w-4 h-4" style={{ color: '#34c759' }} />
                <span className="modern-font" style={{ color: '#34c759', fontSize: fontSizes.h3 }}>
                  {vpnServers.length} Servers Online
                </span>
              </div>
            </div>
            
            {/* Interactive World Map */}
            <div className="relative w-full h-[calc(100%-60px)] bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg overflow-hidden border border-white/10">
              {/* World Map SVG Background */}
              <svg viewBox="0 0 100 60" className="w-full h-full opacity-30">
                {/* Simplified world continents */}
                <path d="M15,15 L35,12 L45,18 L35,25 L25,22 Z" fill="#007aff" opacity="0.3" />
                <path d="M45,20 L65,18 L75,25 L65,30 L55,28 Z" fill="#007aff" opacity="0.3" />
                <path d="M75,25 L90,22 L95,30 L85,35 L80,32 Z" fill="#007aff" opacity="0.3" />
                <path d="M20,35 L40,32 L50,40 L35,45 L25,42 Z" fill="#007aff" opacity="0.3" />
                <path d="M85,45 L95,42 L98,50 L90,55 L85,52 Z" fill="#007aff" opacity="0.3" />
              </svg>
              
              {/* Server Markers */}
              {vpnServers.map((server) => (
                <button
                  key={server.id}
                  onClick={() => handleVPNConnect(server)}
                  disabled={isConnecting}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${server.mapPosition.x}%`,
                    top: `${server.mapPosition.y}%`
                  }}
                >
                  {/* Pulse Ring */}
                  <div className={`absolute inset-0 w-8 h-8 rounded-full animate-ping ${
                    selectedVPN === server.id ? 'bg-green-400' : 'bg-blue-400'
                  } opacity-30`}></div>
                  
                  {/* Server Marker */}
                  <div className={`relative w-8 h-8 rounded-full flex items-center justify-center modern-button transition-all duration-300 ${
                    selectedVPN === server.id ? 'scale-125' : 'hover:scale-110'
                  }`}
                       style={{ 
                         backgroundColor: selectedVPN === server.id ? 'rgba(52, 199, 89, 0.3)' : 'rgba(0, 122, 255, 0.3)',
                         borderColor: selectedVPN === server.id ? '#34c759' : '#007aff',
                         borderWidth: '2px'
                       }}>
                    <span style={{ fontSize: '12px' }}>{server.flag}</span>
                  </div>
                  
                  {/* Server Info Tooltip */}
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 modern-display p-3 min-w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="text-center">
                      <div className="modern-font font-bold" style={{ color: '#ffffff', fontSize: fontSizes.h3 }}>
                        {server.city}
                      </div>
                      <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                        {server.ping} • {server.load}% load
                      </div>
                      {server.premium && (
                        <div className="px-2 py-1 rounded modern-font font-bold mt-1"
                             style={{ 
                               backgroundColor: 'rgba(255, 149, 0, 0.2)',
                               color: '#ff9500',
                               fontSize: fontSizes.h3
                             }}>
                          PRO
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Connection Line */}
                  {selectedVPN === server.id && connectionStatus === 'connected' && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line
                        x1="50%"
                        y1="50%"
                        x2="45%"
                        y2="35%"
                        stroke="#34c759"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="animate-pulse"
                      />
                    </svg>
                  )}
                </button>
              ))}
              
              {/* Current Location Indicator */}
              <div className="absolute" style={{ left: '45%', top: '35%' }}>
                <div className="relative">
                  <div className="w-6 h-6 rounded-full animate-pulse"
                       style={{ 
                         backgroundColor: 'rgba(255, 149, 0, 0.8)',
                         boxShadow: '0 0 20px rgba(255, 149, 0, 0.5)'
                       }}>
                    <div className="absolute inset-1 rounded-full flex items-center justify-center"
                         style={{ backgroundColor: '#ff9500' }}>
                      <MapPin className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 modern-display p-2">
                    <div className="text-xs modern-font font-bold" style={{ color: '#ff9500' }}>YOU</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Controls and Status */}
        <div className="w-1/3 space-y-4">
          {/* Connection Status */}
          <div className="modern-panel p-4 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-xl" style={{ backgroundColor: `${getConnectionStatusColor()}20` }}>
                <Wifi className="w-5 h-5" style={{ color: getConnectionStatusColor() }} />
              </div>
              <h3 className="font-medium modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                Status
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>Connection</span>
                <span className="modern-font font-bold" style={{ color: getConnectionStatusColor(), fontSize: fontSizes.h2 }}>
                  {connectionStatus === 'connected' ? 'SECURE' : 
                   connectionStatus === 'connecting' ? 'CONNECTING' : 'EXPOSED'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>Location</span>
                <span className="modern-font font-bold" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  {connectionStatus === 'connected' ? locationInfo.city : 'Not Connected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>IP Address</span>
                <span className="modern-font font-bold" style={{ color: connectionStatus === 'connected' ? '#34c759' : '#ff3b30', fontSize: fontSizes.h2 }}>
                  {currentIP}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Connect Servers */}
          <div className="modern-panel p-4 shadow-lg">
            <h3 className="font-medium modern-font mb-4" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
              Quick Connect
            </h3>
            
            <div className="space-y-2">
              {vpnServers.slice(0, 4).map((server) => (
                <button
                  key={server.id}
                  onClick={() => handleVPNConnect(server)}
                  disabled={isConnecting}
                  className="w-full modern-button p-3 transition-all duration-300 flex items-center justify-between"
                  style={{ 
                    backgroundColor: selectedVPN === server.id ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: selectedVPN === server.id ? '#34c759' : 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span style={{ fontSize: fontSizes.h2 }}>{server.flag}</span>
                    <div className="text-left">
                      <div className="modern-font font-bold" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                        {server.city}
                      </div>
                      <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                        {server.ping} • {server.load}% load
                      </div>
                    </div>
                  </div>
                  
                  {selectedVPN === server.id && connectionStatus === 'connected' && (
                    <CheckCircle className="w-5 h-5" style={{ color: '#34c759' }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="modern-panel p-4 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                <Signal className="w-5 h-5" style={{ color: '#007aff' }} />
              </div>
              <h3 className="font-medium modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                Performance
              </h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="modern-display p-3 text-center">
                <Download className="w-4 h-4 mx-auto mb-1" style={{ color: '#34c759' }} />
                <div className="font-bold modern-font" 
                     style={{ 
                       color: '#34c759',
                       fontSize: fontSizes.h2
                     }}>
                  {bandwidthData.download.toFixed(1)}
                </div>
                <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>MB/s</div>
              </div>
              
              <div className="modern-display p-3 text-center">
                <Upload className="w-4 h-4 mx-auto mb-1" style={{ color: '#ff9500' }} />
                <div className="font-bold modern-font" 
                     style={{ 
                       color: '#ff9500',
                       fontSize: fontSizes.h2
                     }}>
                  {bandwidthData.upload.toFixed(1)}
                </div>
                <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>MB/s</div>
              </div>
              
              <div className="modern-display p-3 text-center">
                <Zap className="w-4 h-4 mx-auto mb-1" style={{ color: '#5856d6' }} />
                <div className="font-bold modern-font" 
                     style={{ 
                       color: '#5856d6',
                       fontSize: fontSizes.h2
                     }}>
                  {bandwidthData.latency}
                </div>
                <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>ms</div>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="modern-panel p-4 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(52, 199, 89, 0.2)' }}>
                <Lock className="w-5 h-5" style={{ color: '#34c759' }} />
              </div>
              <h3 className="font-medium modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                Security
              </h3>
            </div>
            
            <div className="space-y-2">
              {[
                { name: 'AES-256 Encryption', status: true },
                { name: 'DNS Protection', status: connectionStatus === 'connected' },
                { name: 'Kill Switch', status: true },
                { name: 'IP Masking', status: connectionStatus === 'connected' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                    {feature.name}
                  </span>
                  <div className="flex items-center space-x-1">
                    {feature.status ? (
                      <CheckCircle className="w-4 h-4" style={{ color: '#34c759' }} />
                    ) : (
                      <AlertCircle className="w-4 h-4" style={{ color: '#8e8e93' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
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
        
        .modern-button:hover:not(:disabled) {
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
        
        .modern-font {
          font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        
        .vpn-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(88, 86, 214, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(88, 86, 214, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: vpnGrid 20s linear infinite;
        }
        
        .vpn-waves {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(45deg, transparent 40%, rgba(52, 199, 89, 0.05) 50%, transparent 60%);
          animation: vpnWaves 15s ease-in-out infinite;
        }
        
        .vpn-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 30% 70%, rgba(88, 86, 214, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(52, 199, 89, 0.03) 0%, transparent 50%);
          animation: vpnParticles 25s ease-in-out infinite;
        }
        
        @keyframes vpnGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes vpnWaves {
          0%, 100% { transform: translateX(-100%); opacity: 0.3; }
          50% { transform: translateX(100%); opacity: 0.7; }
        }
        
        @keyframes vpnParticles {
          0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.1) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}