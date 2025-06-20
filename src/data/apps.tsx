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
  FaEdit,
  FaCode,
  FaTools,
  FaUserShield,
} from "react-icons/fa";
import { SiMongodb, SiMysql, SiCplusplus, SiSharp } from "react-icons/si";

import ediginoLogo from "../assets/edigino_logo.png";
import kaunoGrudaiLogo from "../assets/kauno_grudai_logo.png";
import vikoLogo from "../assets/viko_logo.png";
// import nkscLogo from "../assets/nksc_logo.png"; // Uncomment if you have this logo

import { useState } from "react";

export type AppData = {
  name: string;
  icon: ReactNode;
  content: ReactNode;
};

// Skill categories and their skills
const skillCategories = [
  {
    name: "Programming",
    icon: <FaCode className="text-blue-600" size={22} />,
    skills: [
      {
        name: "JavaScript",
        icon: <FaJs className="text-yellow-400" size={22} />,
        org: "Vilniaus Kolegija/University of Applied Sciences",
        orgLogo: vikoLogo,
      },
      {
        name: "Java",
        icon: <FaJava className="text-blue-700" size={22} />,
        org: "Vilniaus Kolegija/University of Applied Sciences",
        orgLogo: vikoLogo,
      },
      {
        name: "C#",
        icon: <SiSharp className="text-blue-700" size={22} />,
        org: "Vilniaus Kolegija/University of Applied Sciences",
        orgLogo: vikoLogo,
      },
      {
        name: "C++",
        icon: <SiCplusplus className="text-blue-700" size={22} />,
        org: "Vilniaus Kolegija/University of Applied Sciences",
        orgLogo: vikoLogo,
      },
      {
        name: "Python (Programming Language)",
        icon: <FaPython className="text-yellow-600" size={22} />,
        org: "",
        orgLogo: "",
      },
    ],
  },
  {
    name: "Web & Front-End",
    icon: <FaStar className="text-pink-600" size={22} />,
    skills: [
      {
        name: "Web Development",
        icon: <FaStar className="text-blue-500" size={22} />,
        org: "Frontend Developer at Edigino",
        orgLogo: ediginoLogo,
      },
      {
        name: "Front-End Development",
        icon: <FaStar className="text-pink-600" size={22} />,
        org: "Frontend Developer at Edigino",
        orgLogo: ediginoLogo,
      },
      {
        name: "Internet Design",
        icon: <FaStar className="text-indigo-500" size={22} />,
        org: "Frontend Developer at Edigino",
        orgLogo: ediginoLogo,
      },
      {
        name: "Front-end Coding",
        icon: <FaStar className="text-orange-500" size={22} />,
        org: "Frontend Developer at Edigino",
        orgLogo: ediginoLogo,
      },
    ],
  },
  {
    name: "Databases",
    icon: <FaDatabase className="text-green-700" size={22} />,
    skills: [
      {
        name: "MySQL",
        icon: <SiMysql className="text-sky-700" size={22} />,
        org: "Vilniaus Kolegija/University of Applied Sciences",
        orgLogo: vikoLogo,
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="text-green-700" size={22} />,
        org: "",
        orgLogo: "",
      },
      {
        name: "SQL",
        icon: <FaDatabase className="text-gray-700" size={22} />,
        org: "Vilniaus Kolegija/University of Applied Sciences",
        orgLogo: vikoLogo,
      },
    ],
  },
  {
    name: "Tools",
    icon: <FaTools className="text-gray-700" size={22} />,
    skills: [
      {
        name: "Git",
        icon: <FaGitAlt className="text-red-600" size={22} />,
        org: "",
        orgLogo: "",
      },
    ],
  },
  {
    name: "Security & Operations",
    icon: <FaUserShield className="text-blue-900" size={22} />,
    skills: [
      {
        name: "Cybersecurity",
        icon: <FaLock className="text-blue-900" size={22} />,
        org: "NKSC",
        orgLogo: "", // nkscLogo,
      },
      {
        name: "Building Security",
        icon: <FaLock className="text-gray-700" size={22} />,
        org: "Security Guard at Vilniaus Naujamiesčio mokykla",
        orgLogo: "",
      },
      {
        name: "Patrol",
        icon: <FaLock className="text-gray-700" size={22} />,
        org: "Security Guard at Vilniaus Naujamiesčio mokykla",
        orgLogo: "",
      },
      {
        name: "Machine Operation",
        icon: <FaCuttlefish className="text-gray-700" size={22} />,
        org: "Elevator Operator at Kauno Grūdai",
        orgLogo: kaunoGrudaiLogo,
      },
      {
        name: "Elevator Maintenance",
        icon: <FaCuttlefish className="text-gray-700" size={22} />,
        org: "Elevator Operator at Kauno Grūdai",
        orgLogo: kaunoGrudaiLogo,
      },
    ],
  },
];

