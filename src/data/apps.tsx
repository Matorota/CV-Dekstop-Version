import type { ReactNode } from "react";
import {
  FaGithub,
  FaEnvelope,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaDatabase,
  FaLock,
  FaPython,
  FaJava,
  FaJs,
  FaGitAlt,
  FaCuttlefish,
  FaCode,
  FaTools,
  FaUserShield,
} from "react-icons/fa";
import {
  SiMongodb,
  SiMysql,
  SiCplusplus,
  SiSharp,
  SiCss3,
  SiHtml5,
  SiPhp,
  SiTypescript,
  SiVercel,
  SiOracle,
  SiDotnet,
  SiNextdotjs,
  SiReact,
  SiVite,
  SiTailwindcss,
  SiSqlite,
  SiCanva,
  SiFigma,
  SiDocker,
  SiJavascript,
} from "react-icons/si";

import ediginoLogo from "../assets/edigino_logo.png";
import kaunoGrudaiLogo from "../assets/kauno_grudai_logo.png";
import vikoLogo from "../assets/viko_logo.png";

import { useState } from "react";

export type AppData = {
  name: string;
  icon: ReactNode;
  content: ReactNode;
};

const skillCategories = [
  {
    name: "Frontend",
    icon: <FaStar className="text-pink-600" size={22} />,
    skills: [
      {
        name: "HTML5",
        icon: <SiHtml5 className="text-orange-500" size={22} />,
      },
      { name: "CSS3", icon: <SiCss3 className="text-blue-500" size={22} /> },
      {
        name: "JavaScript",
        icon: <FaJs className="text-yellow-400" size={22} />,
      },
      {
        name: "TypeScript",
        icon: <SiTypescript className="text-blue-500" size={22} />,
      },
      { name: "React", icon: <SiReact className="text-blue-400" size={22} /> },
      { name: "Vite", icon: <SiVite className="text-violet-500" size={22} /> },
      {
        name: "TailwindCSS",
        icon: <SiTailwindcss className="text-teal-400" size={22} />,
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs className="text-black" size={22} />,
      },
      { name: "Canva", icon: <SiCanva className="text-teal-500" size={22} /> },
      {
        name: "Figma",
        icon: <SiFigma className="text-orange-400" size={22} />,
      },
    ],
  },
  {
    name: "Backend",
    icon: <FaCode className="text-blue-600" size={22} />,
    skills: [
      { name: "Java", icon: <FaJava className="text-orange-700" size={22} /> },
      { name: "C#", icon: <SiSharp className="text-green-700" size={22} /> },
      {
        name: "C++",
        icon: <SiCplusplus className="text-blue-700" size={22} />,
      },
      {
        name: "Python",
        icon: <FaPython className="text-yellow-600" size={22} />,
      },
      { name: "PHP", icon: <SiPhp className="text-indigo-400" size={22} /> },
      {
        name: ".NET",
        icon: <SiDotnet className="text-purple-700" size={22} />,
      },
      { name: "Oracle", icon: <SiOracle className="text-red-700" size={22} /> },
    ],
  },
  {
    name: "Databases",
    icon: <FaDatabase className="text-green-700" size={22} />,
    skills: [
      { name: "MySQL", icon: <SiMysql className="text-sky-700" size={22} /> },
      {
        name: "MongoDB",
        icon: <SiMongodb className="text-green-700" size={22} />,
      },
      {
        name: "SQLite",
        icon: <SiSqlite className="text-blue-400" size={22} />,
      },
      { name: "SQL", icon: <FaDatabase className="text-gray-700" size={22} /> },
    ],
  },
  {
    name: "DevOps & Tools",
    icon: <FaTools className="text-gray-700" size={22} />,
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-red-600" size={22} /> },
      { name: "GitHub", icon: <FaGithub className="text-black" size={22} /> },
      {
        name: "Docker",
        icon: <SiDocker className="text-blue-400" size={22} />,
      },
      { name: "Vercel", icon: <SiVercel className="text-black" size={22} /> },
    ],
  },
  {
    name: "Security",
    icon: <FaUserShield className="text-blue-900" size={22} />,
    skills: [
      {
        name: "Cybersecurity",
        icon: <FaLock className="text-blue-900" size={22} />,
      },
      {
        name: "Building Security",
        icon: <FaLock className="text-gray-700" size={22} />,
      },
      { name: "Patrol", icon: <FaLock className="text-gray-700" size={22} /> },
    ],
  },
  {
    name: "Operations",
    icon: <FaCuttlefish className="text-gray-700" size={22} />,
    skills: [
      {
        name: "Machine Operation",
        icon: <FaCuttlefish className="text-gray-700" size={22} />,
      },
      {
        name: "Elevator Maintenance",
        icon: <FaCuttlefish className="text-gray-700" size={22} />,
      },
    ],
  },
];

