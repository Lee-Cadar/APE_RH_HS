import React, { useState } from 'react';
import { Settings, Volume2, Palette, Brightness, Gamepad2, Camera, Monitor, X, Plus, Minus } from 'lucide-react';

interface SystemControlsProps {
  currentTime: Date;
  fontSizes: any;
  onModeChange: (mode: 'steamdeck' | 'camera' | 'controls') => void;
}

export function SystemControls({ currentTime, fontSizes, onModeChange }: SystemControlsProps) {
  // RGB Control State
  const [rgbZones, setRgbZones] = useState([
    { id: 1, name: 'Zone 1', color: '#ff0000', brightness: 80 },
    { id: 2, name: 'Zone 2', color: '#00ff00', brightness: 75 },
    { id: 3, name: 'Zone 3', color: '#0000ff', brightness: 85 },
    { id: 4, name: 'Zone 4', color: '#ffff00', brightness: 70 },
    { id: 5, name: 'Zone 5', color: '#ff00ff', brightness: 90 }
  ]);

  // Audio Control State
  const [audioSettings, setAudioSettings] = useState({
    volume: 65,
    treble: 50,
    bass: 60,
    mid: 55
  });

  // Screen Brightness State
  const [screenBrightness, setScreenBrightness] = useState({
    leftScreen: 80,
    rightScreen: 85,
    globalBrightness: 75
  });

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

  const updateRGBZone = (zoneId: number, property: string, value: any) => {
    setRgbZones(prev => prev.map(zone => 
      zone.id === zoneId ? { ...zone, [property]: value } : zone
    ));
  };

  const updateAudioSetting = (setting: string, value: number) => {
    setAudioSettings(prev => ({ ...prev, [setting]: value }));
  };

  const updateBrightness = (setting: string, value: number) => {
    setScreenBrightness(prev => ({ ...prev, [setting]: value }));
  };

  const adjustBrightness = (setting: string, delta: number) => {
    const currentValue = screenBrightness[setting as keyof typeof screenBrightness];
    const newValue = Math.max(0, Math.min(100, currentValue + delta));
    updateBrightness(setting, newValue);
  };

  return (
    <div className="w-full h-full bg-black text-white overflow-hidden select-none relative"
         style={{ 
           background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 30%, #1a1a1a 70%, #0a0a0a 100%)',
           fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
           borderRadius: '20px'
         }}>
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="controls-grid"></div>
        <div className="controls-particles"></div>
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
            backgroundColor: 'rgba(52, 199, 89, 0.1)',
            borderColor: 'rgba(52, 199, 89, 0.3)',
          }}
          title="Camera Feed"
        >
          <Camera className="w-5 h-5" style={{ color: '#34c759' }} />
        </button>
        
        <button
          onClick={() => onModeChange('controls')}
          className="modern-button p-3 transition-all duration-300"
          style={{ 
            backgroundColor: 'rgba(255, 149, 0, 0.2)',
            borderColor: 'rgba(255, 149, 0, 0.3)',
          }}
          title="System Controls (Active)"
        >
          <Settings className="w-5 h-5" style={{ color: '#ff9500' }} />
        </button>
      </div>

      {/* Main Controls Interface */}
      <div className="flex items-center justify-center h-full relative z-10 p-8">
        <div className="w-full h-full grid grid-cols-3 gap-6">
          
          {/* RGB Lighting Controls */}
          <div className="modern-panel p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(255, 59, 48, 0.2)' }}>
                <Palette className="w-6 h-6" style={{ color: '#ff3b30' }} />
              </div>
              <h2 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                RGB LIGHTING
              </h2>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {rgbZones.map((zone) => (
                <div key={zone.id} className="modern-display p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h2 }}>
                      {zone.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full shadow-lg"
                         style={{ 
                           backgroundColor: zone.color,
                           boxShadow: `0 0 15px ${zone.color}80`
                         }}></div>
                  </div>

                  {/* Color Picker */}
                  <div className="mb-3">
                    <label className="block modern-font mb-2" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                      Color
                    </label>
                    <input
                      type="color"
                      value={zone.color}
                      onChange={(e) => updateRGBZone(zone.id, 'color', e.target.value)}
                      className="w-full h-8 rounded-lg border-2 cursor-pointer"
                      style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    />
                  </div>

                  {/* Brightness Slider */}
                  <div>
                    <label className="block modern-font mb-2" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                      Brightness: <span className="font-bold" style={{ fontSize: fontSizes.value }}>{zone.brightness}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={zone.brightness}
                      onChange={(e) => updateRGBZone(zone.id, 'brightness', parseInt(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer controls-slider"
                      style={{ background: `linear-gradient(to right, #333 0%, ${zone.color} 100%)` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Controls */}
          <div className="modern-panel p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(52, 199, 89, 0.2)' }}>
                <Volume2 className="w-6 h-6" style={{ color: '#34c759' }} />
              </div>
              <h2 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                AUDIO CONTROL
              </h2>
            </div>

            <div className="space-y-6">
              {/* Master Volume */}
              <div className="modern-display p-4">
                <div className="text-center mb-4">
                  <div className="font-bold modern-font" style={{ color: '#007aff', fontSize: fontSizes.h1 }}>
                    {audioSettings.volume}%
                  </div>
                  <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                    Master Volume
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioSettings.volume}
                  onChange={(e) => updateAudioSetting('volume', parseInt(e.target.value))}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer controls-slider"
                  style={{ background: 'linear-gradient(to right, #333 0%, #007aff 100%)' }}
                />
              </div>

              {/* Treble */}
              <div className="modern-display p-4">
                <div className="text-center mb-4">
                  <div className="font-bold modern-font" style={{ color: '#ff9500', fontSize: fontSizes.h1 }}>
                    {audioSettings.treble}%
                  </div>
                  <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                    Treble
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioSettings.treble}
                  onChange={(e) => updateAudioSetting('treble', parseInt(e.target.value))}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer controls-slider"
                  style={{ background: 'linear-gradient(to right, #333 0%, #ff9500 100%)' }}
                />
              </div>

              {/* Bass */}
              <div className="modern-display p-4">
                <div className="text-center mb-4">
                  <div className="font-bold modern-font" style={{ color: '#5856d6', fontSize: fontSizes.h1 }}>
                    {audioSettings.bass}%
                  </div>
                  <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                    Bass
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioSettings.bass}
                  onChange={(e) => updateAudioSetting('bass', parseInt(e.target.value))}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer controls-slider"
                  style={{ background: 'linear-gradient(to right, #333 0%, #5856d6 100%)' }}
                />
              </div>

              {/* Mid Range */}
              <div className="modern-display p-4">
                <div className="text-center mb-4">
                  <div className="font-bold modern-font" style={{ color: '#34c759', fontSize: fontSizes.h1 }}>
                    {audioSettings.mid}%
                  </div>
                  <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                    Mid Range
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioSettings.mid}
                  onChange={(e) => updateAudioSetting('mid', parseInt(e.target.value))}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer controls-slider"
                  style={{ background: 'linear-gradient(to right, #333 0%, #34c759 100%)' }}
                />
              </div>
            </div>
          </div>

          {/* Screen Brightness Controls */}
          <div className="modern-panel p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(255, 149, 0, 0.2)' }}>
                <Brightness className="w-6 h-6" style={{ color: '#ff9500' }} />
              </div>
              <h2 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                BRIGHTNESS
              </h2>
            </div>

            <div className="space-y-6">
              {/* Global Brightness */}
              <div className="modern-display p-4">
                <div className="text-center mb-4">
                  <div className="font-bold modern-font" style={{ color: '#007aff', fontSize: fontSizes.h1 }}>
                    {screenBrightness.globalBrightness}%
                  </div>
                  <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                    Global Brightness
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <button
                    onClick={() => adjustBrightness('globalBrightness', -10)}
                    className="modern-button p-2"
                    style={{ 
                      backgroundColor: 'rgba(255, 59, 48, 0.1)',
                      borderColor: 'rgba(255, 59, 48, 0.3)',
                      color: '#ff3b30'
                    }}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                    {screenBrightness.globalBrightness}%
                  </span>
                  <button
                    onClick={() => adjustBrightness('globalBrightness', 10)}
                    className="modern-button p-2"
                    style={{ 
                      backgroundColor: 'rgba(52, 199, 89, 0.1)',
                      borderColor: 'rgba(52, 199, 89, 0.3)',
                      color: '#34c759'
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={screenBrightness.globalBrightness}
                  onChange={(e) => updateBrightness('globalBrightness', parseInt(e.target.value))}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer controls-slider"
                  style={{ background: 'linear-gradient(to right, #000 0%, #fff 100%)' }}
                />
              </div>

              {/* Left Screen Brightness */}
              <div className="modern-display p-4">
                <div className="text-center mb-4">
                  <div className="font-bold modern-font" style={{ color: '#5856d6', fontSize: fontSizes.h1 }}>
                    {screenBrightness.leftScreen}%
                  </div>
                  <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                    Left Screen
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={screenBrightness.leftScreen}
                  onChange={(e) => updateBrightness('leftScreen', parseInt(e.target.value))}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer controls-slider"
                  style={{ background: 'linear-gradient(to right, #000 0%, #5856d6 100%)' }}
                />
              </div>

              {/* Right Screen Brightness */}
              <div className="modern-display p-4">
                <div className="text-center mb-4">
                  <div className="font-bold modern-font" style={{ color: '#34c759', fontSize: fontSizes.h1 }}>
                    {screenBrightness.rightScreen}%
                  </div>
                  <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h2 }}>
                    Right Screen
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={screenBrightness.rightScreen}
                  onChange={(e) => updateBrightness('rightScreen', parseInt(e.target.value))}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer controls-slider"
                  style={{ background: 'linear-gradient(to right, #000 0%, #34c759 100%)' }}
                />
              </div>

              {/* Full Black Option */}
              <div className="modern-display p-4">
                <button
                  onClick={() => {
                    updateBrightness('globalBrightness', 0);
                    updateBrightness('leftScreen', 0);
                    updateBrightness('rightScreen', 0);
                  }}
                  className="w-full modern-button py-3 transition-all duration-300"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#ffffff'
                  }}
                >
                  <span className="modern-font font-bold" style={{ fontSize: fontSizes.h2 }}>
                    FULL BLACK
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* APE DECK Branding - Bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <div className="font-bold modern-font" style={{ color: '#007aff', opacity: 0.7, fontSize: fontSizes.h1 }}>
          APE DECK
        </div>
        <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
          System Control Center
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
        
        .controls-slider {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
        }
        
        .controls-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .controls-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(255, 149, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 149, 0, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: controlsGrid 20s linear infinite;
        }
        
        .controls-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 30% 70%, rgba(255, 149, 0, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(52, 199, 89, 0.03) 0%, transparent 50%);
          animation: controlsParticles 25s ease-in-out infinite;
        }
        
        @keyframes controlsGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes controlsParticles {
          0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.1) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}