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

  return (
    <div className="flex-1 flex flex-row items-start justify-start relative select-none">
      <div className="w-full sm:w-auto overflow-y-auto max-h-[60vh] sm:max-h-none px-1">
        <div className="grid grid-cols-3 gap-2 mt-2 sm:flex sm:flex-col sm:gap-10 sm:mt-16 sm:ml-10">
          {apps.map((app: AppData) => (
            <AppIcon
              key={app.name}
              name={app.name}
              icon={app.icon}
              onClick={() => onAppClick(app.name)}
            />
          ))}
        </div>
      </div>

      {openApps.map((name, idx) => {
        if (minimized.includes(name)) return null;
        const app = apps.find((a: AppData) => a.name === name);
        if (!app) return null;
        const isGithub = app.name === "Github";
        return (
          <AppPanel
            key={name}
            name={app.name}
            icon={app.icon}
            content={app.content}
            idx={idx}
            onClose={() => onCloseApp(app.name)}
            onMinimize={() => handleMinimize(app.name)}
            defaultWidth={
              isGithub ? (window.innerWidth < 640 ? "98vw" : 900) : undefined
            }
            defaultHeight={
              isGithub ? (window.innerWidth < 640 ? "60vh" : 400) : undefined
            }
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
