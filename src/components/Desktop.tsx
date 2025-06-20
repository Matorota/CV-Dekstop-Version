import { apps } from "../data/apps";
import type { AppData } from "../data/apps";
import AppIcon from "./AppIcon";
import AppPanel from "./AppPanel";
import LinuxMenu from "./LinuxMenu";

type DesktopProps = {
  openApps: string[];
  onAppClick: (name: string) => void;
  onCloseApp: (name: string) => void;
  linuxMenu: boolean;
};

export default function Desktop({
  openApps,
  onAppClick,
  onCloseApp,
  linuxMenu,
}: DesktopProps) {
  return (
    <div className="flex-1 flex flex-row items-start justify-start relative select-none">
      {/* App Icons - left column */}
      <div className="flex flex-col gap-10 mt-16 ml-10">
        {apps.map((app: AppData) => (
          <AppIcon
            key={app.name}
            name={app.name}
            icon={app.icon}
            onClick={() => onAppClick(app.name)}
          />
        ))}
      </div>

      {/* App Panels (Draggable) */}
      {openApps.map((name, idx) => {
        const app = apps.find((a: AppData) => a.name === name);
        if (!app) return null;
        return (
          <AppPanel
            key={name}
            name={app.name}
            icon={app.icon}
            content={app.content}
            idx={idx}
            onClose={() => onCloseApp(app.name)}
          />
        );
      })}

      {/* Linux Menu */}
      <LinuxMenu visible={linuxMenu} />
    </div>
  );
}
