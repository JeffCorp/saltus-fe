'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useProfile } from "@/services/useProfile"
import { useSkillsProgressByUserId } from "@/services/useSkillsProgress"
import { Box, Text } from "@chakra-ui/react"
import { Book, RefreshCcw, Star, Target, TrendingUp } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function Skills() {
  const { data: session } = useSession();
  const { mutate: getSkillsProgress, data: skillsProgress } = useSkillsProgressByUserId();
  const { profile, isLoading, isError } = useProfile()
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) {
      getSkillsProgress(session.user.id);
    }
  }, [session?.user?.id]);

  const masteredSkills = skillsProgress?.filter((skill) => skill.progress === 100 && skill.proficiency >= 70).length;
  const inProgressSkills = skillsProgress?.filter((skill) => skill.progress < 100);
  const skillsToLearn = skillsProgress?.filter((skill) => skill.progress === 0);

  const topSkills = skillsProgress?.filter((skill) => skill.progress > 0).sort((a, b) => b.proficiency - a.proficiency).slice(0, 5);

  console.log(topSkills);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Skills Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillsProgress?.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mastered Skills</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{masteredSkills}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills in Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressSkills?.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills to Learn</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillsToLearn?.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* <Card className="mb-8">
        <CardHeader>
          <CardTitle>Skill Growth Over Time</CardTitle>
          <CardDescription>Your skill acquisition progress</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={skillsData.skillProgressOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="skills" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Skills</CardTitle>
            <CardDescription>Your most proficient skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSkills?.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <Link href={`/dashboard/skills/workshop?skillId=${typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId._id}`}>
                      <Badge
                        style={{ cursor: 'pointer' }}
                        className="ease-in-out duration-300 hover:scale-105 hover:!bg-blue-500"
                        variant="secondary">{typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name} &nbsp;
                        <RefreshCcw className="h-4 w-4" />
                      </Badge>
                    </Link>
                    <span className="text-sm font-medium">{skill.proficiency}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills in Progress</CardTitle>
            <CardDescription>Skills you're currently improving</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {
                inProgressSkills && inProgressSkills.length > 0 ? (
                  inProgressSkills?.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name}</span>
                        <span className="text-sm font-medium">{skill.progress}%</span>
                      </div>
                      <Progress value={skill.progress} className="w-full" />
                    </div>
                  ))
                ) : (
                  <Box>
                    <Text>No skills in progress</Text>
                    {/* <Button>Start Learning a New Skill</Button> */}
                  </Box>
                )
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Skills to Acquire</CardTitle>
          <CardDescription>Based on your career goal: {profile?.careerPath}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skillsToLearn && skillsToLearn.length > 0 ? (
              skillsToLearn?.map((skill, index) => (
                typeof skill.skillModuleId === 'string' ?
                  skill.skillModuleId :
                  // skill.skillModuleId.map((subSkill) =>
                  <Badge
                    style={{ cursor: 'pointer' }}
                    onClick={() => router.push(`/dashboard/skills/workshop?skillId=${typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId._id}`)}
                    variant="secondary">{skill.skillModuleId.name}
                  </Badge>
              ))
            ) : (
              <Box>
                <Text>No skills to learn</Text>
                {/* <Button>Start Learning a New Skill</Button> */}
              </Box>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Box>
            <Link href="/dashboard/skills/workshop">
              <Button className="w-full" variant="outline">Start Learning a New Skill</Button>
            </Link>
          </Box>
        </CardFooter>
      </Card>

      {/* <Card className="mt-8">
        <CardHeader>
          <CardTitle>Skill Development Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="short-term">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="short-term">Short-term</TabsTrigger>
              <TabsTrigger value="mid-term">Mid-term</TabsTrigger>
              <TabsTrigger value="long-term">Long-term</TabsTrigger>
            </TabsList>
            <TabsContent value="short-term">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Complete Advanced React Course</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Start GraphQL Project</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Attend Node.js Workshop</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="mid-term">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Master Docker and Containerization</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Develop Fullstack Project with TypeScript</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Obtain AWS Certification</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="long-term">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Learn Microservices Architecture</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Explore Machine Learning Basics</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Contribute to Open Source Projects</span>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card> */}
    </div>
  )
}
