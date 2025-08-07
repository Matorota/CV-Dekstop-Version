import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

type SettingsPanelProps = {
  onClose: () => void;
};

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("appearance");

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg overflow-hidden">
      <div className="h-12 bg-gray-100 flex items-center px-4 border-b">
        <h2 className="text-lg font-semibold flex-1">System Settings</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500">
          ×
        </button>
      </div>

      <div className="flex flex-1">
        <div className="w-48 border-r bg-gray-50 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab("system")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "system"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              System
            </button>
            <button
              onClick={() => setActiveTab("appearance")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "appearance"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              Appearance
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "about"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              About
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
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
                    className="w-48 border rounded p-1"
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
        </div>
      </div>
    </div>
  );
}
