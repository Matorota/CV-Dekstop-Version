import { SiSharp, SiJavascript, SiTypescript } from "react-icons/si";

const githubProjects = [
  {
    name: "Akademine_sistema",
    url: "https://github.com/Matorota/Akademine_sistema",
    lang: "C#",
    langIcon: <SiSharp className="text-green-400" size={20} />,
    langColor: "border-green-400",
    description: "University management system for academic records and users.",
    tech: "C#, WinForms, SQL Server",
  },
  {
    name: "PasswordManager",
    url: "https://github.com/Matorota/PasswordManager",
    lang: "C#",
    langIcon: <SiSharp className="text-green-400" size={20} />,
    langColor: "border-green-400",
    description: "Secure password manager desktop application.",
    tech: "C#, WinForms, Encryption",
  },
  {
    name: "ClothingStore",
    url: "https://github.com/Matorota/ClothingStore",
    lang: "JavaScript",
    langIcon: <SiJavascript className="text-yellow-300" size={20} />,
    langColor: "border-yellow-300",
    description: "Simple e-commerce web app for clothing sales.",
    tech: "JavaScript, HTML, CSS",
  },
  {
    name: "RandomStudentFinder",
    url: "https://github.com/Matorota/RandomStudentFinder",
    lang: "TypeScript",
    langIcon: <SiTypescript className="text-blue-400" size={20} />,
    langColor: "border-blue-400",
    description: "Tool for randomly selecting students from a list.",
    tech: "TypeScript, React, Vite",
  },
  {
    name: "CV-Dekstop-Version",
    url: "https://github.com/Matorota/CV-Dekstop-Version",
    lang: "TypeScript",
    langIcon: <SiTypescript className="text-cyan-400" size={20} />,
    langColor: "border-cyan-400",
    description:
      "This interactive CV desktop project (you're viewing it now!).",
    tech: "TypeScript, React, TailwindCSS",
  },
];

export default githubProjects;
