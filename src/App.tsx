import { useState, useEffect } from "react";
import Desktop from "./components/Desktop";
import Taskbar from "./components/Taskbar";

// Import your background images
import bg1 from "./assets/background1.jpg";
import bg2 from "./assets/background2.jpg";
import bg3 from "./assets/background3.jpg";

const backgrounds = [bg1, bg2, bg3];

function App() {
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [linuxMenu, setLinuxMenu] = useState(false);

  // Background slideshow state
  const [bgIndex, setBgIndex] = useState(0);

  // Clock state
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Background slideshow effect
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000); // Change every 6 seconds
    return () => clearInterval(bgInterval);
  }, []);

  const handleAppClick = (name: string) => {
    setOpenApps((prev) => (prev.includes(name) ? prev : [...prev, name]));
  };

  const handleCloseApp = (name: string) => {
    setOpenApps((prev) => prev.filter((app) => app !== name));
  };

  const handleLinuxClick = () => setLinuxMenu((prev) => !prev);

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Background images with fade transition */}
      <div className="absolute inset-0 w-full h-full z-0 bg-gray-200">
        {backgrounds.map((bg, i) => (
          <img
            key={i}
            src={bg}
            alt=""
            className={`pointer-events-none select-none object-cover object-center w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ${
              i === bgIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionProperty: "opacity" }}
          />
        ))}
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/20 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col min-h-screen">
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
    </div>
  );
}

export default App;
