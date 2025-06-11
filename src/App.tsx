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
    what3words: "///index.home.raft"
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
          what3words: "///filled.count.soap"
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
        what3words: "///index.home.raft"
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
        what3words: "///filled.count.soap"
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
        what3words: "///index.home.raft"
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
      what3words: "///unknown.location.here"
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
      className="relative overflow-hidden select-none modern-dashboard flex"
      style={{ 
        width: '1044px', 
        height: '620px',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #2a2a2a 70%, #1a1a1a 100%)',
        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#ffffff'
      }}
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 modern-grid opacity-10"></div>
      
      {/* Ambient Glow */}
      <div className="absolute inset-0 ambient-glow opacity-20"></div>

      {/* Main Content Area - 90% width with 5px margins */}
      <div className="flex-1 relative" style={{ width: '90%', margin: '5px' }}>
        <div className="absolute inset-0 modern-panel">
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="floating-particles"></div>
          </div>

          {/* Main Header for Control Center only */}
          {currentView === 'control' && (
            <header className="relative modern-header h-16 border-b" 
                    style={{ 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderWidth: '1px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}>
              <div className="flex items-center justify-between h-full px-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src="/Triangle_logo_black_nobg_no_letters.png" 
                      alt="APE Logo" 
                      className="w-12 h-12 logo-glow"
                      style={{ 
                        filter: 'brightness(0) saturate(100%) invert(100%)',
                        animation: 'logoFloat 3s ease-in-out infinite'
                      }}
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 animate-pulse rounded-full" 
                         style={{ 
                           backgroundColor: '#007aff',
                           boxShadow: '0 0 10px #007aff'
                         }}></div>
                  </div>
                  <div>
                    <h1 className="text-xl font-medium tracking-tight modern-font" style={{ color: '#ffffff' }}>
                      A.P.E. COMMAND
                    </h1>
                    <p className="text-sm font-normal modern-font" style={{ color: '#8e8e93' }}>
                      Adapting Performance Engine v2.1.7
                    </p>
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
          )}

          {/* Navigation for Control, Config, Logs */}
          {(currentView === 'control' || currentView === 'config' || currentView === 'logs') && (
            <nav className="relative modern-nav h-12 border-b" 
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

          {/* Main Content */}
          <main className="relative p-6 overflow-hidden" style={{ height: currentView === 'control' || currentView === 'config' || currentView === 'logs' ? 'calc(600px - 112px)' : 'calc(600px - 64px)' }}>
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
              <div className="h-full overflow-y-auto">
                <ConfigPanel 
                  config={config}
                  onConfigUpdate={updateConfig}
                />
              </div>
            )}

            {currentView === 'logs' && (
              <div className="h-full">
                <SystemLogs logs={logs} />
              </div>
            )}
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
        </div>
      </div>

      {/* Right Sidebar - 10% width */}
      <div className="w-[10%] relative">
        <div className="absolute inset-2 modern-panel">
          {/* Right Sidebar Header */}
          <div className="h-full flex flex-col p-4 space-y-6">
            
            {/* Logo Section */}
            <div className="text-center">
              <div className="relative mx-auto w-12 h-12 mb-3">
                <img 
                  src="/Triangle_logo_black_nobg_no_letters.png" 
                  alt="APE Logo" 
                  className="w-12 h-12 logo-glow"
                  style={{ 
                    filter: 'brightness(0) saturate(100%) invert(100%)',
                    animation: 'logoFloat 3s ease-in-out infinite'
                  }}
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 animate-pulse rounded-full" 
                     style={{ 
                       backgroundColor: '#007aff',
                       boxShadow: '0 0 10px #007aff'
                     }}></div>
              </div>
              <div className="text-xs font-medium modern-font" style={{ color: '#ffffff' }}>
                A.P.E.
              </div>
              <div className="text-xs font-normal modern-font" style={{ color: '#8e8e93' }}>
                v2.1.7
              </div>
            </div>

            {/* Time & Date */}
            <div className="modern-display p-3 text-center">
              <Calendar className="w-4 h-4 mx-auto mb-2" style={{ color: '#007aff' }} />
              <div className="text-xs font-medium modern-font mb-1" style={{ color: '#ffffff' }}>
                {formatDate(currentTime)}
              </div>
              <div className="text-xs font-normal modern-font" style={{ color: '#8e8e93' }}>
                {formatTime(currentTime)}
              </div>
              <div className="text-xs font-normal modern-font" style={{ color: '#8e8e93' }}>
                {locationInfo.timezone}
              </div>
            </div>
            
            {/* Location Info */}
            <div className="modern-display p-3 text-center">
              <MapPin className="w-4 h-4 mx-auto mb-2" style={{ color: '#34c759' }} />
              <div className="text-xs font-medium modern-font mb-1" style={{ color: '#ffffff' }}>
                {locationInfo.postcode}
              </div>
              <div className="text-xs font-normal modern-font mb-1" style={{ color: '#8e8e93' }}>
                {locationInfo.city.split(',')[0]}
              </div>
              <div className="text-xs font-normal modern-font" style={{ color: '#8e8e93' }}>
                {locationInfo.coordinates}
              </div>
            </div>

            {/* What3Words */}
            <div className="modern-display p-3 text-center">
              <Globe className="w-4 h-4 mx-auto mb-2" style={{ color: '#ff9500' }} />
              <div className="text-xs font-medium modern-font mb-1" style={{ color: '#ffffff' }}>
                What3Words
              </div>
              <div className="text-xs font-normal modern-font" style={{ color: '#8e8e93' }}>
                {locationInfo.what3words}
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="space-y-3">
              <div className="modern-display p-2 text-center">
                <Thermometer className="w-3 h-3 mx-auto mb-1" style={{ color: '#ff9500' }} />
                <div className="text-xs font-medium modern-font" style={{ color: '#ffffff' }}>
                  {temperature.toFixed(1)}°C
                </div>
              </div>
              
              <div className="modern-display p-2 text-center">
                <Activity className="w-3 h-3 mx-auto mb-1" style={{ color: '#007aff' }} />
                <div className="text-xs font-medium modern-font" style={{ color: '#ffffff' }}>
                  {systemMetrics.cpuUsage.toFixed(1)}%
                </div>
              </div>
              
              <div className={`w-6 h-6 mx-auto modern-led animate-pulse rounded-full`} style={{ 
                backgroundColor: ledColor === 'green' ? '#34c759' : ledColor === 'yellow' ? '#ff9500' : '#ff3b30',
                boxShadow: `0 0 15px ${ledColor === 'green' ? '#34c759' : ledColor === 'yellow' ? '#ff9500' : '#ff3b30'}`
              }}>
                <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Modern Styles */}
      <style jsx>{`
        .modern-dashboard {
          position: relative;
          overflow: hidden;
        }
        
        .modern-font {
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        
        .modern-grid {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridFloat 30s linear infinite;
        }
        
        .ambient-glow {
          background: radial-gradient(circle at 30% 30%, rgba(0, 122, 255, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 70%, rgba(52, 199, 89, 0.05) 0%, transparent 50%);
          animation: ambientPulse 8s ease-in-out infinite;
        }
        
        .modern-panel {
          background: rgba(28, 28, 30, 0.8);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .modern-header {
          border-radius: 20px 20px 0 0;
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
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .modern-button:active {
          transform: translateY(0px);
        }
        
        .modern-display {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(20px);
        }
        
        .modern-led {
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.2);
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
        
        .logo-glow {
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
        }
        
        .floating-particles {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(0, 122, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(52, 199, 89, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 149, 0, 0.01) 0%, transparent 50%);
          animation: particleFloat 40s linear infinite;
        }
        
        @keyframes gridFloat {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes logoFloat {
          0% { 
            transform: translateY(0px);
            filter: brightness(0) saturate(100%) invert(100%);
          }
          50% { 
            transform: translateY(-2px);
            filter: brightness(0) saturate(100%) invert(100%) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
          }
          100% { 
            transform: translateY(0px);
            filter: brightness(0) saturate(100%) invert(100%);
          }
        }
        
        @keyframes particleFloat {
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

export default App;