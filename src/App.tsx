import React, { useState, useEffect } from 'react';
import { ControlCenter } from './components/ControlCenter';
import { ProcessingDetails } from './components/ProcessingDetails';
import { NetworkDetails } from './components/NetworkDetails';
import { ThermalDetails } from './components/ThermalDetails';
import { SystemDetails } from './components/SystemDetails';
import { ConfigPanel } from './components/ConfigPanel';
import { SystemLogs } from './components/SystemLogs';
import { LocationMap } from './components/LocationMap';
import { AIOptimalButton } from './components/AIOptimalButton';
import { SecurityModal } from './components/SecurityModal';
import { useAPESimulation } from './hooks/useAPESimulation';
import { Settings, Activity, Thermometer, Shield, ArrowLeft, MapPin, Calendar, Zap, Globe, User } from 'lucide-react';

type ViewType = 'control' | 'processing' | 'network' | 'thermal' | 'system' | 'config' | 'logs';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('control');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isSystemUnlocked, setIsSystemUnlocked] = useState(false);
  const [aiMode, setAiMode] = useState('optimal');
  const [locationInfo, setLocationInfo] = useState({
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

  // Play system sounds
  const playSound = (type: 'startup' | 'click' | 'alert' | 'success') => {
    try {
      const audio = new Audio();
      switch (type) {
        case 'startup':
          // Create a synthetic startup sound
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.5);
          oscillator.frequency.exponentialRampToValueAtTime(660, audioContext.currentTime + 1);
          
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 1);
          break;
        case 'click':
          // Subtle click sound
          break;
        case 'alert':
          // Alert beep
          break;
        case 'success':
          // Success chime
          break;
      }
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Play startup sound when system unlocks
  useEffect(() => {
    if (isSystemUnlocked) {
      playSound('startup');
      // Add startup log
      addLog('INFO', 'SystemAudio', 'All systems active - Audio feedback enabled');
    }
  }, [isSystemUnlocked, addLog]);

  const navigationTabs = [
    { id: 'control', label: 'CONTROL', icon: Shield },
    { id: 'config', label: 'CONFIG', icon: Settings },
    { id: 'logs', label: 'LOGS', icon: Thermometer }
  ];

  const handleMetricClick = (metricType: string) => {
    playSound('click');
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
    playSound('click');
    setCurrentView('control');
  };

  const handleSendReport = (category: string) => {
    playSound('success');
    sendCategoryReport(category);
  };

  const handleLocationChange = (newLocation: any) => {
    setLocationInfo(newLocation);
    addLog('INFO', 'LocationService', `Location updated: ${newLocation.city}`);
  };

  const handleSecuritySuccess = () => {
    setIsSystemUnlocked(true);
    setIsSecurityOpen(false);
    addLog('INFO', 'SecuritySystem', 'User authentication successful - System unlocked');
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

  // Show security modal if system is not unlocked
  if (!isSystemUnlocked) {
    return <SecurityModal onSuccess={handleSecuritySuccess} />;
  }

  return (
    <div 
      className="relative overflow-hidden select-none modern-dashboard"
      style={{ 
        width: '1440px', 
        height: '900px',
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
        <div className="data-streams"></div>
      </div>

      {/* Logo Background - Right Side - Full Visibility */}
      <div className="absolute top-0 right-0 w-full h-full overflow-visible pointer-events-none z-0">
        <div className="absolute -right-1/6 top-1/2 transform -translate-y-1/2">
          <img 
            src="/Triangle_logo_black_nobg_no_letters copy.png" 
            alt="APE Logo Background" 
            className="object-contain opacity-30 breathing-logo-bg"
            style={{ 
              width: '900px', 
              height: '900px',
              filter: 'brightness(0.3) sepia(1) hue-rotate(200deg) saturate(2)'
            }}
          />
        </div>
      </div>

      {/* Top Header with Date, GPS, Location */}
      <header className="relative modern-header border-b z-20" 
              style={{ 
                height: '80px',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: '1px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}>
        <div className="flex items-center justify-between h-full px-8">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <Calendar className="w-6 h-6" style={{ color: '#007aff' }} />
              <div>
                <div className="text-base font-medium modern-font" style={{ color: '#ffffff' }}>
                  {formatDate(currentTime)}
                </div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>
                  {formatTime(currentTime)} {locationInfo.timezone}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsMapOpen(true)}
              className="flex items-center space-x-4 modern-button px-6 py-3 transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(52, 199, 89, 0.1)',
                borderColor: 'rgba(52, 199, 89, 0.3)',
              }}
            >
              <MapPin className="w-6 h-6" style={{ color: '#34c759' }} />
              <div>
                <div className="text-base font-medium modern-font" style={{ color: '#ffffff' }}>
                  {locationInfo.postcode}
                </div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>
                  {locationInfo.city.split(',')[0]}
                </div>
              </div>
            </button>

            <div className="flex items-center space-x-4">
              <Globe className="w-6 h-6" style={{ color: '#ff9500' }} />
              <div>
                <div className="text-base font-medium modern-font" style={{ color: '#ffffff' }}>
                  {locationInfo.what3words}
                </div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>
                  {locationInfo.coordinates}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Status, Logo, Profile */}
          <div className="flex items-center space-x-6">
            <div className="modern-display px-6 py-3 font-medium text-base modern-font" 
            style={{ 
              backgroundColor: temperature < 60 ? 'rgba(52, 199, 89, 0.1)' : temperature < 80 ? 'rgba(255, 149, 0, 0.1)' : 'rgba(255, 59, 48, 0.1)',
              borderColor: temperature < 60 ? 'rgba(52, 199, 89, 0.3)' : temperature < 80 ? 'rgba(255, 149, 0, 0.3)' : 'rgba(255, 59, 48, 0.3)',
              color: temperature < 60 ? '#34c759' : temperature < 80 ? '#ff9500' : '#ff3b30'
            }}>
              {temperature < 60 ? 'OPTIMAL' : temperature < 80 ? 'WARNING' : 'CRITICAL'}
            </div>
            
            {/* Logo */}
            <div className="relative">
              <img 
                src="/Triangle_logo_black_nobg_no_letters copy.png" 
                alt="APE Logo" 
                className="object-contain breathing-logo"
                style={{ 
                  width: '60px', 
                  height: '60px',
                }}
              />
            </div>

            {/* Profile Button */}
            <button 
              onClick={() => setIsSecurityOpen(true)}
              className="modern-button p-4 transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(88, 86, 214, 0.1)',
                borderColor: 'rgba(88, 86, 214, 0.3)',
              }}
            >
              <User className="w-6 h-6" style={{ color: '#5856d6' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation for Control, Config, Logs */}
      {(currentView === 'control' || currentView === 'config' || currentView === 'logs') && (
        <nav className="relative modern-nav border-b z-20" 
             style={{ 
               height: '60px',
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
                  onClick={() => {
                    playSound('click');
                    setCurrentView(tab.id as ViewType);
                  }}
                  className={`flex-1 flex items-center justify-center space-x-4 font-medium text-base transition-all duration-300 transform active:scale-95 modern-font modern-tab ${
                    currentView === tab.id ? 'active' : ''
                  }`}
                  style={{ 
                    backgroundColor: currentView === tab.id ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
                    color: currentView === tab.id ? '#007aff' : '#8e8e93',
                    borderBottom: currentView === tab.id ? '3px solid #007aff' : '3px solid transparent'
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* AI Optimal Button - Center Screen */}
      <AIOptimalButton currentMode={aiMode} onModeChange={setAiMode} />

      {/* Main Content */}
      <main className="relative overflow-y-auto z-10" style={{ height: currentView === 'control' || currentView === 'config' || currentView === 'logs' ? 'calc(900px - 140px)' : 'calc(900px - 80px)' }}>
        <div className="p-8">
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
              aiMode={aiMode}
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

      {/* Location Map Modal */}
      <LocationMap 
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        locationInfo={locationInfo}
        onLocationChange={handleLocationChange}
      />

      {/* Security Modal */}
      <SecurityModal 
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
        onSuccess={handleSecuritySuccess}
      />

      {/* Critical Alert Overlay */}
      {temperature > 85 && (
        <div className="fixed top-8 right-8 modern-alert p-6 shadow-2xl animate-pulse z-50 rounded-2xl"
             style={{ 
               backgroundColor: 'rgba(255, 59, 48, 0.1)',
               borderColor: 'rgba(255, 59, 48, 0.3)',
               borderWidth: '1px',
               backdropFilter: 'blur(20px)'
             }}>
          <div className="flex items-center space-x-4">
            <div className="w-5 h-5 animate-ping rounded-full" 
                 style={{ backgroundColor: '#ff3b30' }}></div>
            <span className="font-medium text-base modern-font" style={{ color: '#ff3b30' }}>
              CRITICAL TEMPERATURE
            </span>
          </div>
        </div>
      )}

      {/* Enhanced Styles with Exciting Animations */}
      <style jsx>{`
        .modern-dashboard {
          position: relative;
          overflow: hidden;
        }
        
        .modern-font {
          font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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
            linear-gradient(rgba(0, 122, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 122, 255, 0.08) 1px, transparent 1px);
          background-size: 80px 80px;
          animation: gridPulse 8s linear infinite;
        }
        
        /* Floating Particles */
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(0, 122, 255, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(52, 199, 89, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 149, 0, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 70% 20%, rgba(88, 86, 214, 0.05) 0%, transparent 50%);
          animation: particleFloat 15s ease-in-out infinite;
        }
        
        /* Energy Waves */
        .energy-waves {
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          height: 100%;
          background: 
            linear-gradient(45deg, transparent 40%, rgba(0, 122, 255, 0.03) 50%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(52, 199, 89, 0.03) 50%, transparent 60%);
          animation: energyWave 12s linear infinite;
        }
        
        /* Data Streams */
        .data-streams {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(90deg, transparent 0%, rgba(0, 122, 255, 0.02) 25%, transparent 50%, rgba(52, 199, 89, 0.02) 75%, transparent 100%);
          animation: dataFlow 20s linear infinite;
        }
        
        /* Pulse Rings */
        .pulse-rings {
          position: absolute;
          top: 50%;
          right: 25%;
          width: 500px;
          height: 500px;
          transform: translate(50%, -50%);
        }
        
        .pulse-rings::before,
        .pulse-rings::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          border: 2px solid rgba(0, 122, 255, 0.1);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulseRing 6s ease-out infinite;
        }
        
        .pulse-rings::after {
          animation-delay: 3s;
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
          animation: breathingAnimation 4s ease-in-out infinite;
        }
        
        .breathing-logo-bg {
          animation: breathingBgAnimation 8s ease-in-out infinite;
        }
        
        /* Enhanced Keyframe Animations */
        @keyframes gridPulse {
          0%, 100% { 
            opacity: 0.4;
            transform: translate(0, 0) scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: translate(-40px, -40px) scale(1.05);
          }
        }
        
        @keyframes particleFloat {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.8;
          }
          25% { 
            transform: translate(-40px, -50px) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: translate(-80px, 0px) rotate(180deg);
            opacity: 0.6;
          }
          75% { 
            transform: translate(-40px, 50px) rotate(270deg);
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
        
        @keyframes dataFlow {
          0% { 
            transform: translateX(-100%);
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes pulseRing {
          0% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
        
        @keyframes breathingAnimation {
          0% { 
            transform: scale(1);
            opacity: 0.9;
          }
          50% { 
            transform: scale(1.1);
            opacity: 1;
          }
          100% { 
            transform: scale(1);
            opacity: 0.9;
          }
        }
        
        @keyframes breathingBgAnimation {
          0% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 0.4;
          }
          100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}

export default App;