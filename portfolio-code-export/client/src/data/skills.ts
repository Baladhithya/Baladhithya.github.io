export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  id: number;
  title: string;
  icon: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    id: 1,
    title: "Programming Languages",
    icon: "code",
    skills: [
      { name: "Python", icon: "fab fa-python" },
      { name: "Java", icon: "fab fa-java" },
      { name: "JavaScript", icon: "fab fa-js" },
      { name: "C", icon: "fas fa-code" },
      { name: "C++", icon: "fas fa-code" },
      { name: "SQL", icon: "fas fa-database" },
      { name: "MATLAB", icon: "fas fa-calculator" },
      { name: "R", icon: "fas fa-chart-bar" }
    ]
  },
  {
    id: 2,
    title: "Frameworks & Libraries",
    icon: "laptop-code",
    skills: [
      { name: "ReactJS", icon: "fab fa-react" },
      { name: "React Native", icon: "fab fa-react" },
      { name: "NextJS", icon: "fab fa-js" },
      { name: "TailwindCSS", icon: "fab fa-css3" },
      { name: "Node.js", icon: "fab fa-node-js" }
    ]
  },
  {
    id: 3,
    title: "Cloud & Infrastructure",
    icon: "cloud",
    skills: [
      { name: "AWS", icon: "fab fa-aws" },
      { name: "Docker", icon: "fab fa-docker" },
      { name: "Security Tools", icon: "fas fa-shield-alt" },
      { name: "Deployment", icon: "fas fa-server" },
      { name: "Git", icon: "fab fa-git-alt" }
    ]
  },
  {
    id: 4,
    title: "Machine Learning & Data Science",
    icon: "brain",
    skills: [
      { name: "Natural Language Processing", icon: "fas fa-language" },
      { name: "TensorFlow", icon: "fas fa-network-wired" },
      { name: "Computer Vision", icon: "fas fa-eye" },
      { name: "OpenCV", icon: "fas fa-camera" },
      { name: "MATLAB", icon: "fas fa-calculator" },
      { name: "Web Scraping", icon: "fas fa-search" }
    ]
  }
];
