import { SiSharp, SiJavascript, SiTypescript } from "react-icons/si";

const githubProjects = [
  {
    name: "Akademine_sistema",
    url: "https://github.com/Matorota/Akademine_sistema",
    icon: <SiSharp className="text-green-400" size={24} />,
    description: "University management system for academic records and users.",
    tech: "C#, WinForms, SQL Server",
  },
  {
    name: "PasswordManager",
    url: "https://github.com/Matorota/PasswordManager",
    icon: <SiSharp className="text-green-400" size={24} />,
    description: "Secure password manager desktop application.",
    tech: "C#, WinForms, Encryption",
  },
  {
    name: "ClothingStore",
    url: "https://github.com/Matorota/ClothingStore",
    icon: <SiJavascript className="text-yellow-300" size={24} />,
    description: "Simple e-commerce web app for clothing sales.",
    tech: "JavaScript, HTML, CSS",
  },
  {
    name: "RandomStudentFinder",
    url: "https://github.com/Matorota/RandomStudentFinder",
    icon: <SiTypescript className="text-blue-400" size={24} />,
    description: "Tool for randomly selecting students from a list.",
    tech: "TypeScript, React, Vite",
  },
  {
    name: "CV-Dekstop-Version",
    url: "https://github.com/Matorota/CV-Dekstop-Version",
    icon: <SiTypescript className="text-cyan-400" size={24} />,
    description:
      "This interactive CV desktop project (you're viewing it now!).",
    tech: "TypeScript, React, TailwindCSS",
  },
  {
    name: "MERN-ClothingStore",
    url: "https://github.com/Matorota/MERN-ClothingStore",
    icon: <SiTypescript className="text-blue-400" size={24} />,
    description:
      "Full-stack e-commerce clothing store built with MERN stack and TypeScript.",
    tech: "MongoDB, Express.js, React, Node.js, TypeScript",
  },
];

export default githubProjects;
