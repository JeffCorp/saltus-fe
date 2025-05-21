export interface ResumeData {
  name: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
  };
  summary: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    location: string;
    dates: string;
    description: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    dates: string;
    honors?: string;
  }[];
  certifications?: string[];
}