function SkillsPanel() {
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

export const apps: AppData[] = [
  {
    name: "Work Experience",
    icon: <FaBriefcase size={36} />,
    content: (
      <div className="p-2 w-full max-w-full md:max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Experience</h2>
        <div className="flex flex-col gap-4">
          {/* Edigino */}
          <div className="flex flex-row items-start gap-3 mb-2">
            <img
              src={ediginoLogo}
              alt="Edigino"
              className="w-12 h-12 rounded bg-white object-contain border flex-shrink-0"
              style={{
                minWidth: 48,
                minHeight: 48,
                maxWidth: 48,
                maxHeight: 48,
              }}
            />
            <div>
              <div className="font-semibold">Frontend Developer</div>
              <div className="text-sm text-gray-700">Edigino</div>
              <div className="text-xs text-gray-500">
                Nov 2024 - Present · 8 mos
                <br />
                Vilniaus, Lithuania · Remote
              </div>
              <div className="mt-1 text-sm">
                <span className="font-semibold">Skills:</span> Front-End
                Development · Web Development · Internet Design · Front-end
                Coding
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start gap-3 mb-2">
            <img
              src="https://placehold.co/48x48/png"
              alt="Placeholder"
              className="w-12 h-12 rounded bg-gray-200 object-contain border flex-shrink-0"
              style={{
                minWidth: 48,
                minHeight: 48,
                maxWidth: 48,
                maxHeight: 48,
              }}
            />
            <div>
              <div className="font-semibold">Security Guard</div>
              <div className="text-sm text-gray-700">
                Vilniaus Naujamiesčio mokykla · Part-time
              </div>
              <div className="text-xs text-gray-500">
                Jun 2023 - Present · 2 yrs 1 mo
                <br />
                Vilnius, Vilnius, Lithuania · On-site
              </div>
              <div className="mt-1 text-sm">
                <span className="font-semibold">Skills:</span> Patrol · Building
                Security
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start gap-3 mb-2">
            <img
              src={kaunoGrudaiLogo}
              alt="Kauno Grūdai"
              className="w-12 h-12 rounded bg-white object-contain border flex-shrink-0"
              style={{
                minWidth: 48,
                minHeight: 48,
                maxWidth: 48,
                maxHeight: 48,
              }}
            />
            <div>
              <div className="font-semibold">Elevator Operator</div>
              <div className="text-sm text-gray-700">
                Kauno Grūdai · Full-time
              </div>
              <div className="text-xs text-gray-500">
                Jun 2022 - Jul 2022 · 2 mos
                <br />
                Alytus, Alytus, Lithuania · On-site
              </div>
              <div className="mt-1 text-sm">
                I was working a summer job in Kauno Grūdai.
              </div>
              <div className="mt-1 text-sm">
                <span className="font-semibold">Skills:</span> Machine Operation
                · Elevator Maintenance
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Education",
    icon: <FaGraduationCap size={36} />,
    content: (
      <div className="p-2 w-full max-w-full md:max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Education</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-start gap-3 mb-2">
            <img
              src={vikoLogo}
              alt="VIKO"
              className="w-12 h-12 rounded bg-white object-contain border flex-shrink-0"
              style={{
                minWidth: 48,
                minHeight: 48,
                maxWidth: 48,
                maxHeight: 48,
              }}
            />
            <div>
              <div className="font-semibold">
                Vilniaus Kolegija/University of Applied Sciences
              </div>
              <div className="text-sm text-gray-700">
                Bachelor of Applied Science - BASc, Computer Software
                Engineering
              </div>
              <div className="text-xs text-gray-500">Sep 2023 - Jun 2026</div>
              <div className="mt-1 text-sm">
                Activities and societies: Software engineer focused on back-end
                systems. C#, C++ and Java with JavaScript. with databases SQL. I
                also had experience with Autocad.
              </div>
              <div className="mt-2 text-sm flex items-center gap-2 flex-wrap">
                <FaStar className="inline text-yellow-500" />
                <span className="font-semibold">
                  JavaScript, SQL, C#, C++, Java, Autocad.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Skills",
    icon: <FaStar size={36} />,
    content: <SkillsPanel />,
  },
  {
    name: "Github",
    icon: <FaGithub size={36} />,
    content: (
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
    ),
  },
  {
    name: "Email",
    icon: <FaEnvelope size={36} />,
    content: (
      <div className="flex flex-col items-start gap-2 p-4">
        <button
          className="text-blue-700 font-bold underline hover:text-blue-900 transition"
          onClick={() => {
            navigator.clipboard.writeText("matasmatasp@gmail.com");
            alert("Email copied to clipboard!");
          }}
        >
          matasmatasp@gmail.com
        </button>
        <span className="text-xs text-gray-500">Click to copy email</span>
      </div>
    ),
  },
];
