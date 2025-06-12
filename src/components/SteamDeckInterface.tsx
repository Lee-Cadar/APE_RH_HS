import React, { useState, useEffect } from 'react';
import { Volume2, Palette, Settings, Gamepad2, Music, Film, Globe, Camera, Mic, Headphones, Speaker, Sliders, X } from 'lucide-react';

interface SteamDeckInterfaceProps {
  currentTime: Date;
  settings: any;
  onSettingsChange: (settings: any) => void;
  fontSizes: any;
}

export function SteamDeckInterface({ currentTime, settings, onSettingsChange, fontSizes }: SteamDeckInterfaceProps) {
  const [showRGBOverlay, setShowRGBOverlay] = useState(false);
  const [showAudioOverlay, setShowAudioOverlay] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

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

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const minSwipeDistance = 50;

    // Bottom-to-top swipe for RGB overlay
    if (deltaY < -minSwipeDistance && Math.abs(deltaX) < minSwipeDistance) {
      setShowRGBOverlay(true);
      setShowAudioOverlay(false);
    }
    // Right-to-left swipe for audio overlay
    else if (deltaX < -minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      setShowAudioOverlay(true);
      setShowRGBOverlay(false);
    }

    setTouchStart(null);
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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimeWithTimezone = (date: Date) => {
    const time = formatTime(date);
    const dateStr = formatDate(date);
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

  return (
    <div 
      className="fixed inset-0 bg-black text-white overflow-hidden select-none"
      style={{ 
        width: 'calc(100% - 20px)', 
        height: 'calc(100vh - 20px)',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 30%, #1a1a1a 70%, #0a0a0a 100%)',
        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        margin: '10px'
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="deck-grid"></div>
        <div className="deck-particles"></div>
        <div className="deck-glow"></div>
      </div>

      {/* Time and Date - Top Left */}
      <div className="absolute top-8 left-8 z-10">
        <div className="font-bold modern-font mb-2" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
          {formatTime(currentTime)}
        </div>
        <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
          {formatTimeWithTimezone(currentTime)}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex items-center justify-center h-full relative z-10">
        {/* 4x5 Grid of Shortcuts */}
        <div className="grid grid-cols-5 gap-8 p-8">
          {settings.steamDeckShortcuts.map((shortcut: any) => {
            const Icon = shortcut.icon;
            return (
              <button
                key={shortcut.id}
                className="deck-shortcut transition-all duration-300 transform hover:scale-110 active:scale-95"
                style={{ 
                  width: parseInt(fontSizes.iconSize) * 6 + 'px', 
                  height: parseInt(fontSizes.iconSize) * 6 + 'px' 
                }}
              >
                <div className="w-full h-full rounded-2xl flex flex-col items-center justify-center"
                     style={{ 
                       backgroundColor: `${shortcut.color}20`,
                       border: `2px solid ${shortcut.color}50`
                     }}>
                  <Icon 
                    className="mb-3" 
                    style={{ 
                      color: shortcut.color,
                      width: parseInt(fontSizes.iconSize) * 2.4 + 'px',
                      height: parseInt(fontSizes.iconSize) * 2.4 + 'px'
                    }} 
                  />
                  <span className="modern-font font-medium text-center" 
                        style={{ 
                          color: '#ffffff',
                          fontSize: fontSizes.h2
                        }}>
                    {shortcut.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* APE DECK Branding - Bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <div className="font-bold modern-font" style={{ color: '#007aff', opacity: 0.7, fontSize: fontSizes.h1 }}>
          APE DECK
        </div>
        <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
          Advanced Performance Engine Interface
        </div>
      </div>

      {/* RGB Control Overlay */}
      {showRGBOverlay && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[1000]">
          <div className="w-[90%] max-w-4xl modern-panel p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(255, 59, 48, 0.2)' }}>
                  <Palette className="w-8 h-8" style={{ color: '#ff3b30' }} />
                </div>
                <h2 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                  RGB LIGHTING CONTROL
                </h2>
              </div>
              <button
                onClick={() => setShowRGBOverlay(false)}
                className="modern-button p-3"
                style={{ 
                  backgroundColor: 'rgba(255, 59, 48, 0.1)',
                  borderColor: 'rgba(255, 59, 48, 0.3)',
                }}
              >
                <X className="w-6 h-6" style={{ color: '#ff3b30' }} />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-6">
              {rgbZones.map((zone) => (
                <div key={zone.id} className="modern-display p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 rounded-full mx-auto mb-3 shadow-lg"
                         style={{ 
                           backgroundColor: zone.color,
                           boxShadow: `0 0 20px ${zone.color}80`
                         }}></div>
                    <h3 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                      {zone.name}
                    </h3>
                  </div>

                  {/* Color Picker */}
                  <div className="mb-4">
                    <label className="block modern-font mb-2" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                      Color
                    </label>
                    <input
                      type="color"
                      value={zone.color}
                      onChange={(e) => updateRGBZone(zone.id, 'color', e.target.value)}
                      className="w-full h-12 rounded-lg border-2 cursor-pointer"
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
                      className="w-full h-3 rounded-lg appearance-none cursor-pointer deck-slider"
                      style={{ background: `linear-gradient(to right, #333 0%, ${zone.color} 100%)` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                Swipe up from bottom to access RGB controls • Tap outside to close
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audio Control Overlay */}
      {showAudioOverlay && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[1000]">
          <div className="w-[90%] max-w-3xl modern-panel p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(52, 199, 89, 0.2)' }}>
                  <Volume2 className="w-8 h-8" style={{ color: '#34c759' }} />
                </div>
                <h2 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                  AUDIO CONTROL CENTER
                </h2>
              </div>
              <button
                onClick={() => setShowAudioOverlay(false)}
                className="modern-button p-3"
                style={{ 
                  backgroundColor: 'rgba(255, 59, 48, 0.1)',
                  borderColor: 'rgba(255, 59, 48, 0.3)',
                }}
              >
                <X className="w-6 h-6" style={{ color: '#ff3b30' }} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Volume Control */}
              <div className="modern-display p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Speaker className="w-6 h-6" style={{ color: '#007aff' }} />
                  <h3 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                    Master Volume
                  </h3>
                </div>
                <div className="text-center mb-4">
                  <div className="font-bold modern-font" style={{ color: '#007aff', fontSize: fontSizes.h1 }}>
                    {audioSettings.volume}%
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioSettings.volume}
                  onChange={(e) => updateAudioSetting('volume', parseInt(e.target.value))}
                  className="w-full h-4 rounded-lg appearance-none cursor-pointer deck-slider"
                  style={{ background: 'linear-gradient(to right, #333 0%, #007aff 100%)' }}
                />
              </div>

              {/* Treble Control */}
              <div className="modern-display p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Sliders className="w-6 h-6" style={{ color: '#ff9500' }} />
                  <h3 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                    Treble
                  </h3>
                </div>
                <div className="text-center mb-4">
                  <div className="font-bold modern-font" style={{ color: '#ff9500', fontSize: fontSizes.h1 }}>
                    {audioSettings.treble}%
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioSettings.treble}
                  onChange={(e) => updateAudioSetting('treble', parseInt(e.target.value))}
                  className="w-full h-4 rounded-lg appearance-none cursor-pointer deck-slider"
                  style={{ background: 'linear-gradient(to right, #333 0%, #ff9500 100%)' }}
                />
              </div>

              {/* Bass Control */}
              <div className="modern-display p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Headphones className="w-6 h-6" style={{ color: '#5856d6' }} />
                  <h3 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                    Bass
                  </h3>
                </div>
                <div className="text-center mb-4">
                  <div className="font-bold modern-font" style={{ color: '#5856d6', fontSize: fontSizes.h1 }}>
                    {audioSettings.bass}%
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioSettings.bass}
                  onChange={(e) => updateAudioSetting('bass', parseInt(e.target.value))}
                  className="w-full h-4 rounded-lg appearance-none cursor-pointer deck-slider"
                  style={{ background: 'linear-gradient(to right, #333 0%, #5856d6 100%)' }}
                />
              </div>

              {/* Mid Control */}
              <div className="modern-display p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Mic className="w-6 h-6" style={{ color: '#34c759' }} />
                  <h3 className="font-bold modern-font" style={{ color: '#ffffff', fontSize: fontSizes.h1 }}>
                    Mid Range
                  </h3>
                </div>
                <div className="text-center mb-4">
                  <div className="font-bold modern-font" style={{ color: '#34c759', fontSize: fontSizes.h1 }}>
                    {audioSettings.mid}%
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioSettings.mid}
                  onChange={(e) => updateAudioSetting('mid', parseInt(e.target.value))}
                  className="w-full h-4 rounded-lg appearance-none cursor-pointer deck-slider"
                  style={{ background: 'linear-gradient(to right, #333 0%, #34c759 100%)' }}
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="modern-font" style={{ color: '#8e8e93', fontSize: fontSizes.h3 }}>
                Swipe right to left to access audio controls • Tap outside to close
              </div>
            </div>
          </div>
        </div>
      )}

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
        
        .modern-display {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(20px);
        }
        
        .deck-shortcut {
          backdrop-filter: blur(10px);
        }
        
        .deck-slider {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }
        
        .deck-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .deck-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 122, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 122, 255, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: deckGrid 15s linear infinite;
        }
        
        .deck-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 25% 25%, rgba(0, 122, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(52, 199, 89, 0.02) 0%, transparent 50%);
          animation: deckParticles 20s ease-in-out infinite;
        }
        
        .deck-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(45deg, transparent 40%, rgba(0, 122, 255, 0.02) 50%, transparent 60%);
          animation: deckGlow 12s linear infinite;
        }
        
        @keyframes deckGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes deckParticles {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes deckGlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}