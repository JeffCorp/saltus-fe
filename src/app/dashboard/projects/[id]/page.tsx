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
  const [project, setProject] = useState<ProjectSimulation | null>(null)
  const [logs, setLogs] = useState<DailyLog[]>([])
  const [newLog, setNewLog] = useState('')
  const { data: projectData, mutate: fetchProject } = useGetProjectById()
  const { mutate: updateProject } = useUpdateProject({
    onSuccess: () => { },
    onError: () => { }
  })

  useEffect(() => {
    fetchProject(id as string)
  }, [id])

  useEffect(() => {
    if (projectData) {
      setProject(projectData)
    }
  }, [projectData])

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!project) return
    updateProject({
      ...project,
      id: id as string,
      reportFrequency: project.reportFrequency.toString(),
      collaborators: project.collaborators.map((collaborator: Collaborator) => collaborator._id)
    })
  }

  const handleAddLog = () => {
    if (newLog.trim()) {
      setLogs([{ date: new Date().toISOString(), content: newLog }, ...logs])
      setNewLog('')
    }
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#111111]">
        <div className="w-8 h-8 border-4 border-[#8A2EFF] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111111] py-8">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">{project.title}</h1>
          <Badge className="bg-[#1CB0F6] text-white border-none text-lg py-1">
            {project.industry}
          </Badge>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="bg-[#1A1A1A] border-[#333333]">
            <TabsTrigger value="details" className="data-[state=active]:bg-[#222222] text-white">Project Details</TabsTrigger>
            <TabsTrigger value="sprints" className="data-[state=active]:bg-[#222222] text-white">Sprints</TabsTrigger>
            <TabsTrigger value="collaborators" className="data-[state=active]:bg-[#222222] text-white">Collaborators</TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-[#222222] text-white">Daily Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProject} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => setProject({ ...project, description: e.target.value })}
                      className="min-h-[100px] bg-[#222222] border-[#444444] text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
                      <Select
                        value={project.difficulty}
                        onChange={(e) => setProject({ ...project, difficulty: e.target.value as Difficulty })}
                        className="bg-[#222222] border-[#444444] text-white"
                      >
                        {Object.values(Difficulty)?.map((diff) => (
                          <option key={diff} value={diff}>{diff}</option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Duration (weeks)</label>
                      <Input
                        type="number"
                        value={project.duration}
                        onChange={(e) => setProject({ ...project, duration: parseInt(e.target.value) })}
                        className="bg-[#222222] border-[#444444] text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {project.skills?.map((skill, index) => (
                        <Badge key={index} className="bg-[#8A2EFF] text-white border-none">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white w-full md:w-auto"
                  >
                    Update Project
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sprints">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">Sprints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.sprints?.map((sprint: Sprint) => (
                    <Card key={sprint.id} className="bg-[#222222] border-[#444444]">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">{sprint.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">{sprint.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collaborators">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">Collaborators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {project.collaborators?.map((collaborator: Collaborator) => (
                    <Card key={collaborator._id} className="bg-[#222222] border-[#444444]">
                      <CardContent className="flex items-center justify-center h-20">
                        <span className="text-lg font-medium text-white">{collaborator.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">Daily Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <Textarea
                    value={newLog}
                    onChange={(e) => setNewLog(e.target.value)}
                    placeholder="Enter new log..."
                    className="min-h-[100px] bg-[#222222] border-[#444444] text-white placeholder:text-gray-500"
                  />
                  <Button
                    onClick={handleAddLog}
                    className="w-full bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
                  >
                    Add Log
                  </Button>
                </div>
                <ScrollArea className="h-[400px] rounded-md border border-[#444444] bg-[#222222] p-4">
                  {logs.map((log, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="font-semibold text-white">
                        {new Date(log.date).toLocaleDateString()}
                      </div>
                      <p className="mt-1 text-gray-300">{log.content}</p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

