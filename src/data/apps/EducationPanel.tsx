import vikoLogo from "../../assets/viko_logo.png";
import { FaStar } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

export default function EducationPanel() {
  const { theme } = useTheme();

  return (
    <div
      className={`p-3 sm:p-6 w-full h-full overflow-y-auto ${
        theme === "dark" ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 border-b-2 border-blue-500 pb-2">
        Education
      </h2>
      <div
        className={`p-3 sm:p-5 rounded-xl transition-all duration-200 ${
          theme === "dark"
            ? "bg-gray-800/90 hover:bg-gray-800 border border-gray-700"
            : "bg-white/90 hover:bg-white border border-gray-200"
        } shadow-lg hover:shadow-xl`}
      >
        <div className="flex flex-row items-start gap-2 sm:gap-3 mb-2">
          <img
            src={vikoLogo}
            alt="VIKO"
            className="w-8 sm:w-12 h-8 sm:h-12 rounded bg-white object-contain border flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-sm sm:text-base">
              Vilniaus Kolegija/University of Applied Sciences
            </div>
            <div className="text-xs sm:text-sm text-gray-700">
              Bachelor of Applied Science - BASc, Computer Software Engineering
            </div>
            <div className="text-xs text-gray-500">Sep 2023 - Jun 2026</div>
            <div className="mt-1 text-xs sm:text-sm">
              Activities and societies: Software engineer focused on back-end
              systems. C#, C++ and Java with JavaScript. with databases SQL. I
              also had experience with Autocad.
            </div>
            <div className="mt-2 text-xs sm:text-sm flex items-center gap-2 flex-wrap">
              <FaStar className="inline text-yellow-500" />
              <span className="font-semibold">
                JavaScript, SQL, C#, C++, Java, Autocad.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
