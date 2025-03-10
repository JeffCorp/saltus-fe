'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from '@/components/ui/textarea'
import { useGetProjectById, useUpdateProject } from '@/services/useProjects'
import { Collaborator, DailyLog, Difficulty, ProjectSimulation, Sprint } from '@/types/project'
import { Select } from '@chakra-ui/react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState<ProjectSimulation | null>({
    _id: "1",
    title: "Sustainable Urban Planning Initiative",
    description: "Develop innovative solutions for sustainable urban development, addressing challenges in transportation, energy efficiency, and green spaces.",
    industry: "Urban Planning",
    skills: ["Urban Planning", "Sustainable Development", "Transportation", "Energy Efficiency", "Green Spaces"],
    sprints: [
      { id: 1, name: "Sprint 1", description: "Define the project scope and objectives" },
      { id: 2, name: "Sprint 2", description: "Conduct market research and stakeholder analysis" },
      { id: 3, name: "Sprint 3", description: "Develop initial project plan and timeline" },
    ],
    collaborators: [
      { _id: "1", name: "Emma Green" },
      { _id: "2", name: "Liam Chen" },
      { _id: "3", name: "Sophia Patel" },
    ],
    selectedScenario: "Scenario 1",
    feedback: "Initial feedback from stakeholders",
    difficulty: Difficulty.Intermediate,
    duration: 12,
    reportFrequency: 4,
  })
  const [logs, setLogs] = useState<DailyLog[]>([
    { date: '2023-06-01', content: 'Kickoff meeting held. Team roles assigned.' },
    { date: '2023-06-02', content: 'Started research on sustainable urban planning best practices.' },
    { date: '2023-06-03', content: 'Identified key stakeholders for the project.' },
  ])
  const [newLog, setNewLog] = useState('');
  const [isStarted, setIsStarted] = useState<Boolean>(false);
  const { data: projectData, mutate: fetchProject, isPending: isProjectPending } = useGetProjectById()
  const { data: updatedProject, mutate: updateProject } = useUpdateProject({ onSuccess: () => { }, onError: () => { } });

  useEffect(() => {
    // Fetch project data
    // This is a placeholder. In a real application, you'd fetch from your API
    fetchProject(id as string);
  }, [id])

  useEffect(() => {
    setProject({
      ...projectData
    })
  }, [isProjectPending])

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    updateProject({...project, id: id as string})
    // Update project logic here
    console.log('Updating project:', project)
  }

  const handleAddLog = () => {
    if (newLog.trim()) {
      setLogs([{ date: new Date().toISOString(), content: newLog }, ...logs])
      setNewLog('')
    }
  }

  if (!project) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <Badge variant="outline" className="text-lg py-1">
          {project.industry}
        </Badge>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Project Details</TabsTrigger>
          <TabsTrigger value="sprints">Sprints</TabsTrigger>
          <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
          <TabsTrigger value="logs">Daily Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={project.description || ''}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Difficulty</label>
                    <Select>
                      {Object.values(Difficulty)?.map((diff) => (
                        <option key={diff} value={diff}>{diff}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (weeks)</label>
                    <Input
                      type="number"
                      value={project.duration}
                      onChange={(e) => setProject({ ...project, duration: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {project?.skills?.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Report Frequency (days)</label>
                  <Input
                    type="number"
                    value={project.reportFrequency}
                    onChange={(e) => setProject({ ...project, reportFrequency: parseInt(e.target.value) })}
                  />
                </div>
                <div className='w-1/3'>
                  <Button type="submit" className="group flex mt-12 items-center gap-2 relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Start Project
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sprints">
          <Card>
            <CardHeader>
              <CardTitle>Sprints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project?.sprints?.map((sprint: Sprint) => (
                  <Card key={sprint.id}>
                    <CardHeader>
                      <CardTitle>{sprint.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{sprint.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="collaborators">
          <Card>
            <CardHeader>
              <CardTitle>Collaborators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project?.collaborators?.map((collaborator: Collaborator) => (
                  <Card key={collaborator._id}>
                    <CardContent className="flex items-center justify-center h-20">
                      <span className="text-lg font-medium">{collaborator.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Daily Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 space-y-2">
                <Textarea
                  value={newLog}
                  onChange={(e) => setNewLog(e.target.value)}
                  placeholder="Enter new log..."
                  className="min-h-[100px]"
                />
                <Button onClick={handleAddLog} className="w-full">Add Log</Button>
              </div>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {logs.map((log, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="font-semibold">{new Date(log.date).toLocaleDateString()}</div>
                    <p className="mt-1">{log.content}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

