import { useState, useEffect } from "react";
import Desktop from "./components/Desktop";
import Taskbar from "./components/Taskbar";
function App() {
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [linuxMenu, setLinuxMenu] = useState(false);

  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAppClick = (name: string) => {
    setOpenApps((prev) => (prev.includes(name) ? prev : [...prev, name]));
  };

  const handleCloseApp = (name: string) => {
    setOpenApps((prev) => prev.filter((app) => app !== name));
  };

  const handleLinuxClick = () => setLinuxMenu((prev) => !prev);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-pink-200 to-purple-200 flex flex-col">
      {/* Top Bar */}
      <div className="w-full h-10 bg-white/80 border-b border-gray-300 flex items-center px-4 font-bold text-gray-700 rounded-t-lg shadow-sm">
        Welcome to Matas CV desktop!
      </div>

      {/* Desktop Area */}
      <Desktop
        openApps={openApps}
        onAppClick={handleAppClick}
        onCloseApp={handleCloseApp}
        linuxMenu={linuxMenu}
      />

      {/* Taskbar */}
      <Taskbar
        openApps={openApps}
        onLinuxClick={handleLinuxClick}
        linuxMenu={linuxMenu}
        onCloseApp={handleCloseApp}
        time={time}
      />
    </div>
  );
}

export default App;
