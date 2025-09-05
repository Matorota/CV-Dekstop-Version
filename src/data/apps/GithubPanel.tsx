import githubProjects from "./githubProjects";
import { useTheme } from "../../context/ThemeContext";

export default function GithubPanel() {
  const { theme } = useTheme();

  return (
    <div
      className={`p-3 sm:p-6 w-full h-full overflow-y-auto ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-800"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className={`font-bold text-base sm:text-lg ${
            theme === "dark" ? "text-gray-100" : "text-black"
          }`}
        >
          My Personal GitHub Projects
        </span>
      </div>

      <h2
        className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${
          theme === "dark" ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Main Projects
      </h2>

      {/* Responsive grid for projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 w-full mb-4">
        {githubProjects.map((proj) => (
          <div
            key={proj.name}
            className="relative group bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 border-2 border-transparent hover:scale-[1.02] shadow-xl transition-all duration-200"
          >
            <div className="flex items-center gap-2 flex-wrap">
              {proj.icon}
              <span className="font-bold text-blue-100 text-sm sm:text-lg truncate">
                {proj.name}
              </span>
            </div>
            <div className="text-gray-300 text-xs sm:text-sm italic line-clamp-2">
              {proj.description}
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">
              <span className="font-semibold">Tech:</span> {proj.tech}
            </div>
            <div className="flex justify-end mt-auto">
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 sm:px-3 py-1 rounded-lg text-xs font-bold opacity-80 hover:opacity-100 shadow transition bg-blue-700 text-white hover:bg-blue-800"
                title="View on GitHub"
              >
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>

      <span
        className={`text-xs block mb-3 ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Click "View on GitHub" to see the project source code.
      </span>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`text-sm sm:text-lg ${
            theme === "dark" ? "text-gray-100" : "text-black"
          }`}
        >
          Link to profile:
        </span>
        <a
          href="https://github.com/Matorota"
          target="_blank"
          rel="noopener noreferrer"
          className={`underline hover:underline transition text-sm sm:text-lg ${
            theme === "dark"
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-700 hover:text-blue-900"
          }`}
        >
          Click here!
        </a>
      </div>
    </div>
  );
}
