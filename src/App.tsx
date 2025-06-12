import React, { useState, useEffect } from 'react';
import { IntroPage } from './components/IntroPage';
import { SteamDeckInterface } from './components/SteamDeckInterface';
import { CameraFeed } from './components/CameraFeed';
import { SystemControls } from './components/SystemControls';
import { VPNPage } from './components/VPNPage';
import { ExitPage } from './components/ExitPage';
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
import { SettingsPage } from './components/SettingsPage';
import { useAPESimulation } from './hooks/useAPESimulation';
import { Settings, Activity, Thermometer, Shield, ArrowLeft, MapPin, Calendar, Zap, Globe, User, Monitor, Info, Power, RotateCcw, Moon, Gamepad2, Music, Film, Camera } from 'lucide-react';

type ViewType = 'control' | 'processing' | 'network' | 'thermal' | 'system' | 'config' | 'logs' | 'network-analyzer' | 'pc-info' | 'vpn' | 'exit' | 'settings';
type ScreenMode = 'intro' | 'main' | 'steamdeck' | 'exit';
type LeftScreenMode = 'steamdeck' | 'camera' | 'controls';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('control');
  const [screenMode, setScreenMode] = useState<ScreenMode>('intro');
  const [leftScreenMode, setLeftScreenMode] = useState<LeftScreenMode>('steamdeck');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [showPowerConfirm, setShowPowerConfirm] = useState<string | null>(null);
  const [aiMode, setAiMode] = useState('optimal');
  const [showScanner, setShowScanner] = useState(false);
  const [scannerProgress, setScannerProgress] = useState(0);
  
  // Settings state
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    primaryScreen: 'right',
    steamDeckShortcuts: Array(10).fill(null).map((_, i) => ({
      id: i,
      name: i < 6 ? ['Steam', 'Discord', 'Chrome', 'Spotify', 'OBS', 'VS Code'][i] : `App ${i + 1}`,
      icon: [Gamepad2, Music, Globe, Music, Camera, Monitor, Film, Settings, Activity, Shield][i % 10],
      color: ['#007aff', '#5865f2', '#4285f4', '#1db954', '#302e31', '#007acc', '#ff9500', '#5856d6', '#ff3b30', '#34c759'][i % 10]
    }))
  });

  // Font sizes based on accessibility setting (5% smaller)
  const fontSizes = {
    small: { h1: '21px', h2: '13px', h3: '9px', iconSize: '19', value: '17px' },
    medium: { h1: '26px', h2: '16px', h3: '11px', iconSize: '24', value: '21px' },
    large: { h1: '31px', h2: '20px', h3: '14px', iconSize: '29', value: '27px' }
  }[settings.fontSize];

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
          break;
        case 'alert':
          break;
        case 'success':
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

  // Play startup sound and show scanner when system unlocks
  useEffect(() => {
    if (isAuthenticated) {
      playSound('startup');
      startScannerTransition();
      addLog('INFO', 'SystemAudio', 'All systems active - Audio feedback enabled');
    }
  }, [isAuthenticated, addLog]);

  const startScannerTransition = () => {
    setShowScanner(true);
    setScannerProgress(0);
    
    // Animate scanner line from top to bottom over 2 seconds
    const scanInterval = setInterval(() => {
      setScannerProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          // Fade out and transition to main app
          setTimeout(() => {
            setShowScanner(false);
            setScreenMode('main');
          }, 500);
          return 100;
        }
        return prev + 2; // 50 steps over 2 seconds
      });
    }, 40);
  };

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
    setIsSecurityOpen(false);
    addLog('INFO', 'SecuritySystem', 'User authentication successful - System unlocked');
  };

  const handlePowerAction = async (action: string) => {
    setShowPowerConfirm(null);
    
    let command = '';
    switch (action) {
      case 'reset':
        command = 'shutdown /r /t 0';
        break;
      case 'shutdown':
        command = 'shutdown /s /t 0';
        setScreenMode('exit');
        break;
      case 'sleep':
        command = 'rundll32.exe powrprof.dll,SetSuspendState 0,1,0';
        break;
    }
    
    alert(`Power Command Executed:\n${command}\n\nAction: ${action.toUpperCase()}\nStatus: Command sent to system\nUser: Administrator\nTimestamp: ${new Date().toLocaleString()}`);
    addLog('INFO', 'PowerManagement', `Power action executed: ${action.toUpperCase()} - Command: ${command}`);
    console.log(`Executing power command: ${command}`);
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

  // Render based on screen mode and authentication status
  if (screenMode === 'intro' || !isAuthenticated) {
    return (
      <div className="flex" style={{ width: '100vw', height: '100vh', padding: '10px', gap: '10px' }}>
        {/* Left Screen - Intro Page */}
        <div style={{ width: '1024px', height: '600px' }}>
          <IntroPage 
            onAuthenticated={() => setIsAuthenticated(true)} 
            fontSizes={fontSizes}
            currentTime={currentTime}
          />
        </div>
        
        {/* Right Screen - Intro Page */}
        <div style={{ width: '1024px', height: '600px' }}>
          <IntroPage 
            onAuthenticated={() => setIsAuthenticated(true)} 
            fontSizes={fontSizes}
            currentTime={currentTime}
          />
        </div>
      </div>
    );
  }

  if (screenMode === 'exit') {
    return (
      <div className="flex" style={{ width: '100vw', height: '100vh', padding: '10px', gap: '10px' }}>
        {/* Left Screen - Exit Page */}
        <div style={{ width: '1024px', height: '600px' }}>
          <ExitPage currentTime={currentTime} isLeftScreen={true} fontSizes={fontSizes} />
        </div>
        
        {/* Right Screen - Exit Page */}
        <div style={{ width: '1024px', height: '600px' }}>
          <ExitPage currentTime={currentTime} isLeftScreen={false} fontSizes={fontSizes} />
        </div>
      </div>
    );
  }

  // VPN Page (full screen)
  if (currentView === 'vpn') {
    return (
      <VPNPage 
        onBack={() => setCurrentView('control')}
        locationInfo={locationInfo}
        onLocationChange={handleLocationChange}
        fontSizes={fontSizes}
      />
    );
  }

  // Settings Page (full screen)
  if (currentView === 'settings') {
    return (
      <div style={{ width: '100vw', height: '100vh', padding: '10px' }}>
        <SettingsPage 
          settings={settings}
          onSettingsChange={setSettings}
          fontSizes={fontSizes}
          onBack={() => setCurrentView('control')}
        />
      </div>
    );
  }

  return (
    <div className="flex" style={{ width: '100vw', height: '100vh', padding: '10px', gap: '10px' }}>
      {/* Left Screen - Multiple Modes */}
      <div style={{ width: '1024px', height: '600px' }}>
        {leftScreenMode === 'steamdeck' && (
          <SteamDeckInterface 
            currentTime={currentTime} 
            settings={settings}
            onSettingsChange={setSettings}
            fontSizes={fontSizes}
          />
        )}
        {leftScreenMode === 'camera' && (
          <CameraFeed 
            currentTime={currentTime}
            fontSizes={fontSizes}
            onModeChange={setLeftScreenMode}
          />
        )}
        {leftScreenMode === 'controls' && (
          <SystemControls 
            currentTime={currentTime}
            fontSizes={fontSizes}
            onModeChange={setLeftScreenMode}
          />
        )}
      </div>
      
      {/* Right Screen - Main Application */}
      <div style={{ width: '1024px', height: '600px' }}>
        <div 
          className="relative overflow-hidden select-none modern-dashboard"
          style={{ 
            width: '100%', 
            height: '100%',
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #2a2a2a 70%, #1a1a1a 100%)',
            fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            color: '#ffffff',
            borderRadius: '20px'
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

          {/* Logo Background - Right Side */}
          <div className="absolute top-0 right-0 w-full h-full overflow-visible pointer-events-none z-0">
            <div className="absolute -right-1/6 top-1/2 transform -translate-y-1/2">
              <img 
                src="/Triangle_logo_black_nobg_no_letters copy.png" 
                alt="APE Logo Background" 
                className="object-contain opacity-30 breathing-logo-bg-random"
                style={{ 
                  width: '420px', 
                  height: '420px',
                  filter: 'brightness(0.3) sepia(1) hue-rotate(200deg) saturate(2)'
                }}
              />
            </div>
          </div>

          {/* Top Header with Date, GPS, Location */}
          <header className="relative modern-header border-b z-20" 
                  style={{ 
                    height: '60px',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '1px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                  }}>
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" style={{ color: '#007aff' }} />
                  <div>
                    <div className="font-medium modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h3 }}>
                      {formatDate(currentTime)}
                    </div>
                    <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                      {formatTime(currentTime)} {locationInfo.timezone}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setCurrentView('vpn')}
                  className="flex items-center space-x-2 modern-button px-3 py-2 transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: 'rgba(52, 199, 89, 0.1)',
                    borderColor: 'rgba(52, 199, 89, 0.3)',
                  }}
                >
                  <MapPin className="w-4 h-4" style={{ color: '#34c759' }} />
                  <div>
                    <div className="font-medium modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h3 }}>
                      {locationInfo.postcode}
                    </div>
                    <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                      {locationInfo.city.split(',')[0]}
                    </div>
                  </div>
                </button>
              </div>
              
              {/* Right Side - Status, Power Buttons, AI Mode, Profile */}
              <div className="flex items-center space-x-3">
                <div className="modern-display px-3 py-2 font-medium modern-font" 
                style={{ 
                  backgroundColor: temperature < 60 ? 'rgba(52, 199, 89, 0.1)' : temperature < 80 ? 'rgba(255, 149, 0, 0.1)' : 'rgba(255, 59, 48, 0.1)',
                  borderColor: temperature < 60 ? 'rgba(52, 199, 89, 0.3)' : temperature < 80 ? 'rgba(255, 149, 0, 0.3)' : 'rgba(255, 59, 48, 0.3)',
                  color: temperature < 60 ? '#34c759' : temperature < 80 ? '#ff9500' : '#ff3b30',
                  fontSize: fontSizes.h3
                }}>
                  {temperature < 60 ? 'OPTIMAL' : temperature < 80 ? 'WARNING' : 'CRITICAL'}
                </div>

                {/* Power Button Module */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setShowPowerConfirm('reset')}
                    className="modern-button p-2 transition-all duration-300 hover:scale-105"
                    style={{ 
                      backgroundColor: 'rgba(255, 59, 48, 0.1)',
                      borderColor: 'rgba(255, 59, 48, 0.3)',
                    }}
                    title="System Reset"
                  >
                    <RotateCcw className="w-3 h-3" style={{ color: '#ff3b30' }} />
                  </button>

                  <button
                    onClick={() => setShowPowerConfirm('shutdown')}
                    className="modern-button p-2 transition-all duration-300 hover:scale-105"
                    style={{ 
                      backgroundColor: 'rgba(255, 149, 0, 0.1)',
                      borderColor: 'rgba(255, 149, 0, 0.3)',
                    }}
                    title="System Shutdown"
                  >
                    <Power className="w-3 h-3" style={{ color: '#ff9500' }} />
                  </button>

                  <button
                    onClick={() => setShowPowerConfirm('sleep')}
                    className="modern-button p-2 transition-all duration-300 hover:scale-105"
                    style={{ 
                      backgroundColor: 'rgba(88, 86, 214, 0.1)',
                      borderColor: 'rgba(88, 86, 214, 0.3)',
                    }}
                    title="System Sleep"
                  >
                    <Moon className="w-3 h-3" style={{ color: '#5856d6' }} />
                  </button>
                </div>

                {/* AI Mode Button */}
                <div style={{ zIndex: 2000 }}>
                  <AIOptimalButton currentMode={aiMode} onModeChange={setAiMode} fontSizes={fontSizes} />
                </div>
                
                {/* Settings Button */}
                <button 
                  onClick={() => setCurrentView('settings')}
                  className="modern-button p-2 transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: 'rgba(255, 149, 0, 0.1)',
                    borderColor: 'rgba(255, 149, 0, 0.3)',
                  }}
                >
                  <Settings className="w-3 h-3" style={{ color: '#ff9500' }} />
                </button>

                {/* Logo */}
                <div className="relative">
                  <img 
                    src="/Triangle_logo_black_nobg_no_letters copy.png" 
                    alt="APE Logo" 
                    className="object-contain breathing-logo"
                    style={{ 
                      width: '30px', 
                      height: '30px',
                    }}
                  />
                </div>

                {/* Profile Button */}
                <button 
                  onClick={() => setIsSecurityOpen(true)}
                  className="modern-button p-2 transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: 'rgba(88, 86, 214, 0.1)',
                    borderColor: 'rgba(88, 86, 214, 0.3)',
                  }}
                >
                  <User className="w-3 h-3" style={{ color: '#5856d6' }} />
                </button>
              </div>
            </div>
          </header>

          {/* Navigation for Control, Config, Logs, Network Analyzer, PC Info */}
          {(currentView === 'control' || currentView === 'config' || currentView === 'logs' || currentView === 'network-analyzer' || currentView === 'pc-info') && (
            <nav className="relative modern-nav border-b z-20" 
                 style={{ 
                   height: '50px',
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
                      className={`flex-1 flex items-center justify-center space-x-2 font-medium transition-all duration-300 transform active:scale-95 modern-font modern-tab ${
                        currentView === tab.id ? 'active' : ''
                      }`}
                      style={{ 
                        backgroundColor: currentView === tab.id ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
                        color: currentView === tab.id ? '#007aff' : '#8e8e93',
                        borderBottom: currentView === tab.id ? '3px solid #007aff' : '3px solid transparent',
                        fontSize: fontSizes.h3
                      }}
                    >
                      <Icon className="w-3 h-3" />
                      <span className="tracking-wide">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          )}

          {/* Main Content */}
          <main className="relative overflow-y-auto z-10" style={{ height: currentView === 'control' || currentView === 'config' || currentView === 'logs' || currentView === 'network-analyzer' || currentView === 'pc-info' ? 'calc(600px - 110px)' : 'calc(600px - 60px)' }}>
            <div className="p-4">
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
                  fontSizes={fontSizes}
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

          {/* Power Confirmation Modal */}
          {showPowerConfirm && (
            <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center">
              <div className="modern-panel p-6 max-w-md w-full mx-4">
                <div className="text-center">
                  <div className="p-3 rounded-2xl mx-auto mb-4 w-fit"
                       style={{ 
                         backgroundColor: showPowerConfirm === 'reset' ? 'rgba(255, 59, 48, 0.2)' :
                                         showPowerConfirm === 'shutdown' ? 'rgba(255, 149, 0, 0.2)' :
                                         'rgba(88, 86, 214, 0.2)'
                       }}>
                    {showPowerConfirm === 'reset' && <RotateCcw className="w-8 h-8" style={{ color: '#ff3b30' }} />}
                    {showPowerConfirm === 'shutdown' && <Power className="w-8 h-8" style={{ color: '#ff9500' }} />}
                    {showPowerConfirm === 'sleep' && <Moon className="w-8 h-8" style={{ color: '#5856d6' }} />}
                  </div>
                  
                  <h3 className="font-bold tech-font mb-3" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                    Confirm {showPowerConfirm.charAt(0).toUpperCase() + showPowerConfirm.slice(1)}
                  </h3>
                  
                  <p className="tech-font mb-6" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                    Are you sure you want to {showPowerConfirm} the system?
                  </p>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowPowerConfirm(null)}
                      className="flex-1 modern-button px-4 py-2 transition-all duration-300"
                      style={{ 
                        backgroundColor: 'rgba(142, 142, 147, 0.1)',
                        borderColor: 'rgba(142, 142, 147, 0.3)',
                        color: '#8e8e93'
                      }}
                    >
                      <span className="tech-font font-bold" style={{ fontSize: fontSizes.h2 }}>Cancel</span>
                    </button>
                    <button
                      onClick={() => handlePowerAction(showPowerConfirm)}
                      className="flex-1 modern-button px-4 py-2 transition-all duration-300"
                      style={{ 
                        backgroundColor: showPowerConfirm === 'reset' ? 'rgba(255, 59, 48, 0.2)' :
                                        showPowerConfirm === 'shutdown' ? 'rgba(255, 149, 0, 0.2)' :
                                        'rgba(88, 86, 214, 0.2)',
                        borderColor: showPowerConfirm === 'reset' ? '#ff3b30' :
                                    showPowerConfirm === 'shutdown' ? '#ff9500' :
                                    '#5856d6',
                        color: showPowerConfirm === 'reset' ? '#ff3b30' :
                              showPowerConfirm === 'shutdown' ? '#ff9500' :
                              '#5856d6'
                      }}
                    >
                      <span className="tech-font font-bold" style={{ fontSize: fontSizes.h2 }}>Confirm</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Critical Alert Overlay */}
          {temperature > 85 && (
            <div className="fixed top-4 right-4 modern-alert p-4 shadow-2xl animate-pulse z-50 rounded-2xl"
                 style={{ 
                   backgroundColor: 'rgba(255, 59, 48, 0.1)',
                   borderColor: 'rgba(255, 59, 48, 0.3)',
                   borderWidth: '1px',
                   backdropFilter: 'blur(20px)'
                 }}>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 animate-ping rounded-full" 
                     style={{ backgroundColor: '#ff3b30' }}></div>
                <span className="font-medium modern-font" style={{ color: '#ff3b30', fontSize: fontSizes.h3 }}>
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
            
            .tech-font {
              font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            
            .modern-panel {
              background: rgba(0, 0, 0, 0.95);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 20px;
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
              width: 120px;
              height: 120px;
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
              width: 200px;
              height: 200px;
            }
            
            .pulse-rings-2::before,
            .pulse-rings-2::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 100px;
              height: 100px;
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
              width: 250px;
              height: 250px;
            }
            
            .pulse-rings-3::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 80px;
              height: 80px;
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
      </div>

      {/* Scanner Transition Overlay - Covers both screens */}
      {showScanner && (
        <div className="fixed inset-0 z-[9999] bg-black flex">
          {/* Left Screen Scanner */}
          <div className="w-1/2 relative">
            <div 
              className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-lg"
              style={{ 
                top: `${scannerProgress}%`,
                boxShadow: '0 0 20px #34c759, 0 0 40px #34c759',
                transition: 'top 0.04s linear'
              }}
            />
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 w-full h-px bg-green-400"
                  style={{ 
                    top: `${i * 3.33}%`,
                    opacity: scannerProgress > i * 3.33 ? 0.3 : 0,
                    transition: 'opacity 0.1s ease'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Right Screen Scanner */}
          <div className="w-1/2 relative">
            <div 
              className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-lg"
              style={{ 
                top: `${scannerProgress}%`,
                boxShadow: '0 0 20px #34c759, 0 0 40px #34c759',
                transition: 'top 0.04s linear'
              }}
            />
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 w-full h-px bg-green-400"
                  style={{ 
                    top: `${i * 3.33}%`,
                    opacity: scannerProgress > i * 3.33 ? 0.3 : 0,
                    transition: 'opacity 0.1s ease'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Scanner progress text */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
            <div className="font-bold tech-font mb-2" style={{ color: '#34c759', fontSize: fontSizes.h1 }}>
              SYSTEM SCAN IN PROGRESS
            </div>
            <div className="tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
              {scannerProgress.toFixed(0)}% Complete
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;