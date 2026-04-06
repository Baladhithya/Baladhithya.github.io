export interface Award {
  id: number;
  title: string;
  description: string;
  details?: string;
  year: string;
}

export const awards: Award[] = [
  {
    id: 1,
    title: "National Winners – MoSPI All-India Hackathon 2025",
    description:
      'Winners of "Hack the Future 2025" organized by the Ministry of Statistics and Programme Implementation (MoSPI), Government of India.',
    details:
      "Final solution implemented at IIT Gandhinagar and recognized for real-world impact and execution.",
    year: "2025",
  },
  {
    id: 2,
    title: "Best Intern Award",
    description:
      "Recognized as Best Intern among 17+ peers for consistent delivery, ownership, and project contributions.",
    details:
      "Awarded during internship for demonstrating strong execution, reliability, and collaboration in a professional environment.",
    year: "2025",
  },
];
