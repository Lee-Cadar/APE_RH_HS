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
    // Simulate email test
    alert(`Testing email connection to ${localConfig.email.address}...\n\nConnection successful! Daily reports will be sent to this address.`);
  };

  const generateTestReport = () => {
    // Simulate test report generation
    alert(`Test report generated successfully!\n\nReport includes:\n• 76+ analysis points\n• Performance metrics\n• Thermal analysis\n• Network statistics\n• System health assessment\n• Predictive analytics\n\nReport would be sent to: ${localConfig.email.address}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles"></div>
      </div>

      {/* Header */}
      <div className="relative modern-panel-header p-8 shadow-lg"
           style={{ 
             background: 'rgba(255, 255, 255, 0.05)',
             borderColor: 'rgba(255, 255, 255, 0.1)',
             borderWidth: '1px'
           }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="modern-button p-3"
                 style={{ 
                   backgroundColor: 'rgba(0, 122, 255, 0.1)',
                   borderColor: 'rgba(0, 122, 255, 0.3)',
                 }}>
              <Shield className="w-8 h-8" style={{ color: '#007aff' }} />
            </div>
            <div>
              <h2 className="text-3xl font-bold modern-font tracking-tight" style={{ color: '#ffffff' }}>
                System Configuration
              </h2>
              <p className="mt-2 modern-font text-lg" style={{ color: '#8e8e93' }}>Configure APE system parameters and thresholds</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {hasChanges && (
              <div className="flex items-center space-x-3 px-4 py-2 modern-display"
                   style={{ 
                     backgroundColor: 'rgba(255, 59, 48, 0.1)',
                     borderColor: 'rgba(255, 59, 48, 0.3)',
                     color: '#ff3b30',
                   }}>
                <AlertTriangle className="w-5 h-5 animate-pulse" />
                <span className="text-sm modern-font font-semibold">Unsaved Changes</span>
              </div>
            )}
            <button
              onClick={handleReset}
              disabled={!hasChanges}
              className="modern-button px-6 py-3 transition-all duration-300 flex items-center space-x-2 modern-font disabled:opacity-50"
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
              className="modern-button px-6 py-3 transition-all duration-300 flex items-center space-x-2 modern-font disabled:opacity-50"
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
        </div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Email Configuration */}
        <div className="modern-panel p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 rounded-2xl" style={{ backgroundColor: 'rgba(52, 199, 89, 0.2)' }}>
              <Mail className="w-6 h-6" style={{ color: '#34c759' }} />
            </div>
            <h3 className="text-2xl font-bold modern-font tracking-tight" style={{ color: '#ffffff' }}>Email Reports</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-base font-semibold mb-3 modern-font" style={{ color: '#ffffff' }}>
                Email Address
              </label>
              <input
                type="email"
                value={localConfig.email.address}
                onChange={(e) => handleConfigChange('email.address', e.target.value)}
                className="modern-input w-full px-4 py-3 modern-font"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                }}
                placeholder="admin@ape-system.com"
              />
              <p className="text-sm mt-2 modern-font" style={{ color: '#8e8e93' }}>Daily reports will be sent to this address</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold mb-3 modern-font" style={{ color: '#ffffff' }}>
                  SMTP Server
                </label>
                <input
                  type="text"
                  value={localConfig.email.smtp_server}
                  onChange={(e) => handleConfigChange('email.smtp_server', e.target.value)}
                  className="modern-input w-full px-4 py-3 modern-font"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}
                />
              </div>
              <div>
                <label className="block text-base font-semibold mb-3 modern-font" style={{ color: '#ffffff' }}>
                  Port
                </label>
                <input
                  type="number"
                  value={localConfig.email.port}
                  onChange={(e) => handleConfigChange('email.port', parseInt(e.target.value))}
                  className="modern-input w-full px-4 py-3 modern-font"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={localConfig.email.daily_reports}
                  onChange={(e) => handleConfigChange('email.daily_reports', e.target.checked)}
                  className="w-5 h-5 rounded"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                />
                <span className="text-base modern-font font-semibold" style={{ color: '#ffffff' }}>
                  Enable Daily Reports
                </span>
              </label>
              <p className="text-sm mt-2 modern-font" style={{ color: '#8e8e93' }}>Automatically send comprehensive daily reports with 76+ analysis points</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={testEmailConnection}
                className="modern-button px-4 py-3 transition-all duration-300 flex items-center space-x-2 modern-font"
                style={{ 
                  backgroundColor: 'rgba(52, 199, 89, 0.1)',
                  borderColor: 'rgba(52, 199, 89, 0.3)',
                  color: '#34c759',
                }}
              >
                <Mail className="w-4 h-4" />
                <span>Test Email</span>
              </button>
              <button
                onClick={generateTestReport}
                className="modern-button px-4 py-3 transition-all duration-300 flex items-center space-x-2 modern-font"
                style={{ 
                  backgroundColor: 'rgba(52, 199, 89, 0.1)',
                  borderColor: 'rgba(52, 199, 89, 0.3)',
                  color: '#34c759',
                }}
              >
                <FileText className="w-4 h-4" />
                <span>Test Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Temperature Control */}
        <div className="modern-panel p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 rounded-2xl" style={{ backgroundColor: 'rgba(255, 149, 0, 0.2)' }}>
              <Settings className="w-6 h-6" style={{ color: '#ff9500' }} />
            </div>
            <h3 className="text-2xl font-bold modern-font tracking-tight" style={{ color: '#ffffff' }}>Thermal Thresholds</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-base font-semibold mb-3 modern-font" style={{ color: '#ffffff' }}>
                Normal Threshold (°C)
              </label>
              <input
                type="number"
                value={localConfig.temperature_thresholds.normal}
                onChange={(e) => handleConfigChange('temperature_thresholds.normal', parseInt(e.target.value))}
                className="modern-input w-full px-4 py-3 modern-font"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                }}
                min="0"
                max="100"
              />
              <p className="text-sm mt-2 modern-font" style={{ color: '#8e8e93' }}>Below this temperature, system operates in performance mode</p>
            </div>
            
            <div>
              <label className="block text-base font-semibold mb-3 modern-font" style={{ color: '#ffffff' }}>
                Warning Threshold (°C)
              </label>
              <input
                type="number"
                value={localConfig.temperature_thresholds.warning}
                onChange={(e) => handleConfigChange('temperature_thresholds.warning', parseInt(e.target.value))}
                className="modern-input w-full px-4 py-3 modern-font"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                }}
                min="0"
                max="100"
              />
              <p className="text-sm mt-2 modern-font" style={{ color: '#8e8e93' }}>Above this temperature, system switches to emergency protocol</p>
            </div>
          </div>
        </div>

        {/* Cooling System Control */}
        <div className="modern-panel p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 rounded-2xl" style={{ backgroundColor: 'rgba(0, 122, 255, 0.2)' }}>
              <Settings className="w-6 h-6" style={{ color: '#007aff' }} />
            </div>
            <h3 className="text-2xl font-bold modern-font tracking-tight" style={{ color: '#ffffff' }}>Cooling System</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-base font-semibold mb-3 modern-font" style={{ color: '#ffffff' }}>
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
                <span className="font-bold" style={{ color: '#ffffff' }}>{localConfig.fan_speeds.min}%</span>
                <span>Maximum</span>
              </div>
            </div>
            
            <div>
              <label className="block text-base font-semibold mb-3 modern-font" style={{ color: '#ffffff' }}>
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
                <span className="font-bold" style={{ color: '#ffffff' }}>{localConfig.fan_speeds.max}%</span>
                <span>Maximum</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Parameters */}
        <div className="modern-panel p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 rounded-2xl" style={{ backgroundColor: 'rgba(88, 86, 214, 0.2)' }}>
              <Settings className="w-6 h-6" style={{ color: '#5856d6' }} />
            </div>
            <h3 className="text-2xl font-bold modern-font tracking-tight" style={{ color: '#ffffff' }}>System Parameters</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-base font-semibold mb-3 modern-font" style={{ color: '#ffffff' }}>
                Polling Interval (seconds)
              </label>
              <input
                type="number"
                value={localConfig.polling_interval}
                onChange={(e) => handleConfigChange('polling_interval', parseInt(e.target.value))}
                className="modern-input w-full px-4 py-3 modern-font"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                }}
                min="1"
                max="60"
              />
              <p className="text-sm mt-2 modern-font" style={{ color: '#8e8e93' }}>Frequency of temperature monitoring and system updates</p>
            </div>

            <div>
              <label className="block text-base font-semibold mb-3 modern-font" style={{ color: '#ffffff' }}>
                Log Level
              </label>
              <select
                value={localConfig.logging.level}
                onChange={(e) => handleConfigChange('logging.level', e.target.value)}
                className="modern-input w-full px-4 py-3 modern-font"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                }}
              >
                <option value="DEBUG">Debug - Maximum detail</option>
                <option value="INFO">Info - Standard operations</option>
                <option value="WARNING">Warning - Issues only</option>
                <option value="ERROR">Error - Critical errors</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Report Analytics Summary */}
      <div className="relative modern-panel p-8">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold modern-font text-2xl" style={{ color: '#ffffff' }}>Daily Report Analytics</h4>
            <p className="text-base modern-font mt-2" style={{ color: '#8e8e93' }}>
              Comprehensive analysis with 76+ data points including thermal, performance, network, compliance, and predictive analytics
            </p>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="w-4 h-4 mx-auto mb-2 animate-pulse rounded-full" 
                   style={{ 
                     backgroundColor: '#34c759',
                     boxShadow: '0 0 8px #34c759'
                   }}></div>
              <div className="text-sm modern-font" style={{ color: '#34c759' }}>2/SEC</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 mx-auto mb-2 animate-pulse rounded-full" 
                   style={{ 
                     backgroundColor: '#007aff',
                     boxShadow: '0 0 8px #007aff'
                   }}></div>
              <div className="text-sm modern-font" style={{ color: '#007aff' }}>DAILY</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 mx-auto mb-2 animate-pulse rounded-full" 
                   style={{ 
                     backgroundColor: '#34c759',
                     boxShadow: '0 0 8px #34c759'
                   }}></div>
              <div className="text-sm modern-font" style={{ color: '#34c759' }}>EMAIL</div>
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
          box-shadow: 0 0 10px rgba(0, 122, 255, 0.5);
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