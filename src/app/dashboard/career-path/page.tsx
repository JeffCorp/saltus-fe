'use client'

<<<<<<< Updated upstream
import ViewDetailedPlan from '@/components/career-path/view-detailed-plan'
import { useProfile } from "@/services/useProfile"
import { useSkills } from "@/services/useSkills"
import { useSkillsProgressByUserId } from "@/services/useSkillsProgress"
import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Flex, Grid, Heading, List, ListIcon, ListItem, Progress, Spinner, Text, useColorModeValue } from "@chakra-ui/react"
import { Award, Book, ChevronRight, Clock, Target } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useMemo, useState } from "react"

// Mock data - In a real application, this would come from a backend API
const userData = {
  name: "Alex Johnson",
  careerPath: "Software Development",
  targetRole: "Senior Software Engineer",
  currentRole: "Junior Software Developer",
  skillsProgress: 65,
  totalTimeSpent: 120, // hours
  completedCourses: 4,
  earnedCertifications: 2,
  improvementAreas: [
    "System Design",
    "Leadership Skills",
    "Advanced Algorithms"
  ],
  nextSteps: [
    "Complete Advanced React Course",
    "Contribute to Open Source Project",
    "Prepare for System Design Interview"
  ],
  recentAchievements: [
    "Completed AWS Certification",
    "Led team project to successful deployment",
    "Improved app performance by 30%"
  ]
}

export default function CareerPathProgressPage() {
  const { data: session } = useSession();
  const { profile, isLoading: isLoadingProfile } = useProfile();
  const { data: skillsProgress, mutate: getSkillsProgress, isPending: isLoadingSkillsProgress } = useSkillsProgressByUserId();
  const { mutate: getSkills, data: skills, isPending: isLoadingSkills } = useSkills();
  const bgColor = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.800", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.200");
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("skills =>", skills);
=======
import ViewDetailedPlan from '@/components/career-path/view-detailed-plan';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetCertificatesByUserId } from "@/services/useCertificates";
import { useCreateMilestone, useGetMilestonesByCareer } from "@/services/useMilestones";
import { useProfile } from "@/services/useProfile";
import { useSkills } from "@/services/useSkills";
import { useSkillsProgressByUserId } from "@/services/useSkillsProgress";
import { Spinner } from "@chakra-ui/react";
import { Briefcase, GraduationCap, LineChart, Star, Trophy } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from "react";
import { FaGoogle, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { SiGlassdoor, SiIndeed, SiQuora, SiReddit, SiWikipedia } from 'react-icons/si';

export default function CareerPath() {
  const router = useRouter();
  const { data: session } = useSession()
  const { profile, isLoading: isLoadingProfile } = useProfile()
  const { data: skillsProgress, mutate: getSkillsProgress, isPending: isLoadingSkillsProgress } = useSkillsProgressByUserId()
  const { mutate: getSkills, data: skills, isPending: isLoadingSkills } = useSkills()
  const { data: certificates, isLoading: isLoadingCertificates } = useGetCertificatesByUserId(profile?._id)
  const { data: milestonesData, isLoading: isLoadingMilestones } = useGetMilestonesByCareer(profile?._id, profile?.projectedRole)
  const { mutate: createMilestone, isPending: isCreatingMilestones } = useCreateMilestone()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showMilestonesModal, setShowMilestonesModal] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>();
>>>>>>> Stashed changes

  useEffect(() => {
    if (profile) {
      getSkillsProgress(profile._id);
      getSkills(profile._id);
    }
  }, [profile?._id]);

  console.log(skillsProgress);

  const handleSectionClick = (section: any) => {
    router.push(section.href);
  }

  const computeSkillsProgress = useMemo(() => {
    if (!skillsProgress || skillsProgress.length === 0) return 0;
    const totalSkills = skillsProgress?.length;
    return (skillsProgress?.reduce((acc, skill) => acc + skill.progress, 0) / totalSkills);
  }, [skillsProgress]);

  const totalTimeSpent = useMemo(() => {
    if (!skillsProgress || skillsProgress.length === 0) return 0;
    return skillsProgress?.reduce((acc, skill) => acc + skill.timeSpent, 0);
  }, [skillsProgress]);

  const careerPath = profile?.careerPath || "";

<<<<<<< Updated upstream
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
=======
  const trends = [
    {
      title: "Skills Progress",
      value: `${Math.round(computeSkillsProgress)}%`,
      description: "Overall completion of required skills",
      icon: LineChart,
      color: "#FF4B4B",
      href: "/dashboard/skills"
    },
    {
      title: "Certifications",
      value: certificates?.length || 0,
      description: "Completed certifications",
      icon: Star,
      color: "#B35AF4",
      href: "/dashboard/certifications"
    }
  ]

  const handleCreateMilestones = () => {
    if (!profile?._id || !profile?.careerPath) return;

    createMilestone({
      userId: profile._id,
      careerName: profile.careerPath,
      title: "Initial Milestone",
      description: "Initial Description",
      skills: [],
      skillGrade: 0,
      status: "pending",
      isCompleted: false
    }, {
      onSuccess: () => {
        setShowMilestonesModal(false)
      }
    })
  }

  const handleMilestoneClick = (milestone: any) => {
    setSelectedMilestone(milestone);
    setIsMilestoneModalOpen(true);
  };

  if (isLoadingProfile || isLoadingSkills || isLoadingSkillsProgress || isLoadingMilestones) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner color="#8A2EFF" size="xl" />
      </div>
    )
  }

  console.log("milestones => ", milestones);
