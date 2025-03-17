"use client"

import { FindMentorModal } from "@/components/dashboard/find-mentor-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCreateMentorRelationship, useGetMentees, useGetMentors, useUpdateMentorshipStatus } from "@/services/useMentor"
import { useProfile } from "@/services/useProfile"
import { Spinner, useToast } from "@chakra-ui/react"
import { Award, BookOpen, Calendar, MessageSquare, Star, Users } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expertise, setExpertise] = useState("");
  const [showFindMentorModal, setShowFindMentorModal] = useState(false);
  const { profile } = useProfile();
  const toast = useToast();
  const { data: session } = useSession();

  // Dummy data for mentors
  const dummyMentors = [
    {
      _id: "1",
      mentorId: {
        name: "John Doe",
        currentRole: "Senior Software Engineer",
        expertise: ["React", "Node.js"]
      },
      status: "active"
    },
    {
      _id: "2",
      mentorId: {
        name: "Jane Smith",
        currentRole: "Product Manager",
        expertise: ["Product Strategy", "Agile"]
      },
      status: "pending"
    },
    {
      _id: "3",
      mentorId: {
        name: "Mike Johnson",
        currentRole: "Tech Lead",
        expertise: ["System Design", "Leadership"]
      },
      status: "active"
    }
  ];

  // Replace the useGetMentorsByMenteeId hook result with dummy data
  const { data: mentorships, isLoading: isLoadingMentorships } = {
    data: dummyMentors,
    isLoading: false
  };
  const { mutate: createMentorship } = useCreateMentorRelationship({
    onSuccess: () => {
      toast({
        title: "Request sent",
        description: "Your mentorship request has been sent",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send mentorship request",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });
  const { data: mentees, isLoading: isLoadingMentors } = useGetMentees();
  const { data: mentors, isLoading: isLoadingMentees } = useGetMentors();
  const { mutate: updateMentorshipStatus } = useUpdateMentorshipStatus();

  console.log("mentees ===>", mentees)

  if (isLoadingMentorships || isLoadingMentors || isLoadingMentees) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner color="#8A2EFF" size="xl" />
      </div>
    );
  }

  const handleConnect = async (mentorId: string) => {
    try {
      createMentorship({
        mentorId,
        menteeId: profile?._id || '',
        status: 'pending',
        focusAreas: [],
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

  const stats = [
    {
      title: "Active Mentors",
      value: mentors?.filter((m: any) => m.status === 'active').length || 0,
      icon: Users,
      color: "#58CC02"
    },
    {
      title: "Active Mentees",
      value: mentees?.filter((m: any) => m.status === 'active').length || 0,
      icon: Star,
      color: "#1CB0F6"
    },
    {
      title: "Sessions Completed",
      value: "0",
      icon: Calendar,
      color: "#8A2EFF"
    }
  ];

  // Filter mentors based on search and expertise
  const filteredMentors = mentors.filter((mentor: any) => {
    const matchesSearch = mentor.mentorId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.mentorId.currentRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = !expertise || mentor.mentorId.expertise.includes(expertise);
    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="container p-6 mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#333333]">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
          Mentorship Hub
        </h1>
        <p className="mt-2 text-gray-400">
          Connect, learn, and grow with industry professionals
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-[#1A1A1A] border-[#333333] transform hover:scale-105 transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl" style={{ backgroundColor: `${stat.color}20` }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-white">{stat.title}</CardTitle>
                </div>
              </div>
              <span className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </span>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Active Mentors */}
      <Card className="bg-[#1A1A1A] border-[#333333]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-white">Your Mentors</CardTitle>
          <Button
            className="bg-[#8A2EFF] hover:bg-[#7325D4]"
            onClick={() => setShowFindMentorModal(true)}
          >
            Find Mentor
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {mentors?.filter((mentor: any) => mentor.status === 'active').map((mentor: any, index: any) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] transition-colors"
            >
              <div className="p-2 rounded-xl bg-[#58CC02]/20">
                <Award className="w-6 h-6 text-[#58CC02]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{mentor.mentorId.name}</h3>
                <p className="text-sm text-gray-400">{mentor.mentorId.currentRole}</p>
              </div>
              <Button variant="outline" className="border-[#8A2EFF] text-[#8A2EFF] hover:bg-[#8A2EFF]/10">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Your Mentees */}
      <Card className="bg-[#1A1A1A] border-[#333333]">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Your Mentees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mentees?.filter((mentee: any) => mentee.status === 'active').map((mentee: any, index: any) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] transition-colors"
            >
              <div className="p-2 rounded-xl bg-[#1CB0F6]/20">
                <BookOpen className="w-6 h-6 text-[#1CB0F6]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{mentee.menteeId.name}</h3>
                <p className="text-sm text-gray-400">{mentee.menteeId.currentRole}</p>
              </div>
              <Button variant="outline" className="border-[#8A2EFF] text-[#8A2EFF] hover:bg-[#8A2EFF]/10">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pending Requests */}
      {(mentors?.some((m: any) => m.status === 'pending') || mentees?.some((m: any) => m.status === 'pending')) && (
        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ...mentors?.filter((m: any) => m.status === 'pending').map((m: any) => ({ ...m, type: 'mentor' })) || [],
              ...mentees?.filter((m: any) => m.status === 'pending').map((m: any) => ({ ...m, type: 'mentee' })) || []
            ].map((request, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] transition-colors"
              >
                <div className="p-2 rounded-xl bg-[#FF9600]/20">
                  <Users className="w-6 h-6 text-[#FF9600]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">
                    {request.type === 'mentor' ? request.mentorId.name : request.menteeId.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {request.type === 'mentor' ? 'Mentor Request' : 'Mentee Request'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-[#58CC02] hover:bg-[#4CAD02]" onClick={() => updateMentorshipStatus({ id: request._id, status: 'active' })}>Accept</Button>
                  <Button variant="outline" className="border-[#FF4B4B] text-[#FF4B4B] hover:bg-[#FF4B4B]/10" onClick={() => updateMentorshipStatus({ id: request._id, status: 'rejected' })}>
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <FindMentorModal
        isOpen={showFindMentorModal}
        onClose={() => setShowFindMentorModal(false)}
        onRequestMentorship={handleConnect}
      />
    </div>
  )
}