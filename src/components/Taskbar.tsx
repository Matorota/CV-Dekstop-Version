import tuxImg from "../assets/tux.png";
import { apps } from "../data/apps";

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
  onCloseApp,
  time,
}: TaskbarProps) {
  return (
    <div className="w-full h-12 bg-white border-t border-gray-300 flex items-center px-4 shadow-lg fixed bottom-0 left-0 z-40">
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
          return (
            <button
              key={app.name}
              onClick={() => onCloseApp(app.name)}
              className="flex flex-col items-center px-2 py-1 rounded-lg bg-blue-100 border-2 border-blue-300 shadow transition-all duration-200"
              style={{ minWidth: 60 }}
            >
              {app.icon}
              <span className="text-[10px] font-semibold text-gray-700">
                {app.name}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex-1" />
      <div className="text-gray-700 font-mono text-sm px-3 select-none">
        {time}
      </div>
    </div>
  );
}
