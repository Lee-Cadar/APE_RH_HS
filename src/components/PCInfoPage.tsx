import React from 'react';
import { Monitor, Cpu, HardDrive, Zap, Thermometer, Wifi, Shield, Activity, MemoryStick, Disc, Gamepad2, Speaker, Camera, Usb } from 'lucide-react';

export function PCInfoPage() {
  // Simulated system information (like DXDiag)
  const systemInfo = {
    system: {
      computerName: "APE-WORKSTATION-01",
      operatingSystem: "Windows 11 Pro 64-bit (10.0, Build 22621)",
      language: "English (Regional Setting: English)",
      systemManufacturer: "Custom Build",
      systemModel: "APE Gaming Rig",
      bios: "American Megatrends Inc. F4, 3/15/2023",
      processor: "AMD Ryzen 9 7950X 16-Core Processor (32 CPUs), ~4.5GHz",
      memory: "32768MB RAM",
      pageFile: "37888MB used, 5120MB available",
      directXVersion: "DirectX 12"
    },
    display: {
      deviceName: "NVIDIA GeForce RTX 4090",
      manufacturer: "NVIDIA",
      chipType: "NVIDIA GeForce RTX 4090",
      dacType: "Integrated RAMDAC",
      deviceType: "Full Display Device",
      approxTotalMemory: "24576 MB",
      currentDisplayMode: "3840 x 2160 (32 bit) (144Hz)",
      monitor: "Samsung Odyssey G9 49-inch",
      driverName: "nvlddmkm.sys",
      driverVersion: "31.0.15.3623",
      driverDate: "11/28/2023"
    },
    sound: {
      description: "Realtek High Definition Audio",
      defaultSoundPlayback: "Speakers (Realtek High Definition Audio)",
      defaultSoundCapture: "Microphone (Realtek High Definition Audio)",
      driverName: "RTKVHD64.sys",
      driverVersion: "6.0.9381.1"
    },
    input: {
      devices: [
        "HID-compliant mouse",
        "HID Keyboard Device",
        "Xbox Wireless Controller",
        "Logitech G Pro X Superlight"
      ]
    },
    storage: {
      drives: [
        {
          name: "Samsung SSD 980 PRO 2TB",
          type: "NVMe SSD",
          capacity: "2TB",
          freeSpace: "1.2TB",
          health: "Excellent"
        },
        {
          name: "Western Digital Black 4TB",
          type: "HDD",
          capacity: "4TB", 
          freeSpace: "2.8TB",
          health: "Good"
        }
      ]
    },
    network: {
      adapters: [
        {
          name: "Intel Wi-Fi 6E AX210 160MHz",
          type: "Wireless",
          status: "Connected",
          speed: "1.2 Gbps"
        },
        {
          name: "Realtek PCIe GbE Family Controller",
          type: "Ethernet",
          status: "Connected",
          speed: "1 Gbps"
        }
      ]
    },
    cooling: {
      cpu: "NZXT Kraken Z73 360mm AIO",
      case: "Corsair iCUE 5000X RGB",
      fans: [
        "3x NZXT Aer RGB 2 120mm (Radiator)",
        "3x Corsair LL120 RGB 120mm (Intake)",
        "1x Corsair LL120 RGB 120mm (Exhaust)"
      ]
    },
    power: {
      psu: "Corsair RM1000x 1000W 80+ Gold",
      efficiency: "80+ Gold Certified",
      modular: "Fully Modular",
      rails: "+12V: 83.3A, +5V: 20A, +3.3V: 20A"
    },
    motherboard: {
      manufacturer: "ASUS",
      model: "ROG STRIX X670E-E GAMING WIFI",
      chipset: "AMD X670E",
      biosVersion: "2423",
      biosDate: "03/15/2023"
    }
  };

  const InfoSection = ({ title, icon: Icon, children, color }: any) => (
    <div className="modern-panel p-8 shadow-lg">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-4 rounded-2xl" style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-8 h-8" style={{ color }} />
        </div>
        <h3 className="text-2xl font-medium modern-font tracking-tight" style={{ color: '#ffffff' }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );

  const InfoRow = ({ label, value, highlight = false }: any) => (
    <div className="flex justify-between items-center py-3 border-b border-white/5">
      <span className="text-base modern-font" style={{ color: '#8e8e93' }}>{label}</span>
      <span className={`text-base modern-font ${highlight ? 'font-bold' : ''}`} 
            style={{ 
              color: highlight ? '#007aff' : '#ffffff',
              fontFamily: highlight ? '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' : 'inherit',
              fontSize: highlight ? '22px' : '16px'
            }}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="h-full space-y-8 relative">
      {/* Floating background elements */}
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
            <div className="modern-button p-4"
                 style={{ 
                   backgroundColor: 'rgba(88, 86, 214, 0.1)',
                   borderColor: 'rgba(88, 86, 214, 0.3)',
                 }}>
              <Monitor className="w-9 h-9" style={{ color: '#5856d6' }} />
            </div>
            <div>
              <h2 className="text-2xl font-medium modern-font tracking-tight" style={{ color: '#ffffff' }}>
                PC System Information
              </h2>
              <p className="modern-font text-base" style={{ color: '#8e8e93' }}>Complete hardware and software configuration</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="modern-display px-6 py-3 modern-font text-base font-semibold"
                 style={{ 
                   backgroundColor: 'rgba(52, 199, 89, 0.1)',
                   borderColor: 'rgba(52, 199, 89, 0.3)',
                   color: '#34c759',
                 }}>
              All Systems Operational
            </div>
          </div>
        </div>
      </div>

      {/* System Information Grid */}
      <div className="relative grid grid-cols-3 gap-8 h-[calc(100%-180px)] overflow-y-auto">
        {/* System Overview */}
        <InfoSection title="System" icon={Cpu} color="#007aff">
          <div className="space-y-2">
            <InfoRow label="Computer Name" value={systemInfo.system.computerName} highlight />
            <InfoRow label="Operating System" value={systemInfo.system.operatingSystem} />
            <InfoRow label="Processor" value={systemInfo.system.processor} />
            <InfoRow label="Memory" value={systemInfo.system.memory} highlight />
            <InfoRow label="BIOS" value={systemInfo.system.bios} />
            <InfoRow label="DirectX Version" value={systemInfo.system.directXVersion} />
          </div>
        </InfoSection>

        {/* Display Information */}
        <InfoSection title="Display" icon={Monitor} color="#5856d6">
          <div className="space-y-2">
            <InfoRow label="Graphics Card" value={systemInfo.display.deviceName} highlight />
            <InfoRow label="VRAM" value={systemInfo.display.approxTotalMemory + " MB"} highlight />
            <InfoRow label="Resolution" value={systemInfo.display.currentDisplayMode} />
            <InfoRow label="Monitor" value={systemInfo.display.monitor} />
            <InfoRow label="Driver Version" value={systemInfo.display.driverVersion} />
            <InfoRow label="Driver Date" value={systemInfo.display.driverDate} />
          </div>
        </InfoSection>

        {/* Storage Information */}
        <InfoSection title="Storage" icon={HardDrive} color="#34c759">
          {systemInfo.storage.drives.map((drive, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="modern-display p-4 mb-4">
                <div className="font-bold text-base modern-font mb-2" style={{ color: '#ffffff' }}>
                  {drive.name}
                </div>
                <div className="space-y-2">
                  <InfoRow label="Type" value={drive.type} />
                  <InfoRow label="Capacity" value={drive.capacity} highlight />
                  <InfoRow label="Free Space" value={drive.freeSpace} />
                  <InfoRow label="Health" value={drive.health} />
                </div>
              </div>
            </div>
          ))}
        </InfoSection>

        {/* Motherboard Information */}
        <InfoSection title="Motherboard" icon={Activity} color="#ff9500">
          <div className="space-y-2">
            <InfoRow label="Manufacturer" value={systemInfo.motherboard.manufacturer} />
            <InfoRow label="Model" value={systemInfo.motherboard.model} highlight />
            <InfoRow label="Chipset" value={systemInfo.motherboard.chipset} />
            <InfoRow label="BIOS Version" value={systemInfo.motherboard.biosVersion} />
            <InfoRow label="BIOS Date" value={systemInfo.motherboard.biosDate} />
          </div>
        </InfoSection>

        {/* Audio Information */}
        <InfoSection title="Audio" icon={Speaker} color="#ff3b30">
          <div className="space-y-2">
            <InfoRow label="Audio Device" value={systemInfo.sound.description} highlight />
            <InfoRow label="Playback" value={systemInfo.sound.defaultSoundPlayback} />
            <InfoRow label="Recording" value={systemInfo.sound.defaultSoundCapture} />
            <InfoRow label="Driver" value={systemInfo.sound.driverName} />
            <InfoRow label="Version" value={systemInfo.sound.driverVersion} />
          </div>
        </InfoSection>

        {/* Network Information */}
        <InfoSection title="Network" icon={Wifi} color="#34c759">
          {systemInfo.network.adapters.map((adapter, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="modern-display p-4">
                <div className="font-bold text-base modern-font mb-2" style={{ color: '#ffffff' }}>
                  {adapter.name}
                </div>
                <div className="space-y-2">
                  <InfoRow label="Type" value={adapter.type} />
                  <InfoRow label="Status" value={adapter.status} highlight />
                  <InfoRow label="Speed" value={adapter.speed} />
                </div>
              </div>
            </div>
          ))}
        </InfoSection>

        {/* Cooling System */}
        <InfoSection title="Cooling" icon={Thermometer} color="#007aff">
          <div className="space-y-2">
            <InfoRow label="CPU Cooler" value={systemInfo.cooling.cpu} highlight />
            <InfoRow label="Case" value={systemInfo.cooling.case} />
            <div className="pt-4">
              <div className="text-base modern-font font-bold mb-3" style={{ color: '#ffffff' }}>Fans</div>
              {systemInfo.cooling.fans.map((fan, index) => (
                <div key={index} className="text-sm modern-font py-1" style={{ color: '#8e8e93' }}>
                  • {fan}
                </div>
              ))}
            </div>
          </div>
        </InfoSection>

        {/* Power Supply */}
        <InfoSection title="Power Supply" icon={Zap} color="#ff9500">
          <div className="space-y-2">
            <InfoRow label="Model" value={systemInfo.power.psu} highlight />
            <InfoRow label="Efficiency" value={systemInfo.power.efficiency} />
            <InfoRow label="Type" value={systemInfo.power.modular} />
            <InfoRow label="Rails" value={systemInfo.power.rails} />
          </div>
        </InfoSection>

        {/* Input Devices */}
        <InfoSection title="Input Devices" icon={Gamepad2} color="#5856d6">
          <div className="space-y-3">
            {systemInfo.input.devices.map((device, index) => (
              <div key={index} className="modern-display p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#34c759' }}></div>
                  <span className="text-base modern-font" style={{ color: '#ffffff' }}>{device}</span>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>
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
            radial-gradient(circle at 20% 20%, rgba(88, 86, 214, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 149, 0, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(52, 199, 89, 0.01) 0%, transparent 50%);
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