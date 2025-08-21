import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useSettings } from "../context/SettingsContext";
import {
  FaMoon,
  FaSun,
  FaVolumeMute,
  FaVolumeUp,
  FaWifi,
  FaLock,
  FaRedoAlt,
} from "react-icons/fa";

type TabType = "quick" | "wifi";

export default function TaskbarSettings({ visible }: { visible: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const {
    volume,
    setVolume,
    brightness,
    setBrightness,
    wifiEnabled,
    setWifiEnabled,
    wifiNetwork,
    availableNetworks,
    connectToNetwork,
    scanNetworks,
    isConnecting,
  } = useSettings();
  const [activeTab, setActiveTab] = useState<TabType>("quick");

  const tabStyle = (isActive: boolean) => `
    flex-1 px-4 py-2 transition-colors
    ${
      isActive
        ? theme === "dark"
          ? "bg-gray-700 text-blue-400"
          : "bg-blue-50 text-blue-600"
        : theme === "dark"
        ? "text-gray-300 hover:bg-gray-700/50"
        : "text-gray-600 hover:bg-gray-100"
    }
  `;

  const buttonStyle = (isEnabled: boolean) => `
    px-3 py-1 rounded-full text-sm transition-colors
    ${
      isEnabled
        ? theme === "dark"
          ? "bg-blue-900/50 text-blue-400 hover:bg-blue-800/50"
          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
        : theme === "dark"
        ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }
  `;

  if (!visible) return null;

  return (
    <div
      className={`absolute right-4 bottom-16 ${
        theme === "dark" ? "bg-gray-800/95" : "bg-white/95"
      } rounded-lg shadow-xl border ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      } w-80 backdrop-blur-md overflow-hidden`}
    >
      <div
        className={`flex border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        {["quick", "wifi"].map((tab) => (
          <button
            key={tab}
            className={tabStyle(activeTab === tab)}
            onClick={() => setActiveTab(tab as TabType)}
          >
            {tab === "quick" ? "Quick Settings" : "WiFi"}
          </button>
        ))}
      </div>

      {activeTab === "quick" && (
        <div
          className={`p-4 space-y-4 ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <FaMoon className="text-blue-400" />
              ) : (
                <FaSun className="text-yellow-500" />
              )}
              <span>Theme</span>
            </div>
            <button
              onClick={toggleTheme}
              className={`px-3 py-1 rounded-full ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              } text-sm transition-colors`}
            >
              {theme === "dark" ? "Dark" : "Light"}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>{volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}</span>
                <span>Volume</span>
              </div>
              <span className="text-sm opacity-75">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className={`w-full ${
                theme === "dark" ? "accent-blue-400" : "accent-blue-500"
              }`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaSun
                  className={
                    theme === "dark" ? "text-blue-400" : "text-yellow-500"
                  }
                />
                <span>Brightness</span>
              </div>
              <span className="text-sm opacity-75">{brightness}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className={`w-full ${
                theme === "dark" ? "accent-blue-400" : "accent-blue-500"
              }`}
            />
          </div>
        </div>
      )}

      {activeTab === "wifi" && (
        <div
          className={`p-4 space-y-4 ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={wifiEnabled ? "text-blue-400" : "opacity-50"}>
                <FaWifi size={18} />
              </div>
              <span>WiFi</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scanNetworks()}
                className={`p-2 rounded-full transition-colors ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                title="Scan for networks"
              >
                <FaRedoAlt className="text-gray-400" size={14} />
              </button>
              <button
                onClick={() => setWifiEnabled(!wifiEnabled)}
                className={buttonStyle(wifiEnabled)}
              >
                {wifiEnabled ? "On" : "Off"}
              </button>
            </div>
          </div>

          {wifiEnabled && (
            <div className="mt-2">
              <div className={`text-sm mb-2 flex justify-between items-center`}>
                <span
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }
                >
                  {wifiNetwork
                    ? `Connected to: ${wifiNetwork}`
                    : "Available Networks"}
                </span>
              </div>
              <div
                className={theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"}
              >
                {availableNetworks.map((network, i) => (
                  <button
                    key={network.name}
                    onClick={() => connectToNetwork(network.name)}
                    disabled={isConnecting}
                    className={`w-full flex items-center justify-between p-3 ${
                      i > 0
                        ? theme === "dark"
                          ? "border-t border-gray-700"
                          : "border-t border-gray-200"
                        : ""
                    } ${
                      wifiNetwork === network.name
                        ? theme === "dark"
                          ? "bg-gray-800 text-blue-400"
                          : "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaWifi
                        className={
                          wifiNetwork === network.name ? "text-blue-400" : ""
                        }
                      />
                      <span>{network.name}</span>
                      {network.secured && (
                        <FaLock
                          size={12}
                          className={
                            theme === "dark" ? "text-gray-500" : "text-gray-400"
                          }
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-1 w-12 rounded-full ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full ${
                            wifiNetwork === network.name
                              ? "bg-blue-500"
                              : "bg-gray-400"
                          }`}
                          style={{ width: `${network.strength}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-7">
                        {network.strength}%
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {isConnecting && (
                <div className="text-center py-2 text-sm text-blue-500">
                  Connecting...
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
