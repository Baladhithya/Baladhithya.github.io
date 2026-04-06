export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  technologies: string[];
  githubLink: string;
  demoLink?: string;
  paperLink?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Aurora",
    description: "A full-stack e-commerce platform with secure payments and responsive design.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    date: "July 2024",
    technologies: ["HTML", "React", "Tailwind CSS", "Python", "Docker", "Razorpay"],
    githubLink: "https://github.com",
    demoLink: "https://github.com"
  },
  {
    id: 2,
    title: "GitHub Analytics",
    description: "A visualization tool for analyzing GitHub collaboration patterns in educational settings.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    date: "June 2024",
    technologies: ["React", "PostgreSQL", "Docker", "Data Visualization", "GitHub API"],
    githubLink: "https://github.com",
    demoLink: "https://github.com"
  },
  {
    id: 3,
    title: "ML Vision System",
    description: "Computer vision application for object detection and classification using deep learning.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    date: "May 2024",
    technologies: ["Python", "TensorFlow", "OpenCV", "Computer Vision", "Deep Learning"],
    githubLink: "https://github.com",
    paperLink: "https://github.com"
  }
];
