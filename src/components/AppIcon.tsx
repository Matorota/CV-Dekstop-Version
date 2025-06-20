type AppIconProps = {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export default function AppIcon({ name, icon, onClick }: AppIconProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center group focus:outline-none"
      draggable
    >
      <div className="bg-white/80 border border-gray-300 rounded-2xl shadow-lg p-5 hover:bg-blue-100 transition-all duration-200 flex flex-col items-center">
        {icon}
      </div>
      <span className="mt-3 text-sm font-semibold text-gray-700 bg-white/70 px-3 py-1 rounded-lg shadow group-hover:bg-blue-200 transition">
        {name}
      </span>
    </button>
  );
}
