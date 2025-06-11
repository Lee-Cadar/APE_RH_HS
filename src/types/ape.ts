export type PerformanceState = 'performance' | 'balanced' | 'powersave';

export interface APEConfig {
  temperature_thresholds: {
    normal: number;
    warning: number;
  };
  fan_speeds: {
    min: number;
    max: number;
  };
  led_colors: {
    normal: string;
    warning: string;
    critical: string;
  };
  polling_interval: number;
  logging: {
    level: string;
    file: string;
  };
  email: {
    address: string;
    smtp_server: string;
    port: number;
    username: string;
    password: string;
    daily_reports: boolean;
  };
}

export interface LogEntry {
  timestamp: string;
  level: string;
  component: string;
  message: string;
}

export interface SystemStatus {
  temperature: number;
  performanceState: PerformanceState;
  fanSpeed: number;
  ledColor: string;
  cpuUsage: number;
  memoryUsage: number;
  uptime: number;
}

export interface GPUMetrics {
  usage: number;
  temperature: number;
  memoryUsed: number;
  memoryTotal: number;
  clockSpeed: number;
  powerDraw: number;
}

export interface NetworkMetrics {
  downloadSpeed: number;
  uploadSpeed: number;
  latency: number;
  packetsReceived: number;
  packetsSent: number;
  signalStrength: number;
  connectionType: string;
}

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  uptime: string;
  processes: number;
  loadAverage: string;
}

export interface MetricReading {
  timestamp: Date;
  value: number;
  metric: string;
  component: string;
}

export interface DailyReport {
  date: string;
  readings: MetricReading[];
  analysis: ReportAnalysis;
  summary: ReportSummary;
}

export interface ReportAnalysis {
  temperatureAnalysis: {
    average: number;
    peak: number;
    minimum: number;
    timeAtCritical: number;
    thermalEvents: number;
    coolingEfficiency: number;
  };
  performanceAnalysis: {
    cpuUtilization: number;
    gpuUtilization: number;
    memoryPressure: number;
    systemStability: number;
    powerEfficiency: number;
    loadDistribution: number;
  };
  networkAnalysis: {
    averageLatency: number;
    bandwidthUtilization: number;
    connectionStability: number;
    packetLoss: number;
    signalQuality: number;
    throughputConsistency: number;
  };
  systemHealth: {
    overallScore: number;
    reliabilityIndex: number;
    maintenanceAlerts: string[];
    optimizationSuggestions: string[];
    criticalIssues: string[];
    performanceGrade: string;
  };
  trends: {
    temperatureTrend: 'improving' | 'stable' | 'degrading';
    performanceTrend: 'improving' | 'stable' | 'degrading';
    networkTrend: 'improving' | 'stable' | 'degrading';
    predictionAccuracy: number;
    forecastAlerts: string[];
  };
  compliance: {
    thermalCompliance: number;
    performanceCompliance: number;
    uptimeCompliance: number;
    securityCompliance: number;
    energyEfficiency: number;
  };
}

export interface ReportSummary {
  totalReadings: number;
  systemUptime: string;
  criticalEvents: number;
  warningEvents: number;
  averagePerformance: number;
  energyConsumption: number;
  recommendedActions: string[];
  nextMaintenanceDate: string;
}