>>>>>>> Stashed changes

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" size="xl" mb={6} color={textColor}>Your Career Path Progress</Heading>

<<<<<<< Updated upstream
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {[
          {
            title: "Career Overview", content: (
              isLoadingProfile ? (
                <Spinner />
              ) : (
                <>
                  <Text><strong>Name:</strong> {profile.name}</Text>
                  <Text><strong>Current Role:</strong> {profile.currentRole || "Not Set"}</Text>
                  <Text><strong>Career Path:</strong> {profile.careerPath}</Text>
                  <Text><strong>Target Role:</strong> {profile.projectedRole}</Text>
                </>
              )
            )
          },
          {
            title: "Skills Progress", content: (
              <>
                <Progress value={computeSkillsProgress} size="lg" colorScheme="blue" bg="gray.100" />
                <Text mt={2} textAlign="center">{Math.round(computeSkillsProgress)}% Complete</Text>
              </>
            )
          },
          {
            title: "Time Investment", content: (
              <Flex align="center" justify="center">
                <Clock size={48} color="blue" />
                <Box ml={4}>
                  <Text fontSize="3xl" fontWeight="bold">{totalTimeSpent}</Text>
                  <Text fontSize="sm" color="gray.500">Total Hours Spent</Text>
                </Box>
              </Flex>
            )
          },
          {
            title: "Things to Improve", content: (
              <>
                <List spacing={2}>
                  {skillsProgress?.filter(skill => !skill.completed).filter((_, i) => i < 4).map((skill, index) => (
                    <ListItem key={index}>{typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name}</ListItem>
                  ))}
                </List>
                <Button rightIcon={<ChevronRight />} onClick={openModal} variant="outline" width="full" mt={4}>
                  View Detailed Plan
                </Button>
              </>
            )
          },
          // {
          //   title: "What's Next", content: (
          //     <>
          //       <List spacing={2}>
          //         {userData.nextSteps.map((step, index) => (
          //           <ListItem key={index} display="flex" alignItems="flex-start">
          //             <ListIcon as={TrendingUp} color="blue.500" mt={1} />
          //             <Text>{step}</Text>
          //           </ListItem>
          //         ))}
          //       </List>
          //       <Button colorScheme="blue" width="full" mt={4}>Start Next Task</Button>
          //     </>
          //   )
          // },
          {
            title: "Recent Achievements", content: (
              <List spacing={2}>
                {userData.recentAchievements.map((achievement, index) => (
                  <ListItem key={index} display="flex" alignItems="flex-start">
                    <ListIcon as={Award} color="yellow.500" mt={1} />
                    <Text>{achievement}</Text>
                  </ListItem>
                ))}
              </List>
            )
          },
        ].map((card, index) => (
          <Card key={index} bg={bgColor} color={textColor} borderColor={borderColor} borderWidth={1}>
            <CardHeader>
              <Heading size="md">{card.title}</Heading>
            </CardHeader>
            <CardBody>
              {card.content}
            </CardBody>
          </Card>
        ))}
      </Grid>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mt={8}>
        {[
          { title: "Completed Courses", icon: Book, count: userData.completedCourses, label: "Courses Finished" },
          { title: "Certifications", icon: Target, count: userData.earnedCertifications, label: "Certifications Earned" },
        ].map((card, index) => (
          <Card key={index} bg={bgColor} color={textColor} borderColor={borderColor} borderWidth={1}>
            <CardHeader>
              <Heading size="md">{card.title}</Heading>
            </CardHeader>
            <CardBody>
              <Flex align="center" justify="center">
                <card.icon size={48} color="blue" />
                <Box ml={4}>
                  <Text fontSize="3xl" fontWeight="bold">{card.count}</Text>
                  <Text fontSize="sm" color="gray.500">{card.label}</Text>
                </Box>
              </Flex>
            </CardBody>
            <CardFooter>
              <Button variant="outline" width="full">View {card.title}</Button>
            </CardFooter>
          </Card>
        ))}
      </Grid>

      <Box mt={8} bg={bgColor} color={textColor} borderColor={borderColor} borderWidth={1} p={4} borderRadius="md">
        <Heading as="h2" size="lg" mb={4}>Your Skill Set</Heading>
        <Flex flexWrap="wrap" gap={2}>
          {skills?.map((skill) => (
            <Badge key={skill.id} bg="gray.100" color="gray.800">{skill.name}</Badge>
          ))}
        </Flex>
      </Box>

      <ViewDetailedPlan
        isOpen={isModalOpen}
        onClose={closeModal}
        careerPath={careerPath}
        skillsProgress={skillsProgress || []}
      />
    </Container>
