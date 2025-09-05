import { useState } from "react";
import skillCategories from "./skillCategories";
import { useTheme } from "../../context/ThemeContext";

export default function SkillsPanel() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div
      className={`p-3 sm:p-6 w-full h-full overflow-y-auto ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-800"
      }`}
    >
      <h2
        className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b-2 border-blue-500 pb-2 ${
          theme === "dark" ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Professional Skills
      </h2>

      {/* Category buttons - responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
        {skillCategories.map((cat) => (
          <button
            key={cat.name}
            className={`flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border-2 font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base
              ${
                selected === cat.name
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-transparent"
                  : theme === "dark"
                  ? "bg-gray-800 border-gray-600 text-gray-200 hover:border-blue-400 hover:bg-gray-700"
                  : "bg-white/90 border-blue-200 text-blue-900 hover:border-blue-400 hover:bg-blue-50"
              }`}
            onClick={() => setSelected(selected === cat.name ? null : cat.name)}
          >
            <span className="text-lg sm:text-xl">{cat.icon}</span>
            <span className="truncate">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Skills display - responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {selected ? (
          skillCategories
            .filter((cat) => cat.name === selected)
            .map((cat) =>
              cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`group relative rounded-xl p-3 sm:p-4 shadow-lg 
                             hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                               theme === "dark"
                                 ? "bg-gray-800 border border-gray-600 hover:border-blue-400"
                                 : "bg-white/90 backdrop-blur-sm border border-blue-200 hover:border-blue-400"
                             }`}
                >
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <div
                      className={`text-xl sm:text-2xl p-2 rounded-full transition-colors ${
                        theme === "dark"
                          ? "bg-gray-700 group-hover:bg-gray-600"
                          : "bg-blue-50 group-hover:bg-blue-100"
                      }`}
                    >
                      {skill.icon}
                    </div>
                    <span
                      className={`font-semibold text-center text-sm sm:text-base ${
                        theme === "dark" ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      {skill.name}
                    </span>
                  </div>
                  <div
                    className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20"
                        : "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                    }`}
                  />
                </div>
              ))
            )
        ) : (
          <div
            className={`col-span-full text-center py-8 text-sm sm:text-base ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Select a category to view skills
          </div>
        )}
      </div>

      {/* Category description */}
      {selected && (
        <div
          className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl border ${
            theme === "dark"
              ? "bg-gray-800 border-gray-600 text-gray-100"
              : "bg-blue-50/80 border-blue-200 text-gray-600"
          }`}
        >
          <h3
            className={`font-semibold mb-2 text-sm sm:text-base ${
              theme === "dark" ? "text-blue-400" : "text-blue-900"
            }`}
          >
            {selected} Skills
          </h3>
          <p
            className={`text-xs sm:text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {selected === "Frontend" &&
              "Building responsive and interactive user interfaces."}
            {selected === "Backend" &&
              "Server-side development and API architecture."}
            {selected === "Databases" &&
              "Data storage and management solutions."}
            {selected === "DevOps & Development Tools" &&
              "Development workflow and deployment tools."}
            {selected === "Professional Tools" &&
              "Industry-standard software and productivity tools."}
            {selected === "Operations" &&
              "Practical operational and maintenance skills."}
          </p>
        </div>
      )}
    </div>
  );
}
