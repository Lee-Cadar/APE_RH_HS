import React, { useState } from 'react';
import { Settings, X, Monitor, Type, Gamepad2, Save, RotateCcw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: any;
  onSettingsChange: (settings: any) => void;
  fontSizes: any;
}

export function SettingsModal({ isOpen, onClose, settings, onSettingsChange, fontSizes }: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  if (!isOpen) return null;

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleReset = () => {
    setLocalSettings(settings);
  };

  const updateSetting = (key: string, value: any) => {
    setLocalSettings((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="w-[90vw] max-w-4xl modern-panel shadow-2xl">
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(255, 149, 0, 0.2)' }}>
                <Settings className="w-8 h-8" style={{ color: '#ff9500' }} />
              </div>
              <div>
                <h1 className="font-bold tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                  System Settings
                </h1>
                <p className="tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                  Configure display, accessibility, and interface preferences
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="modern-button p-3"
              style={{ 
                backgroundColor: 'rgba(255, 59, 48, 0.1)',
                borderColor: 'rgba(255, 59, 48, 0.3)',
              }}
            >
              <X className="w-6 h-6" style={{ color: '#ff3b30' }} />
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="p-8 space-y-8">
          {/* Display Settings */}
          <div className="modern-display p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Monitor className="w-6 h-6" style={{ color: '#007aff' }} />
              <h3 className="font-bold tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                Display Configuration
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-3 tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  Primary Screen
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'left', label: 'Left (Steam Deck Interface)' },
                    { value: 'right', label: 'Right (Command Center)' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="primaryScreen"
                        value={option.value}
                        checked={localSettings.primaryScreen === option.value}
                        onChange={(e) => updateSetting('primaryScreen', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-3 tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  Font Size (Accessibility)
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'small', label: 'Small (Standard)', desc: 'h1:22px, h2:14px, h3:10px' },
                    { value: 'medium', label: 'Medium (Balanced)', desc: 'h1:27px, h2:17px, h3:12px' },
                    { value: 'large', label: 'Large (Accessibility)', desc: 'h1:33px, h2:21px, h3:15px' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="fontSize"
                        value={option.value}
                        checked={localSettings.fontSize === option.value}
                        onChange={(e) => updateSetting('fontSize', e.target.value)}
                        className="w-4 h-4 mt-1"
                      />
                      <div>
                        <span className="tech-font font-bold" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                          {option.label}
                        </span>
                        <div className="tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                          {option.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Steam Deck Interface Settings */}
          <div className="modern-display p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Gamepad2 className="w-6 h-6" style={{ color: '#5856d6' }} />
              <h3 className="font-bold tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                Steam Deck Interface
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-3 tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  Shortcut Grid Configuration
                </label>
                <div className="text-sm tech-font mb-4" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                  Configure the 4x5 grid of application shortcuts on the left screen
                </div>
                
                <div className="grid grid-cols-5 gap-2 p-4 modern-display">
                  {localSettings.steamDeckShortcuts.slice(0, 20).map((shortcut: any, index: number) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg flex flex-col items-center justify-center p-2 modern-button"
                      style={{ 
                        backgroundColor: `${shortcut.color}20`,
                        borderColor: `${shortcut.color}50`
                      }}
                    >
                      <shortcut.icon className="w-4 h-4 mb-1" style={{ color: shortcut.color }} />
                      <span className="text-xs tech-font text-center" style={{ color: '#ffffff', fontSize: fontSizes.h3 }}>
                        {shortcut.name.length > 8 ? shortcut.name.slice(0, 6) + '...' : shortcut.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-3 tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                    RGB Control Zones
                  </label>
                  <div className="text-sm tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                    5 customizable RGB lighting zones
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-3 tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                    Audio Controls
                  </label>
                  <div className="text-sm tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                    Volume, treble, bass, and mid-range sliders
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gesture Settings */}
          <div className="modern-display p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Type className="w-6 h-6" style={{ color: '#34c759' }} />
              <h3 className="font-bold tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                Gesture Controls
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="font-medium tech-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                    RGB Control Overlay
                  </div>
                  <div className="text-sm tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                    Swipe bottom-to-top on left screen
                  </div>
                </div>
                
                <div>
                  <div className="font-medium tech-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                    Audio Control Overlay
                  </div>
                  <div className="text-sm tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                    Swipe right-to-left on left screen
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="font-medium tech-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                    Minimum Swipe Distance
                  </div>
                  <div className="text-sm tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                    50 pixels for gesture recognition
                  </div>
                </div>
                
                <div>
                  <div className="font-medium tech-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                    Overlay Z-Index
                  </div>
                  <div className="text-sm tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                    1000 (above all other elements)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/10 flex justify-between">
          <button
            onClick={handleReset}
            className="modern-button px-6 py-3 flex items-center space-x-2"
            style={{ 
              backgroundColor: 'rgba(142, 142, 147, 0.1)',
              borderColor: 'rgba(142, 142, 147, 0.3)',
              color: '#8e8e93'
            }}
          >
            <RotateCcw className="w-5 h-5" />
            <span className="tech-font font-bold" style={{ fontSize: fontSizes.h2 }}>Reset</span>
          </button>
          
          <button
            onClick={handleSave}
            className="modern-button px-6 py-3 flex items-center space-x-2"
            style={{ 
              backgroundColor: 'rgba(0, 122, 255, 0.2)',
              borderColor: '#007aff',
              color: '#007aff'
            }}
          >
            <Save className="w-5 h-5" />
            <span className="tech-font font-bold" style={{ fontSize: fontSizes.h2 }}>Save Settings</span>
          </button>
        </div>
      </div>

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
        
        .modern-button:hover {
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
        
        .tech-font {
          font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>
    </div>
  );
}