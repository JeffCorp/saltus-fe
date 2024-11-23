'use client'

import Skills from "@/components/dashboard/Skills"
import { Suspense } from "react"

// Mock data - In a real application, this would come from a backend API
const skillsData = {
  totalSkills: 28,
  masteredSkills: 12,
  inProgressSkills: 8,
  skillsToLearn: 8,
  careerGoal: "Senior Full Stack Developer",
  skillProgressOverTime: [
    { month: 'Jan', skills: 18 },
    { month: 'Feb', skills: 20 },
    { month: 'Mar', skills: 22 },
    { month: 'Apr', skills: 24 },
    { month: 'May', skills: 26 },
    { month: 'Jun', skills: 28 },
  ],
  topSkills: [
    { name: "JavaScript", proficiency: 90 },
    { name: "React", proficiency: 85 },
    { name: "Node.js", proficiency: 80 },
    { name: "TypeScript", proficiency: 75 },
    { name: "SQL", proficiency: 70 },
  ],
  skillsInProgress: [
    { name: "GraphQL", progress: 60 },
    { name: "Docker", progress: 40 },
    { name: "AWS", progress: 30 },
    { name: "Python", progress: 50 },
  ],
  skillsToAcquire: [
    "Kubernetes",
    "Machine Learning basics",
    "Microservices Architecture",
    "Scala",
  ],
}

export default function SkillsPage() {
  return (
    <Suspense>
      <Skills />
    </Suspense>
  )
}