=======
        {/* Career Timeline */}
        <div className="flex flex-row flex-wrap gap-6">
          {milestones.map((milestone: any, index: number) => (
            <Card
              key={index}
              onClick={() => handleMilestoneClick(milestone)}
              className={`dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-50 transform hover:scale-105 transition-all duration-300 cursor-pointer min-w-[200px] flex-1
                ${milestone.completed ? 'border-l-4' : 'opacity-70'}`}
              style={{ borderLeftColor: milestone.completed ? milestone.color : 'transparent' }}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-xl" style={{ backgroundColor: `${milestone.color}20` }}>
                  {milestone?.icon && <milestone.icon className="w-8 h-8" style={{ color: milestone.color }} />}
                </div>
                <div>
                  <CardTitle className="text-lg font-bold dark:text-white text-black">{milestone.title}</CardTitle>
                  <p className="text-sm dark:text-gray-400 text-gray-400 line-clamp-1">{milestone.description}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {milestone.skills.filter((_: any, i: number) => i < 3).map((skill: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: milestone.color }} />
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {trends.map((trend, index) => (
            <Card
              key={index}
              onClick={() => handleSectionClick(trend)}
              className="dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-50 transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl" style={{ backgroundColor: `${trend.color}20` }}>
                    <trend.icon className="w-6 h-6" style={{ color: trend.color }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold dark:text-white text-black">{trend.title}</CardTitle>
                    <p className="text-sm dark:text-gray-400 text-gray-400">{trend.description}</p>
                  </div>
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ color: trend.color }}
                >
                  {trend.value}
                </span>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Skills Progress */}
        <Card className="dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-50">
          <CardHeader>
            <CardTitle className="text-xl font-bold dark:text-white text-black">Your Skills Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillsProgress?.filter(skill => !skill.completed).slice(0, 3).map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl dark:bg-[#222222] bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-[#8A2EFF]" />
                <span className="dark:text-gray-300 text-gray-500">
                  {typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name}
                </span>
                <div className="ml-auto text-sm dark:text-gray-400 text-gray-700">
                  {skill.progress}% Complete
                </div>
              </div>
            ))}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-4 p-3 rounded-xl bg-[#8A2EFF]/10 text-[#8A2EFF] hover:bg-[#8A2EFF]/20 transition-colors"
            >
              View Detailed Plan
            </button>
          </CardContent>
        </Card>

        <ViewDetailedPlan
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          careerPath={profile?.careerPath || ""}
          skillsProgress={skillsProgress || []}
        />
      </div>

      <Dialog open={showMilestonesModal} onOpenChange={setShowMilestonesModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Create Your Career Milestones</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400 pt-2">
              We noticed you don't have any milestones set for your career path.
              Would you like us to create personalized milestones based on your selected career as a {profile?.projectedRole}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-start">
            <Button
              onClick={handleCreateMilestones}
              disabled={isCreatingMilestones}
              className="bg-[#1CB0F6] hover:bg-[#1890d0] text-white"
            >
              {isCreatingMilestones ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Creating...
                </>
              ) : (
                "Yes, Create Milestones"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowMilestonesModal(false)}
              className="border-gray-200 dark:border-[#333333]"
            >
              Maybe Later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isMilestoneModalOpen} onOpenChange={() => {
        setIsMilestoneModalOpen(!isMilestoneModalOpen)
        setSelectedCourse(undefined)
      }}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedMilestone?.icon && (
                <div className="p-2 rounded-xl" style={{ backgroundColor: `${selectedMilestone.color}20` }}>
                  <selectedMilestone.icon className="w-6 h-6" style={{ color: selectedMilestone.color }} />
                </div>
              )}
              <span>{selectedMilestone?.title}</span>
            </DialogTitle>
            <DialogDescription className="pt-2">
              {selectedMilestone?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#8A2EFF]">Required Skills</h3>
              <div className="flex flex-row gap-4">
                <div className="space-y-2 flex-1">
                  {selectedMilestone?.skills.map((skill: string, i: number) => (
                    <div key={i}>
                      <div className={`flex items-center gap-2 text-sm cursor-pointer ${selectedCourse === skill ? 'text-white' : 'text-gray-400'}`} onClick={() => setSelectedCourse(skill)}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedMilestone.color }} />
                        {skill}
                      </div>
                    </div>
                  ))}
                </div>
                {selectedCourse && (
                  <div className="flex flex-col gap-4 flex-1 bg-gray-100 p-4 rounded-lg overflow-y-auto">
                    {/* More information about the occupation */}
                    <h3 className="text-lg font-bold capitalize">{selectedCourse}</h3>
                    <a href={`http://youtube.com/results?search_query=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2"><FaYoutube className="w-4 h-4" /> Youtube Learn more</a>
                    <a href={`https://www.google.com/search?q=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><FaGoogle className="w-4 h-4" /> Google Learn more</a>
                    <a href={`https://www.linkedin.com/search/results/learning/?keywords=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><FaLinkedin className="w-4 h-4" /> LinkedIn Learn more</a>
                    <a href={`https://www.indeed.com/jobs?q=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><SiIndeed className="w-4 h-4" /> Indeed Learn more</a>
                    <a href={`https://www.glassdoor.com/search/?q=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><SiGlassdoor className="w-4 h-4" /> Glassdoor Learn more</a>
                    <a href={`https://www.reddit.com/search?q=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><SiReddit className="w-4 h-4" /> Reddit Learn more</a>
                    <a href={`https://www.quora.com/search?q=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><SiQuora className="w-4 h-4" /> Quora Learn more</a>
                    <a href={`https://www.wikipedia.org/wiki/${selectedCourse?.split(' ').join('_')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><SiWikipedia className="w-4 h-4" /> Wikipedia Learn more</a>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#8A2EFF]">Progress</h3>
              <div className="text-sm text-gray-400">
                Required Skill Grade: {selectedMilestone?.skillGrade}%
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
>>>>>>> Stashed changes
  )
}
