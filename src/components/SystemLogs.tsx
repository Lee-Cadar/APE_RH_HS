import React, { useState, useEffect, useRef } from 'react';
import { LogEntry } from '../types/ape';
import { Search, Download, Filter, AlertCircle, Info, AlertTriangle, X, Shield } from 'lucide-react';

interface SystemLogsProps {
  logs: LogEntry[];
}

export function SystemLogs({ logs }: SystemLogsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [autoScroll, setAutoScroll] = useState(true);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.component.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'ALL' || log.level === filterLevel;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    if (autoScroll) {
      logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'ERROR':
        return <X className="w-5 h-5" style={{ color: '#ff3b30' }} />;
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5" style={{ color: '#ff9500' }} />;
      case 'INFO':
        return <Info className="w-5 h-5" style={{ color: '#34c759' }} />;
      default:
        return <AlertCircle className="w-5 h-5" style={{ color: '#8e8e93' }} />;
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return { color: '#ff3b30', backgroundColor: 'rgba(255, 59, 48, 0.1)', borderColor: 'rgba(255, 59, 48, 0.3)' };
      case 'WARNING':
        return { color: '#ff9500', backgroundColor: 'rgba(255, 149, 0, 0.1)', borderColor: 'rgba(255, 149, 0, 0.3)' };
      case 'INFO':
        return { color: '#34c759', backgroundColor: 'rgba(52, 199, 89, 0.1)', borderColor: 'rgba(52, 199, 89, 0.3)' };
      default:
        return { color: '#8e8e93', backgroundColor: 'rgba(142, 142, 147, 0.1)', borderColor: 'rgba(142, 142, 147, 0.3)' };
    }
  };

  const exportLogs = () => {
    const logData = filteredLogs.map(log => 
      `${log.timestamp} [${log.level}] ${log.component}: ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ape-system-logs-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full space-y-8 relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles"></div>
      </div>

      {/* Header - Consistent with other pages */}
      <div className="relative modern-panel-header p-8 shadow-lg"
           style={{ 
             height: '100px',
             background: 'rgba(255, 255, 255, 0.05)',
             borderColor: 'rgba(255, 255, 255, 0.1)',
             borderWidth: '1px'
           }}>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-6">
            <div className="modern-button p-4"
                 style={{ 
                   backgroundColor: 'rgba(0, 122, 255, 0.1)',
                   borderColor: 'rgba(0, 122, 255, 0.3)',
                 }}>
              <Shield className="w-9 h-9" style={{ color: '#007aff' }} />
            </div>
            <div>
              <h2 className="text-2xl font-medium modern-font tracking-tight" style={{ color: '#ffffff' }}>
                System Logs
              </h2>
              <p className="modern-font text-base" style={{ color: '#8e8e93' }}>Real-time system monitoring and event tracking</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={exportLogs}
              className="modern-button px-8 py-4 transition-all duration-300 flex items-center space-x-3 modern-font text-base font-semibold"
              style={{ 
                backgroundColor: 'rgba(52, 199, 89, 0.1)',
                borderColor: 'rgba(52, 199, 89, 0.3)',
                color: '#34c759'
              }}
            >
              <Download className="w-5 h-5" />
              <span>Export Logs</span>
            </button>
            
            <div className="modern-display px-6 py-3 modern-font text-base font-semibold"
                 style={{ 
                   backgroundColor: 'rgba(52, 199, 89, 0.1)',
                   borderColor: 'rgba(52, 199, 89, 0.3)',
                   color: '#34c759',
                 }}>
              {filteredLogs.length} Entries
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex h-[calc(100%-180px)]">
        {/* Left Side - Controls & Stats - 30% */}
        <div className="w-[30%] pr-6 space-y-6">
          {/* Controls */}
          <div className="modern-panel p-6 shadow-lg">
            <h3 className="text-xl font-medium modern-font mb-6" style={{ color: '#ffffff' }}>
              Log Controls
            </h3>

            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#8e8e93' }} />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="modern-input w-full pl-10 pr-4 py-3 modern-font text-sm"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}
                />
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-3">
                <Filter className="w-4 h-4" style={{ color: '#8e8e93' }} />
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="modern-input flex-1 px-3 py-3 modern-font text-sm"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}
                >
                  <option value="ALL">All Levels</option>
                  <option value="ERROR">Errors</option>
                  <option value="WARNING">Warnings</option>
                  <option value="INFO">Info</option>
                  <option value="DEBUG">Debug</option>
                </select>
              </div>

              {/* Auto-scroll */}
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm modern-font" style={{ color: '#ffffff' }}>
                  Auto-scroll to latest
                </span>
              </label>
            </div>
          </div>

          {/* Stats */}
          <div className="modern-panel p-6 shadow-lg">
            <h3 className="text-xl font-medium modern-font mb-6" style={{ color: '#ffffff' }}>
              Log Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="modern-display p-4 text-center">
                <div className="text-xl font-medium modern-font" 
                     style={{ 
                       color: '#007aff',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {filteredLogs.length}
                </div>
                <div className="text-sm modern-font mt-1" style={{ color: '#8e8e93' }}>Total</div>
              </div>
              <div className="modern-display p-4 text-center"
                   style={{ 
                     backgroundColor: 'rgba(255, 59, 48, 0.05)',
                     borderColor: 'rgba(255, 59, 48, 0.2)',
                   }}>
                <div className="text-xl font-medium modern-font" 
                     style={{ 
                       color: '#ff3b30',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {filteredLogs.filter(log => log.level === 'ERROR').length}
                </div>
                <div className="text-sm modern-font mt-1" style={{ color: '#ff3b30' }}>Errors</div>
              </div>
              <div className="modern-display p-4 text-center"
                   style={{ 
                     backgroundColor: 'rgba(255, 149, 0, 0.05)',
                     borderColor: 'rgba(255, 149, 0, 0.2)',
                   }}>
                <div className="text-xl font-medium modern-font" 
                     style={{ 
                       color: '#ff9500',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {filteredLogs.filter(log => log.level === 'WARNING').length}
                </div>
                <div className="text-sm modern-font mt-1" style={{ color: '#ff9500' }}>Warnings</div>
              </div>
              <div className="modern-display p-4 text-center"
                   style={{ 
                     backgroundColor: 'rgba(52, 199, 89, 0.05)',
                     borderColor: 'rgba(52, 199, 89, 0.2)',
                   }}>
                <div className="text-xl font-medium modern-font" 
                     style={{ 
                       color: '#34c759',
                       fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                       fontSize: '22px'
                     }}>
                  {filteredLogs.filter(log => log.level === 'INFO').length}
                </div>
                <div className="text-sm modern-font mt-1" style={{ color: '#34c759' }}>Info</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Log Entries - 70% */}
        <div className="w-[70%] pl-6">
          <div className="modern-panel shadow-lg h-full">
            <div className="h-full overflow-y-auto p-6 space-y-3">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-16" style={{ color: '#8e8e93' }}>
                  <AlertCircle className="w-16 h-16 mx-auto mb-6 opacity-50" />
                  <p className="modern-font text-lg">No log entries match your current filters</p>
                </div>
              ) : (
                filteredLogs.map((log, index) => {
                  const levelColors = getLogLevelColor(log.level);
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 transition-all duration-300 modern-display"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getLogIcon(log.level)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 text-xs font-medium modern-font modern-display`}
                                style={{ 
                                  color: levelColors.color,
                                  backgroundColor: levelColors.backgroundColor,
                                  borderColor: levelColors.borderColor,
                                }}>
                            {log.level}
                          </span>
                          <span className="text-xs modern-font px-2 py-1 modern-display"
                                style={{ 
                                  color: '#007aff',
                                  backgroundColor: 'rgba(0, 122, 255, 0.1)',
                                  borderColor: 'rgba(0, 122, 255, 0.2)',
                                }}>
                            {log.component}
                          </span>
                          <span className="text-xs modern-font" style={{ color: '#8e8e93' }}>{log.timestamp}</span>
                        </div>
                        <p className="text-sm modern-font" style={{ color: '#ffffff' }}>{log.message}</p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={logsEndRef} />
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