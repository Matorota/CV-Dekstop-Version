import {
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaGithub,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import WorkExperiencePanel from "./WorkExperiencePanel";
import EducationPanel from "./EducationPanel";
import SkillsPanel from "./SkillsPanel";
import GithubPanel from "./GithubPanel";
import EmailPanel from "./EmailPanel";
import AboutMePanel from "./AboutMePanel";

export const apps = [
  {
    name: "About Me",
    icon: <FaUser size={36} />,
    content: <AboutMePanel />,
  },
  {
    name: "Work Experience",
    icon: <FaBriefcase size={36} />,
    content: <WorkExperiencePanel />,
  },
  {
    name: "Skills",
    icon: <FaStar size={36} />,
    content: <SkillsPanel />,
  },
  {
    name: "Education",
    icon: <FaGraduationCap size={36} />,
    content: <EducationPanel />,
  },
  {
    name: "Github",
    icon: <FaGithub size={36} />,
    content: <GithubPanel />,
  },
  {
    name: "Email",
    icon: <FaEnvelope size={36} />,
    content: <EmailPanel />,
  },
];
