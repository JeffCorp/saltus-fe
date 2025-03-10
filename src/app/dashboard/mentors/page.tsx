'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { useCreateMentorRelationship, useGetMentorsByMenteeId } from "@/services/useMentor"
import { useProfile } from "@/services/useProfile"
import { useToast } from "@chakra-ui/react"
import { Briefcase, MessageCircle, Search, Star } from "lucide-react"
import { useState } from "react"

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expertise, setExpertise] = useState("");
  const { profile } = useProfile();
  const toast = useToast();

  const { data: mentorships, isLoading } = useGetMentorsByMenteeId(profile?._id);
  const { mutate: createMentorship } = useCreateMentorRelationship();

  const handleConnect = async (mentorId: string) => {
    try {
      await createMentorship({
        mentorId,
        menteeId: profile?._id || '',
        status: 'pending',
        focusAreas: [],
      });

      toast({
        title: "Request sent",
        description: "Your mentorship request has been sent",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send mentorship request",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const mentors = [
    {
      id: "1",
      name: "Alice Johnson",
      role: "Senior Software Engineer",
      company: "Tech Giants Inc.",
      expertise: ["React", "Node.js", "Cloud Computing"],
      rating: 4.9,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Bob Smith",
      role: "Product Manager",
      company: "Innovative Solutions Ltd.",
      expertise: ["Agile", "UX Design", "Data Analytics"],
      rating: 4.7,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Carol Williams",
      role: "Data Scientist",
      company: "AI Frontiers",
      expertise: ["Machine Learning", "Python", "Big Data"],
      rating: 4.8,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "David Brown",
      role: "UX/UI Designer",
      company: "Creative Designs Co.",
      expertise: ["User Research", "Figma", "Design Systems"],
      rating: 4.6,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Filter mentors based on search and expertise
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = !expertise || mentor.expertise.includes(expertise);
    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Your Career Mentor</h1>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search mentors..."
            className="flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={expertise} onChange={(e) => setExpertise(e.target.value)}>
            <option value="">All Expertise</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
            <option value="Machine Learning">Machine Learning</option>
          </Select>
          <Button variant="outline" className="flex items-center justify-center">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMentors.map((mentor, index) => {
          const hasPendingRequest = mentorships?.some(
            (m: any) => m.mentorId === mentor.id && m.status === 'pending'
          );
          const isActiveMentor = mentorships?.some(
            (m: any) => m.mentorId === mentor.id && m.status === 'active'
          );

          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{mentor.name}</CardTitle>
                    <p className="text-sm text-gray-500">{mentor.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Briefcase className="mr-2 h-4 w-4" />
                    {mentor.company}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="mr-2 h-4 w-4 text-yellow-400" />
                    {mentor.rating} / 5.0
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <Button
                  className="w-full flex items-center justify-center"
                  variant="outline"
                  disabled={hasPendingRequest || isActiveMentor}
                  onClick={() => handleConnect(mentor.id || '')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {isActiveMentor ? 'Active Mentor' :
                    hasPendingRequest ? 'Request Pending' : 'Connect'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  )
}