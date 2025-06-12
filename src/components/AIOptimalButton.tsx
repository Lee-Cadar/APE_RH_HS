import React, { useState } from 'react';
import { Zap, Gamepad2, Film, Cpu, Settings, X, ChevronDown } from 'lucide-react';

interface AIOptimalButtonProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
  fontSizes: any;
}

export function AIOptimalButton({ currentMode, onModeChange, fontSizes }: AIOptimalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const modes = [
    {
      id: 'optimal',
      name: 'OPTIMAL',
      description: 'AI-balanced performance',
      icon: Zap,
      color: '#34c759',
      bgColor: 'rgba(52, 199, 89, 0.1)',
      borderColor: 'rgba(52, 199, 89, 0.3)',
      features: ['Auto CPU scaling', 'Smart thermal management', 'Adaptive power distribution']
    },
    {
      id: 'gaming',
      name: 'GAMING',
      description: 'Maximum performance mode',
      icon: Gamepad2,
      color: '#ff3b30',
      bgColor: 'rgba(255, 59, 48, 0.1)',
      borderColor: 'rgba(255, 59, 48, 0.3)',
      features: ['GPU priority boost', 'High refresh rate', 'Low latency optimization']
    },
    {
      id: 'cinema',
      name: 'CINEMA',
      description: 'Media optimized mode',
      icon: Film,
      color: '#5856d6',
      bgColor: 'rgba(88, 86, 214, 0.1)',
      borderColor: 'rgba(88, 86, 214, 0.3)',
      features: ['Enhanced audio processing', 'Color accuracy boost', 'Smooth playback priority']
    },
    {
      id: 'creative',
      name: 'CREATIVE',
      description: 'Content creation mode',
      icon: Cpu,
      color: '#ff9500',
      bgColor: 'rgba(255, 149, 0, 0.1)',
      borderColor: 'rgba(255, 149, 0, 0.3)',
      features: ['CPU intensive tasks', 'RAM optimization', 'Render acceleration']
    }
  ];

  const currentModeData = modes.find(mode => mode.id === currentMode) || modes[0];

  const handleModeChange = async (newMode: string) => {
    if (newMode === currentMode) {
      setIsOpen(false);
      return;
    }
    
    setIsTransitioning(true);
    
    // Simulate AI mode transition
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onModeChange(newMode);
    setIsTransitioning(false);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Compact Mode Button with Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="modern-button px-4 py-3 transition-all duration-300 flex items-center space-x-3"
        disabled={isTransitioning}
        style={{ 
          backgroundColor: currentModeData.bgColor,
          borderColor: currentModeData.borderColor,
        }}
      >
        <currentModeData.icon className="w-5 h-5" style={{ color: currentModeData.color }} />
        <div className="modern-font font-bold" style={{ color: currentModeData.color, fontSize: fontSizes.h2 }}>
          {currentModeData.name}
        </div>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          style={{ color: currentModeData.color }} 
        />
      </button>

      {/* Slide-down Options Menu with higher z-index */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 modern-panel shadow-2xl overflow-hidden"
             style={{
               animation: 'slideDown 0.3s ease-out',
               transformOrigin: 'top',
               zIndex: 2000
             }}>
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                  <Settings className="w-5 h-5" style={{ color: '#007aff' }} />
                </div>
                <div>
                  <h3 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                    AI MODES
                  </h3>
                  <p className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                    Performance optimization
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="modern-button p-2"
                style={{ 
                  backgroundColor: 'rgba(255, 59, 48, 0.1)',
                  borderColor: 'rgba(255, 59, 48, 0.3)',
                }}
              >
                <X className="w-4 h-4" style={{ color: '#ff3b30' }} />
              </button>
            </div>
          </div>

          {/* Mode Options */}
          <div className="max-h-80 overflow-y-auto">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                disabled={isTransitioning}
                className="w-full p-4 transition-all duration-300 text-left hover:bg-white/5 border-b border-white/5 last:border-b-0"
                style={{ 
                  backgroundColor: currentMode === mode.id ? mode.bgColor : 'transparent',
                }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: mode.bgColor }}>
                    <mode.icon className="w-5 h-5" style={{ color: mode.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                        {mode.name}
                      </h4>
                      {currentMode === mode.id && (
                        <div className="w-2 h-2 rounded-full animate-pulse" 
                             style={{ backgroundColor: mode.color }}></div>
                      )}
                    </div>
                    <p className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                      {mode.description}
                    </p>
                  </div>
                </div>

                <div className="ml-11 space-y-1">
                  {mode.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: mode.color }}></div>
                      <span className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Current Status */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>Current:</div>
              <div className="flex items-center space-x-2">
                <currentModeData.icon className="w-4 h-4" style={{ color: currentModeData.color }} />
                <span className="modern-font font-bold" style={{ color: currentModeData.color, fontSize: fontSizes.h2 }}>
                  {currentModeData.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transition Overlay with higher z-index */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center"
             style={{ zIndex: 3000 }}>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-t-transparent animate-spin"
                 style={{ borderColor: currentModeData.color, borderTopColor: 'transparent' }}></div>
            <div className="font-bold modern-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
              AI OPTIMIZING
            </div>
            <div className="modern-font" style={{ color: currentModeData.color, fontSize: fontSizes.h2 }}>
              Switching to {modes.find(m => m.id !== currentMode)?.name} Mode
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modern-panel {
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
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
        }
        
        .modern-font {
          font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}