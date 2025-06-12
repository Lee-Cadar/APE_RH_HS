import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Power, 
  RotateCcw, 
  Moon, 
  X, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Camera, 
  Fingerprint, 
  Lock, 
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';

interface IntroPageProps {
  onAuthenticated: () => void;
  fontSizes: any;
  currentTime: Date;
}

export function IntroPage({ onAuthenticated, fontSizes, currentTime }: IntroPageProps) {
  const [authMethod, setAuthMethod] = useState<'password' | 'pin' | 'face' | 'fingerprint'>('password');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [authStatus, setAuthStatus] = useState<'idle' | 'authenticating' | 'success' | 'failed'>('idle');
  const [showPowerConfirm, setShowPowerConfirm] = useState<string | null>(null);
  const [showAuthOptions, setShowAuthOptions] = useState(false);

  const handlePasswordSubmit = async () => {
    if (password.length === 0) return;
    
    setIsAuthenticating(true);
    setAuthStatus('authenticating');
    setAuthProgress(0);

    // Simulate authentication progress
    const progressInterval = setInterval(() => {
      setAuthProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 20;
      });
    }, 200);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Accept any password for demo (or specific ones)
    if (password.length > 0) {
      setAuthStatus('success');
      setTimeout(() => {
        onAuthenticated();
      }, 1000);
    } else {
      setAuthStatus('failed');
      setTimeout(() => {
        setAuthStatus('idle');
        setIsAuthenticating(false);
        setAuthProgress(0);
        setPassword('');
      }, 2000);
    }
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4) return;
    
    setIsAuthenticating(true);
    setAuthStatus('authenticating');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (pin.length === 4) {
      setAuthStatus('success');
      setTimeout(() => {
        onAuthenticated();
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

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);
    setAuthStatus('authenticating');
    setAuthProgress(0);

    const progressInterval = setInterval(() => {
      setAuthProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    await new Promise(resolve => setTimeout(resolve, 2500));

    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      setAuthStatus('success');
      setTimeout(() => {
        onAuthenticated();
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

  const handlePowerAction = async (action: string) => {
    setShowPowerConfirm(null);
    
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
    
    alert(`Power Command Executed:\n${command}\n\nAction: ${action.toUpperCase()}\nStatus: Command sent to system\nUser: Administrator\nTimestamp: ${new Date().toLocaleString()}`);
    console.log(`Executing power command: ${command}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden"
         style={{ 
           width: '100vw', 
           height: '100vh',
           backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #2563eb 50%, #1d4ed8 75%, #1e3a8a 100%)',
           fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
         }}>
      
      {/* Windows-style background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="windows-pattern"></div>
      </div>

      {/* Power buttons - Top Right */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        <button
          onClick={() => setShowPowerConfirm('sleep')}
          className="windows-power-button"
          title="Sleep"
        >
          <Moon className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => setShowPowerConfirm('reset')}
          className="windows-power-button"
          title="Restart"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => setShowPowerConfirm('shutdown')}
          className="windows-power-button"
          title="Shut down"
        >
          <Power className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Time and Date - Bottom Left */}
      <div className="absolute bottom-6 left-6 z-20 text-white">
        <div className="text-6xl font-light mb-2" style={{ fontFamily: '"Segoe UI Light", sans-serif' }}>
          {formatTime(currentTime)}
        </div>
        <div className="text-xl font-normal opacity-90">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Main Login Area - Center Right */}
      <div className="absolute right-20 top-1/2 transform -translate-y-1/2 z-20">
        <div className="windows-login-panel">
          {/* User Avatar */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-2xl">
              <User className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-2xl font-normal text-white mb-2">Administrator</h2>
            <p className="text-blue-200 text-sm">APE System</p>
          </div>

          {/* Authentication Form */}
          <div className="space-y-6">
            {authMethod === 'password' && (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && password.length > 0 && handlePasswordSubmit()}
                    className="windows-input"
                    placeholder="Password"
                    disabled={isAuthenticating}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                <button
                  onClick={handlePasswordSubmit}
                  disabled={password.length === 0 || isAuthenticating}
                  className="windows-submit-button"
                >
                  {isAuthenticating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <span>Sign in</span>
                  )}
                </button>
              </div>
            )}

            {authMethod === 'pin' && (
              <div className="space-y-4">
                <div className="text-center">
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.slice(0, 4))}
                    onKeyPress={(e) => e.key === 'Enter' && pin.length === 4 && handlePinSubmit()}
                    className="windows-input text-center text-2xl tracking-widest"
                    placeholder="PIN"
                    maxLength={4}
                    disabled={isAuthenticating}
                  />
                </div>
                
                <button
                  onClick={handlePinSubmit}
                  disabled={pin.length !== 4 || isAuthenticating}
                  className="windows-submit-button"
                >
                  {isAuthenticating ? 'Verifying...' : 'Sign in'}
                </button>
              </div>
            )}

            {(authMethod === 'face' || authMethod === 'fingerprint') && (
              <div className="space-y-6 text-center">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-pulse"></div>
                  <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                    {authMethod === 'face' ? (
                      <Camera className="w-12 h-12 text-blue-600" />
                    ) : (
                      <Fingerprint className="w-12 h-12 text-blue-600" />
                    )}
                  </div>
                  
                  {authStatus === 'authenticating' && (
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="60"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 60}`}
                        strokeDashoffset={`${2 * Math.PI * 60 * (1 - authProgress / 100)}`}
                        className="transition-all duration-200"
                      />
                    </svg>
                  )}
                </div>
                
                <p className="text-white text-sm">
                  {authMethod === 'face' ? 'Look at the camera' : 'Touch the fingerprint sensor'}
                </p>
                
                <button
                  onClick={handleBiometricAuth}
                  disabled={isAuthenticating}
                  className="windows-submit-button"
                >
                  {isAuthenticating ? 'Scanning...' : 'Use biometric'}
                </button>
              </div>
            )}

            {/* Status Messages */}
            {authStatus === 'success' && (
              <div className="flex items-center justify-center space-x-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">Welcome! Starting system...</span>
              </div>
            )}

            {authStatus === 'failed' && (
              <div className="flex items-center justify-center space-x-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">Sign-in failed. Please try again.</span>
              </div>
            )}
          </div>

          {/* Sign-in Options */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => setShowAuthOptions(!showAuthOptions)}
              className="w-full text-blue-200 hover:text-white text-sm py-2 transition-colors"
            >
              Sign-in options
            </button>

            {showAuthOptions && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAuthMethod('password')}
                  className={`windows-auth-option ${authMethod === 'password' ? 'active' : ''}`}
                >
                  <Lock className="w-5 h-5" />
                  <span className="text-xs">Password</span>
                </button>
                <button
                  onClick={() => setAuthMethod('pin')}
                  className={`windows-auth-option ${authMethod === 'pin' ? 'active' : ''}`}
                >
                  <Shield className="w-5 h-5" />
                  <span className="text-xs">PIN</span>
                </button>
                <button
                  onClick={() => setAuthMethod('face')}
                  className={`windows-auth-option ${authMethod === 'face' ? 'active' : ''}`}
                >
                  <Camera className="w-5 h-5" />
                  <span className="text-xs">Face</span>
                </button>
                <button
                  onClick={() => setAuthMethod('fingerprint')}
                  className={`windows-auth-option ${authMethod === 'fingerprint' ? 'active' : ''}`}
                >
                  <Fingerprint className="w-5 h-5" />
                  <span className="text-xs">Fingerprint</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Power Confirmation Modal */}
      {showPowerConfirm && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="windows-modal">
            <div className="text-center">
              <div className="p-4 rounded-full mx-auto mb-4 w-fit bg-blue-100">
                {showPowerConfirm === 'reset' && <RotateCcw className="w-8 h-8 text-blue-600" />}
                {showPowerConfirm === 'shutdown' && <Power className="w-8 h-8 text-blue-600" />}
                {showPowerConfirm === 'sleep' && <Moon className="w-8 h-8 text-blue-600" />}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {showPowerConfirm === 'reset' && 'Restart your PC?'}
                {showPowerConfirm === 'shutdown' && 'Shut down your PC?'}
                {showPowerConfirm === 'sleep' && 'Put your PC to sleep?'}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {showPowerConfirm === 'reset' && 'Your PC will restart immediately. Make sure you save your work.'}
                {showPowerConfirm === 'shutdown' && 'Your PC will shut down completely.'}
                {showPowerConfirm === 'sleep' && 'Your PC will go to sleep. You can wake it up by pressing any key.'}
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPowerConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePowerAction(showPowerConfirm)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {showPowerConfirm === 'reset' && 'Restart'}
                  {showPowerConfirm === 'shutdown' && 'Shut down'}
                  {showPowerConfirm === 'sleep' && 'Sleep'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .windows-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          background-size: 100px 100px;
          animation: patternMove 20s linear infinite;
        }
        
        .windows-power-button {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }
        
        .windows-power-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .windows-login-panel {
          width: 400px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .windows-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 4px;
          font-size: 16px;
          transition: all 0.2s ease;
          background: white;
        }
        
        .windows-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .windows-submit-button {
          width: 100%;
          padding: 12px 24px;
          background: #0078d4;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .windows-submit-button:hover:not(:disabled) {
          background: #106ebe;
        }
        
        .windows-submit-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        
        .windows-auth-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px 8px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 4px;
          color: #3b82f6;
          cursor: pointer;
          transition: all 0.2s ease;
          gap: 4px;
        }
        
        .windows-auth-option:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .windows-auth-option.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
        
        .windows-modal {
          background: white;
          border-radius: 8px;
          padding: 32px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
      `}</style>
    </div>
  );
}