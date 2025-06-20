type LinuxMenuProps = {
  visible: boolean;
};

export default function LinuxMenu({ visible }: LinuxMenuProps) {
  if (!visible) return null;
  return (
    <div className="absolute left-4 bottom-24 bg-white rounded-lg shadow-xl border border-gray-300 z-50 animate-fade-in">
      <button className="block w-full text-left px-6 py-2 hover:bg-blue-100 font-semibold text-gray-700">
        Exit
      </button>
      <button className="block w-full text-left px-6 py-2 hover:bg-blue-100 font-semibold text-gray-700">
        Restart
      </button>
      <button className="block w-full text-left px-6 py-2 hover:bg-blue-100 font-semibold text-gray-700">
        Sleep
      </button>
    </div>
  );
}
