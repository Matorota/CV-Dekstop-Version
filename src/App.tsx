import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Desktop from "./components/Desktop";
import Taskbar from "./components/Taskbar";
import LogOut from "./pages/LogOut";
import Restart from "./pages/Restart";
import Sleep from "./pages/Sleep";

import bg1 from "./assets/background1.jpg";
import bg2 from "./assets/background2.jpg";
import bg3 from "./assets/background3.jpg";
import TestingBackend from "./components/backendEnpoints/TestingBackend";

<TestingBackend />;
const backgrounds = [bg1, bg2, bg3];

function MainDesktop() {
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [linuxMenu, setLinuxMenu] = useState(false);

  const [bgIndex, setBgIndex] = useState(0);

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

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000);
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

      <div className="absolute inset-0 bg-white/20 z-10" />

      <div className="relative z-20 flex flex-col min-h-screen">
        <div className="w-full h-10 sm:h-10 bg-white border-b border-gray-300 flex items-center px-2 sm:px-4 font-bold text-gray-700 shadow-sm text-base sm:text-lg">
          Welcome to Matas CV desktop!
        </div>

        <Desktop
          openApps={openApps}
          onAppClick={handleAppClick}
          onCloseApp={handleCloseApp}
          linuxMenu={linuxMenu}
        />

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainDesktop />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/restart" element={<Restart />} />
        <Route path="/sleep" element={<Sleep />} />
      </Routes>
    </BrowserRouter>
  );
}
