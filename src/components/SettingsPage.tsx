import React, { useState } from 'react';
import { Settings, Monitor, Type, Gamepad2, Save, RotateCcw, ArrowLeft, Activity, Globe, Shield, Music, Film, Camera, User } from 'lucide-react';

interface SettingsPageProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
  fontSizes: any;
  onBack: () => void;
}

export function SettingsPage({ settings, onSettingsChange, fontSizes, onBack }: SettingsPageProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  // Available programs for shortcuts
  const availablePrograms = [
    { name: 'Steam', icon: Gamepad2, color: '#007aff' },
    { name: 'Discord', icon: User, color: '#5865f2' },
    { name: 'Chrome', icon: Globe, color: '#4285f4' },
    { name: 'Spotify', icon: Music, color: '#1db954' },
    { name: 'OBS', icon: Camera, color: '#302e31' },
    { name: 'VS Code', icon: Monitor, color: '#007acc' },
    { name: 'Netflix', icon: Film, color: '#e50914' },
    { name: 'Settings', icon: Settings, color: '#5856d6' },
    { name: 'Activity', icon: Activity, color: '#ff3b30' },
    { name: 'Shield', icon: Shield, color: '#34c759' },
    { name: 'YouTube', icon: Film, color: '#ff0000' },
    { name: 'Twitch', icon: Camera, color: '#9146ff' },
    { name: 'Firefox', icon: Globe, color: '#ff7139' },
    { name: 'Telegram', icon: User, color: '#0088cc' },
    { name: 'WhatsApp', icon: User, color: '#25d366' }
  ];

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

  const updateShortcut = (index: number, program: any) => {
    const newShortcuts = [...localSettings.steamDeckShortcuts];
    newShortcuts[index] = {
      id: index,
      name: program.name,
      icon: program.icon,
      color: program.color
    };
    updateSetting('steamDeckShortcuts', newShortcuts);
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
              <p className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>Configure display, accessibility, and interface preferences</p>
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
      <div className="relative grid grid-cols-2 gap-10 h-[calc(100%-180px)] p-8">
        {/* Left Column - Display & Font Settings */}
        <div className="space-y-6">
          {/* Display Configuration */}
          <div className="modern-panel p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                <Monitor className="w-6 h-6" style={{ color: '#007aff' }} />
              </div>
              <h3 className="font-bold tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                Display Configuration
              </h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block font-medium mb-4 tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  Primary Screen
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'left', label: 'Left (Steam Deck Interface)' },
                    { value: 'right', label: 'Right (Command Center)' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 modern-display p-4 cursor-pointer">
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
            </div>
          </div>

          {/* Font Size Settings */}
          <div className="modern-panel p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(52, 199, 89, 0.2)' }}>
                <Type className="w-6 h-6" style={{ color: '#34c759' }} />
              </div>
              <h3 className="font-bold tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                Accessibility
              </h3>
            </div>

            <div>
              <label className="block font-medium mb-4 tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                Font Size (Accessibility)
              </label>
              <div className="space-y-4">
                {[
                  { value: 'small', label: 'Small (Standard)', desc: 'h1:21px, h2:13px, h3:9px, icons:19px' },
                  { value: 'medium', label: 'Medium (Balanced)', desc: 'h1:26px, h2:16px, h3:11px, icons:24px' },
                  { value: 'large', label: 'Large (Accessibility)', desc: 'h1:31px, h2:20px, h3:14px, icons:29px' }
                ].map((option) => (
                  <label key={option.value} className="modern-display p-4 flex items-start space-x-3 cursor-pointer">
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

        {/* Right Column - Steam Deck Settings */}
        <div className="space-y-6">
          {/* Steam Deck Interface */}
          <div className="modern-panel p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(88, 86, 214, 0.2)' }}>
                <Gamepad2 className="w-6 h-6" style={{ color: '#5856d6' }} />
              </div>
              <h3 className="font-bold tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                Steam Deck Interface
              </h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block font-medium mb-4 tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  Shortcut Grid (2x5 Layout - 10 Icons)
                </label>
                <div className="tech-font mb-4" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                  Configure the 10 application shortcuts on the left screen
                </div>
                
                <div className="grid grid-cols-5 gap-3 p-4 modern-display mb-6">
                  {localSettings.steamDeckShortcuts.slice(0, 10).map((shortcut: any, index: number) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg flex flex-col items-center justify-center p-2 modern-button cursor-pointer"
                      style={{ 
                        backgroundColor: `${shortcut.color}20`,
                        borderColor: `${shortcut.color}50`
                      }}
                      onClick={() => {
                        // Show program selector for this slot
                        const selectedProgram = availablePrograms[Math.floor(Math.random() * availablePrograms.length)];
                        updateShortcut(index, selectedProgram);
                      }}
                    >
                      <shortcut.icon className="w-6 h-6 mb-1" style={{ color: shortcut.color }} />
                      <span className="tech-font text-center" style={{ color: '#ffffff', fontSize: fontSizes.h3 }}>
                        {shortcut.name.length > 6 ? shortcut.name.slice(0, 4) + '..' : shortcut.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Program Selection */}
                <div>
                  <label className="block font-medium mb-4 tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                    Available Programs
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto modern-display p-4">
                    {availablePrograms.map((program, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          // Find first empty slot or replace last one
                          const targetIndex = localSettings.steamDeckShortcuts.findIndex((s: any, i: number) => 
                            i < 10 && s.name === `App ${i + 1}`
                          );
                          const indexToUpdate = targetIndex !== -1 ? targetIndex : 9;
                          updateShortcut(indexToUpdate, program);
                        }}
                        className="flex items-center space-x-2 p-2 modern-button text-left"
                        style={{ 
                          backgroundColor: `${program.color}10`,
                          borderColor: `${program.color}30`
                        }}
                      >
                        <program.icon className="w-4 h-4" style={{ color: program.color }} />
                        <span className="tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h3 }}>
                          {program.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gesture Controls Info */}
          <div className="modern-panel p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(255, 149, 0, 0.2)' }}>
                <Activity className="w-6 h-6" style={{ color: '#ff9500' }} />
              </div>
              <h3 className="font-bold tech-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                Gesture Controls
              </h3>
            </div>
            
            <div className="space-y-6">
              <div className="modern-display p-6">
                <div className="font-medium tech-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  RGB Control Overlay
                </div>
                <div className="tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                  Swipe bottom-to-top on left screen
                </div>
                <div className="tech-font mt-2" style={{ color: '#34c759', fontSize: fontSizes.h3 }}>
                  5 customizable RGB lighting zones
                </div>
              </div>
              
              <div className="modern-display p-6">
                <div className="font-medium tech-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  Audio Control Overlay
                </div>
                <div className="tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                  Swipe right-to-left on left screen
                </div>
                <div className="tech-font mt-2" style={{ color: '#34c759', fontSize: fontSizes.h3 }}>
                  Volume, treble, bass, and mid-range sliders
                </div>
              </div>

              <div className="modern-display p-6">
                <div className="font-medium tech-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                  Screen Modes
                </div>
                <div className="tech-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                  Steam Deck • Camera Feed • System Controls
                </div>
                <div className="tech-font mt-1" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                  Switch modes using top-right buttons
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