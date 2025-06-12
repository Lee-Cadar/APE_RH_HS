import React, { useState } from 'react';
import { Zap, Gamepad2, Film, Cpu, Settings, X } from 'lucide-react';

interface AIOptimalButtonProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
}

export function AIOptimalButton({ currentMode, onModeChange }: AIOptimalButtonProps) {
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
    if (newMode === currentMode) return;
    
    setIsTransitioning(true);
    
    // Simulate AI mode transition
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onModeChange(newMode);
    setIsTransitioning(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Compact Mode Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="modern-button px-4 py-3 transition-all duration-300 flex items-center space-x-3"
        disabled={isTransitioning}
        style={{ 
          backgroundColor: currentModeData.bgColor,
          borderColor: currentModeData.borderColor,
        }}
      >
        <currentModeData.icon className="w-5 h-5" style={{ color: currentModeData.color }} />
        <div className="text-sm modern-font font-bold" style={{ color: currentModeData.color }}>
          {currentModeData.name}
        </div>
      </button>

      {/* Mode Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          
          {/* Modal */}
          <div className="relative w-[90vw] max-w-4xl modern-panel shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-2xl" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                  <Settings className="w-8 h-8" style={{ color: '#007aff' }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold modern-font" style={{ color: '#ffffff' }}>
                    AI PERFORMANCE MODES
                  </h2>
                  <p className="modern-font" style={{ color: '#8e8e93' }}>
                    Intelligent resource allocation and optimization
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="modern-button p-3 transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(255, 59, 48, 0.1)',
                  borderColor: 'rgba(255, 59, 48, 0.3)',
                }}
              >
                <X className="w-6 h-6" style={{ color: '#ff3b30' }} />
              </button>
            </div>

            {/* Mode Grid */}
            <div className="p-6 grid grid-cols-2 gap-6">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleModeChange(mode.id)}
                  disabled={isTransitioning}
                  className="modern-button p-6 transition-all duration-500 text-left group hover:scale-105"
                  style={{ 
                    backgroundColor: currentMode === mode.id ? mode.bgColor : 'rgba(255, 255, 255, 0.05)',
                    borderColor: currentMode === mode.id ? mode.borderColor : 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '2px'
                  }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 rounded-2xl" style={{ backgroundColor: mode.bgColor }}>
                      <mode.icon className="w-8 h-8" style={{ color: mode.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold modern-font" style={{ color: '#ffffff' }}>
                        {mode.name}
                      </h3>
                      <p className="text-sm modern-font" style={{ color: '#8e8e93' }}>
                        {mode.description}
                      </p>
                    </div>
                    {currentMode === mode.id && (
                      <div className="ml-auto">
                        <div className="w-4 h-4 rounded-full animate-pulse" 
                             style={{ backgroundColor: mode.color }}></div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    {mode.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: mode.color }}></div>
                        <span className="text-sm modern-font" style={{ color: '#ffffff' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {/* Current Status */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>Current Mode:</div>
                  <div className="flex items-center space-x-2">
                    <currentModeData.icon className="w-5 h-5" style={{ color: currentModeData.color }} />
                    <span className="text-lg modern-font font-bold" style={{ color: currentModeData.color }}>
                      {currentModeData.name}
                    </span>
                  </div>
                </div>
                <div className="text-sm modern-font" style={{ color: '#8e8e93' }}>
                  AI optimization active
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-t-transparent animate-spin"
                 style={{ borderColor: currentModeData.color, borderTopColor: 'transparent' }}></div>
            <div className="text-2xl modern-font font-bold mb-2" style={{ color: '#ffffff' }}>
              AI OPTIMIZING SYSTEM
            </div>
            <div className="text-lg modern-font" style={{ color: currentModeData.color }}>
              Switching to {modes.find(m => m.id !== currentMode)?.name} Mode
            </div>
            <div className="text-sm modern-font mt-2" style={{ color: '#8e8e93' }}>
              Reallocating resources and adjusting performance parameters...
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modern-panel {
          background: rgba(0, 0, 0, 0.9);
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
        
        .modern-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .modern-font {
          font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>
    </>
  );
}