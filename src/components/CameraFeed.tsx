import React, { useState, useEffect, useRef } from 'react';
import { Camera, Monitor, Settings, Gamepad2, X, Video, VideoOff, RotateCw, Maximize, Minimize } from 'lucide-react';

interface CameraFeedProps {
  currentTime: Date;
  fontSizes: any;
  onModeChange: (mode: 'steamdeck' | 'camera' | 'controls') => void;
}

export function CameraFeed({ currentTime, fontSizes, onModeChange }: CameraFeedProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const formatTimeWithTimezone = (date: Date) => {
    const time = date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    });
    const dateStr = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return `${time} BST, ${dateStr}`;
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1024 },
          height: { ideal: 600 },
          facingMode: 'user'
        },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setCameraError('Camera access denied or not available');
      setIsConnected(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsConnected(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="w-full h-full bg-black text-white overflow-hidden select-none relative"
         style={{ 
           background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 30%, #1a1a1a 70%, #0a0a0a 100%)',
           fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
           borderRadius: '20px'
         }}>
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="camera-grid"></div>
        <div className="camera-particles"></div>
      </div>

      {/* Time and Date - Top Left */}
      <div className="absolute top-8 left-8 z-10">
        <div className="font-bold modern-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
          {currentTime.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' })}
        </div>
        <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
          {formatTimeWithTimezone(currentTime)}
        </div>
      </div>

      {/* Mode Selector - Top Right */}
      <div className="absolute top-8 right-8 z-10 flex space-x-2">
        <button
          onClick={() => onModeChange('steamdeck')}
          className="modern-button p-3 transition-all duration-300"
          style={{ 
            backgroundColor: 'rgba(0, 122, 255, 0.1)',
            borderColor: 'rgba(0, 122, 255, 0.3)',
          }}
          title="Steam Deck Interface"
        >
          <Gamepad2 className="w-5 h-5" style={{ color: '#007aff' }} />
        </button>
        
        <button
          onClick={() => onModeChange('camera')}
          className="modern-button p-3 transition-all duration-300"
          style={{ 
            backgroundColor: 'rgba(52, 199, 89, 0.2)',
            borderColor: 'rgba(52, 199, 89, 0.3)',
          }}
          title="Camera Feed (Active)"
        >
          <Camera className="w-5 h-5" style={{ color: '#34c759' }} />
        </button>
        
        <button
          onClick={() => onModeChange('controls')}
          className="modern-button p-3 transition-all duration-300"
          style={{ 
            backgroundColor: 'rgba(255, 149, 0, 0.1)',
            borderColor: 'rgba(255, 149, 0, 0.3)',
          }}
          title="System Controls"
        >
          <Settings className="w-5 h-5" style={{ color: '#ff9500' }} />
        </button>
      </div>

      {/* Main Camera Interface */}
      <div className="flex items-center justify-center h-full relative z-10">
        <div className="w-[90%] h-[80%] modern-panel p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(52, 199, 89, 0.2)' }}>
                <Camera className="w-8 h-8" style={{ color: '#34c759' }} />
              </div>
              <div>
                <h2 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                  CAMERA FEED
                </h2>
                <p className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                  Live video monitoring system
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="modern-display px-4 py-2 font-medium modern-font" 
                   style={{ 
                     backgroundColor: isConnected ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)',
                     borderColor: isConnected ? 'rgba(52, 199, 89, 0.3)' : 'rgba(255, 59, 48, 0.3)',
                     color: isConnected ? '#34c759' : '#ff3b30',
                     fontSize: fontSizes.h2
                   }}>
                {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
              </div>
            </div>
          </div>

          {/* Camera Display Area */}
          <div className="relative bg-black rounded-2xl overflow-hidden" style={{ height: 'calc(100% - 120px)' }}>
            {!isConnected && !cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Camera className="w-24 h-24 mb-6" style={{ color: '#8e8e93' }} />
                <h3 className="font-bold modern-font mb-4" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                  Camera Not Connected
                </h3>
                <p className="modern-font mb-8 text-center max-w-md" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                  Click the button below to connect to your system camera and start live monitoring
                </p>
                <button
                  onClick={startCamera}
                  className="modern-button px-8 py-4 transition-all duration-300 flex items-center space-x-3"
                  style={{ 
                    backgroundColor: 'rgba(52, 199, 89, 0.1)',
                    borderColor: 'rgba(52, 199, 89, 0.3)',
                    color: '#34c759'
                  }}
                >
                  <Video className="w-6 h-6" />
                  <span className="modern-font font-bold" style={{ fontSize: fontSizes.h2 }}>
                    Connect Camera
                  </span>
                </button>
              </div>
            )}

            {cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <VideoOff className="w-24 h-24 mb-6" style={{ color: '#ff3b30' }} />
                <h3 className="font-bold modern-font mb-4" style={{ color: '#ff3b30', fontSize: fontSizes.h1 }}>
                  Camera Error
                </h3>
                <p className="modern-font mb-8 text-center max-w-md" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                  {cameraError}
                </p>
                <button
                  onClick={startCamera}
                  className="modern-button px-8 py-4 transition-all duration-300 flex items-center space-x-3"
                  style={{ 
                    backgroundColor: 'rgba(255, 149, 0, 0.1)',
                    borderColor: 'rgba(255, 149, 0, 0.3)',
                    color: '#ff9500'
                  }}
                >
                  <RotateCw className="w-6 h-6" />
                  <span className="modern-font font-bold" style={{ fontSize: fontSizes.h2 }}>
                    Retry Connection
                  </span>
                </button>
              </div>
            )}

            {isConnected && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }} // Mirror the video
                />
                
                {/* Camera Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  <button
                    onClick={stopCamera}
                    className="modern-button p-3 transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(255, 59, 48, 0.2)',
                      borderColor: 'rgba(255, 59, 48, 0.3)',
                    }}
                    title="Disconnect Camera"
                  >
                    <VideoOff className="w-5 h-5" style={{ color: '#ff3b30' }} />
                  </button>
                  
                  <button
                    onClick={toggleFullscreen}
                    className="modern-button p-3 transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(0, 122, 255, 0.2)',
                      borderColor: 'rgba(0, 122, 255, 0.3)',
                    }}
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5" style={{ color: '#007aff' }} />
                    ) : (
                      <Maximize className="w-5 h-5" style={{ color: '#007aff' }} />
                    )}
                  </button>
                </div>

                {/* Recording Indicator */}
                <div className="absolute top-4 right-4 flex items-center space-x-2 modern-display px-3 py-2"
                     style={{ 
                       backgroundColor: 'rgba(255, 59, 48, 0.1)',
                       borderColor: 'rgba(255, 59, 48, 0.3)',
                     }}>
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#ff3b30' }}></div>
                  <span className="modern-font font-bold" style={{ color: '#ff3b30', fontSize: fontSizes.h3 }}>
                    LIVE
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* APE DECK Branding - Bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <div className="font-bold modern-font" style={{ color: '#007aff', opacity: 0.7, fontSize: fontSizes.h1 }}>
          APE DECK
        </div>
        <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
          Camera Monitoring System
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
        
        .modern-font {
          font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        
        .camera-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(52, 199, 89, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52, 199, 89, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: cameraGrid 20s linear infinite;
        }
        
        .camera-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 30% 70%, rgba(52, 199, 89, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(0, 122, 255, 0.03) 0%, transparent 50%);
          animation: cameraParticles 25s ease-in-out infinite;
        }
        
        @keyframes cameraGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes cameraParticles {
          0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.1) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}