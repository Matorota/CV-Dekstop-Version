import {
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";
import WorkExperiencePanel from "./WorkExperiencePanel";
import EducationPanel from "./EducationPanel";
import SkillsPanel from "./SkillsPanel";
import GithubPanel from "./GithubPanel";
import EmailPanel from "./EmailPanel";

export const apps = [
  {
    name: "Work Experience",
    icon: <FaBriefcase size={36} />,
    content: <WorkExperiencePanel />,
  },
  {
    name: "Education",
    icon: <FaGraduationCap size={36} />,
    content: <EducationPanel />,
  },
  {
    name: "Skills",
    icon: <FaStar size={36} />,
    content: <SkillsPanel />,
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
