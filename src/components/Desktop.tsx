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

      <LinuxMenu visible={linuxMenu} />
    </div>
  );
}
