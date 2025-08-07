import { useNavigate } from "react-router-dom";
import {
  FaPowerOff,
  FaRedo,
  FaMoon,
  FaUser,
  FaCog,
  FaTerminal,
} from "react-icons/fa";

type LinuxMenuProps = {
  visible: boolean;
  onOpenTerminal: () => void;
  onOpenSettings: () => void; // Add this prop
};

export default function LinuxMenu({
  visible,
  onOpenTerminal,
  onOpenSettings,
}: LinuxMenuProps) {
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <div className="absolute left-4 bottom-16 bg-white/95 rounded-lg shadow-xl border border-gray-200 w-72 backdrop-blur-md overflow-hidden">
      {/* User Section */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <FaUser className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Matas Štrimaitis</h3>
            <p className="text-sm text-gray-500">Local Account</p>
          </div>
        </div>
      </div>

      {/* Main Menu Items */}
      <div className="p-2">
        <button
          onClick={onOpenTerminal}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 transition-colors"
        >
          <FaTerminal className="text-gray-500" />
          <span>Terminal</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 transition-colors"
        >
          <FaCog className="text-gray-500" />
          <span>Settings</span>
        </button>
      </div>

      {/* System Actions */}
      <div className="border-t border-gray-100 p-2">
        <button
          onClick={() => navigate("/sleep")}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 transition-colors"
        >
          <FaMoon className="text-blue-500" />
          <span>Sleep</span>
        </button>

        <button
          onClick={() => navigate("/restart")}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 transition-colors"
        >
          <FaRedo className="text-green-500" />
          <span>Restart</span>
        </button>

        <button
          onClick={() => navigate("/logout")}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 transition-colors"
        >
          <FaPowerOff className="text-red-500" />
          <span>Shut Down</span>
        </button>
      </div>
    </div>
  );
}
