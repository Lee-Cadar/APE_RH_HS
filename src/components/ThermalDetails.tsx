import React, { useState } from 'react';
import { PerformanceState, APEConfig } from '../types/ape';
import { AIOptimalButton } from './AIOptimalButton';
import { Thermometer, Fan, Lightbulb, Activity, AlertTriangle, Zap, Shield, ArrowLeft, Mail, Droplets, Settings, Plus, Minus } from 'lucide-react';

interface ThermalDetailsProps {
  temperature: number;
  performanceState: PerformanceState;
  fanSpeed: number;
  ledColor: string;
  config: APEConfig;
  onBack: () => void;
  onSendReport: (category: string) => void;
  aiMode: string;
  onModeChange: (mode: string) => void;
}

export function ThermalDetails({ 
  temperature, 
  performanceState, 
  fanSpeed, 
  ledColor, 
  config,
  onBack,
  onSendReport,
  aiMode,
  onModeChange
}: ThermalDetailsProps) {
  
  // Water pump simulation state
  const [waterPumpSpeed, setWaterPumpSpeed] = useState(65);
  const [waterFlow, setWaterFlow] = useState(2.3);
  const [waterTemp, setWaterTemp] = useState(28);
  const [manualFanSpeed, setManualFanSpeed] = useState(fanSpeed);
  const [isManualMode, setIsManualMode] = useState(false);

  const getTemperatureColor = () => {
    if (temperature < 60) return '#34c759';
    if (temperature < 80) return '#ff9500';
    return '#ff3b30';
  };

  const getFanSpeedColor = () => {
    if (fanSpeed < 30) return '#34c759';
    if (fanSpeed < 70) return '#ff9500';
    return '#ff3b30';
  };

  const getWaterPumpColor = () => {
    if (waterPumpSpeed < 40) return '#ff3b30';
    if (waterPumpSpeed < 70) return '#ff9500';
    return '#34c759';
  };

  const getLEDColorClass = () => {
    switch (ledColor) {
      case 'green': return { bg: '#34c759', shadow: 'rgba(52, 199, 89, 0.5)' };
      case 'yellow': return { bg: '#ff9500', shadow: 'rgba(255, 149, 0, 0.5)' };
      case 'red': return { bg: '#ff3b30', shadow: 'rgba(255, 59, 48, 0.5)' };
      default: return { bg: '#8e8e93', shadow: 'rgba(142, 142, 147, 0.5)' };
    }
  };

  const getNextThreshold = () => {
    if (temperature < config.temperature_thresholds.normal) {
      return { next: 'Warning', temp: config.temperature_thresholds.normal };
    }
    if (temperature < config.temperature_thresholds.warning) {
      return { next: 'Critical', temp: config.temperature_thresholds.warning };
    }
    return { next: 'Shutdown', temp: 100 };
  };

  const thresholdInfo = getNextThreshold();
  const ledColors = getLEDColorClass();

  const handleFanSpeedChange = (delta: number) => {
    const newSpeed = Math.max(0, Math.min(100, manualFanSpeed + delta));
    setManualFanSpeed(newSpeed);
  };

  const handleWaterPumpChange = (delta: number) => {
    const newSpeed = Math.max(20, Math.min(100, waterPumpSpeed + delta));
    setWaterPumpSpeed(newSpeed);
    // Simulate water flow changes based on pump speed
    setWaterFlow(1.5 + (newSpeed / 100) * 2.5);
    // Simulate water temperature changes
    setWaterTemp(25 + (newSpeed / 100) * 8);
  };

  return (
    <div className="h-full space-y-8 relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles"></div>
      </div>

      {/* Header - Consistent Height */}
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
              <Shield className="w-9 h-9" style={{ color: '#ff9500' }} />
            </div>
            <div>
              <h2 className="text-2xl font-medium modern-font tracking-tight" style={{ color: '#ffffff' }}>
                Thermal Control
              </h2>
              <p className="modern-font text-base" style={{ color: '#8e8e93' }}>Temperature monitoring and cooling management</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            {/* AI Mode Button */}
            <AIOptimalButton currentMode={aiMode} onModeChange={onModeChange} />
            
            <button
              onClick={() => onSendReport('thermal')}
              className="modern-button px-8 py-4 transition-all duration-300 flex items-center space-x-3 modern-font text-base font-semibold"
              style={{ 
                backgroundColor: 'rgba(52, 199, 89, 0.1)',
                borderColor: 'rgba(52, 199, 89, 0.3)',
                color: '#34c759'
              }}
            >
              <Mail className="w-5 h-5" />
              <span>Send Report</span>
            </button>
            
            <div className="modern-display px-6 py-3 modern-font text-base font-semibold"
                 style={{ 
                   backgroundColor: `${getTemperatureColor()}20`,
                   borderColor: `${getTemperatureColor()}50`,
                   color: getTemperatureColor(),
                 }}>
              {temperature < 60 ? 'Optimal' : temperature < 80 ? 'Warning' : 'Critical'}
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-4 gap-10 h-[calc(100%-180px)]">
        {/* Unified Temperature Panel */}
        <div className="modern-panel p-10 shadow-lg">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-medium modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-4 rounded-2xl mr-5" style={{ backgroundColor: 'rgba(255, 149, 0, 0.2)' }}>
                <Thermometer className="w-9 h-9" style={{ color: '#ff9500' }} />
              </div>
              Thermal
            </h3>
            <div className="w-4 h-4 animate-pulse rounded-full"
                 style={{ 
                   backgroundColor: getTemperatureColor(),
                   boxShadow: `0 0 8px ${getTemperatureColor()}`
                 }}></div>
          </div>

          {/* Unified Temperature Metrics */}
          <div className="space-y-10">
            <div className="text-center">
              <div className="font-bold mb-6" 
                   style={{ 
                     color: getTemperatureColor(),
                     fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                     fontSize: '22px'
                   }}>
                {temperature.toFixed(1)}°C
              </div>
              <div className="text-xl modern-font" style={{ color: '#8e8e93' }}>Core Temperature</div>
            </div>

            {/* Threshold Progress */}
            <div className="modern-display p-8">
              <h4 className="text-xl font-bold modern-font mb-8" style={{ color: '#ffffff' }}>Next Threshold</h4>
              <div className="flex items-center justify-between mb-6">
                <span className="text-base modern-font" style={{ color: '#8e8e93' }}>{thresholdInfo.next}</span>
                <span className="text-base font-bold modern-font" style={{ color: '#ffffff' }}>{thresholdInfo.temp}°C</span>
              </div>
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: '#ff9500',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {Math.min((temperature / thresholdInfo.temp) * 100, 100).toFixed(1)}%
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Cooling Panel */}
        <div className="modern-panel p-10 shadow-lg">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-medium modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-4 rounded-2xl mr-5" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                <Fan className="w-9 h-9" style={{ color: '#007aff' }} />
              </div>
              Air Cooling
            </h3>
            <div className="w-4 h-4 animate-pulse rounded-full" 
                 style={{ 
                   backgroundColor: '#007aff',
                   boxShadow: '0 0 8px #007aff'
                 }}></div>
          </div>

          {/* Fan Speed Control */}
          <div className="space-y-10">
            <div className="text-center">
              <div className="font-bold mb-6" 
                   style={{ 
                     color: getFanSpeedColor(),
                     fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                     fontSize: '22px'
                   }}>
                {isManualMode ? manualFanSpeed.toFixed(1) : fanSpeed.toFixed(1)}%
              </div>
              <div className="text-xl modern-font" style={{ color: '#8e8e93' }}>Fan Speed</div>
            </div>

            {/* Manual Control */}
            <div className="modern-display p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-base modern-font font-bold" style={{ color: '#ffffff' }}>Manual Control</span>
                <button
                  onClick={() => setIsManualMode(!isManualMode)}
                  className="modern-button px-4 py-2 text-sm"
                  style={{ 
                    backgroundColor: isManualMode ? 'rgba(0, 122, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: isManualMode ? '#007aff' : 'rgba(255, 255, 255, 0.1)',
                    color: isManualMode ? '#007aff' : '#8e8e93'
                  }}
                >
                  {isManualMode ? 'AUTO' : 'MANUAL'}
                </button>
              </div>
              
              {isManualMode && (
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => handleFanSpeedChange(-5)}
                    className="modern-button p-3"
                    style={{ 
                      backgroundColor: 'rgba(255, 59, 48, 0.1)',
                      borderColor: 'rgba(255, 59, 48, 0.3)',
                      color: '#ff3b30'
                    }}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold modern-font" style={{ color: '#ffffff' }}>
                    {manualFanSpeed}%
                  </span>
                  <button
                    onClick={() => handleFanSpeedChange(5)}
                    className="modern-button p-3"
                    style={{ 
                      backgroundColor: 'rgba(52, 199, 89, 0.1)',
                      borderColor: 'rgba(52, 199, 89, 0.3)',
                      color: '#34c759'
                    }}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Water Cooling Panel */}
        <div className="modern-panel p-10 shadow-lg">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-medium modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-4 rounded-2xl mr-5" style={{ backgroundColor: 'rgba(52, 199, 89, 0.2)' }}>
                <Droplets className="w-9 h-9" style={{ color: '#34c759' }} />
              </div>
              Water Cooling
            </h3>
            <div className="w-4 h-4 animate-pulse rounded-full" 
                 style={{ 
                   backgroundColor: getWaterPumpColor(),
                   boxShadow: `0 0 8px ${getWaterPumpColor()}`
                 }}></div>
          </div>

          {/* Water Pump Metrics */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: getWaterPumpColor(),
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {waterPumpSpeed}%
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Pump Speed</div>
              </div>
              <div className="text-center">
                <div className="font-bold mb-4" 
                     style={{ 
                       color: '#34c759',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {waterFlow.toFixed(1)}L/m
                </div>
                <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Flow Rate</div>
              </div>
            </div>

            <div className="text-center">
              <div className="font-bold mb-4" 
                   style={{ 
                     color: '#007aff',
                     fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                     fontSize: '22px'
                   }}>
                {waterTemp.toFixed(1)}°C
              </div>
              <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Water Temperature</div>
            </div>

            {/* Pump Control */}
            <div className="modern-display p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base modern-font font-bold" style={{ color: '#ffffff' }}>Pump Control</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => handleWaterPumpChange(-5)}
                  className="modern-button p-3"
                  style={{ 
                    backgroundColor: 'rgba(255, 59, 48, 0.1)',
                    borderColor: 'rgba(255, 59, 48, 0.3)',
                    color: '#ff3b30'
                  }}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-bold modern-font" style={{ color: '#ffffff' }}>
                  {waterPumpSpeed}%
                </span>
                <button
                  onClick={() => handleWaterPumpChange(5)}
                  className="modern-button p-3"
                  style={{ 
                    backgroundColor: 'rgba(52, 199, 89, 0.1)',
                    borderColor: 'rgba(52, 199, 89, 0.3)',
                    color: '#34c759'
                  }}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Status Panel */}
        <div className="modern-panel p-10 shadow-lg">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-medium modern-font tracking-tight flex items-center" style={{ color: '#ffffff' }}>
              <div className="p-4 rounded-2xl mr-5" style={{ backgroundColor: 'rgba(88, 86, 214, 0.2)' }}>
                <Lightbulb className="w-9 h-9" style={{ color: '#5856d6' }} />
              </div>
              Status
            </h3>
            <div className="w-4 h-4 animate-pulse rounded-full" 
                 style={{ 
                   backgroundColor: '#5856d6',
                   boxShadow: '0 0 8px #5856d6'
                 }}></div>
          </div>

          {/* Unified Status Metrics */}
          <div className="space-y-10">
            {/* LED Status */}
            <div className="text-center">
              <div className="relative mx-auto w-32 h-32 mb-8">
                <div className="w-32 h-32 shadow-xl animate-pulse rounded-full"
                     style={{ 
                       backgroundColor: ledColors.bg,
                       boxShadow: `0 0 40px ${ledColors.shadow}`
                     }}>
                  <div className="absolute inset-4 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
                </div>
              </div>
              <div className="text-2xl font-bold modern-font mb-4 capitalize" style={{ color: '#ffffff' }}>{ledColor}</div>
              <div className="text-base modern-font" style={{ color: '#8e8e93' }}>Status Beacon</div>
            </div>

            {/* System Alerts */}
            <div className="space-y-6">
              {temperature > 85 && (
                <div className="modern-display p-6"
                     style={{ 
                       backgroundColor: 'rgba(255, 59, 48, 0.1)',
                       borderColor: 'rgba(255, 59, 48, 0.3)',
                     }}>
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 animate-pulse" style={{ color: '#ff3b30' }} />
                    <span className="text-base modern-font font-semibold" style={{ color: '#ff3b30' }}>Critical Temperature</span>
                  </div>
                </div>
              )}
              
              <div className="modern-display p-6"
                   style={{ 
                     backgroundColor: 'rgba(52, 199, 89, 0.1)',
                     borderColor: 'rgba(52, 199, 89, 0.3)',
                   }}>
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6" style={{ color: '#34c759' }} />
                  <span className="text-base modern-font font-semibold" style={{ color: '#34c759' }}>Cooling Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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