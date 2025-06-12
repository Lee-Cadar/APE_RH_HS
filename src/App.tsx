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
import { NetworkAnalyzer } from './components/NetworkAnalyzer';
import { PCInfoPage } from './components/PCInfoPage';
import { useAPESimulation } from './hooks/useAPESimulation';
import { Settings, Activity, Thermometer, Shield, ArrowLeft, MapPin, Calendar, Zap, Globe, User, Monitor, Info } from 'lucide-react';

type ViewType = 'control' | 'processing' | 'network' | 'thermal' | 'system' | 'config' | 'logs' | 'network-analyzer' | 'pc-info';

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
    { id: 'logs', label: 'LOGS', icon: Thermometer },
    { id: 'network-analyzer', label: 'NETWORK', icon: Monitor },
    { id: 'pc-info', label: 'PC INFO', icon: Info }
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
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animated-grid"></div>
        <div className="animated-grid-2"></div>
        <div className="floating-particles"></div>
        <div className="floating-particles-2"></div>
        <div className="floating-particles-3"></div>
        <div className="energy-waves"></div>
        <div className="energy-waves-2"></div>
        <div className="pulse-rings"></div>
        <div className="pulse-rings-2"></div>
        <div className="pulse-rings-3"></div>
        <div className="data-streams"></div>
        <div className="data-streams-2"></div>
        <div className="data-streams-3"></div>
        <div className="circuit-lines"></div>
        <div className="circuit-lines-2"></div>
        <div className="tech-dots"></div>
        <div className="tech-dots-2"></div>
      </div>

      {/* Logo Background - Right Side - 40% Bigger with Random Movement */}
      <div className="absolute top-0 right-0 w-full h-full overflow-visible pointer-events-none z-0">
        <div className="absolute -right-1/6 top-1/2 transform -translate-y-1/2">
          <img 
            src="/Triangle_logo_black_nobg_no_letters copy.png" 
            alt="APE Logo Background" 
            className="object-contain opacity-30 breathing-logo-bg-random"
            style={{ 
              width: '1260px', 
              height: '1260px',
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
          
          {/* Right Side - Status, Logo, AI Mode, Profile */}
          <div className="flex items-center space-x-6">
            <div className="modern-display px-6 py-3 font-medium text-base modern-font" 
            style={{ 
              backgroundColor: temperature < 60 ? 'rgba(52, 199, 89, 0.1)' : temperature < 80 ? 'rgba(255, 149, 0, 0.1)' : 'rgba(255, 59, 48, 0.1)',
              borderColor: temperature < 60 ? 'rgba(52, 199, 89, 0.3)' : temperature < 80 ? 'rgba(255, 149, 0, 0.3)' : 'rgba(255, 59, 48, 0.3)',
              color: temperature < 60 ? '#34c759' : temperature < 80 ? '#ff9500' : '#ff3b30'
            }}>
              {temperature < 60 ? 'OPTIMAL' : temperature < 80 ? 'WARNING' : 'CRITICAL'}
            </div>

            {/* AI Mode Button */}
            <AIOptimalButton currentMode={aiMode} onModeChange={setAiMode} />
            
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

      {/* Navigation for Control, Config, Logs, Network Analyzer, PC Info */}
      {(currentView === 'control' || currentView === 'config' || currentView === 'logs' || currentView === 'network-analyzer' || currentView === 'pc-info') && (
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

      {/* Main Content */}
      <main className="relative overflow-y-auto z-10" style={{ height: currentView === 'control' || currentView === 'config' || currentView === 'logs' || currentView === 'network-analyzer' || currentView === 'pc-info' ? 'calc(900px - 140px)' : 'calc(900px - 80px)' }}>
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
              aiMode={aiMode}
              onModeChange={setAiMode}
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
              aiMode={aiMode}
              onModeChange={setAiMode}
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

          {currentView === 'network-analyzer' && (
            <NetworkAnalyzer networkMetrics={networkMetrics} />
          )}

          {currentView === 'pc-info' && (
            <PCInfoPage />
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

      {/* Enhanced Styles with More Background Elements */}
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
        
        /* Enhanced Animated Grid Background */
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
        
        .animated-grid-2 {
          position: absolute;
          top: -30%;
          left: -30%;
          width: 160%;
          height: 160%;
          background-image: 
            linear-gradient(rgba(52, 199, 89, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52, 199, 89, 0.05) 1px, transparent 1px);
          background-size: 120px 120px;
          animation: gridPulse 12s linear infinite reverse;
        }
        
        /* Multiple Floating Particles */
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(0, 122, 255, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(52, 199, 89, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 149, 0, 0.03) 0%, transparent 50%);
          animation: particleFloat 15s ease-in-out infinite;
        }
        
        .floating-particles-2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 60% 20%, rgba(88, 86, 214, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 30% 60%, rgba(255, 59, 48, 0.03) 0%, transparent 45%),
            radial-gradient(circle at 90% 40%, rgba(0, 122, 255, 0.04) 0%, transparent 35%);
          animation: particleFloat 20s ease-in-out infinite reverse;
        }
        
        .floating-particles-3 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 10% 90%, rgba(255, 149, 0, 0.04) 0%, transparent 30%),
            radial-gradient(circle at 70% 10%, rgba(52, 199, 89, 0.03) 0%, transparent 40%);
          animation: particleFloat 25s ease-in-out infinite;
        }
        
        /* Multiple Energy Waves */
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
        
        .energy-waves-2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: 
            linear-gradient(135deg, transparent 45%, rgba(255, 149, 0, 0.02) 55%, transparent 65%),
            linear-gradient(-135deg, transparent 45%, rgba(88, 86, 214, 0.02) 55%, transparent 65%);
          animation: energyWave 18s linear infinite reverse;
        }
        
        /* Multiple Data Streams */
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
        
        .data-streams-2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(45deg, transparent 0%, rgba(255, 149, 0, 0.015) 30%, transparent 60%, rgba(88, 86, 214, 0.015) 90%, transparent 100%);
          animation: dataFlow 30s linear infinite reverse;
        }
        
        .data-streams-3 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(-45deg, transparent 10%, rgba(255, 59, 48, 0.01) 40%, transparent 70%);
          animation: dataFlow 25s linear infinite;
        }
        
        /* Multiple Pulse Rings */
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
        
        .pulse-rings-2 {
          position: absolute;
          top: 30%;
          left: 20%;
          width: 300px;
          height: 300px;
        }
        
        .pulse-rings-2::before,
        .pulse-rings-2::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150px;
          height: 150px;
          border: 1px solid rgba(255, 149, 0, 0.08);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulseRing 8s ease-out infinite;
        }
        
        .pulse-rings-2::after {
          animation-delay: 4s;
          border-color: rgba(88, 86, 214, 0.08);
        }
        
        .pulse-rings-3 {
          position: absolute;
          top: 70%;
          right: 60%;
          width: 400px;
          height: 400px;
        }
        
        .pulse-rings-3::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          border: 1px solid rgba(255, 59, 48, 0.06);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulseRing 10s ease-out infinite;
        }
        
        /* Circuit Lines */
        .circuit-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(0deg, transparent 49%, rgba(0, 122, 255, 0.02) 50%, transparent 51%),
            linear-gradient(90deg, transparent 49%, rgba(52, 199, 89, 0.02) 50%, transparent 51%);
          background-size: 200px 200px;
          animation: circuitMove 15s linear infinite;
        }
        
        .circuit-lines-2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(45deg, transparent 49%, rgba(255, 149, 0, 0.015) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(88, 86, 214, 0.015) 50%, transparent 51%);
          background-size: 300px 300px;
          animation: circuitMove 22s linear infinite reverse;
        }
        
        /* Tech Dots */
        .tech-dots {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 0% 0%, rgba(0, 122, 255, 0.03) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(52, 199, 89, 0.02) 1px, transparent 1px),
            radial-gradient(circle at 100% 100%, rgba(255, 149, 0, 0.02) 1px, transparent 1px);
          background-size: 150px 150px, 200px 200px, 250px 250px;
          animation: techDots 20s linear infinite;
        }
        
        .tech-dots-2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 25% 75%, rgba(88, 86, 214, 0.02) 1px, transparent 1px),
            radial-gradient(circle at 75% 25%, rgba(255, 59, 48, 0.015) 1px, transparent 1px);
          background-size: 180px 180px, 220px 220px;
          animation: techDots 25s linear infinite reverse;
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
        
        .breathing-logo-bg-random {
          animation: breathingBgRandomAnimation 8s ease-in-out infinite;
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
        
        @keyframes circuitMove {
          0% { 
            transform: translate(0, 0);
          }
          100% { 
            transform: translate(200px, 200px);
          }
        }
        
        @keyframes techDots {
          0% { 
            transform: translate(0, 0) rotate(0deg);
          }
          100% { 
            transform: translate(150px, 150px) rotate(360deg);
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
        
        @keyframes breathingBgRandomAnimation {
          0% { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0.3;
          }
          25% { 
            transform: translate(-48%, -52%) scale(1.02) rotate(2deg);
            opacity: 0.35;
          }
          50% { 
            transform: translate(-52%, -48%) scale(1.05) rotate(-1deg);
            opacity: 0.4;
          }
          75% { 
            transform: translate(-49%, -51%) scale(1.03) rotate(1deg);
            opacity: 0.35;
          }
          100% { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}

export default App;