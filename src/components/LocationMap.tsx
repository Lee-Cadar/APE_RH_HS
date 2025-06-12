import React, { useState } from 'react';
import { X, MapPin, Globe, Wifi, Shield, Zap, Navigation, Satellite } from 'lucide-react';

interface LocationMapProps {
  isOpen: boolean;
  onClose: () => void;
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
  onLocationChange: (newLocation: any) => void;
}

export function LocationMap({ isOpen, onClose, locationInfo, onLocationChange }: LocationMapProps) {
  const [selectedVPN, setSelectedVPN] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const vpnLocations = [
    { id: 'uk', name: 'United Kingdom', city: 'London', flag: '🇬🇧', ping: '12ms', coords: { lat: 51.5074, lng: -0.1278 } },
    { id: 'us', name: 'United States', city: 'New York', flag: '🇺🇸', ping: '85ms', coords: { lat: 40.7128, lng: -74.0060 } },
    { id: 'de', name: 'Germany', city: 'Frankfurt', flag: '🇩🇪', ping: '28ms', coords: { lat: 50.1109, lng: 8.6821 } },
    { id: 'jp', name: 'Japan', city: 'Tokyo', flag: '🇯🇵', ping: '156ms', coords: { lat: 35.6762, lng: 139.6503 } },
    { id: 'au', name: 'Australia', city: 'Sydney', flag: '🇦🇺', ping: '198ms', coords: { lat: -33.8688, lng: 151.2093 } },
    { id: 'sg', name: 'Singapore', city: 'Singapore', flag: '🇸🇬', ping: '142ms', coords: { lat: 1.3521, lng: 103.8198 } }
  ];

  const handleVPNConnect = async (location: any) => {
    setIsConnecting(true);
    setSelectedVPN(location.id);
    
    // Simulate VPN connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update location info
    const newLocationInfo = {
      coordinates: `${location.coords.lat.toFixed(4)}°${location.coords.lat >= 0 ? 'N' : 'S'}, ${Math.abs(location.coords.lng).toFixed(4)}°${location.coords.lng >= 0 ? 'E' : 'W'}`,
      address: "VPN Protected Location",
      city: location.city,
      district: location.name,
      country: location.name,
      timezone: "UTC",
      elevation: "0m",
      isp: "APE VPN Service",
      postcode: "VPN-001",
      what3words: "///secure.tunnel.active"
    };
    
    onLocationChange(newLocationInfo);
    setIsConnecting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Map Container */}
      <div className="relative w-[90vw] h-[80vh] max-w-6xl max-h-4xl modern-panel shadow-2xl overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="map-grid"></div>
          <div className="radar-sweep"></div>
          <div className="data-streams"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl" style={{ backgroundColor: 'rgba(52, 199, 89, 0.2)' }}>
              <MapPin className="w-8 h-8" style={{ color: '#34c759' }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tech-font" style={{ color: '#ffffff' }}>
                GLOBAL POSITIONING SYSTEM
              </h2>
              <p className="tech-font" style={{ color: '#8e8e93' }}>
                Real-time location tracking and VPN management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="modern-button p-3 transition-all duration-300"
            style={{ 
              backgroundColor: 'rgba(255, 59, 48, 0.1)',
              borderColor: 'rgba(255, 59, 48, 0.3)',
            }}
          >
            <X className="w-6 h-6" style={{ color: '#ff3b30' }} />
          </button>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex h-[calc(100%-100px)]">
          {/* Map Area */}
          <div className="flex-1 relative overflow-hidden">
            {/* World Map Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-4xl">
                {/* Animated World Map */}
                <svg viewBox="0 0 1000 500" className="w-full h-full opacity-30">
                  {/* Simplified world map paths */}
                  <path d="M150,200 L200,180 L250,190 L300,200 L350,210 L400,200 L450,190 L500,200 L550,210 L600,200 L650,190 L700,200 L750,210 L800,200 L850,190" 
                        stroke="#007aff" strokeWidth="2" fill="none" className="animate-pulse" />
                  <path d="M100,250 L150,240 L200,250 L250,260 L300,250 L350,240 L400,250 L450,260 L500,250 L550,240 L600,250 L650,260 L700,250 L750,240 L800,250" 
                        stroke="#007aff" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <path d="M200,300 L250,290 L300,300 L350,310 L400,300 L450,290 L500,300 L550,310 L600,300 L650,290 L700,300 L750,310" 
                        stroke="#007aff" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
                </svg>

                {/* VPN Location Markers */}
                {vpnLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${20 + (index * 140)}px`,
                      top: `${150 + (index % 2) * 100}px`
                    }}
                    onClick={() => handleVPNConnect(location)}
                  >
                    <div className="relative">
                      {/* Pulse Ring */}
                      <div className="absolute inset-0 w-8 h-8 rounded-full animate-ping"
                           style={{ backgroundColor: selectedVPN === location.id ? '#34c759' : '#007aff', opacity: 0.3 }}></div>
                      
                      {/* Location Marker */}
                      <div className="relative w-8 h-8 rounded-full flex items-center justify-center modern-button"
                           style={{ 
                             backgroundColor: selectedVPN === location.id ? 'rgba(52, 199, 89, 0.2)' : 'rgba(0, 122, 255, 0.2)',
                             borderColor: selectedVPN === location.id ? '#34c759' : '#007aff',
                             color: selectedVPN === location.id ? '#34c759' : '#007aff'
                           }}>
                        <div className="text-lg">{location.flag}</div>
                      </div>
                      
                      {/* Location Info */}
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 modern-display p-2 min-w-max">
                        <div className="text-xs tech-font font-bold" style={{ color: '#ffffff' }}>{location.city}</div>
                        <div className="text-xs tech-font" style={{ color: '#8e8e93' }}>{location.ping}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Current Location Indicator */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full animate-pulse"
                         style={{ 
                           backgroundColor: 'rgba(255, 149, 0, 0.3)',
                           boxShadow: '0 0 30px rgba(255, 149, 0, 0.5)'
                         }}>
                      <div className="absolute inset-2 rounded-full flex items-center justify-center"
                           style={{ backgroundColor: '#ff9500' }}>
                        <Navigation className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-14 left-1/2 transform -translate-x-1/2 modern-display p-3">
                      <div className="text-sm tech-font font-bold" style={{ color: '#ff9500' }}>CURRENT LOCATION</div>
                      <div className="text-xs tech-font" style={{ color: '#8e8e93' }}>{locationInfo.city}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VPN Control Panel */}
          <div className="w-80 border-l border-white/10 p-6 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(88, 86, 214, 0.2)' }}>
                <Shield className="w-6 h-6" style={{ color: '#5856d6' }} />
              </div>
              <h3 className="text-lg font-bold tech-font" style={{ color: '#ffffff' }}>VPN CONTROL</h3>
            </div>

            {/* Current Status */}
            <div className="modern-display p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm tech-font" style={{ color: '#8e8e93' }}>Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#34c759' }}></div>
                  <span className="text-sm tech-font font-bold" style={{ color: '#34c759' }}>PROTECTED</span>
                </div>
              </div>
              <div className="text-xs tech-font" style={{ color: '#ffffff' }}>{locationInfo.isp}</div>
            </div>

            {/* VPN Locations */}
            <div className="space-y-3">
              <h4 className="text-sm tech-font font-bold" style={{ color: '#ffffff' }}>Available Servers</h4>
              {vpnLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleVPNConnect(location)}
                  disabled={isConnecting}
                  className="w-full modern-button p-3 transition-all duration-300 flex items-center justify-between"
                  style={{ 
                    backgroundColor: selectedVPN === location.id ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: selectedVPN === location.id ? '#34c759' : 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{location.flag}</span>
                    <div className="text-left">
                      <div className="text-sm tech-font font-bold" style={{ color: '#ffffff' }}>{location.city}</div>
                      <div className="text-xs tech-font" style={{ color: '#8e8e93' }}>{location.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs tech-font font-bold" style={{ color: '#34c759' }}>{location.ping}</div>
                    {selectedVPN === location.id && (
                      <div className="text-xs tech-font" style={{ color: '#34c759' }}>CONNECTED</div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Connection Info */}
            <div className="modern-display p-4 space-y-3">
              <h4 className="text-sm tech-font font-bold" style={{ color: '#ffffff' }}>Connection Details</h4>
              <div className="space-y-2 text-xs tech-font">
                <div className="flex justify-between">
                  <span style={{ color: '#8e8e93' }}>Protocol</span>
                  <span style={{ color: '#ffffff' }}>WireGuard</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#8e8e93' }}>Encryption</span>
                  <span style={{ color: '#ffffff' }}>AES-256</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#8e8e93' }}>Data Usage</span>
                  <span style={{ color: '#ffffff' }}>2.4 GB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isConnecting && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="modern-panel p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-t-transparent animate-spin"
                   style={{ borderColor: '#007aff', borderTopColor: 'transparent' }}></div>
              <div className="text-lg tech-font font-bold" style={{ color: '#ffffff' }}>Establishing Secure Connection...</div>
              <div className="text-sm tech-font" style={{ color: '#8e8e93' }}>Encrypting traffic and masking location</div>
            </div>
          </div>
        )}

        {/* Styles */}
        <style jsx>{`
          .modern-panel {
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
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
          
          .map-grid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              linear-gradient(rgba(0, 122, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 122, 255, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridMove 20s linear infinite;
          }
          
          .radar-sweep {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300px;
            height: 300px;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background: conic-gradient(from 0deg, transparent 0deg, rgba(0, 122, 255, 0.3) 30deg, transparent 60deg);
            animation: radarSweep 4s linear infinite;
          }
          
          .data-streams {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              linear-gradient(45deg, transparent 40%, rgba(52, 199, 89, 0.1) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(255, 149, 0, 0.1) 50%, transparent 60%);
            animation: dataFlow 8s ease-in-out infinite;
          }
          
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          
          @keyframes radarSweep {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes dataFlow {
            0%, 100% { opacity: 0.5; transform: translateX(0); }
            50% { opacity: 1; transform: translateX(20px); }
          }
        `}</style>
      </div>
    </div>
  );
}