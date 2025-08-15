import { createContext, useContext, useState } from "react";

interface WifiNetwork {
  name: string;
  strength: number;
  secured?: boolean;
}

interface SettingsContextType {
  volume: number;
  brightness: number;
  wifiEnabled: boolean;
  wifiNetwork: string | null;
  resolution: string;
  setVolume: (value: number) => void;
  setBrightness: (value: number) => void;
  setWifiEnabled: (enabled: boolean) => void;
  setWifiNetwork: (network: string | null) => void;
  setResolution: (res: string) => void;
  availableNetworks: WifiNetwork[];
  connectToNetwork: (networkName: string) => void;
  scanNetworks: () => void;
  isConnecting: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(100);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [wifiNetwork, setWifiNetwork] = useState<string | null>("Home Network");
  const [resolution, setResolution] = useState("1920x1080");
  const [isConnecting, setIsConnecting] = useState(false);
  const [availableNetworks, setAvailableNetworks] = useState<WifiNetwork[]>([
    { name: "Home_WiFi", strength: 100, secured: true },
    { name: "Office_Network", strength: 85, secured: true },
    { name: "Guest_WiFi", strength: 70, secured: false },
    { name: "Public_Hotspot", strength: 45, secured: false },
  ]);

  const connectToNetwork = async (networkName: string) => {
    setIsConnecting(true);
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setWifiNetwork(networkName);
    setIsConnecting(false);
  };

  const scanNetworks = async () => {
    // Simulate network scanning
    setAvailableNetworks((prev) => [...prev.sort(() => Math.random() - 0.5)]);
  };

  return (
    <SettingsContext.Provider
      value={{
        volume,
        brightness,
        wifiEnabled,
        wifiNetwork,
        resolution,
        setVolume,
        setBrightness,
        setWifiEnabled,
        setWifiNetwork,
        setResolution,
        availableNetworks,
        connectToNetwork,
        scanNetworks,
        isConnecting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within SettingsProvider");
  return context;
};
