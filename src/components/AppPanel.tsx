import { Rnd } from "react-rnd";
import type { ReactNode } from "react";

type AppPanelProps = {
  name: string;
  icon: ReactNode;
  content: ReactNode;
  idx: number;
  onClose: () => void;
};

export default function AppPanel({
  name,
  content,
  idx,
  onClose,
}: AppPanelProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  return (
    <Rnd
      default={{
        x: isMobile ? 0 : 300 + idx * 40,
        y: isMobile ? 0 : 100 + idx * 40,
        width: isMobile ? "100vw" : 370,
        height: isMobile ? "100vh" : "auto",
      }}
      minWidth={isMobile ? "100vw" : 300}
      minHeight={isMobile ? "100vh" : undefined}
      bounds="parent"
      dragHandleClassName="window-titlebar"
      style={{
        zIndex: 30,
        position: "absolute",
        ...(isMobile && { left: 0, top: 0 }),
      }}
      enableResizing={!isMobile}
      disableDragging={isMobile}
    >
      <div className="bg-white/90 rounded-xl shadow-2xl border-2 border-blue-300 cursor-default h-full">
        <div className="window-titlebar flex items-center justify-between px-4 py-2 bg-blue-100 rounded-t-xl border-b border-blue-300 cursor-move select-none text-base sm:text-lg">
          <span className="font-bold text-blue-900">{name}</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 font-bold text-lg"
            aria-label={`Close ${name}`}
          >
            ×
          </button>
        </div>
        <div className="p-2 sm:p-4 text-gray-700 overflow-auto h-[calc(100%-48px)]">
          {content}
        </div>
      </div>
    </Rnd>
  );
}
