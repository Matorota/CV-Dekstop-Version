import type { ReactNode } from "react";
import {
  FaGithub,
  FaEnvelope,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
} from "react-icons/fa";

export type AppData = {
  name: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

export const apps: AppData[] = [
  {
    name: "Work Experience",
    icon: <FaBriefcase size={36} />,
    content: <div>Your work experience goes here.</div>,
  },
  {
    name: "Education",
    icon: <FaGraduationCap size={36} />,
    content: <div>Your education details go here.</div>,
  },
  {
    name: "Skills",
    icon: <FaStar size={36} />,
    content: <div>Your skills go here.</div>,
  },
  {
    name: "Github",
    icon: <FaGithub size={36} />,
    content: <div>Your Github info goes here.</div>,
  },
  {
    name: "Email",
    icon: <FaEnvelope size={36} />,
    content: <div>Your email/contact info goes here.</div>,
  },
];
