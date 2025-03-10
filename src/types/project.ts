export enum Difficulty {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
}

export interface Sprint {
  id: number;
  name: string;
  description: string;
}

export interface Collaborator {
  _id: string;
  name: string; // Assuming we want to display the name
}

export interface ProjectSimulation {
  _id: string;
  title: string;
  description?: string;
  industry: string;
  skills: string[];
  sprints: Sprint[];
  difficulty: Difficulty;
  duration: number;
  reportFrequency: number;
  collaborators: Collaborator[];
  selectedScenario: string;
  feedback?: string;
}

export interface DailyLog {
  date: string;
  content: string;
}
