import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  FaUser,
  FaHeart,
  FaGamepad,
  FaCode,
  FaMusic,
  FaCamera,
} from "react-icons/fa";

export default function AboutMePanel() {
  const { theme } = useTheme();
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);

  const personalityTraits = [
    {
      icon: <FaCode className="text-blue-500" />,
      title: "Problem Solver",
      description:
        "I enjoy tackling complex challenges and finding efficient solutions through code.",
    },
    {
      icon: <FaHeart className="text-red-500" />,
      title: "Team Player",
      description:
        "Collaborative mindset with strong communication skills and empathy for others.",
    },
    {
      icon: <FaUser className="text-green-500" />,
      title: "Self-Motivated",
      description:
        "Proactive learner who takes initiative and drives projects forward independently.",
    },
    {
      icon: <FaGamepad className="text-purple-500" />,
      title: "Creative Thinker",
      description:
        "Innovative approach to development with attention to user experience and design.",
    },
  ];

  const hobbies = [
    { icon: <FaMusic className="text-orange-500" />, name: "Music Production" },
    { icon: <FaGamepad className="text-blue-500" />, name: "Gaming" },
    { icon: <FaCamera className="text-green-500" />, name: "Photography" },
    { icon: <FaCode className="text-purple-500" />, name: "Side Projects" },
  ];

  const galleryImages = [
    {
      src: "/placeholder-workspace.jpg",
      alt: "My Workspace",
      description: "My development setup",
    },
    {
      src: "/placeholder-project.jpg",
      alt: "Project Demo",
      description: "Working on latest project",
    },
    {
      src: "/placeholder-team.jpg",
      alt: "Team Photo",
      description: "With my development team",
    },
    {
      src: "/placeholder-hobby.jpg",
      alt: "Hobby",
      description: "In my free time",
    },
  ];

  return (
    <div
      className={`p-3 sm:p-6 w-full h-full overflow-y-auto ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-800"
      }`}
    >
      <h2
        className={`text-lg sm:text-2xl font-bold mb-4 sm:mb-6 border-b-2 border-blue-500 pb-2 ${
          theme === "dark" ? "text-gray-100" : "text-gray-800"
        }`}
      >
        About Me
      </h2>

      {/* Personal Introduction - responsive */}
      <div
        className={`mb-4 sm:mb-8 p-3 sm:p-6 rounded-xl ${
          theme === "dark"
            ? "bg-gray-800 text-gray-100"
            : "bg-blue-50/80 text-gray-800"
        } border ${theme === "dark" ? "border-gray-700" : "border-blue-200"}`}
      >
        <h3
          className={`text-base sm:text-xl font-semibold mb-2 sm:mb-4 ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Hello! I'm Matas
        </h3>
        <p
          className={`text-sm sm:text-lg leading-relaxed mb-2 sm:mb-4 ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}
        >
          I'm a passionate Frontend Developer from Lithuania with a strong
          foundation in modern web technologies. Currently pursuing my
          Bachelor's degree in Computer Software Engineering while gaining
          real-world experience at Edigino. I believe in writing clean,
          efficient code and creating user experiences that make a difference.
        </p>
        <p
          className={`text-xs sm:text-base leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Beyond coding, I enjoy exploring new technologies, contributing to
          open-source projects, and constantly learning to stay ahead in this
          ever-evolving field. I'm particularly interested in React ecosystem,
          TypeScript, and modern development practices.
        </p>
      </div>

      {/* Personality Traits - responsive grid */}
      <div className="mb-4 sm:mb-8">
        <h3
          className={`text-base sm:text-xl font-semibold mb-2 sm:mb-4 ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          What Makes Me Tick
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
          {personalityTraits.map((trait, index) => (
            <div
              key={index}
              className={`p-2 sm:p-4 rounded-lg transition-all duration-200 ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-100"
                  : "bg-white/80 hover:bg-white border border-gray-200 text-gray-800"
              } shadow-md hover:shadow-lg`}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                {trait.icon}
                <h4
                  className={`font-semibold text-xs sm:text-base ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {trait.title}
                </h4>
              </div>
              <p
                className={`text-xs sm:text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {trait.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hobbies & Interests - responsive */}
      <div className="mb-4 sm:mb-8">
        <h3
          className={`text-base sm:text-xl font-semibold mb-2 sm:mb-4 ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          When I'm Not Coding
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full ${
                theme === "dark"
                  ? "bg-gray-800 border border-gray-700 text-gray-100"
                  : "bg-white border border-gray-200 text-gray-800"
              } shadow-md`}
            >
              <span className="text-sm sm:text-base">{hobby.icon}</span>
              <span className="font-medium text-xs sm:text-sm">
                {hobby.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 sm:mb-8">
        <h3
          className={`text-base sm:text-xl font-semibold mb-2 sm:mb-4 ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Gallery
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveGalleryImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                activeGalleryImage === index
                  ? "ring-2 ring-blue-500 scale-105"
                  : "hover:scale-105"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Active Image Display - responsive */}
        <div
          className={`p-2 sm:p-4 rounded-lg ${
            theme === "dark"
              ? "bg-gray-800 text-gray-100"
              : "bg-gray-50 text-gray-800"
          } border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
        >
          <div
            className={`aspect-video rounded-lg ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            } flex items-center justify-center mb-2 sm:mb-3`}
          >
            <FaCamera
              className={`text-4xl sm:text-6xl ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            />
          </div>
          <h4
            className={`font-semibold mb-1 text-sm sm:text-base ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {galleryImages[activeGalleryImage].alt}
          </h4>
          <p
            className={`text-xs sm:text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {galleryImages[activeGalleryImage].description}
          </p>
        </div>
      </div>

      {/* Why Hire Me - responsive */}
      <div
        className={`p-3 sm:p-6 rounded-xl ${
          theme === "dark"
            ? "bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 text-gray-100"
            : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-gray-800"
        }`}
      >
        <h3
          className={`text-base sm:text-xl font-semibold mb-2 sm:mb-4 ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Why Choose Me?
        </h3>
        <ul className="space-y-1 sm:space-y-2">
          {[
            "Strong technical foundation with hands-on experience in modern frameworks",
            "Excellent problem-solving skills and attention to detail",
            "Great communication skills and collaborative mindset",
            "Passionate about learning and staying current with technology trends",
            "Reliable, self-motivated, and committed to delivering quality work",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-green-500 mt-1 text-xs sm:text-sm">✓</span>
              <span
                className={`text-xs sm:text-sm ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
