import React, { useState, useEffect } from 'react';
import { Shield, Power, RotateCcw, Moon, X, CheckCircle, AlertCircle, User, Camera, Fingerprint, Lock } from 'lucide-react';

interface IntroPageProps {
  onAuthenticated: () => void;
}

export function IntroPage({ onAuthenticated }: IntroPageProps) {
  const [authMethod, setAuthMethod] = useState<'face' | 'fingerprint' | 'pin'>('face');
  const [pin, setPin] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [authStatus, setAuthStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [showScanner, setShowScanner] = useState(false);
  const [scannerProgress, setScannerProgress] = useState(0);
  const [showPowerConfirm, setShowPowerConfirm] = useState<string | null>(null);

  const handleAuthentication = async () => {
    setIsAuthenticating(true);
    setAuthStatus('scanning');
    setAuthProgress(0);

    // Simulate authentication progress
    const progressInterval = setInterval(() => {
      setAuthProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simulate success (90% chance)
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      setAuthStatus('success');
      setTimeout(() => {
        startScannerTransition();
      }, 1000);
    } else {
      setAuthStatus('failed');
      setTimeout(() => {
        setAuthStatus('idle');
        setIsAuthenticating(false);
        setAuthProgress(0);
      }, 2000);
    }
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4) return;
    
    setIsAuthenticating(true);
    setAuthStatus('scanning');
    
    // Simulate PIN verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Accept PIN "1234" or any 4-digit PIN for demo
    if (pin === '1234' || pin.length === 4) {
      setAuthStatus('success');
      setTimeout(() => {
        startScannerTransition();
      }, 1000);
    } else {
      setAuthStatus('failed');
      setTimeout(() => {
        setAuthStatus('idle');
        setIsAuthenticating(false);
        setPin('');
      }, 2000);
    }
  };

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
            onAuthenticated();
          }, 500);
          return 100;
        }
        return prev + 2; // 50 steps over 2 seconds
      });
    }, 40);
  };

  const handlePowerAction = async (action: string) => {
    setShowPowerConfirm(null);
    
    // Simulate backend command execution
    let command = '';
    switch (action) {
      case 'reset':
        command = 'shutdown /r /t 0';
        break;
      case 'shutdown':
        command = 'shutdown /s /t 0';
        break;
      case 'sleep':
        command = 'rundll32.exe powrprof.dll,SetSuspendState 0,1,0';
        break;
    }
    
    // Show confirmation
    alert(`Power Command Executed:\n${command}\n\nAction: ${action.toUpperCase()}\nStatus: Command sent to system\nUser: Administrator\nTimestamp: ${new Date().toLocaleString()}`);
    
    // In a real implementation, this would send the command to the backend
    console.log(`Executing power command: ${command}`);
  };

  const authMethods = [
    {
      id: 'face',
      name: 'Facial Recognition',
      icon: Camera,
      description: 'Use camera for facial recognition',
      color: '#007aff'
    },
    {
      id: 'fingerprint',
      name: 'Fingerprint',
      icon: Fingerprint,
      description: 'Touch sensor for fingerprint scan',
      color: '#34c759'
    },
    {
      id: 'pin',
      name: 'PIN Code',
      icon: Lock,
      description: 'Enter 4-digit security PIN',
      color: '#ff9500'
    }
  ];

  const currentMethod = authMethods.find(method => method.id === authMethod);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black overflow-hidden">
      {/* Animated Background matching main app */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Logo Background - matching main app */}
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

      {/* Header with Power Buttons - matching main app layout */}
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
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                <Shield className="w-8 h-8" style={{ color: '#007aff' }} />
              </div>
              <div>
                <div className="text-xl font-bold modern-font" style={{ color: '#ffffff' }}>
                  APE SECURITY SYSTEM
                </div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>
                  Advanced Performance Engine - Authentication Required
                </div>
              </div>
            </div>
          </div>
          
          {/* Power Button Module */}
          <div className="flex items-center space-x-4">
            {/* Reset Button */}
            <button
              onClick={() => setShowPowerConfirm('reset')}
              className="modern-button p-3 transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(255, 59, 48, 0.1)',
                borderColor: 'rgba(255, 59, 48, 0.3)',
              }}
              title="System Reset"
            >
              <RotateCcw className="w-6 h-6" style={{ color: '#ff3b30' }} />
            </button>

            {/* Shutdown Button */}
            <button
              onClick={() => setShowPowerConfirm('shutdown')}
              className="modern-button p-3 transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(255, 149, 0, 0.1)',
                borderColor: 'rgba(255, 149, 0, 0.3)',
              }}
              title="System Shutdown"
            >
              <Power className="w-6 h-6" style={{ color: '#ff9500' }} />
            </button>

            {/* Sleep Button */}
            <button
              onClick={() => setShowPowerConfirm('sleep')}
              className="modern-button p-3 transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(88, 86, 214, 0.1)',
                borderColor: 'rgba(88, 86, 214, 0.3)',
              }}
              title="System Sleep"
            >
              <Moon className="w-6 h-6" style={{ color: '#5856d6' }} />
            </button>

            {/* Logo */}
            <div className="relative ml-6">
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
          </div>
        </div>
      </header>

      {/* Main Authentication Content */}
      <main className="relative flex-1 flex items-center justify-center z-10">
        <div className="w-[90vw] max-w-4xl modern-panel shadow-2xl">
          {/* Authentication Methods */}
          <div className="p-8 border-b border-white/10">
            <div className="grid grid-cols-3 gap-6 mb-8">
              {authMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setAuthMethod(method.id as any)}
                  disabled={isAuthenticating}
                  className="modern-button p-6 transition-all duration-300 text-center"
                  style={{
                    backgroundColor: authMethod === method.id ? `${method.color}20` : 'rgba(255, 255, 255, 0.05)',
                    borderColor: authMethod === method.id ? method.color : 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '2px'
                  }}
                >
                  <method.icon className="w-10 h-10 mx-auto mb-3" 
                              style={{ color: authMethod === method.id ? method.color : '#8e8e93' }} />
                  <div className="text-lg tech-font font-bold" 
                       style={{ color: authMethod === method.id ? method.color : '#ffffff' }}>
                    {method.name}
                  </div>
                  <div className="text-sm tech-font mt-2" style={{ color: '#8e8e93' }}>
                    {method.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Authentication Interface */}
          <div className="p-8">
            {authMethod === 'pin' ? (
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-2xl tech-font font-bold mb-3" style={{ color: '#ffffff' }}>
                    Enter Security PIN
                  </h3>
                  <p className="text-lg tech-font" style={{ color: '#8e8e93' }}>
                    Enter your 4-digit security code
                  </p>
                </div>

                <div className="max-w-xs mx-auto">
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.slice(0, 4))}
                    onKeyPress={(e) => e.key === 'Enter' && pin.length === 4 && handlePinSubmit()}
                    className="w-full px-6 py-4 text-center text-3xl tech-font tracking-widest modern-input"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontFamily: 'Technology, monospace'
                    }}
                    placeholder="••••"
                    maxLength={4}
                    disabled={isAuthenticating}
                  />
                </div>

                <button
                  onClick={handlePinSubmit}
                  disabled={pin.length !== 4 || isAuthenticating}
                  className="modern-button px-12 py-4 transition-all duration-300 disabled:opacity-50"
                  style={{
                    backgroundColor: pin.length === 4 ? 'rgba(255, 149, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: pin.length === 4 ? '#ff9500' : 'rgba(255, 255, 255, 0.1)',
                    color: pin.length === 4 ? '#ff9500' : '#8e8e93'
                  }}
                >
                  <span className="tech-font font-bold text-lg">
                    {isAuthenticating ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
                  </span>
                </button>
              </div>
            ) : (
              <div className="text-center space-y-8">
                <div>
                  <currentMethod.icon className="w-20 h-20 mx-auto mb-6" 
                                   style={{ color: currentMethod.color }} />
                  <h3 className="text-2xl tech-font font-bold mb-3" style={{ color: '#ffffff' }}>
                    {currentMethod.name}
                  </h3>
                  <p className="text-lg tech-font" style={{ color: '#8e8e93' }}>
                    {authMethod === 'face' ? 'Position your face in front of the camera' : 'Place your finger on the sensor'}
                  </p>
                </div>

                {/* Biometric Scanner Visualization */}
                <div className="relative w-64 h-64 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed animate-spin"
                       style={{ 
                         borderColor: currentMethod.color,
                         opacity: authStatus === 'scanning' ? 1 : 0.3,
                         animationDuration: '3s'
                       }}></div>
                  
                  <div className="absolute inset-6 rounded-full flex items-center justify-center"
                       style={{ 
                         backgroundColor: `${currentMethod.color}10`,
                         border: `2px solid ${currentMethod.color}50`
                       }}>
                    {authMethod === 'face' ? (
                      <User className="w-20 h-20" style={{ color: currentMethod.color }} />
                    ) : (
                      <Fingerprint className="w-20 h-20" style={{ color: currentMethod.color }} />
                    )}
                  </div>

                  {/* Progress Ring */}
                  {authStatus === 'scanning' && (
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="120"
                        fill="none"
                        stroke={currentMethod.color}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 120}`}
                        strokeDashoffset={`${2 * Math.PI * 120 * (1 - authProgress / 100)}`}
                        className="transition-all duration-200"
                      />
                    </svg>
                  )}
                </div>

                <button
                  onClick={handleAuthentication}
                  disabled={isAuthenticating}
                  className="modern-button px-12 py-4 transition-all duration-300 disabled:opacity-50"
                  style={{
                    backgroundColor: `${currentMethod.color}20`,
                    borderColor: currentMethod.color,
                    color: currentMethod.color
                  }}
                >
                  <span className="tech-font font-bold text-lg">
                    {isAuthenticating ? 'SCANNING...' : 'START SCAN'}
                  </span>
                </button>
              </div>
            )}

            {/* Status Messages */}
            {authStatus === 'success' && (
              <div className="mt-8 flex items-center justify-center space-x-3">
                <CheckCircle className="w-8 h-8" style={{ color: '#34c759' }} />
                <span className="tech-font font-bold text-xl" style={{ color: '#34c759' }}>
                  Authentication Successful - Initializing System...
                </span>
              </div>
            )}

            {authStatus === 'failed' && (
              <div className="mt-8 flex items-center justify-center space-x-3">
                <AlertCircle className="w-8 h-8" style={{ color: '#ff3b30' }} />
                <span className="tech-font font-bold text-xl" style={{ color: '#ff3b30' }}>
                  Authentication Failed - Please Try Again
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Power Confirmation Modal */}
      {showPowerConfirm && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="modern-panel p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="p-4 rounded-2xl mx-auto mb-6 w-fit"
                   style={{ 
                     backgroundColor: showPowerConfirm === 'reset' ? 'rgba(255, 59, 48, 0.2)' :
                                     showPowerConfirm === 'shutdown' ? 'rgba(255, 149, 0, 0.2)' :
                                     'rgba(88, 86, 214, 0.2)'
                   }}>
                {showPowerConfirm === 'reset' && <RotateCcw className="w-12 h-12" style={{ color: '#ff3b30' }} />}
                {showPowerConfirm === 'shutdown' && <Power className="w-12 h-12" style={{ color: '#ff9500' }} />}
                {showPowerConfirm === 'sleep' && <Moon className="w-12 h-12" style={{ color: '#5856d6' }} />}
              </div>
              
              <h3 className="text-2xl font-bold tech-font mb-4" style={{ color: '#ffffff' }}>
                Confirm {showPowerConfirm.charAt(0).toUpperCase() + showPowerConfirm.slice(1)}
              </h3>
              
              <p className="text-lg tech-font mb-8" style={{ color: '#8e8e93' }}>
                Are you sure you want to {showPowerConfirm} the system?
                {showPowerConfirm === 'reset' && ' This will restart the computer immediately.'}
                {showPowerConfirm === 'shutdown' && ' This will power off the computer immediately.'}
                {showPowerConfirm === 'sleep' && ' This will put the computer into sleep mode.'}
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPowerConfirm(null)}
                  className="flex-1 modern-button px-6 py-3 transition-all duration-300"
                  style={{ 
                    backgroundColor: 'rgba(142, 142, 147, 0.1)',
                    borderColor: 'rgba(142, 142, 147, 0.3)',
                    color: '#8e8e93'
                  }}
                >
                  <span className="tech-font font-bold">Cancel</span>
                </button>
                <button
                  onClick={() => handlePowerAction(showPowerConfirm)}
                  className="flex-1 modern-button px-6 py-3 transition-all duration-300"
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
                  <span className="tech-font font-bold">Confirm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scanner Transition Overlay */}
      {showScanner && (
        <div className="fixed inset-0 z-70 bg-black">
          {/* Vertical green scan line */}
          <div 
            className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-lg"
            style={{ 
              top: `${scannerProgress}%`,
              boxShadow: '0 0 20px #34c759, 0 0 40px #34c759',
              transition: 'top 0.04s linear'
            }}
          />
          
          {/* Scan lines effect */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-0 w-full h-px bg-green-400"
                style={{ 
                  top: `${i * 2}%`,
                  opacity: scannerProgress > i * 2 ? 0.3 : 0,
                  transition: 'opacity 0.1s ease'
                }}
              />
            ))}
          </div>
          
          {/* Scanner progress text */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-2xl font-bold tech-font mb-2" style={{ color: '#34c759' }}>
              SYSTEM SCAN IN PROGRESS
            </div>
            <div className="text-lg tech-font" style={{ color: '#8e8e93' }}>
              {scannerProgress.toFixed(0)}% Complete
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Styles matching main app */}
      <style jsx>{`
        .modern-panel {
          background: rgba(0, 0, 0, 0.95);
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
        
        .modern-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
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
        
        .modern-header {
          border-radius: 0;
        }
        
        .tech-font {
          font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        
        .breathing-logo {
          animation: breathingAnimation 4s ease-in-out infinite;
        }
        
        .breathing-logo-bg-random {
          animation: breathingBgRandomAnimation 8s ease-in-out infinite;
        }
        
        /* All background animations from main app */
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
        
        /* Keyframe animations */
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