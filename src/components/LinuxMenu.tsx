import { useNavigate } from "react-router-dom";
import {
  FaPowerOff,
  FaRedo,
  FaMoon,
  FaUser,
  FaCog,
  FaTerminal,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

type LinuxMenuProps = {
  visible: boolean;
  onOpenTerminal: () => void;
  onOpenSettings: () => void;
};

export default function LinuxMenu({
  visible,
  onOpenTerminal,
  onOpenSettings,
}: LinuxMenuProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  if (!visible) return null;

  const menuItemClass = `w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
    theme === "dark"
      ? "hover:bg-gray-700 text-gray-200"
      : "hover:bg-blue-50 text-gray-700"
  } transition-colors`;

  return (
    <div
      className={`absolute left-4 bottom-16 ${
        theme === "dark"
          ? "bg-gray-800/95 border-gray-700"
          : "bg-white/95 border-gray-200"
      } rounded-lg shadow-xl border w-72 backdrop-blur-md overflow-hidden`}
    >
      {/* User Section */}
      <div
        className={`p-4 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`${
              theme === "dark" ? "bg-gray-700" : "bg-blue-100"
            } p-2 rounded-full`}
          >
            <FaUser
              className={`${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              } text-xl`}
            />
          </div>
          <div>
            <h3
              className={`font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Matas Štrimaitis
            </h3>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Local Account
            </p>
          </div>
        </div>
      </div>

      {/* Main Menu Items */}
      <div className="p-2">
        <button onClick={onOpenTerminal} className={menuItemClass}>
          <FaTerminal
            className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
          />
          <span>Terminal</span>
        </button>

        <button onClick={onOpenSettings} className={menuItemClass}>
          <FaCog
            className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
          />
          <span>Settings</span>
        </button>
      </div>

      {/* System Actions */}
      <div
        className={`border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-100"
        } p-2`}
      >
        <button onClick={() => navigate("/sleep")} className={menuItemClass}>
          <FaMoon className="text-blue-500" />
          <span>Sleep</span>
        </button>

        <button onClick={() => navigate("/restart")} className={menuItemClass}>
          <FaRedo className="text-green-500" />
          <span>Restart</span>
        </button>

        <button onClick={() => navigate("/logout")} className={menuItemClass}>
          <FaPowerOff className="text-red-500" />
          <span>Shut Down</span>
        </button>
      </div>
    </div>
  );
}
