import React, { useState } from 'react';
import { Settings, Monitor, Type, Save, RotateCcw, ArrowLeft, Activity } from 'lucide-react';

interface SettingsPageProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
  fontSizes: any;
  onBack: () => void;
}

export function SettingsPage({ settings, onSettingsChange, fontSizes, onBack }: SettingsPageProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    onSettingsChange(localSettings);
    setHasChanges(false);
    onBack();
  };

  const handleReset = () => {
    setLocalSettings(settings);
    setHasChanges(false);
  };

  const updateSetting = (key: string, value: any) => {
    setLocalSettings((prev: any) => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden"
         style={{ 
           width: '100vw', 
           height: '100vh',
           margin: '0',
           padding: '10px'
         }}>
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles"></div>
      </div>

      {/* Header */}
      <div className="relative modern-panel-header p-8 shadow-lg"
           style={{ 
             height: '100px',
             background: 'rgba(255, 255, 255, 0.05)',
             borderColor: 'rgba(255, 255, 255, 0.1)',
             borderWidth: '1px'
           }}>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-6">
            <button
              onClick={onBack}
              className="modern-button p-4 transition-all duration-300"
              style={{ 
                backgroundColor: 'rgba(255, 59, 48, 0.1)',
                borderColor: 'rgba(255, 59, 48, 0.3)',
              }}
            >
              <ArrowLeft className="w-7 h-7" style={{ color: '#ff3b30' }} />
            </button>
            <div className="modern-button p-4"
                 style={{ 
                   backgroundColor: 'rgba(255, 149, 0, 0.1)',
                   borderColor: 'rgba(255, 149, 0, 0.3)',
                 }}>
              <Settings className="w-9 h-9" style={{ color: '#ff9500' }} />
            </div>
            <div>
              <h2 className="font-medium modern-font tracking-tight" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                System Settings
              </h2>
              <p className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>Configure display and accessibility preferences</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {hasChanges && (
              <div className="modern-display px-4 py-2 font-medium modern-font" 
                   style={{ 
                     backgroundColor: 'rgba(255, 149, 0, 0.1)',
                     borderColor: 'rgba(255, 149, 0, 0.3)',
                     color: '#ff9500',
                     fontSize: fontSizes.h3
                   }}>
                Unsaved Changes
              </div>
            )}
            
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="modern-button px-8 py-4 transition-all duration-300 flex items-center space-x-3 modern-font font-semibold disabled:opacity-50"
              style={{ 
                backgroundColor: hasChanges ? 'rgba(0, 122, 255, 0.1)' : 'rgba(142, 142, 147, 0.05)',
                borderColor: hasChanges ? 'rgba(0, 122, 255, 0.3)' : 'rgba(142, 142, 147, 0.2)',
                color: hasChanges ? '#007aff' : '#8e8e93',
                fontSize: fontSizes.h2
              }}
            >
              <Save className="w-5 h-5" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex justify-center items-center h-[calc(100%-180px)] p-8">
        <div className="w-full max-w-2xl space-y-8">
          
          {/* Font Size Settings */}
          <div className="modern-panel p-8 shadow-lg">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(52, 199, 89, 0.2)' }}>
                <Type className="w-8 h-8" style={{ color: '#34c759' }} />
              </div>
              <div>
                <h3 className="font-bold tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                  Accessibility Settings
                </h3>
                <p className="tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                  Adjust font sizes for better readability
                </p>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-6 tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                Font Size
              </label>
              <div className="space-y-4">
                {[
                  { value: 'small', label: 'Small (Standard)', desc: 'Compact interface with smaller text' },
                  { value: 'medium', label: 'Medium (Recommended)', desc: 'Balanced readability and space usage' },
                  { value: 'large', label: 'Large (Accessibility)', desc: 'Enhanced readability for better accessibility' }
                ].map((option) => (
                  <label key={option.value} className="modern-display p-6 flex items-start space-x-4 cursor-pointer transition-all duration-300 hover:bg-white/10">
                    <input
                      type="radio"
                      name="fontSize"
                      value={option.value}
                      checked={localSettings.fontSize === option.value}
                      onChange={(e) => updateSetting('fontSize', e.target.value)}
                      className="w-5 h-5 mt-1"
                      style={{ accentColor: '#007aff' }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="tech-font font-bold" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                          {option.label}
                        </span>
                        {localSettings.fontSize === option.value && (
                          <div className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)', color: '#007aff' }}>
                            <span className="tech-font font-bold" style={{ fontSize: fontSizes.h3 }}>ACTIVE</span>
                          </div>
                        )}
                      </div>
                      <div className="tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                        {option.desc}
                      </div>
                      
                      {/* Preview Text */}
                      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <div className="tech-font" style={{ color: '#ffffff', fontSize: option.value === 'small' ? '21px' : option.value === 'medium' ? '26px' : '31px' }}>
                          Sample Text Preview
                        </div>
                        <div className="tech-font" style={{ color: '#8e8e93', fontSize: option.value === 'small' ? '13px' : option.value === 'medium' ? '16px' : '20px' }}>
                          This is how text will appear with this setting
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="modern-panel p-8 shadow-lg">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                <Monitor className="w-8 h-8" style={{ color: '#007aff' }} />
              </div>
              <div>
                <h3 className="font-bold tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                  System Information
                </h3>
                <p className="tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                  Current system configuration
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="modern-display p-6">
                <div className="font-medium tech-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  Application Version
                </div>
                <div className="tech-font" style={{ color: '#007aff', fontSize: fontSizes.h1 }}>
                  APE System v2.1.0
                </div>
              </div>
              
              <div className="modern-display p-6">
                <div className="font-medium tech-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  Interface Mode
                </div>
                <div className="tech-font" style={{ color: '#34c759', fontSize: fontSizes.h1 }}>
                  Single Screen
                </div>
              </div>
              
              <div className="modern-display p-6">
                <div className="font-medium tech-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  Theme
                </div>
                <div className="tech-font" style={{ color: '#ff9500', fontSize: fontSizes.h1 }}>
                  Dark Mode
                </div>
              </div>
              
              <div className="modern-display p-6">
                <div className="font-medium tech-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  Performance
                </div>
                <div className="tech-font" style={{ color: '#5856d6', fontSize: fontSizes.h1 }}>
                  Optimized
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="relative flex items-center justify-center space-x-4 p-8">
        <button
          onClick={handleReset}
          disabled={!hasChanges}
          className="modern-button px-6 py-3 transition-all duration-300 flex items-center space-x-2 modern-font disabled:opacity-50"
          style={{ 
            backgroundColor: hasChanges ? 'rgba(142, 142, 147, 0.1)' : 'rgba(142, 142, 147, 0.05)',
            borderColor: 'rgba(142, 142, 147, 0.3)',
            color: '#8e8e93',
            fontSize: fontSizes.h2
          }}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className="modern-button px-6 py-3 transition-all duration-300 flex items-center space-x-2 modern-font disabled:opacity-50"
          style={{ 
            backgroundColor: hasChanges ? 'rgba(0, 122, 255, 0.1)' : 'rgba(0, 122, 255, 0.05)',
            borderColor: hasChanges ? 'rgba(0, 122, 255, 0.3)' : 'rgba(0, 122, 255, 0.2)',
            color: hasChanges ? '#007aff' : '#8e8e93',
            fontSize: fontSizes.h2,
            boxShadow: hasChanges ? '0 0 15px rgba(0, 122, 255, 0.3)' : 'none'
          }}
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Global Modern Styles */}
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
        
        .modern-panel-header {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
          border-radius: 12px;
          backdrop-filter: blur(20px);
        }
        
        .floating-particles {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255, 149, 0, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(52, 199, 89, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(0, 122, 255, 0.01) 0%, transparent 50%);
          animation: floatParticles 40s linear infinite;
        }
        
        .tech-font {
          font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        
        .modern-font {
          font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        
        @keyframes floatParticles {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-2%, -2%) rotate(90deg); }
          50% { transform: translate(-4%, 0%) rotate(180deg); }
          75% { transform: translate(-2%, 2%) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}