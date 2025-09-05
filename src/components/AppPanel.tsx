import { Rnd } from "react-rnd";
import type { ReactNode } from "react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

type AppPanelProps = {
  name: string;
  icon: ReactNode;
  content: ReactNode;
  idx: number;
  onClose: () => void;
  onMinimize: () => void;
  defaultWidth?: number | string;
  defaultHeight?: number | string;
};

export default function AppPanel({
  name,
  content,
  idx,
  onClose,
  onMinimize,
  defaultWidth,
  defaultHeight,
}: AppPanelProps) {
  const { theme } = useTheme();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const [maximized, setMaximized] = useState(isMobile);

  return (
    <Rnd
      default={{
        x: isMobile ? 0 : 300 + idx * 40,
        y: isMobile ? 0 : 100 + idx * 40,
        width: defaultWidth ?? (isMobile ? "95vw" : 640),
        height: defaultHeight ?? (isMobile ? "70vh" : 480),
      }}
      position={maximized ? { x: 0, y: 0 } : undefined}
      size={
        maximized ? { width: "100vw", height: "calc(100vh - 48px)" } : undefined
      }
      minWidth={isMobile ? "95vw" : 320}
      minHeight={isMobile ? "50vh" : 240}
      maxWidth="95vw"
      maxHeight="calc(100vh - 60px)"
      bounds="parent"
      dragHandleClassName="window-titlebar"
      style={{
        zIndex: 30,
        position: "absolute",
        ...(isMobile && { left: 0, top: 0 }),
      }}
      enableResizing={!isMobile && !maximized}
      disableDragging={isMobile || maximized}
    >
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-900 border-gray-600"
            : "bg-white/95 border-blue-300"
        } rounded-xl shadow-2xl border-2 cursor-default h-full flex flex-col overflow-hidden`}
      >
        <div
          className={`window-titlebar flex items-center justify-between px-2 sm:px-4 py-2 ${
            theme === "dark"
              ? "bg-gray-800 text-gray-100 border-gray-600"
              : "bg-blue-100 text-blue-900 border-blue-300"
          } rounded-t-xl border-b cursor-move select-none text-sm sm:text-lg flex-shrink-0`}
        >
          <span
            className={`font-bold truncate ${
              theme === "dark" ? "text-gray-100" : "text-blue-900"
            }`}
          >
            {name}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onMinimize}
              className={`hover:text-blue-600 text-lg px-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
              aria-label="Minimize"
              tabIndex={-1}
            >
              <svg width="18" height="18" viewBox="0 0 20 20">
                <rect
                  x="4"
                  y="14"
                  width="12"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              onClick={() => setMaximized((m) => !m)}
              className={`hover:text-blue-600 text-lg px-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
              aria-label={maximized ? "Restore" : "Maximize"}
              tabIndex={-1}
            >
              {maximized ? (
                <svg width="18" height="18" viewBox="0 0 20 20">
                  <rect
                    x="6"
                    y="6"
                    width="8"
                    height="8"
                    rx="1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 20 20">
                  <rect
                    x="3"
                    y="3"
                    width="14"
                    height="14"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={onClose}
              className={`hover:text-red-500 font-bold text-lg px-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
              aria-label={`Close ${name}`}
              tabIndex={-1}
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="w-full h-full">{content}</div>
        </div>
      </div>
    </Rnd>
  );
}
