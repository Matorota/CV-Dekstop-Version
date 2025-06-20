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
  icon,
  content,
  idx,
  onClose,
}: AppPanelProps) {
  return (
    <Rnd
      default={{
        x: 300 + idx * 40,
        y: 100 + idx * 40,
        width: 370,
        height: "auto",
      }}
      minWidth={300}
      bounds="parent"
      dragHandleClassName="window-titlebar"
      style={{ zIndex: 30, position: "absolute" }}
      enableResizing={false}
    >
      <div className="bg-white/90 rounded-xl shadow-2xl border-2 border-blue-300 cursor-default">
        <div className="window-titlebar flex items-center justify-between px-4 py-2 bg-blue-100 rounded-t-xl border-b border-blue-300 cursor-move select-none">
          <span className="font-bold text-blue-900">{name}</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 font-bold text-lg"
            aria-label={`Close ${name}`}
          >
            ×
          </button>
        </div>
        <div className="p-4 text-gray-700">{content}</div>
      </div>
    </Rnd>
  );
}
