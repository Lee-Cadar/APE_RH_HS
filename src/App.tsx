import React, { useState, useEffect } from 'react';
import { ControlCenter } from './components/ControlCenter';
import { ProcessingDetails } from './components/ProcessingDetails';
import { NetworkDetails } from './components/NetworkDetails';
import { ThermalDetails } from './components/ThermalDetails';
import { SystemDetails } from './components/SystemDetails';
import { ConfigPanel } from './components/ConfigPanel';
import { SystemLogs } from './components/SystemLogs';
import { useAPESimulation } from './hooks/useAPESimulation';
import { Settings, Activity, Thermometer, Shield, ArrowLeft, MapPin, Calendar, Zap, Globe } from 'lucide-react';

type ViewType = 'control' | 'processing' | 'network' | 'thermal' | 'system' | 'config' | 'logs';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('control');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationInfo, setLocationInfo] = useState({
    coordinates: "40.7128°N, 74.0060°W",
    address: "350 Fifth Avenue, Manhattan",
    city: "New York City, NY 10118",
    district: "Midtown Manhattan",
    country: "United States",
    timezone: "EST",
    elevation: "10m",
    isp: "Verizon Business",
    postcode: "10118",
    what3words: "///hiking.stream.closed"
  });
  
  const {
    temperature,
    performanceState,
    fanSpeed,
    ledColor,
    logs,
    config,
    gpuMetrics,
    networkMetrics,
    systemMetrics,
    updateConfig,
    addLog,
    sendCategoryReport
  } = useAPESimulation();

  // Get real GPS location data
  useEffect(() => {
    const getLocationData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              try {
                const locationData = await simulateLocationLookup(latitude, longitude);
                setLocationInfo(locationData);
                addLog('INFO', 'GPSSystem', `Location acquired: ${locationData.address}`);
              } catch (error) {
                console.log('Geocoding failed, using default location');
              }
            },
            (error) => {
              console.log('Geolocation failed, using default location');
              getIPLocation();
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
          );
        } else {
          getIPLocation();
        }
      } catch (error) {
        console.log('Location services unavailable, using default');
      }
    };

    const getIPLocation = async () => {
      try {
        const ipLocationData = {
          coordinates: "37.7749°N, 122.4194°W",
          address: "1 Hacker Way, Menlo Park",
          city: "San Francisco, CA 94103",
          district: "SOMA District",
          country: "United States",
          timezone: "PST",
          elevation: "16m",
          isp: "Comcast Business",
          postcode: "94103",
          what3words: "///hiking.stream.closed"
        };
        setLocationInfo(ipLocationData);
        addLog('INFO', 'IPLocation', `IP-based location: ${ipLocationData.city}`);
      } catch (error) {
        console.log('IP location failed, using default');
      }
    };

    getLocationData();
  }, [addLog]);

  const simulateLocationLookup = async (lat: number, lng: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const locations = [
      {
        lat: 40.7128, lng: -74.0060,
        coordinates: `${lat.toFixed(4)}°N, ${Math.abs(lng).toFixed(4)}°W`,
        address: "350 Fifth Avenue, Empire State Building",
        city: "New York City, NY 10118",
        district: "Midtown Manhattan",
        country: "United States",
        timezone: "EST",
        elevation: "10m",
        isp: "Verizon FiOS Business",
        postcode: "10118",
        what3words: "///hiking.stream.closed"
      },
      {
        lat: 37.7749, lng: -122.4194,
        coordinates: `${lat.toFixed(4)}°N, ${Math.abs(lng).toFixed(4)}°W`,
        address: "1 Hacker Way, Meta Headquarters",
        city: "Menlo Park, CA 94025",
        district: "Silicon Valley",
        country: "United States",
        timezone: "PST",
        elevation: "16m",
        isp: "AT&T Business Fiber",
        postcode: "94025",
        what3words: "///hiking.stream.closed"
      },
      {
        lat: 51.5074, lng: -0.1278,
        coordinates: `${lat.toFixed(4)}°N, ${Math.abs(lng).toFixed(4)}°W`,
        address: "30 St Mary Axe, The Gherkin",
        city: "London, EC3A 8EP",
        district: "City of London",
        country: "United Kingdom",
        timezone: "GMT",
        elevation: "35m",
        isp: "BT Business",
        postcode: "EC3A 8EP",
        what3words: "///hiking.stream.closed"
      }
    ];

    const closest = locations.find(loc => 
      Math.abs(loc.lat - lat) < 1 && Math.abs(loc.lng - lng) < 1
    ) || {
      coordinates: `${lat.toFixed(4)}°${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(4)}°${lng >= 0 ? 'E' : 'W'}`,
      address: `${Math.abs(lat).toFixed(2)}°, ${Math.abs(lng).toFixed(2)}° Coordinates`,
      city: "Current Location",
      district: "GPS Coordinates",
      country: "Unknown Region",
      timezone: "UTC",
      elevation: "Unknown",
      isp: "Local Network",
      postcode: "00000",
      what3words: "///hiking.stream.closed"
    };

    return closest;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navigationTabs = [
    { id: 'control', label: 'CONTROL', icon: Shield },
    { id: 'config', label: 'CONFIG', icon: Settings },
    { id: 'logs', label: 'LOGS', icon: Thermometer }
  ];

  const handleMetricClick = (metricType: string) => {
    switch (metricType) {
      case 'cpu':
      case 'gpu':
        setCurrentView('processing');
        break;
      case 'network':
        setCurrentView('network');
        break;
      case 'temperature':
      case 'fan':
        setCurrentView('thermal');
        break;
      case 'memory':
      case 'uptime':
      case 'processes':
        setCurrentView('system');
        break;
      default:
        break;
    }
  };

  const handleBackToControl = () => {
    setCurrentView('control');
  };

  const handleSendReport = (category: string) => {
    sendCategoryReport(category);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div 
      className="relative overflow-hidden select-none modern-dashboard"
      style={{ 
        width: '1044px', 
        height: '620px',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #2a2a2a 70%, #1a1a1a 100%)',
        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#ffffff'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animated-grid"></div>
        <div className="floating-particles"></div>
        <div className="energy-waves"></div>
        <div className="pulse-rings"></div>
      </div>

      {/* Top Header with Date, GPS, Location */}
      <header className="relative modern-header h-16 border-b z-20" 
              style={{ 
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: '1px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}>
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5" style={{ color: '#007aff' }} />
              <div>
                <div className="text-sm font-medium modern-font" style={{ color: '#ffffff' }}>
                  {formatDate(currentTime)}
                </div>
                <div className="text-xs modern-font" style={{ color: '#8e8e93' }}>
                  {formatTime(currentTime)} {locationInfo.timezone}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5" style={{ color: '#34c759' }} />
              <div>
                <div className="text-sm font-medium modern-font" style={{ color: '#ffffff' }}>
                  {locationInfo.postcode}
                </div>
                <div className="text-xs modern-font" style={{ color: '#8e8e93' }}>
                  {locationInfo.city.split(',')[0]}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5" style={{ color: '#ff9500' }} />
              <div>
                <div className="text-sm font-medium modern-font" style={{ color: '#ffffff' }}>
                  {locationInfo.what3words}
                </div>
                <div className="text-xs modern-font" style={{ color: '#8e8e93' }}>
                  {locationInfo.coordinates}
                </div>
              </div>
            </div>
          </div>
          
          <div className="modern-display px-4 py-2 font-medium text-sm modern-font" 
          style={{ 
            backgroundColor: temperature < 60 ? 'rgba(52, 199, 89, 0.1)' : temperature < 80 ? 'rgba(255, 149, 0, 0.1)' : 'rgba(255, 59, 48, 0.1)',
            borderColor: temperature < 60 ? 'rgba(52, 199, 89, 0.3)' : temperature < 80 ? 'rgba(255, 149, 0, 0.3)' : 'rgba(255, 59, 48, 0.3)',
            color: temperature < 60 ? '#34c759' : temperature < 80 ? '#ff9500' : '#ff3b30'
          }}>
            {temperature < 60 ? 'OPTIMAL' : temperature < 80 ? 'WARNING' : 'CRITICAL'}
          </div>
        </div>
      </header>

      {/* Centered Logo with Breathing Animation - Original Format */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
        <div className="relative">
          <img 
            src="/Triangle_logo_black_nobg.png" 
            alt="APE Logo" 
            className="object-contain breathing-logo"
            style={{ 
              width: '80px', 
              height: '80px',
              filter: 'brightness(0) saturate(100%) invert(100%)',
            }}
          />
        </div>
      </div>

      {/* Navigation for Control, Config, Logs */}
      {(currentView === 'control' || currentView === 'config' || currentView === 'logs') && (
        <nav className="relative modern-nav h-12 border-b z-20" 
             style={{ 
               borderColor: 'rgba(255, 255, 255, 0.1)',
               borderWidth: '1px',
               background: 'rgba(255, 255, 255, 0.03)'
             }}>
          <div className="flex h-full">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentView(tab.id as ViewType)}
                  className={`flex-1 flex items-center justify-center space-x-3 font-medium text-sm transition-all duration-300 transform active:scale-95 modern-font modern-tab ${
                    currentView === tab.id ? 'active' : ''
                  }`}
                  style={{ 
                    backgroundColor: currentView === tab.id ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
                    color: currentView === tab.id ? '#007aff' : '#8e8e93',
                    borderBottom: currentView === tab.id ? '2px solid #007aff' : '2px solid transparent'
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Main Content - Now Scrollable */}
      <main className="relative overflow-y-auto z-10" style={{ height: currentView === 'control' || currentView === 'config' || currentView === 'logs' ? 'calc(620px - 112px)' : 'calc(620px - 64px)' }}>
        <div className="p-6">
          {currentView === 'control' && (
            <ControlCenter
              temperature={temperature}
              performanceState={performanceState}
              fanSpeed={fanSpeed}
              ledColor={ledColor}
              gpuMetrics={gpuMetrics}
              networkMetrics={networkMetrics}
              systemMetrics={systemMetrics}
              onMetricClick={handleMetricClick}
              onSendReport={handleSendReport}
              locationInfo={locationInfo}
            />
          )}

          {currentView === 'processing' && (
            <ProcessingDetails
              temperature={temperature}
              performanceState={performanceState}
              systemMetrics={systemMetrics}
              gpuMetrics={gpuMetrics}
              config={config}
              onBack={handleBackToControl}
              onSendReport={handleSendReport}
            />
          )}

          {currentView === 'network' && (
            <NetworkDetails 
              networkMetrics={networkMetrics} 
              onBack={handleBackToControl}
              onSendReport={handleSendReport}
            />
          )}

          {currentView === 'thermal' && (
            <ThermalDetails
              temperature={temperature}
              performanceState={performanceState}
              fanSpeed={fanSpeed}
              ledColor={ledColor}
              config={config}
              onBack={handleBackToControl}
              onSendReport={handleSendReport}
            />
          )}

          {currentView === 'system' && (
            <SystemDetails 
              systemMetrics={systemMetrics} 
              onBack={handleBackToControl}
              onSendReport={handleSendReport}
            />
          )}

          {currentView === 'config' && (
            <ConfigPanel 
              config={config}
              onConfigUpdate={updateConfig}
            />
          )}

          {currentView === 'logs' && (
            <SystemLogs logs={logs} />
          )}
        </div>
      </main>

      {/* Critical Alert Overlay */}
      {temperature > 85 && (
        <div className="fixed top-6 right-6 modern-alert p-4 shadow-2xl animate-pulse z-50 rounded-2xl"
             style={{ 
               backgroundColor: 'rgba(255, 59, 48, 0.1)',
               borderColor: 'rgba(255, 59, 48, 0.3)',
               borderWidth: '1px',
               backdropFilter: 'blur(20px)'
             }}>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 animate-ping rounded-full" 
                 style={{ backgroundColor: '#ff3b30' }}></div>
            <span className="font-medium text-sm modern-font" style={{ color: '#ff3b30' }}>
              CRITICAL TEMPERATURE
            </span>
          </div>
        </div>
      )}

      {/* Global Modern Styles with Exciting Animations */}
      <style jsx>{`
        .modern-dashboard {
          position: relative;
          overflow: hidden;
        }
        
        .modern-font {
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-weight: 400;
          letter-spacing: -0.01em;
        }
        
        /* Animated Grid Background */
        .animated-grid {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: 
            linear-gradient(rgba(0, 122, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 122, 255, 0.1) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridPulse 6s linear infinite;
        }
        
        /* Floating Particles */
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(0, 122, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(52, 199, 89, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 149, 0, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 70% 20%, rgba(88, 86, 214, 0.04) 0%, transparent 50%);
          animation: particleFloat 12s ease-in-out infinite;
        }
        
        /* Energy Waves */
        .energy-waves {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          background: 
            linear-gradient(45deg, transparent 40%, rgba(0, 122, 255, 0.02) 50%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(52, 199, 89, 0.02) 50%, transparent 60%);
          animation: energyWave 10s linear infinite;
        }
        
        /* Pulse Rings */
        .pulse-rings {
          position: absolute;
          top: 50%;
          right: 20%;
          width: 300px;
          height: 300px;
          transform: translate(50%, -50%);
        }
        
        .pulse-rings::before,
        .pulse-rings::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          border: 2px solid rgba(0, 122, 255, 0.1);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulseRing 4s ease-out infinite;
        }
        
        .pulse-rings::after {
          animation-delay: 2s;
          border-color: rgba(52, 199, 89, 0.1);
        }
        
        /* Header and Navigation Styles */
        .modern-header {
          border-radius: 0;
        }
        
        .modern-display {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(20px);
        }
        
        .modern-nav {
          backdrop-filter: blur(20px);
        }
        
        .modern-tab {
          border-radius: 8px;
          margin: 2px;
          backdrop-filter: blur(10px);
        }
        
        .modern-tab:hover {
          background: rgba(255, 255, 255, 0.05) !important;
        }
        
        .modern-alert {
          border: 1px solid rgba(255, 59, 48, 0.3);
        }
        
        .breathing-logo {
          animation: breathingAnimation 3s ease-in-out infinite;
        }
        
        /* Keyframe Animations */
        @keyframes gridPulse {
          0%, 100% { 
            opacity: 0.3;
            transform: translate(0, 0) scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: translate(-30px, -30px) scale(1.1);
          }
        }
        
        @keyframes particleFloat {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.8;
          }
          25% { 
            transform: translate(-20px, -30px) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: translate(-40px, 0px) rotate(180deg);
            opacity: 0.6;
          }
          75% { 
            transform: translate(-20px, 30px) rotate(270deg);
            opacity: 1;
          }
        }
        
        @keyframes energyWave {
          0% { 
            transform: translateX(100%);
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            transform: translateX(-100%);
            opacity: 0;
          }
        }
        
        @keyframes pulseRing {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
        
        @keyframes breathingAnimation {
          0% { 
            transform: scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: scale(1.1);
            opacity: 1;
          }
          100% { 
            transform: scale(1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

export default App;