// SkillsPanel component for category filtering
function SkillsPanel() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="p-2 max-w-xl">
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
      <div className="flex flex-col gap-4">
        {selected
          ? skillCategories
              .filter((cat) => cat.name === selected)
              .map((cat) =>
                cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg px-4 py-2 shadow hover:scale-[1.03] transition-transform"
                  >
                    <span className="text-2xl">{skill.icon}</span>
                    <div className="flex flex-col flex-1">
                      <span className="font-bold text-gray-900 text-base">
                        {skill.name}
                      </span>
                      {skill.org && (
                        <span className="flex items-center gap-2 text-xs text-gray-600">
                          {skill.orgLogo && (
                            <img
                              src={skill.orgLogo}
                              alt={skill.org}
                              className="w-5 h-5 rounded bg-white border"
                            />
                          )}
                          {skill.org}
                        </span>
                      )}
                    </div>
                    {/* Removed FaEdit icon */}
                  </div>
                ))
              )
          : null}
      </div>
    </div>
  );
}

export const apps: AppData[] = [
  {
    name: "Work Experience",
    icon: <FaBriefcase size={36} />,
    content: (
      <div className="p-2 max-w-xl">
        <h2 className="text-xl font-bold mb-4">Experience</h2>
        <div className="flex gap-3 mb-6">
          <img
            src={ediginoLogo}
            alt="Edigino"
            className="w-12 h-12 rounded bg-white object-contain border"
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
              Development · Web Development · Internet Design · Front-end Coding
            </div>
          </div>
        </div>
        <div className="flex gap-3 mb-6">
          <img
            src="https://placehold.co/48x48/png"
            alt="Placeholder"
            className="w-12 h-12 rounded bg-gray-200 object-contain border"
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
        <div className="flex gap-3 mb-2">
          <img
            src={kaunoGrudaiLogo}
            alt="Kauno Grūdai"
            className="w-12 h-12 rounded bg-white object-contain border"
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
              <span className="font-semibold">Skills:</span> Machine Operation ·
              Elevator Maintenance
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
      <div className="p-2 max-w-xl">
        <h2 className="text-xl font-bold mb-4">Education</h2>
        <div className="flex gap-3 mb-2">
          <img
            src={vikoLogo}
            alt="VIKO"
            className="w-12 h-12 rounded bg-white object-contain border"
          />
          <div>
            <div className="font-semibold">
              Vilniaus Kolegija/University of Applied Sciences
            </div>
            <div className="text-sm text-gray-700">
              Bachelor of Applied Science - BASc, Computer Software Engineering
            </div>
            <div className="text-xs text-gray-500">Sep 2023 - Jun 2026</div>
            <div className="mt-1 text-sm">
              Activities and societies: Software engineer focused on back-end
              systems. C#, C++ and Java with JavaScript. with databases SQL. I
              also had experience with Autocad.
            </div>
            <div className="mt-2 text-sm flex items-center gap-2">
              <FaStar className="inline text-yellow-500" />
              <span className="font-semibold">
                JavaScript, SQL, C#, C++, Java, Autocad.
              </span>
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
      <div className="flex flex-col items-start gap-2 p-4">
        <a
          href="https://github.com/Matorota"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 font-bold underline hover:text-blue-900 transition"
        >
          https://github.com/Matorota
        </a>
        <span className="text-xs text-gray-500">Click to open in new tab</span>
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
