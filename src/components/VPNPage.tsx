import React, { useState } from 'react';
import { ArrowLeft, Shield, Globe, Wifi, Signal, Download, Upload, MapPin, Zap, Lock, CheckCircle, AlertCircle } from 'lucide-react';

interface VPNPageProps {
  onBack: () => void;
  locationInfo: any;
  onLocationChange: (newLocation: any) => void;
}

export function VPNPage({ onBack, locationInfo, onLocationChange }: VPNPageProps) {
  const [selectedVPN, setSelectedVPN] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [bandwidthData, setBandwidthData] = useState({
    download: 45.2,
    upload: 12.8,
    latency: 28
  });

  const vpnServers = [
    { 
      id: 'uk-london', 
      name: 'United Kingdom', 
      city: 'London', 
      flag: '🇬🇧', 
      ping: '12ms', 
      load: 23,
      coords: { lat: 51.5074, lng: -0.1278 },
      premium: false
    },
    { 
      id: 'us-newyork', 
      name: 'United States', 
      city: 'New York', 
      flag: '🇺🇸', 
      ping: '85ms', 
      load: 67,
      coords: { lat: 40.7128, lng: -74.0060 },
      premium: false
    },
    { 
      id: 'de-frankfurt', 
      name: 'Germany', 
      city: 'Frankfurt', 
      flag: '🇩🇪', 
      ping: '28ms', 
      load: 34,
      coords: { lat: 50.1109, lng: 8.6821 },
      premium: false
    },
    { 
      id: 'jp-tokyo', 
      name: 'Japan', 
      city: 'Tokyo', 
      flag: '🇯🇵', 
      ping: '156ms', 
      load: 45,
      coords: { lat: 35.6762, lng: 139.6503 },
      premium: true
    },
    { 
      id: 'au-sydney', 
      name: 'Australia', 
      city: 'Sydney', 
      flag: '🇦🇺', 
      ping: '198ms', 
      load: 78,
      coords: { lat: -33.8688, lng: 151.2093 },
      premium: true
    },
    { 
      id: 'sg-singapore', 
      name: 'Singapore', 
      city: 'Singapore', 
      flag: '🇸🇬', 
      ping: '142ms', 
      load: 56,
      coords: { lat: 1.3521, lng: 103.8198 },
      premium: true
    },
    { 
      id: 'ca-toronto', 
      name: 'Canada', 
      city: 'Toronto', 
      flag: '🇨🇦', 
      ping: '92ms', 
      load: 41,
      coords: { lat: 43.6532, lng: -79.3832 },
      premium: false
    },
    { 
      id: 'nl-amsterdam', 
      name: 'Netherlands', 
      city: 'Amsterdam', 
      flag: '🇳🇱', 
      ping: '35ms', 
      load: 29,
      coords: { lat: 52.3676, lng: 4.9041 },
      premium: false
    }
  ];

  const handleVPNConnect = async (server: any) => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    setConnectionStatus('connecting');
    setSelectedVPN(server.id);
    
    // Simulate VPN connection process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update location info
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
    <div className="fixed inset-0 z-50 bg-black overflow-hidden" style={{ zIndex: 1000 }}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="vpn-grid"></div>
        <div className="vpn-waves"></div>
        <div className="vpn-particles"></div>
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
                VPN Security Center
              </h2>
              <p className="modern-font text-base" style={{ color: '#8e8e93' }}>Secure connection and location masking</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {connectionStatus === 'connected' && (
              <button
                onClick={handleDisconnect}
                className="modern-button px-8 py-4 transition-all duration-300 flex items-center space-x-3 modern-font text-base font-semibold"
                style={{ 
                  backgroundColor: 'rgba(255, 59, 48, 0.1)',
                  borderColor: 'rgba(255, 59, 48, 0.3)',
                  color: '#ff3b30'
                }}
              >
                <Lock className="w-5 h-5" />
                <span>Disconnect</span>
              </button>
            )}
            
            <div className="modern-display px-6 py-3 modern-font text-base font-semibold"
                 style={{ 
                   backgroundColor: `${getConnectionStatusColor()}20`,
                   borderColor: `${getConnectionStatusColor()}50`,
                   color: getConnectionStatusColor(),
                 }}>
              {connectionStatus === 'connected' ? 'PROTECTED' : 
               connectionStatus === 'connecting' ? 'CONNECTING' : 'UNPROTECTED'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex h-[calc(100%-100px)]">
        {/* Left Side - Server List */}
        <div className="w-1/2 p-8 overflow-y-auto">
          <div className="modern-panel p-6 shadow-lg h-full">
            <h3 className="text-xl font-medium modern-font mb-6" style={{ color: '#ffffff' }}>
              Available Servers
            </h3>
            
            <div className="space-y-4">
              {vpnServers.map((server) => (
                <button
                  key={server.id}
                  onClick={() => handleVPNConnect(server)}
                  disabled={isConnecting}
                  className="w-full modern-button p-4 transition-all duration-300 flex items-center justify-between"
                  style={{ 
                    backgroundColor: selectedVPN === server.id ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: selectedVPN === server.id ? '#34c759' : 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{server.flag}</span>
                    <div className="text-left">
                      <div className="text-base modern-font font-bold" style={{ color: '#ffffff' }}>
                        {server.city}
                      </div>
                      <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>
                        {server.name}
                      </div>
                    </div>
                    {server.premium && (
                      <div className="px-2 py-1 rounded-lg text-xs modern-font font-bold"
                           style={{ 
                             backgroundColor: 'rgba(255, 149, 0, 0.2)',
                             color: '#ff9500'
                           }}>
                        PRO
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm modern-font font-bold" style={{ color: '#34c759' }}>
                        {server.ping}
                      </div>
                      <div className="text-xs modern-font" style={{ color: '#8e8e93' }}>
                        Ping
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm modern-font font-bold" style={{ color: getLoadColor(server.load) }}>
                        {server.load}%
                      </div>
                      <div className="text-xs modern-font" style={{ color: '#8e8e93' }}>
                        Load
                      </div>
                    </div>
                    
                    {selectedVPN === server.id && connectionStatus === 'connected' && (
                      <CheckCircle className="w-6 h-6" style={{ color: '#34c759' }} />
                    )}
                    
                    {selectedVPN === server.id && connectionStatus === 'connecting' && (
                      <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
                           style={{ borderColor: '#ff9500', borderTopColor: 'transparent' }}></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Status and Metrics */}
        <div className="w-1/2 p-8 space-y-6">
          {/* Connection Status */}
          <div className="modern-panel p-6 shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${getConnectionStatusColor()}20` }}>
                <Wifi className="w-6 h-6" style={{ color: getConnectionStatusColor() }} />
              </div>
              <h3 className="text-xl font-medium modern-font" style={{ color: '#ffffff' }}>
                Connection Status
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold modern-font mb-2" 
                     style={{ 
                       color: getConnectionStatusColor(),
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {connectionStatus === 'connected' ? 'SECURE' : 
                   connectionStatus === 'connecting' ? 'CONNECTING' : 'EXPOSED'}
                </div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>Status</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold modern-font mb-2" 
                     style={{ 
                       color: '#007aff',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {connectionStatus === 'connected' ? locationInfo.city : 'Not Connected'}
                </div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>Location</div>
              </div>
            </div>
          </div>

          {/* Bandwidth Metrics */}
          <div className="modern-panel p-6 shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                <Signal className="w-6 h-6" style={{ color: '#007aff' }} />
              </div>
              <h3 className="text-xl font-medium modern-font" style={{ color: '#ffffff' }}>
                Performance Metrics
              </h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="modern-display p-4 text-center">
                <Download className="w-6 h-6 mx-auto mb-2" style={{ color: '#34c759' }} />
                <div className="text-lg font-bold modern-font" 
                     style={{ 
                       color: '#34c759',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {bandwidthData.download.toFixed(1)}
                </div>
                <div className="text-xs modern-font" style={{ color: '#8e8e93' }}>MB/s Down</div>
              </div>
              
              <div className="modern-display p-4 text-center">
                <Upload className="w-6 h-6 mx-auto mb-2" style={{ color: '#ff9500' }} />
                <div className="text-lg font-bold modern-font" 
                     style={{ 
                       color: '#ff9500',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {bandwidthData.upload.toFixed(1)}
                </div>
                <div className="text-xs modern-font" style={{ color: '#8e8e93' }}>MB/s Up</div>
              </div>
              
              <div className="modern-display p-4 text-center">
                <Zap className="w-6 h-6 mx-auto mb-2" style={{ color: '#5856d6' }} />
                <div className="text-lg font-bold modern-font" 
                     style={{ 
                       color: '#5856d6',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {bandwidthData.latency}
                </div>
                <div className="text-xs modern-font" style={{ color: '#8e8e93' }}>ms Ping</div>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="modern-panel p-6 shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(52, 199, 89, 0.2)' }}>
                <Lock className="w-6 h-6" style={{ color: '#34c759' }} />
              </div>
              <h3 className="text-xl font-medium modern-font" style={{ color: '#ffffff' }}>
                Security Features
              </h3>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'AES-256 Encryption', status: true },
                { name: 'DNS Leak Protection', status: connectionStatus === 'connected' },
                { name: 'Kill Switch', status: true },
                { name: 'No Logs Policy', status: true },
                { name: 'IP Masking', status: connectionStatus === 'connected' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm modern-font" style={{ color: '#ffffff' }}>
                    {feature.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    {feature.status ? (
                      <CheckCircle className="w-5 h-5" style={{ color: '#34c759' }} />
                    ) : (
                      <AlertCircle className="w-5 h-5" style={{ color: '#8e8e93' }} />
                    )}
                    <span className="text-xs modern-font" 
                          style={{ color: feature.status ? '#34c759' : '#8e8e93' }}>
                      {feature.status ? 'Active' : 'Inactive'}
                    </span>
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