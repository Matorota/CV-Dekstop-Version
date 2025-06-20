import type { ReactNode } from "react";

type AppIconProps = {
  name: string;
  icon: ReactNode;
  onClick: () => void;
};

export default function AppIcon({ name, icon, onClick }: AppIconProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center group focus:outline-none"
      draggable
    >
      <div className="bg-white/80 border border-gray-300 rounded-2xl shadow-lg p-2 sm:p-5 hover:bg-blue-100 transition-all duration-200 flex flex-col items-center">
        <span className="text-2xl sm:text-4xl">{icon}</span>
      </div>
      <span className="mt-1 sm:mt-3 text-[10px] sm:text-sm font-semibold text-gray-700 bg-white/70 px-1 sm:px-3 py-0.5 sm:py-1 rounded-lg shadow group-hover:bg-blue-200 transition text-center">
        {name}
      </span>
    </button>
  );
}
