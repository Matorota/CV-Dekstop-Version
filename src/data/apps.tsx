import type { ReactNode } from "react";
import {
  FaGithub,
  FaEnvelope,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
} from "react-icons/fa";

import ediginoLogo from "../assets/edigino_logo.png";
import kaunoGrudaiLogo from "../assets/kauno_grudai_logo.png";
import vikoLogo from "../assets/viko_logo.png";

export type AppData = {
  name: string;
  icon: ReactNode;
  content: ReactNode;
};

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
    content: <div>skills</div>,
  },
  {
    name: "Github",
    icon: <FaGithub size={36} />,
    content: <div>https://github.com/Matorota</div>,
  },
  {
    name: "Email",
    icon: <FaEnvelope size={36} />,
    content: <div>matasmatasp@gmail.com</div>,
  },
];
