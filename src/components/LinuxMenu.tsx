import { useNavigate } from "react-router-dom";

type LinuxMenuProps = {
  visible: boolean;
};

export default function LinuxMenu({ visible }: LinuxMenuProps) {
  const navigate = useNavigate();

  if (!visible) return null;
  return (
    <div className="absolute left-4 bottom-24 bg-white rounded-lg shadow-xl border border-gray-300 z-50 animate-fade-in">
      <button
        className="block w-full text-left px-6 py-2 hover:bg-blue-100 font-semibold text-gray-700"
        onClick={() => navigate("/logout")}
      >
        Exit
      </button>
      <button
        className="block w-full text-left px-6 py-2 hover:bg-blue-100 font-semibold text-gray-700"
        onClick={() => navigate("/restart")}
      >
        Restart
      </button>
      <button
        className="block w-full text-left px-6 py-2 hover:bg-blue-100 font-semibold text-gray-700"
        onClick={() => navigate("/sleep")}
      >
        Sleep
      </button>
    </div>
  );
}
