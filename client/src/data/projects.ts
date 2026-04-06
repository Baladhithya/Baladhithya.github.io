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
    description:
      "Full-stack e-commerce platform with secure payments, responsive UI, and scalable backend architecture.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    date: "July 2024",
    technologies: [
      "React",
      "Tailwind CSS",
      "Python",
      "PostgreSQL",
      "Docker",
      "Razorpay",
    ],
    githubLink: "https://github.com/Baladhithya",
    demoLink: "https://github.com/Baladhithya",
  },
  {
    id: 2,
    title: "Smart Maps & Traffic Analytics",
    description:
      "Traffic analysis platform using ML and Google Maps API to visualize congestion patterns and generate insights.",
    image: "https://images.unsplash.com/photo-1548345680-f5475ea5df84",
    date: "April 2025",
    technologies: [
      "Flask",
      "SQLAlchemy",
      "Python",
      "Machine Learning",
      "Google Maps API",
    ],
    githubLink: "https://github.com/Baladhithya/SmartMaps",
    demoLink: "https://github.com/Baladhithya/SmartMaps",
  },
  {
    id: 3,
    title: "HealthPortal — Wellness Platform",
    description:
      "Full-stack healthcare portal with JWT auth, goal tracking, provider dashboards, and HIPAA-aligned security.",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c",
    date: "2025",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Docker"],
    githubLink: "https://github.com/Baladhithya/healthportal",
    demoLink: "https://healthportal-frontend.vercel.app",
  },
  {
    id: 4,
    title: "TradePulse — Strategy Backtester",
    description:
      "High-performance trading engine with event-driven backtesting, live shadow trading, and risk management.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
    date: "2025",
    technologies: ["C++", "Python", "Binance API", "Quantitative Finance"],
    githubLink: "https://github.com/Baladhithya/tradepulse--documentation",
    demoLink: "https://github.com/Baladhithya/tradepulse--documentation",
  },
  {
    id: 5,
    title: "TimeLedger — Activity Tracker",
    description:
      "Desktop productivity tracker with app monitoring, usage analytics, blocking system, and detailed reports.",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e",
    date: "2025",
    technologies: ["Python", "CustomTkinter", "System Monitoring"],
    githubLink: "https://github.com/Baladhithya/TimeLedger",
    demoLink: "https://github.com/Baladhithya/TimeLedger",
  },
  {
    id: 6,
    title: "Posture Guardian (TinyML Wearable)",
    description:
      "TinyML-based wearable device for real-time posture correction using Arduino and on-device inference.",
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232",
    date: "2025",
    technologies: ["Arduino", "TinyML", "TensorFlow Lite", "MPU6050"],
    githubLink: "https://github.com/Baladhithya/PostureGuardian",
    demoLink: "https://www.youtube.com/watch?v=8XapK43eMfQ", // YouTube link here
    paperLink:
      "https://github.com/Baladhithya/PostureGuardian/blob/main/docs/Report.pdf", // Research paper link here
  },
  {
    id: 7,
    title: "AI Healthcare Intelligence Platform",
    description:
      "Real-time healthcare intelligence system with web scraping, LLM processing, and medical data insights.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    date: "2025",
    technologies: ["Python", "Llama", "SQLite", "Web Scraping", "Ollama"],
    githubLink: "https://github.com/Baladhithya/ai-healthcare-website",
    demoLink: "https://github.com/Baladhithya/ai-healthcare-website",
  },
  {
    id: 8,
    title: "AI News Podcast Generator",
    description:
      "Automated pipeline that converts live news into AI-generated podcasts using LLM summarization and TTS.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    date: "November 2025",
    technologies: ["Python", "Gemini API", "Google TTS", "GCS", "NewsAPI"],
    githubLink: "https://github.com/Baladhithya?tab=repositories",
    demoLink: "https://ai-news-app-958345404553.asia-south1.run.app/",
  },
  {
    id: 9,
    title: "NIC Code Classifier",
    description:
      "Semantic classification system mapping legal queries to NIC codes using embeddings, Neo4j, and LLMs.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    date: "2025",
    technologies: ["Python", "FastAPI", "Neo4j", "Llama", "Groq API", "NLP"],
    githubLink: "https://github.com/Baladhithya?tab=repositories",
    demoLink: "https://github.com/Baladhithya?tab=repositories",
  },
];
