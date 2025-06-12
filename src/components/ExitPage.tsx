import React, { useEffect, useState } from 'react';

interface ExitPageProps {
  currentTime: Date;
  isLeftScreen?: boolean;
}

export function ExitPage({ currentTime, isLeftScreen = false }: ExitPageProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        // In a real app, this would close the application
        console.log('Application closing...');
      }, 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={`fixed inset-0 bg-black text-white flex flex-col items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ 
        width: '1440px', 
        height: '900px',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #2a2a2a 70%, #1a1a1a 100%)',
        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="exit-grid"></div>
        <div className="exit-particles"></div>
      </div>

      {/* Header for right screen only */}
      {!isLeftScreen && (
        <header className="absolute top-0 left-0 right-0 modern-header border-b z-20" 
                style={{ 
                  height: '80px',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: '1px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}>
          <div className="flex items-center justify-between h-full px-8">
            <div className="flex items-center space-x-4">
              <div className="text-xl font-bold modern-font" style={{ color: '#ffffff' }}>
                APE SYSTEM
              </div>
              <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>
                Advanced Performance Engine
              </div>
            </div>
            
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
          </div>
        </header>
      )}

      {/* Time and Date for left screen only */}
      {isLeftScreen && (
        <div className="absolute top-8 left-8 z-10">
          <div className="text-4xl font-bold modern-font mb-2" style={{ color: '#ffffff' }}>
            {formatTime(currentTime)}
          </div>
          <div className="text-xl modern-font" style={{ color: '#8e8e93' }}>
            {formatDate(currentTime)}
          </div>
        </div>
      )}

      {/* Main Logo - Centered and scaled to 80% of screen height */}
      <div className="relative z-10 flex items-center justify-center flex-1">
        <img 
          src="/Triangle_logo_black_nobg_no_letters copy.png" 
          alt="APE Logo" 
          className="object-contain breathing-logo-large"
          style={{ 
            width: 'auto', 
            height: '80vh',
            maxWidth: '80vw',
            filter: 'brightness(0.8) sepia(1) hue-rotate(200deg) saturate(1.5)'
          }}
        />
      </div>

      {/* APE DECK branding for left screen only */}
      {isLeftScreen && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="text-2xl font-bold modern-font" style={{ color: '#007aff', opacity: 0.7 }}>
            APE DECK
          </div>
          <div className="text-sm modern-font text-center" style={{ color: '#8e8e93' }}>
            Advanced Performance Engine Interface
          </div>
        </div>
      )}

      {/* Shutdown message */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center z-10">
        <div className="text-xl font-medium modern-font mb-2" style={{ color: '#ffffff' }}>
          System Shutdown Complete
        </div>
        <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>
          Thank you for using APE System
        </div>
        <div className="mt-4 text-xs modern-font" style={{ color: '#8e8e93' }}>
          Auto-close in {Math.max(0, 5 - Math.floor(Date.now() / 1000) % 60)} seconds
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .modern-header {
          border-radius: 0;
        }
        
        .breathing-logo {
          animation: breathingAnimation 4s ease-in-out infinite;
        }
        
        .breathing-logo-large {
          animation: breathingAnimationLarge 6s ease-in-out infinite;
        }
        
        .exit-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 122, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 122, 255, 0.03) 1px, transparent 1px);
          background-size: 100px 100px;
          animation: exitGrid 30s linear infinite;
        }
        
        .exit-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(0, 122, 255, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(52, 199, 89, 0.01) 0%, transparent 50%);
          animation: exitParticles 20s ease-in-out infinite;
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
        
        @keyframes breathingAnimationLarge {
          0% { 
            transform: scale(1);
            opacity: 0.7;
          }
          50% { 
            transform: scale(1.05);
            opacity: 1;
          }
          100% { 
            transform: scale(1);
            opacity: 0.7;
          }
        }
        
        @keyframes exitGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
        
        @keyframes exitParticles {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}