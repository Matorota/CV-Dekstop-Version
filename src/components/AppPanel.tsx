import { Rnd } from "react-rnd";
import type { ReactNode } from "react";
import { useState } from "react";

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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const [maximized, setMaximized] = useState(isMobile);

  return (
    <Rnd
      default={{
        x: isMobile ? 0 : 300 + idx * 40,
        y: isMobile ? 0 : 100 + idx * 40,
        width: defaultWidth ?? (isMobile ? "98vw" : 320),
        height: defaultHeight ?? (isMobile ? "60vh" : "auto"),
      }}
      position={maximized ? { x: 0, y: 0 } : undefined}
      size={maximized ? { width: "100vw", height: "100vh" } : undefined}
      minWidth={isMobile ? "98vw" : 260}
      minHeight={isMobile ? "60vh" : undefined}
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
      <div className="bg-white/90 rounded-xl shadow-2xl border-2 border-blue-300 cursor-default h-full">
        <div className="window-titlebar flex items-center justify-between px-2 sm:px-4 py-2 bg-blue-100 rounded-t-xl border-b border-blue-300 cursor-move select-none text-sm sm:text-lg">
          <span className="font-bold text-blue-900 truncate">{name}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onMinimize}
              className="text-gray-500 hover:text-blue-600 text-lg px-1"
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
              className="text-gray-500 hover:text-blue-600 text-lg px-1"
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
              className="text-gray-500 hover:text-red-500 font-bold text-lg px-1"
              aria-label={`Close ${name}`}
              tabIndex={-1}
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-1 sm:p-4 text-gray-700 overflow-auto h-[calc(100%-48px)] text-xs sm:text-base">
          {content}
        </div>
      </div>
    </Rnd>
  );
}
