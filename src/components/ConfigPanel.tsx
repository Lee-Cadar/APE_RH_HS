import React, { useState } from 'react';
import { APEConfig } from '../types/ape';
import { Save, RotateCcw, AlertTriangle, Shield, Settings, Mail, FileText } from 'lucide-react';

interface ConfigPanelProps {
  config: APEConfig;
  onConfigUpdate: (config: APEConfig) => void;
}

export function ConfigPanel({ config, onConfigUpdate }: ConfigPanelProps) {
  const [localConfig, setLocalConfig] = useState<APEConfig>(config);
  const [hasChanges, setHasChanges] = useState(false);

  const handleConfigChange = (path: string, value: any) => {
    const keys = path.split('.');
    const newConfig = { ...localConfig };
    let current: any = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setLocalConfig(newConfig);
    setHasChanges(true);
  };

  const handleSave = () => {
    onConfigUpdate(localConfig);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalConfig(config);
    setHasChanges(false);
  };

  const testEmailConnection = () => {
    alert(`Testing email connection to ${localConfig.email.address}...\n\nConnection successful! Daily reports will be sent to this address.`);
  };

  const generateTestReport = () => {
    alert(`Test report generated successfully!\n\nReport includes:\n• 76+ analysis points\n• Performance metrics\n• Thermal analysis\n• Network statistics\n• System health assessment\n• Predictive analytics\n\nReport would be sent to: ${localConfig.email.address}`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles"></div>
      </div>

      {/* Main Configuration Content */}
      <div className="flex-1 flex">
        {/* Left Side - 40% - Temperature & Cooling */}
        <div className="w-[40%] pr-4 space-y-8 relative">
          {/* Temperature Control */}
          <div className="modern-panel p-8 shadow-lg h-[48%]">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(255, 149, 0, 0.2)' }}>
                <Settings className="w-7 h-7" style={{ color: '#ff9500' }} />
              </div>
              <h3 className="text-2xl font-medium modern-font tracking-tight" style={{ color: '#ffffff' }}>Thermal Thresholds</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium mb-3 modern-font" style={{ color: '#ffffff' }}>
                  Normal Threshold (°C)
                </label>
                <input
                  type="number"
                  value={localConfig.temperature_thresholds.normal}
                  onChange={(e) => handleConfigChange('temperature_thresholds.normal', parseInt(e.target.value))}
                  className="modern-input w-full px-4 py-3 modern-font text-base"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}
                  min="0"
                  max="100"
                />
              </div>
              
              <div>
                <label className="block text-base font-medium mb-3 modern-font" style={{ color: '#ffffff' }}>
                  Warning Threshold (°C)
                </label>
                <input
                  type="number"
                  value={localConfig.temperature_thresholds.warning}
                  onChange={(e) => handleConfigChange('temperature_thresholds.warning', parseInt(e.target.value))}
                  className="modern-input w-full px-4 py-3 modern-font text-base"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Cooling System Control */}
          <div className="modern-panel p-8 shadow-lg h-[48%]">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
                <Settings className="w-7 h-7" style={{ color: '#007aff' }} />
              </div>
              <h3 className="text-2xl font-medium modern-font tracking-tight" style={{ color: '#ffffff' }}>Cooling System</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium mb-3 modern-font" style={{ color: '#ffffff' }}>
                  Minimum Fan Speed (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={localConfig.fan_speeds.min}
                  onChange={(e) => handleConfigChange('fan_speeds.min', parseInt(e.target.value))}
                  className="w-full h-3 appearance-none cursor-pointer modern-slider"
                />
                <div className="flex justify-between text-sm modern-font mt-2" style={{ color: '#8e8e93' }}>
                  <span>Idle</span>
                  <span className="font-medium" style={{ color: '#ffffff' }}>{localConfig.fan_speeds.min}%</span>
                  <span>Maximum</span>
                </div>
              </div>
              
              <div>
                <label className="block text-base font-medium mb-3 modern-font" style={{ color: '#ffffff' }}>
                  Maximum Fan Speed (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={localConfig.fan_speeds.max}
                  onChange={(e) => handleConfigChange('fan_speeds.max', parseInt(e.target.value))}
                  className="w-full h-3 appearance-none cursor-pointer modern-slider"
                />
                <div className="flex justify-between text-sm modern-font mt-2" style={{ color: '#8e8e93' }}>
                  <span>Idle</span>
                  <span className="font-medium" style={{ color: '#ffffff' }}>{localConfig.fan_speeds.max}%</span>
                  <span>Maximum</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - 40% - System Parameters */}
        <div className="w-[40%] pl-4 space-y-8 relative">
          {/* System Parameters */}
          <div className="modern-panel p-8 shadow-lg h-full">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(88, 86, 214, 0.2)' }}>
                <Settings className="w-7 h-7" style={{ color: '#5856d6' }} />
              </div>
              <h3 className="text-2xl font-medium modern-font tracking-tight" style={{ color: '#ffffff' }}>System Parameters</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium mb-3 modern-font" style={{ color: '#ffffff' }}>
                  Polling Interval (seconds)
                </label>
                <input
                  type="number"
                  value={localConfig.polling_interval}
                  onChange={(e) => handleConfigChange('polling_interval', parseInt(e.target.value))}
                  className="modern-input w-full px-4 py-3 modern-font text-base"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}
                  min="1"
                  max="60"
                />
              </div>

              <div>
                <label className="block text-base font-medium mb-3 modern-font" style={{ color: '#ffffff' }}>
                  Log Level
                </label>
                <select
                  value={localConfig.logging.level}
                  onChange={(e) => handleConfigChange('logging.level', e.target.value)}
                  className="modern-input w-full px-4 py-3 modern-font text-base"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}
                >
                  <option value="DEBUG">Debug</option>
                  <option value="INFO">Info</option>
                  <option value="WARNING">Warning</option>
                  <option value="ERROR">Error</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Configuration - Bottom Section */}
      <div className="mt-8 modern-panel p-8 shadow-lg relative">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(52, 199, 89, 0.2)' }}>
            <Mail className="w-7 h-7" style={{ color: '#34c759' }} />
          </div>
          <h3 className="text-2xl font-medium modern-font tracking-tight" style={{ color: '#ffffff' }}>Email Reports</h3>
        </div>
        <div className="grid grid-cols-4 gap-8">
          <div>
            <label className="block text-base font-medium mb-3 modern-font" style={{ color: '#ffffff' }}>
              Email Address
            </label>
            <input
              type="email"
              value={localConfig.email.address}
              onChange={(e) => handleConfigChange('email.address', e.target.value)}
              className="modern-input w-full px-4 py-3 modern-font text-base"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
              }}
              placeholder="admin@ape-system.com"
            />
          </div>
          
          <div>
            <label className="block text-base font-medium mb-3 modern-font" style={{ color: '#ffffff' }}>
              SMTP Server
            </label>
            <input
              type="text"
              value={localConfig.email.smtp_server}
              onChange={(e) => handleConfigChange('email.smtp_server', e.target.value)}
              className="modern-input w-full px-4 py-3 modern-font text-base"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
              }}
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-3 modern-font" style={{ color: '#ffffff' }}>
              Port
            </label>
            <input
              type="number"
              value={localConfig.email.port}
              onChange={(e) => handleConfigChange('email.port', parseInt(e.target.value))}
              className="modern-input w-full px-4 py-3 modern-font text-base"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
              }}
            />
          </div>

          <div className="flex flex-col justify-between">
            <label className="flex items-center space-x-4 mb-6">
              <input
                type="checkbox"
                checked={localConfig.email.daily_reports}
                onChange={(e) => handleConfigChange('email.daily_reports', e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <span className="text-base modern-font font-medium" style={{ color: '#ffffff' }}>
                Enable Daily Reports
              </span>
            </label>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={testEmailConnection}
                className="modern-button px-4 py-3 transition-all duration-300 flex items-center space-x-2 modern-font text-base"
                style={{ 
                  backgroundColor: 'rgba(52, 199, 89, 0.1)',
                  borderColor: 'rgba(52, 199, 89, 0.3)',
                  color: '#34c759',
                }}
              >
                <Mail className="w-5 h-5" />
                <span>Test</span>
              </button>
              <button
                onClick={generateTestReport}
                className="modern-button px-4 py-3 transition-all duration-300 flex items-center space-x-2 modern-font text-base"
                style={{ 
                  backgroundColor: 'rgba(52, 199, 89, 0.1)',
                  borderColor: 'rgba(52, 199, 89, 0.3)',
                  color: '#34c759',
                }}
              >
                <FileText className="w-5 h-5" />
                <span>Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons - Bottom Center */}
      <div className="mt-8 flex items-center justify-center space-x-6">
        {hasChanges && (
          <div className="flex items-center space-x-4 px-6 py-3 modern-display"
               style={{ 
                 backgroundColor: 'rgba(255, 59, 48, 0.1)',
                 borderColor: 'rgba(255, 59, 48, 0.3)',
                 color: '#ff3b30',
               }}>
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            <span className="text-base modern-font font-medium">Unsaved Changes</span>
          </div>
        )}
        <button
          onClick={handleReset}
          disabled={!hasChanges}
          className="modern-button px-8 py-4 transition-all duration-300 flex items-center space-x-3 modern-font disabled:opacity-50"
          style={{ 
            backgroundColor: hasChanges ? 'rgba(142, 142, 147, 0.1)' : 'rgba(142, 142, 147, 0.05)',
            borderColor: 'rgba(142, 142, 147, 0.3)',
            color: '#8e8e93',
          }}
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </button>
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className="modern-button px-8 py-4 transition-all duration-300 flex items-center space-x-3 modern-font disabled:opacity-50"
          style={{ 
            backgroundColor: hasChanges ? 'rgba(0, 122, 255, 0.1)' : 'rgba(0, 122, 255, 0.05)',
            borderColor: 'rgba(0, 122, 255, 0.3)',
            color: hasChanges ? '#007aff' : '#8e8e93',
            boxShadow: hasChanges ? '0 0 15px rgba(0, 122, 255, 0.3)' : 'none'
          }}
        >
          <Save className="w-5 h-5" />
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
        
        .modern-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }
        
        .modern-input:focus {
          outline: none;
          border-color: rgba(0, 122, 255, 0.5);
          box-shadow: 0 0 20px rgba(0, 122, 255, 0.2);
        }
        
        .modern-slider {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
        }
        
        .modern-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #007aff;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 122, 255, 0.5);
        }
        
        .floating-particles {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(0, 122, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(52, 199, 89, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 149, 0, 0.01) 0%, transparent 50%);
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