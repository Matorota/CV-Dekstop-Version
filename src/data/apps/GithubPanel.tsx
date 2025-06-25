import githubProjects from "./githubProjects";

export default function GithubPanel() {
  return (
    <div className="flex flex-col items-start gap-4 p-4 w-full">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-black font-bold transition text-lg">
          Visit my GitHub Profile:
        </span>
        <a
          href="https://github.com/Matorota"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 font-bold underline hover:text-blue-900 transition text-lg"
        >
          Click here!
        </a>
      </div>
      <h2 className="text-xl font-bold mb-2">Pinned Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {githubProjects.map((proj) => (
          <div
            key={proj.name}
            className={`relative group bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl p-5 flex flex-col gap-3 border-2 border-transparent hover:scale-[1.03] shadow-xl transition-all duration-200 min-w-0 hover:${proj.langColor}`}
            style={{ minWidth: 0 }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              {proj.langIcon}
              <span className={`font-bold text-blue-100 text-lg truncate`}>
                {proj.name}
              </span>
              <span
                className={`ml-2 border ${proj.langColor} bg-gray-700 text-xs px-2 py-0.5 rounded`}
              >
                {proj.lang}
              </span>
            </div>
            <div className="text-gray-300 text-xs italic">
              {proj.description}
            </div>
            <div className="text-gray-400 text-xs">
              <span className="font-semibold">Tech:</span> {proj.tech}
            </div>
            <div className="flex justify-end">
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1 rounded-lg text-xs font-bold opacity-80 hover:opacity-100 shadow transition
                  ${
                    proj.lang === "C#"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : proj.lang === "JavaScript"
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : proj.lang === "TypeScript"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-700 text-white hover:bg-blue-800"
                  }`}
                title="View on GitHub"
              >
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
      <span className="text-xs text-gray-500 mt-2">
        Click "View on GitHub" to see the project source code.
      </span>
    </div>
  );
}
