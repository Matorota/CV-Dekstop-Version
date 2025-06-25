import React from "react";
import tuxImg from "../assets/tux.png";
import { apps } from "../data/apps/index";

type TaskbarProps = {
  openApps: string[];
  onLinuxClick: () => void;
  linuxMenu: boolean;
  onCloseApp: (name: string) => void;
  time: string;
};

export default function Taskbar({
  openApps,
  onLinuxClick,
  linuxMenu,
  time,
}: TaskbarProps) {
  const minimized: string[] = (window as any).__minimizedApps || [];
  const restoreMinimizedApp: (name: string) => void =
    (window as any).__restoreMinimizedApp || (() => {});

  return (
    <div className="w-full h-10 sm:h-12 bg-white border-t border-gray-300 flex items-center px-2 sm:px-4 shadow-lg fixed bottom-0 left-0 z-40">
      <button
        onClick={onLinuxClick}
        className={`mr-4 flex items-center justify-center rounded-full hover:bg-blue-100 transition p-1 ${
          linuxMenu ? "ring-2 ring-blue-400" : ""
        }`}
        style={{ width: 38, height: 38 }}
      >
        <img src={tuxImg} alt="Linux" className="h-8 w-8 object-contain" />
      </button>
      <div className="flex flex-row gap-2">
        {openApps.map((name) => {
          const app = apps.find((a) => a.name === name);
          if (!app) return null;
          const isMinimized = minimized.includes(name);
          return (
            <button
              key={app.name}
              onClick={
                () => (isMinimized ? restoreMinimizedApp(app.name) : undefined) // Do nothing if not minimized
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
      <div className="text-gray-700 font-mono text-xs sm:text-sm px-2 sm:px-3 select-none">
        {time}
      </div>
    </div>
  );
}
