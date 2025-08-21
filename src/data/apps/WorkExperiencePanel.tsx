import ediginoLogo from "../../assets/edigino_logo.png";
import kaunoGrudaiLogo from "../../assets/kauno_grudai_logo.png";
import { useTheme } from "../../context/ThemeContext";

export default function WorkExperiencePanel() {
  const { theme } = useTheme();

  return (
    <div
      className={`p-3 sm:p-6 w-full h-full overflow-y-auto ${
        theme === "dark" ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 border-b-2 border-blue-500 pb-2">
        Experience
      </h2>
      <div className="space-y-3 sm:space-y-6">
        <div
          className={`p-3 sm:p-4 rounded-xl transition-all duration-200 ${
            theme === "dark"
              ? "bg-gray-800/80 hover:bg-gray-800 border border-gray-700"
              : "bg-white/80 hover:bg-white border border-gray-200"
          } shadow-lg hover:shadow-xl`}
        >
          <div className="flex flex-row items-start gap-2 sm:gap-3 mb-2">
            <img
              src={ediginoLogo}
              alt="Edigino"
              className="w-8 sm:w-12 h-8 sm:h-12 rounded bg-white object-contain border flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm sm:text-base">
                Frontend Developer
              </div>
              <div className="text-xs sm:text-sm text-gray-700">Edigino</div>
              <div className="text-xs text-gray-500">
                Nov 2024 - Present · 8 mos
                <br />
                Vilniaus, Lithuania · Remote
              </div>
              <div className="mt-1 text-xs sm:text-sm">
                <span className="font-semibold">Skills:</span> Front-End
                Development · Web Development · Internet Design · Front-end
                Coding
              </div>
            </div>
          </div>
        </div>
        <div
          className={`p-3 sm:p-4 rounded-xl transition-all duration-200 ${
            theme === "dark"
              ? "bg-gray-800/80 hover:bg-gray-800 border border-gray-700"
              : "bg-white/80 hover:bg-white border border-gray-200"
          } shadow-lg hover:shadow-xl`}
        >
          <div className="flex flex-row items-start gap-2 sm:gap-3 mb-2">
            <img
              src="https://placehold.co/48x48/png"
              alt="Placeholder"
              className="w-8 sm:w-12 h-8 sm:h-12 rounded bg-gray-200 object-contain border flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm sm:text-base">
                Security Guard
              </div>
              <div className="text-xs sm:text-sm text-gray-700">
                Vilniaus Naujamiesčio mokykla · Part-time
              </div>
              <div className="text-xs text-gray-500">
                Jun 2023 - Present · 2 yrs 1 mo
                <br />
                Vilnius, Vilnius, Lithuania · On-site
              </div>
              <div className="mt-1 text-xs sm:text-sm">
                <span className="font-semibold">Skills:</span> Patrol · Building
                Security
              </div>
            </div>
          </div>
        </div>
        <div
          className={`p-3 sm:p-4 rounded-xl transition-all duration-200 ${
            theme === "dark"
              ? "bg-gray-800/80 hover:bg-gray-800 border border-gray-700"
              : "bg-white/80 hover:bg-white border border-gray-200"
          } shadow-lg hover:shadow-xl`}
        >
          <div className="flex flex-row items-start gap-2 sm:gap-3 mb-2">
            <img
              src={kaunoGrudaiLogo}
              alt="Kauno Grūdai"
              className="w-8 sm:w-12 h-8 sm:h-12 rounded bg-white object-contain border flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm sm:text-base">
                Elevator Operator
              </div>
              <div className="text-xs sm:text-sm text-gray-700">
                Kauno Grūdai · Full-time
              </div>
              <div className="text-xs text-gray-500">
                Jun 2022 - Jul 2022 · 2 mos
                <br />
                Alytus, Alytus, Lithuania · On-site
              </div>
              <div className="mt-1 text-xs sm:text-sm">
                I was working a summer job in Kauno Grūdai.
              </div>
              <div className="mt-1 text-xs sm:text-sm">
                <span className="font-semibold">Skills:</span> Machine Operation
                · Elevator Maintenance
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
