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
    title: "Best Student of the Year (2022)",
    description: "Nominated for excellence in character and achievements in multiple fields during the academic year 2022.",
    details: "Recognition for academic performance, extracurricular involvement, and community service.",
    year: "2022"
  }
];
