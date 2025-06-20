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
      <div className="flex flex-row sm:flex-col gap-4 sm:gap-10 mt-4 sm:mt-16 ml-2 sm:ml-10">
        {apps.map((app: AppData) => (
          <AppIcon
            key={app.name}
            name={app.name}
            icon={app.icon}
            onClick={() => onAppClick(app.name)}
          />
        ))}
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
