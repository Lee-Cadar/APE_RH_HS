import React, { useState, useEffect } from 'react';
import { Shield, Camera, Fingerprint, Lock, Eye, EyeOff, User, CheckCircle, AlertCircle } from 'lucide-react';

interface SecurityModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess: () => void;
}

export function SecurityModal({ isOpen = true, onClose, onSuccess }: SecurityModalProps) {
  const [authMethod, setAuthMethod] = useState<'face' | 'fingerprint' | 'pin'>('face');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [authStatus, setAuthStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');

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
        onSuccess();
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
        onSuccess();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="security-grid"></div>
        <div className="security-scan"></div>
        <div className="data-flow"></div>
      </div>

      {/* Main Security Panel */}
      <div className="relative w-[90vw] max-w-2xl modern-panel shadow-2xl">
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full flex items-center justify-center"
                   style={{ 
                     backgroundColor: 'rgba(0, 122, 255, 0.2)',
                     border: '2px solid #007aff'
                   }}>
                <Shield className="w-10 h-10" style={{ color: '#007aff' }} />
              </div>
              {authStatus === 'scanning' && (
                <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
                     style={{ borderColor: '#007aff', borderTopColor: 'transparent' }}></div>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold tech-font mb-2" style={{ color: '#ffffff' }}>
              APE SECURITY SYSTEM
            </h1>
            <p className="tech-font" style={{ color: '#8e8e93' }}>
              Multi-factor authentication required for system access
            </p>
          </div>
        </div>

        {/* Authentication Methods */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {authMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setAuthMethod(method.id as any)}
                disabled={isAuthenticating}
                className="modern-button p-4 transition-all duration-300 text-center"
                style={{
                  backgroundColor: authMethod === method.id ? `${method.color}20` : 'rgba(255, 255, 255, 0.05)',
                  borderColor: authMethod === method.id ? method.color : 'rgba(255, 255, 255, 0.1)',
                  borderWidth: '2px'
                }}
              >
                <method.icon className="w-8 h-8 mx-auto mb-2" 
                            style={{ color: authMethod === method.id ? method.color : '#8e8e93' }} />
                <div className="text-sm tech-font font-bold" 
                     style={{ color: authMethod === method.id ? method.color : '#ffffff' }}>
                  {method.name}
                </div>
                <div className="text-xs tech-font mt-1" style={{ color: '#8e8e93' }}>
                  {method.description}
                </div>
              </button>
            ))}
          </div>

          {/* Authentication Interface */}
          <div className="modern-display p-8 text-center">
            {authMethod === 'pin' ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl tech-font font-bold mb-2" style={{ color: '#ffffff' }}>
                    Enter Security PIN
                  </h3>
                  <p className="text-sm tech-font" style={{ color: '#8e8e93' }}>
                    Enter your 4-digit security code
                  </p>
                </div>

                <div className="relative max-w-xs mx-auto">
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.slice(0, 4))}
                    onKeyPress={(e) => e.key === 'Enter' && pin.length === 4 && handlePinSubmit()}
                    className="w-full px-4 py-3 text-center text-2xl tech-font tracking-widest modern-input"
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
                  <button
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    style={{ color: '#8e8e93' }}
                  >
                    {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <button
                  onClick={handlePinSubmit}
                  disabled={pin.length !== 4 || isAuthenticating}
                  className="modern-button px-8 py-3 transition-all duration-300 disabled:opacity-50"
                  style={{
                    backgroundColor: pin.length === 4 ? 'rgba(255, 149, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: pin.length === 4 ? '#ff9500' : 'rgba(255, 255, 255, 0.1)',
                    color: pin.length === 4 ? '#ff9500' : '#8e8e93'
                  }}
                >
                  <span className="tech-font font-bold">AUTHENTICATE</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <currentMethod.icon className="w-16 h-16 mx-auto mb-4" 
                                   style={{ color: currentMethod.color }} />
                  <h3 className="text-xl tech-font font-bold mb-2" style={{ color: '#ffffff' }}>
                    {currentMethod.name}
                  </h3>
                  <p className="text-sm tech-font" style={{ color: '#8e8e93' }}>
                    {authMethod === 'face' ? 'Position your face in front of the camera' : 'Place your finger on the sensor'}
                  </p>
                </div>

                {/* Biometric Scanner Visualization */}
                <div className="relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed animate-spin"
                       style={{ 
                         borderColor: currentMethod.color,
                         opacity: authStatus === 'scanning' ? 1 : 0.3,
                         animationDuration: '3s'
                       }}></div>
                  
                  <div className="absolute inset-4 rounded-full flex items-center justify-center"
                       style={{ 
                         backgroundColor: `${currentMethod.color}10`,
                         border: `2px solid ${currentMethod.color}50`
                       }}>
                    {authMethod === 'face' ? (
                      <User className="w-16 h-16" style={{ color: currentMethod.color }} />
                    ) : (
                      <Fingerprint className="w-16 h-16" style={{ color: currentMethod.color }} />
                    )}
                  </div>

                  {/* Progress Ring */}
                  {authStatus === 'scanning' && (
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="90"
                        fill="none"
                        stroke={currentMethod.color}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 90}`}
                        strokeDashoffset={`${2 * Math.PI * 90 * (1 - authProgress / 100)}`}
                        className="transition-all duration-200"
                      />
                    </svg>
                  )}
                </div>

                <button
                  onClick={handleAuthentication}
                  disabled={isAuthenticating}
                  className="modern-button px-8 py-3 transition-all duration-300 disabled:opacity-50"
                  style={{
                    backgroundColor: `${currentMethod.color}20`,
                    borderColor: currentMethod.color,
                    color: currentMethod.color
                  }}
                >
                  <span className="tech-font font-bold">
                    {isAuthenticating ? 'SCANNING...' : 'START SCAN'}
                  </span>
                </button>
              </div>
            )}

            {/* Status Messages */}
            {authStatus === 'success' && (
              <div className="mt-6 flex items-center justify-center space-x-2">
                <CheckCircle className="w-6 h-6" style={{ color: '#34c759' }} />
                <span className="tech-font font-bold" style={{ color: '#34c759' }}>
                  Authentication Successful
                </span>
              </div>
            )}

            {authStatus === 'failed' && (
              <div className="mt-6 flex items-center justify-center space-x-2">
                <AlertCircle className="w-6 h-6" style={{ color: '#ff3b30' }} />
                <span className="tech-font font-bold" style={{ color: '#ff3b30' }}>
                  Authentication Failed - Try Again
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 text-center">
          <div className="text-xs tech-font" style={{ color: '#8e8e93' }}>
            Secure access required • Biometric data encrypted • Privacy protected
          </div>
        </div>
      </div>

      {/* Styles */}
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
        
        .modern-display {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
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
        
        .security-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 122, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 122, 255, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 20s linear infinite;
        }
        
        .security-scan {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, transparent 0%, rgba(0, 122, 255, 0.8) 50%, transparent 100%);
          animation: scanLine 3s ease-in-out infinite;
        }
        
        .data-flow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(0, 122, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(52, 199, 89, 0.1) 0%, transparent 50%);
          animation: dataFlow 8s ease-in-out infinite;
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes scanLine {
          0% { top: 0; opacity: 1; }
          50% { top: 50%; opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        
        @keyframes dataFlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}