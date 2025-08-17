import { useState } from "react";
import { FaSearch, FaArrowLeft, FaArrowRight, FaRedo } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

export default function GooglePanel() {
  const { theme } = useTheme();
  const [url, setUrl] = useState("https://www.google.com");
  const [history, setHistory] = useState<string[]>(["https://www.google.com"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigate = (newUrl: string) => {
    const processedUrl = newUrl.startsWith("http")
      ? newUrl
      : `https://${newUrl}`;
    setUrl(processedUrl);
    setHistory((prev) => [...prev.slice(0, currentIndex + 1), processedUrl]);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div
      className={`w-full h-full flex flex-col ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-white text-gray-800"
      }`}
    >
      {/* Navigation Bar */}
      <div
        className={`flex items-center gap-2 p-2 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <button
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex((prev) => prev - 1);
              setUrl(history[currentIndex - 1]);
            }
          }}
          className={`p-2 rounded ${
            currentIndex === 0 ? "opacity-50" : "hover:bg-gray-100"
          }`}
          disabled={currentIndex === 0}
        >
          <FaArrowLeft size={14} />
        </button>

        <button
          onClick={() => {
            if (currentIndex < history.length - 1) {
              setCurrentIndex((prev) => prev + 1);
              setUrl(history[currentIndex + 1]);
            }
          }}
          className={`p-2 rounded ${
            currentIndex === history.length - 1
              ? "opacity-50"
              : "hover:bg-gray-100"
          }`}
          disabled={currentIndex === history.length - 1}
        >
          <FaArrowRight size={14} />
        </button>

        <button
          onClick={() => {
            setUrl(history[currentIndex]);
          }}
          className="p-2 rounded hover:bg-gray-100"
        >
          <FaRedo size={14} />
        </button>

        <div
          className={`flex-1 flex items-center gap-2 px-3 py-1 rounded-lg ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <FaSearch className="text-gray-400" size={14} />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNavigate(url);
              }
            }}
            className={`flex-1 bg-transparent outline-none text-sm ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          />
        </div>
      </div>

      {/* Web Content */}
      <div className="flex-1">
        <iframe
          src={url}
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          title="Web Browser"
        />
      </div>
    </div>
  );
}
