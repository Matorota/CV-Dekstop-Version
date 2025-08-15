import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

type SettingsPanelProps = {
  onClose: () => void;
};

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("appearance");

  return (
    <div
      className={`w-full h-full flex flex-col ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } rounded-lg overflow-hidden`}
    >
      <div
        className={`h-12 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        } flex items-center px-4 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h2
          className={`text-lg font-semibold flex-1 ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          System Settings
        </h2>
        <button
          onClick={onClose}
          className={`${
            theme === "dark"
              ? "text-gray-400 hover:text-red-400"
              : "text-gray-500 hover:text-red-500"
          }`}
        >
          ×
        </button>
      </div>

      <div className="flex flex-1">
        <div
          className={`w-48 border-r ${
            theme === "dark"
              ? "bg-gray-900 border-gray-700"
              : "bg-gray-50 border-gray-200"
          } p-4`}
        >
          <div className="space-y-2">
            {["system", "appearance", "about", "display"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  activeTab === tab
                    ? theme === "dark"
                      ? "bg-gray-700 text-blue-400"
                      : "bg-blue-100 text-blue-700"
                    : theme === "dark"
                    ? "text-gray-400 hover:bg-gray-800"
                    : "hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`flex-1 p-6 ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-white text-gray-800"
          }`}
        >
          {activeTab === "system" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">System Information</h3>
              <div className="space-y-2">
                <p>
                  <strong>OS:</strong> Arch Linux
                </p>
                <p>
                  <strong>Kernel:</strong> 6.8.0-arch1-1
                </p>
                <p>
                  <strong>DE:</strong> Custom React Desktop
                </p>
                <p>
                  <strong>Shell:</strong> bash 5.2
                </p>
                <p>
                  <strong>CPU:</strong> Intel i7 (simulated)
                </p>
                <p>
                  <strong>Memory:</strong> 16GB (simulated)
                </p>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Theme Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Theme Mode
                  </label>
                  <select
                    className={`w-48 border rounded p-2 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300"
                    }`}
                    value={theme}
                    onChange={toggleTheme}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">About System</h3>
              <div className="space-y-2">
                <p>
                  <strong>Version:</strong> 1.0.0
                </p>
                <p>
                  <strong>Build:</strong> 2024.03
                </p>
                <p>
                  <strong>License:</strong> MIT
                </p>
                <p className="mt-4">Built with React + TypeScript + Vite</p>
              </div>
            </div>
          )}

          {activeTab === "display" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Display Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Resolution
                  </label>
                  <select className="w-48 border rounded p-1">
                    <option>3840x2160 (4K)</option>
                    <option>2560x1440 (2K)</option>
                    <option>1920x1080 (FHD)</option>
                    <option>1366x768 (HD)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Refresh Rate
                  </label>
                  <select className="w-48 border rounded p-1">
                    <option>144 Hz</option>
                    <option>120 Hz</option>
                    <option>60 Hz</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Scale
                  </label>
                  <select className="w-48 border rounded p-1">
                    <option>100%</option>
                    <option>125%</option>
                    <option>150%</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
