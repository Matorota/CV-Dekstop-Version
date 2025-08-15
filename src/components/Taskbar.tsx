import React, { useState } from "react";
import { apps } from "../data/apps/index";
import { FaCog } from "react-icons/fa";
import TaskbarSettings from "./TaskbarSettings";
import { useTheme } from "../context/ThemeContext";

type TaskbarProps = {
  openApps: string[];
  onLinuxClick: () => void;
  linuxMenu: boolean;
  onCloseApp: (name: string) => void;
  time: string;
  onOpenTerminal: () => void;
  theme: "light" | "dark";
};

export default function Taskbar({ ...props }: TaskbarProps) {
  const { theme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const minimized: string[] = (window as any).__minimizedApps || [];
  const restoreMinimizedApp: (name: string) => void =
    (window as any).__restoreMinimizedApp || (() => {});

  return (
    <div
      className={`w-full h-12 fixed bottom-0 left-0 z-40 ${
        theme === "dark"
          ? "bg-gray-900/95 border-gray-700 text-gray-200"
          : "bg-white/95 border-gray-200 text-gray-700"
      } backdrop-blur-md border-t flex items-center px-4 transition-colors duration-200`}
    >
      <button
        onClick={props.onLinuxClick}
        className={`mr-4 p-2 rounded-full transition-colors ${
          theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
        }`}
      >
        <img src="/arch-logo.svg" alt="Menu" className="w-6 h-6" />
      </button>

      {/* Terminal button */}
      <button
        onClick={props.onOpenTerminal}
        className="flex items-center justify-center rounded hover:bg-blue-100 transition p-1 mr-2"
        style={{ width: 38, height: 38, fontSize: 22 }}
        aria-label="Open Terminal"
        title="Open Terminal"
      >
        🖥️
      </button>
      <div className="flex gap-2">
        {props.openApps.map((name) => {
          const app = apps.find((a) => a.name === name);
          if (!app) return null;
          const isMinimized = minimized.includes(name);
          return (
            <button
              key={app.name}
              onClick={() =>
                isMinimized ? restoreMinimizedApp(app.name) : undefined
              }
              className={`flex flex-col items-center px-2 py-1 rounded-lg border-2 shadow transition-all duration-200 ${
                isMinimized
                  ? "bg-gray-200 border-gray-400"
                  : "bg-blue-100 border-blue-300"
              }`}
              style={{ minWidth: 40, height: 40 }}
              title={isMinimized ? "Restore" : app.name}
            >
              <span className="flex items-center justify-center h-7 w-7">
                {React.isValidElement(app.icon) ? (
                  <app.icon.type
                    {...(typeof app.icon.props === "object" && app.icon.props
                      ? app.icon.props
                      : {})}
                    size={22}
                    style={{ display: "block" }}
                  />
                ) : (
                  app.icon
                )}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex-1" />

      {/* Add settings button before the clock */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`flex items-center justify-center rounded-full p-2 transition-colors mr-2
          ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
        title="Quick Settings"
      >
        <FaCog
          className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
        />
      </button>

      <div
        className={`font-mono text-sm px-3 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {props.time}
      </div>

      <TaskbarSettings visible={showSettings} />
    </div>
  );
}
