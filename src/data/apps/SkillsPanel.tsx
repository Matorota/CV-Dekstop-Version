import { useState } from "react";
import skillCategories from "./skillCategories";

export default function SkillsPanel() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="p-4 max-w-full md:max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
        Professional Skills
      </h2>

      {/* Category buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        {skillCategories.map((cat) => (
          <button
            key={cat.name}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 font-semibold shadow-lg transition-all duration-300 transform hover:scale-105
              ${
                selected === cat.name
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-transparent"
                  : "bg-white/90 border-blue-200 text-blue-900 hover:border-blue-400 hover:bg-blue-50"
              }`}
            onClick={() => setSelected(selected === cat.name ? null : cat.name)}
          >
            <span className="text-xl">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skills display */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {selected ? (
          skillCategories
            .filter((cat) => cat.name === selected)
            .map((cat) =>
              cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group relative bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl p-4 shadow-lg 
                             hover:shadow-xl transition-all duration-300 hover:border-blue-400 hover:scale-105"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-2xl p-2 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                      {skill.icon}
                    </div>
                    <span className="font-semibold text-gray-800 text-center">
                      {skill.name}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))
            )
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            Select a category to view skills
          </div>
        )}
      </div>

      {/* Category description */}
      {selected && (
        <div className="mt-6 p-4 bg-blue-50/80 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">
            {selected} Skills
          </h3>
          <p className="text-gray-600">
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
