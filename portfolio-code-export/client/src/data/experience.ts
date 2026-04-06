export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  icon: string;
  responsibilities: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Software Intern",
    company: "PRAGIS",
    location: "Coimbatore, TamilNadu",
    period: "June 2024 - July 2024",
    icon: "briefcase",
    responsibilities: [
      "Developed an E-Commerce Website.",
      "Developed a full-stack web application using React, PostgreSQL and Docker to analyze GitHub data.",
      "Explored ways to visualize GitHub collaboration in a classroom setting."
    ]
  },
  {
    id: 2,
    title: "Intern and Research Assistant",
    company: "Shadders Digital Media Agency",
    location: "Coimbatore, TamilNadu",
    period: "July 2024 - August 2024",
    icon: "laptop",
    responsibilities: [
      "Collaborated with company professionals to understand the end-to-end process of app development.",
      "Gained hands-on experience in Kotlin, contributing to various mobile app development projects.",
      "Integrated and worked with multiple APIs, troubleshooting and resolving code-related issues.",
      "Assisted in diagnosing and optimizing application performance for better efficiency and user experience."
    ]
  },
  {
    id: 3,
    title: "Events Head",
    company: "Essential of Interative Design- VIT Club",
    location: "Vellore",
    period: "February 2025 - Present",
    icon: "users",
    responsibilities: [
      "Led event planning and execution, ensuring alignment with the club's vision and goals.",
      "Organized and managed events focused on HCI/UX, including workshops and competitions.",
      "Co-ordinated with teams to handle logistics, sponsorships, and marketing.",
      "Engaged with participants to foster a collaborative and creative community.",
      "Oversaw content creation and promotional strategies to maximize event reach."
    ]
  }
];
