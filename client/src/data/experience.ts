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
    location: "Coimbatore, Tamil Nadu",
    period: "June 2024 - July 2024",
    icon: "briefcase",
    responsibilities: [
      "Built an e-commerce web application with a focus on usability and performance.",
      "Developed a full-stack project using React, PostgreSQL, and Docker to analyze GitHub data.",
      "Explored and implemented data visualizations for understanding collaboration patterns.",
    ],
  },
  {
    id: 2,
    title: "Intern & Research Assistant",
    company: "Shadders Digital Media Agency",
    location: "Coimbatore, Tamil Nadu",
    period: "July 2024 - August 2024",
    icon: "laptop",
    responsibilities: [
      "Worked closely with developers to understand end-to-end mobile app development workflows.",
      "Built and contributed to Android features using Kotlin.",
      "Integrated multiple APIs and resolved real-world debugging and performance issues.",
      "Improved application efficiency and user experience through optimization.",
    ],
  },
  {
    id: 3,
    title: "AI/ML Intern",
    company: "EagleUp Technologies",
    location: "Remote",
    period: "May 2025 - June 2025",
    icon: "cpu",
    responsibilities: [
      "Built a RAG-based retrieval and chatbot system for an internal legal client.",
      "Designed document ingestion and semantic search pipelines for efficient record access.",
      "Worked with embeddings and LLMs to improve response accuracy and relevance.",
      "Collaborated on integrating the chatbot into internal workflows.",
    ],
  },
  {
    id: 4,
    title: "Software Developer Intern",
    company: "OpenQQuantify",
    location: "Vienna (Remote)",
    period: "May 2025 - November 2025",
    icon: "briefcase",
    responsibilities: [
      "Developed an AI-powered healthcare platform for drug and medical insights.",
      "Built backend services and real-time data pipelines for health analytics.",
      "Worked on system scalability, reliability, and ML module integration.",
      "Followed structured Git workflows and collaborated in a distributed team.",
    ],
  },
  {
    id: 5,
    title: "Industrial Project Intern",
    company: "IPlate by GlobalGS (VIT Vellore)",
    location: "Vellore",
    period: "October 2025 - Present",
    icon: "layers",
    responsibilities: [
      "Building a health-focused application similar to CalPal/Journable AI.",
      "Working on features related to tracking, insights, and personalized recommendations.",
      "Contributing to both frontend and backend development.",
      "Collaborating with a team to design scalable and user-friendly product features.",
    ],
  },
  {
    id: 6,
    title: "Events Head",
    company: "Essential of Interactive Design - VIT Club",
    location: "Vellore",
    period: "February 2025 - September 2025",
    icon: "users",
    responsibilities: [
      "Led planning and execution of design and HCI-focused events.",
      "Organized workshops, competitions, and community activities.",
      "Coordinated logistics, sponsorships, and promotions.",
      "Built engagement within the design and developer community.",
    ],
  },
];
