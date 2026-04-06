export interface Skill {
  name: string;
  icon: string;
  level: number;
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
      { name: "Python", icon: "fab fa-python", level: 5 },
      { name: "Java", icon: "fab fa-java", level: 3 },
      { name: "JavaScript", icon: "fab fa-js", level: 5 },
      { name: "C", icon: "fas fa-code", level: 4 },
      { name: "C++", icon: "fas fa-code", level: 3 },
      { name: "SQL", icon: "fas fa-database", level: 4 },
      { name: "MATLAB", icon: "fas fa-calculator", level: 4 },
      { name: "R", icon: "fas fa-chart-bar", level: 4 },
    ],
  },
  {
    id: 2,
    title: "Frameworks & Libraries",
    icon: "laptop-code",
    skills: [
      { name: "ReactJS", icon: "fab fa-react", level: 5 },
      { name: "React Native", icon: "fab fa-react", level: 4 },
      { name: "NextJS", icon: "fab fa-js", level: 4 },
      { name: "TailwindCSS", icon: "fab fa-css3", level: 5 },
      { name: "Node.js", icon: "fab fa-node-js", level: 4 },
    ],
  },
  {
    id: 3,
    title: "Cloud & Infrastructure",
    icon: "cloud",
    skills: [
      { name: "AWS", icon: "fab fa-aws", level: 3 },
      { name: "Docker", icon: "fab fa-docker", level: 3 },
      { name: "Security Tools", icon: "fas fa-shield-alt", level: 3 },
      { name: "Deployment", icon: "fas fa-server", level: 4 },
      { name: "Git", icon: "fab fa-git-alt", level: 5 },
    ],
  },
  {
    id: 4,
    title: "Machine Learning & Data Science",
    icon: "brain",
    skills: [
      {
        name: "Natural Language Processing",
        icon: "fas fa-language",
        level: 4,
      },
      { name: "TensorFlow", icon: "fas fa-network-wired", level: 4 },
      { name: "Computer Vision", icon: "fas fa-eye", level: 3 },
      { name: "OpenCV", icon: "fas fa-camera", level: 3 },
      { name: "MATLAB", icon: "fas fa-calculator", level: 4 },
      { name: "Web Scraping", icon: "fas fa-search", level: 4 },
    ],
  },
];
