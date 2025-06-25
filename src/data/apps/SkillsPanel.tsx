import { useState } from "react";
import skillCategories from "./skillCategories";

export default function SkillsPanel() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="p-2 max-w-full md:max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Skills</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {skillCategories.map((cat) => (
          <button
            key={cat.name}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-semibold shadow transition-all
              ${
                selected === cat.name
                  ? "bg-blue-600 text-white border-blue-700 scale-105"
                  : "bg-white border-blue-200 text-blue-900 hover:bg-blue-50"
              }`}
            onClick={() => setSelected(selected === cat.name ? null : cat.name)}
          >
            <span className="text-xl">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {selected
          ? skillCategories
              .filter((cat) => cat.name === selected)
              .map((cat) =>
                cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg px-2 py-1 shadow text-xs sm:text-sm md:text-base"
                  >
                    <span className="text-xl">{skill.icon}</span>
                    <span className="font-bold text-gray-900">
                      {skill.name}
                    </span>
                  </div>
                ))
              )
          : null}
      </div>
    </div>
  );
}
