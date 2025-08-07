import {
  FaStar,
  FaCode,
  FaDatabase,
  FaTools,
  FaLock,
  FaCuttlefish,
  FaJava,
  FaPython,
  FaJs,
  FaGitAlt,
  FaBuilding,
  FaIndustry,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
} from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiTypescript,
  SiReact,
  SiVite,
  SiTailwindcss,
  SiNextdotjs,
  SiCanva,
  SiFigma,
  SiPhp,
  SiDotnet,
  SiOracle,
  SiMysql,
  SiMongodb,
  SiSqlite,
  SiSharp,
  SiCplusplus,
  SiDocker,
  SiVercel,
  SiExpress,
  SiRedux,
  SiAutodesk,
  SiAdobephotoshop,
} from "react-icons/si";

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
      {
        name: "Redux",
        icon: <SiRedux className="text-purple-600" size={22} />,
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
      {
        name: "Express.js",
        icon: <SiExpress className="text-gray-700" size={22} />,
      },
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
    name: "DevOps & Development Tools",
    icon: <FaTools className="text-gray-700" size={22} />,
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-red-600" size={22} /> },
      { name: "GitHub", icon: <FaStar className="text-black" size={22} /> },
      {
        name: "Docker",
        icon: <SiDocker className="text-blue-400" size={22} />,
      },
      { name: "Vercel", icon: <SiVercel className="text-black" size={22} /> },
    ],
  },
  {
    name: "Professional Tools",
    icon: <FaTools className="text-blue-700" size={22} />,
    skills: [
      {
        name: "Microsoft Office",
        icon: <FaFileWord className="text-blue-700" size={22} />,
      },
      {
        name: "Word",
        icon: <FaFileWord className="text-blue-700" size={22} />,
      },
      {
        name: "Excel",
        icon: <FaFileExcel className="text-green-700" size={22} />,
      },
      {
        name: "PowerPoint",
        icon: <FaFilePowerpoint className="text-orange-600" size={22} />,
      },
      {
        name: "AutoCAD",
        icon: <SiAutodesk className="text-red-500" size={22} />,
      },
      {
        name: "Photoshop",
        icon: <SiAdobephotoshop className="text-blue-800" size={22} />,
      },
    ],
  },
  {
    name: "Operations",
    icon: <FaIndustry className="text-gray-700" size={22} />,
    skills: [
      {
        name: "Machine Operation",
        icon: <FaCuttlefish className="text-gray-700" size={22} />,
      },
      {
        name: "Elevator Maintenance",
        icon: <FaCuttlefish className="text-gray-700" size={22} />,
      },
      {
        name: "Building Security",
        icon: <FaBuilding className="text-blue-900" size={22} />,
      },
      {
        name: "Patrol",
        icon: <FaLock className="text-gray-700" size={22} />,
      },
    ],
  },
];

export default skillCategories;
