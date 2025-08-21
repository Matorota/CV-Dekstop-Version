import { useState } from "react";
import { apps } from "../data/apps/index";
import type { AppData } from "../data/apps/types";
import AppIcon from "./AppIcon";
import AppPanel from "./AppPanel";
import LinuxMenu from "./LinuxMenu";

type DesktopProps = {
  openApps: string[];
  onAppClick: (name: string) => void;
  onCloseApp: (name: string) => void;
  linuxMenu: boolean;
  onOpenTerminal: () => void; // Add this prop
  onOpenSettings: () => void; // Add this prop
};
export default function Desktop({
  openApps,
  onAppClick,
  onCloseApp,
  linuxMenu,
  onOpenTerminal, // Add this prop
  onOpenSettings, // Add this prop
}: DesktopProps) {
  const [minimized, setMinimized] = useState<string[]>([]);

  const handleMinimize = (name: string) => {
    setMinimized((prev) => [...prev, name]);
  };

  const handleRestore = (name: string) => {
    setMinimized((prev) => prev.filter((n) => n !== name));
  };

  // Better app organization
  const itemsPerColumn = 5;
  const firstColumnApps = apps.slice(0, itemsPerColumn);
  const secondColumnApps = apps.slice(itemsPerColumn);

  return (
    <div className="flex-1 flex flex-row items-start justify-start relative select-none">
      <div className="w-full sm:w-auto overflow-y-auto max-h-[60vh] sm:max-h-none px-1">
        <div className="grid grid-cols-3 gap-2 mt-2 sm:grid-cols-2 sm:gap-8 sm:mt-16 sm:ml-10">
          {/* First Column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {firstColumnApps.map((app: AppData) => (
              <AppIcon
                key={app.name}
                name={app.name}
                icon={app.icon}
                onClick={() => onAppClick(app.name)}
              />
            ))}
          </div>

          {/* Second Column */}
          {secondColumnApps.length > 0 && (
            <div className="flex flex-col gap-4 sm:gap-6">
              {secondColumnApps.map((app: AppData) => (
                <AppIcon
                  key={app.name}
                  name={app.name}
                  icon={app.icon}
                  onClick={() => onAppClick(app.name)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {openApps.map((name, idx) => {
        if (minimized.includes(name)) return null;
        const app = apps.find((a: AppData) => a.name === name);
        if (!app) return null;

        // Dynamic sizing based on app type
        const getAppSize = (appName: string) => {
          const isMobile = window.innerWidth < 640;
          switch (appName) {
            case "Github":
              return {
                width: isMobile ? "95vw" : 900,
                height: isMobile ? "70vh" : 600,
              };
            case "About Me":
              return {
                width: isMobile ? "95vw" : 800,
                height: isMobile ? "70vh" : 650,
              };
            case "Skills":
              return {
                width: isMobile ? "95vw" : 750,
                height: isMobile ? "70vh" : 550,
              };
            default:
              return {
                width: isMobile ? "95vw" : 640,
                height: isMobile ? "70vh" : 480,
              };
          }
        };

        const size = getAppSize(app.name);

        return (
          <AppPanel
            key={name}
            name={app.name}
            icon={app.icon}
            content={app.content}
            idx={idx}
            onClose={() => onCloseApp(app.name)}
            onMinimize={() => handleMinimize(app.name)}
            defaultWidth={size.width}
            defaultHeight={size.height}
          />
        );
      })}

      <LinuxMenu
        visible={linuxMenu}
        onOpenTerminal={onOpenTerminal}
        onOpenSettings={onOpenSettings}
      />
      <TaskbarRestoreHandler minimized={minimized} onRestore={handleRestore} />
    </div>
  );
}

function TaskbarRestoreHandler({
  minimized,
  onRestore,
}: {
  minimized: string[];
  onRestore: (name: string) => void;
}) {
  (window as any).__restoreMinimizedApp = onRestore;
  (window as any).__minimizedApps = minimized;
  return null;
}
