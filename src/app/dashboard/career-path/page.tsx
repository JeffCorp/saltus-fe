'use client'

import { useProfile } from "@/services/useProfile"
import { useSkillsProgressByUserId } from "@/services/useSkillsProgress"
import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Flex, Grid, Heading, List, ListIcon, ListItem, Progress, Spinner, Text, useColorModeValue } from "@chakra-ui/react"
import { Award, Book, ChevronRight, Clock, Target, TrendingUp } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useMemo } from "react"

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
  const bgColor = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.800", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.200");

  // console.log(session, profile);

  useEffect(() => {
    if (profile) {
      getSkillsProgress(profile._id);
    }
  }, [profile?._id]);

  console.log(skillsProgress);

  const computeSkillsProgress = useMemo(() => {
    if (!skillsProgress || skillsProgress.length === 0) return 0;
    const totalSkills = skillsProgress?.length;
    return (skillsProgress?.reduce((acc, skill) => acc + skill.progress, 0) / totalSkills);
  }, [skillsProgress]);

  const totalTimeSpent = useMemo(() => {
    if (!skillsProgress || skillsProgress.length === 0) return 0;
    return skillsProgress?.reduce((acc, skill) => acc + skill.timeSpent, 0);
  }, [skillsProgress]);

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" size="xl" mb={6} color={textColor}>Your Career Path Progress</Heading>

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
                <Text mt={2} textAlign="center">{computeSkillsProgress}% Complete</Text>
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
                  {userData.improvementAreas.map((area, index) => (
                    <ListItem key={index}>{area}</ListItem>
                  ))}
                </List>
                <Button rightIcon={<ChevronRight />} variant="outline" width="full" mt={4}>
                  View Detailed Plan
                </Button>
              </>
            )
          },
          {
            title: "What's Next", content: (
              <>
                <List spacing={2}>
                  {userData.nextSteps.map((step, index) => (
                    <ListItem key={index} display="flex" alignItems="flex-start">
                      <ListIcon as={TrendingUp} color="blue.500" mt={1} />
                      <Text>{step}</Text>
                    </ListItem>
                  ))}
                </List>
                <Button colorScheme="blue" width="full" mt={4}>Start Next Task</Button>
              </>
            )
          },
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
          {["JavaScript", "React", "Node.js", "Git", "Agile", "RESTful APIs", "SQL", "Problem Solving"].map((skill) => (
            <Badge key={skill} bg="gray.100" color="gray.800">{skill}</Badge>
          ))}
        </Flex>
      </Box>
    </Container>
  )
}