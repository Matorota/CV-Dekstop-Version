import githubProjects from "./githubProjects";

export default function GithubPanel() {
  return (
    <div className="flex flex-col items-start gap-4 p-4 w-full min-h-[70vh] sm:min-h-[60vh]">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-black font-bold transition text-lg">
          My Personal GitHub Projects
        </span>
      </div>

      <h2 className="text-xl font-bold mb-2">Main Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {githubProjects.map((proj) => (
          <div
            key={proj.name}
            className="relative group bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl p-4 sm:p-6 flex flex-col gap-3 border-2 border-transparent hover:scale-[1.03] shadow-xl transition-all duration-200 min-w-0"
            style={{
              minWidth: 0,
              width: "100%",
              maxWidth: "100%",
              ...(window.innerWidth < 640
                ? { minHeight: 120 }
                : { minHeight: 180 }),
            }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              {proj.icon}
              <span className="font-bold text-blue-100 text-lg truncate">
                {proj.name}
              </span>
            </div>
            <div className="text-gray-300 text-xs sm:text-sm italic">
              {proj.description}
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">
              <span className="font-semibold">Tech:</span> {proj.tech}
            </div>
            <div className="flex justify-end">
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg text-xs font-bold opacity-80 hover:opacity-100 shadow transition bg-blue-700 text-white hover:bg-blue-800"
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
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-black  transition text-lg">Link to profile:</span>
        <a
          href="https://github.com/Matorota"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700  underline hover:text-blue-900 transition text-lg"
        >
          Click here!
        </a>
      </div>
    </div>
  );
}
