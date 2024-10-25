'use client'

import NewConnections from "@/components/connections/newConnections"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ConnectionStatus, useGetConnections } from "@/services/useConnections"
import { Box, Flex, Link, Spinner, Text } from "@chakra-ui/react"
import { Search, UserPlus, Users } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

// Mock data (unchanged)
const networkData = {
  totalConnections: 287,
  newConnectionRequests: 5,
  mentors: 3,
  mentees: 2,
  upcomingEvents: 2,
  recentMessages: 8,
  topConnections: [
    { name: "Sarah Lee", role: "Product Manager", company: "Tech Innovators", image: "/placeholder.svg?height=40&width=40" },
    { name: "John Doe", role: "Senior Developer", company: "CodeCraft Solutions", image: "/placeholder.svg?height=40&width=40" },
    { name: "Emily Chen", role: "UX Designer", company: "DesignHub", image: "/placeholder.svg?height=40&width=40" },
  ],
  recommendedConnections: [
    { name: "Michael Brown", role: "Data Scientist", company: "AI Frontiers", image: "/placeholder.svg?height=40&width=40" },
    { name: "Lisa Wang", role: "Marketing Director", company: "Growth Gurus", image: "/placeholder.svg?height=40&width=40" },
  ],
}

const recentPosts = [
  {
    authorName: "Jane Smith",
    authorImage: "/placeholder.svg?height=40&width=40",
    timeAgo: "2h ago",
    content: "Excited to share my latest project on AI advancements!",
  },
  {
    authorName: "Alex Johnson",
    authorImage: "/placeholder.svg?height=40&width=40",
    timeAgo: "1d ago",
    content: "Looking forward to the upcoming tech conference in New York.",
  },
]

export default function NetworkPage() {
  const { data: session } = useSession();
  const { data: connections, isPending, mutate: getConnections } = useGetConnections();
  console.log(session);

  useEffect(() => {
    getConnections();
  }, []);

  return (
    isPending ? <Spinner /> :
      connections && connections.filter((connection: any) => connection.status === ConnectionStatus.APPROVED).length > 0 ? (
        <div className="bg-white min-h-[100vh]">
          <div className="container mx-auto py-6 px-4">
            <Flex className="gap-6">
              {/* Left Column */}
              <div className="space-y-6 flex-1">
                {/* Network Overview */}
                <Card className="">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md font-semibold">Network Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Users className="w-6 h-6 mr-2 text-blue-600" />
                        <Flex gap={1}>
                          <Text className="text-sm font-bold">{networkData.totalConnections}</Text>
                          <Text className="text-sm text-gray-600">Total Connections</Text>
                        </Flex>
                      </div>
                      {/* <Badge variant="secondary" className="text-xs">{networkData.newConnectionRequests} New</Badge> */}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mentors:</span>
                        <span className="font-semibold">{networkData.mentors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mentees:</span>
                        <span className="font-semibold">{networkData.mentees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Upcoming Events:</span>
                        <span className="font-semibold">{networkData.upcomingEvents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recent Messages:</span>
                        <span className="font-semibold">{networkData.recentMessages}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Connections */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md font-semibold">Top Connections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {networkData.topConnections.map((connection, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={connection.image} alt={connection.name} />
                            <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <Text className="font-semibold text-sm">{connection.name}</Text>
                            <Text className="text-sm text-gray-600">{connection.role} at {connection.company}</Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Center Column */}
              <div className="space-y-6 flex-[2.5]">
                {/* Start a post */}
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your profile" />
                        <AvatarFallback>YO</AvatarFallback>
                      </Avatar>
                      <Input placeholder="Start a post" className="bg-gray-100 border-gray-300" />
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Posts */}
                {recentPosts.map((post, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                          <AvatarImage src={post.authorImage} alt={post.authorName} />
                          <AvatarFallback>{post.authorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{post.authorName}</p>
                          <p className="text-xs text-gray-500">{post.timeAgo}</p>
                        </div>
                      </div>
                      <p className="text-sm">{post.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-6 flex-[1.2]">
                {/* Grow Your Network */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Grow Your Network</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2 mb-4">
                      <Input placeholder="Search for professionals" className="flex-grow" />
                      <Button variant="outline">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {networkData.recommendedConnections.map((connection, index) => (
                        <Flex key={index} className="items-center justify-between flex-col">
                          <Box className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={connection.image} alt={connection.name} />
                              <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <Box>
                              <p className="font-semibold">{connection.name}</p>
                              <p className="text-sm text-gray-600">{connection.role} at {connection.company}</p>
                              <Link className="flex items-center pt-2">
                                <UserPlus className="h-4 mr-2" />
                                Network
                              </Link>
                            </Box>
                          </Box>
                        </Flex>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold">Tech Meetup 2024</p>
                        <p className="text-sm text-gray-600">July 15, 2024 • Virtual</p>
                        <Badge variant="outline" className="mt-2">Attending</Badge>
                      </div>
                      <div>
                        <p className="font-semibold">Women in Tech Conference</p>
                        <p className="text-sm text-gray-600">August 3-5, 2024 • New York</p>
                        <Button variant="outline" className="mt-2">RSVP</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Messages */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Recent Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jane Smith" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">Jane Smith</p>
                            <p className="text-sm text-gray-600">Thanks for your advice on...</p>
                          </div>
                        </div>
                        <Badge variant="outline">2h ago</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                            <AvatarFallback>AJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">Alex Johnson</p>
                            <p className="text-sm text-gray-600">Are you attending the upcoming...</p>
                          </div>
                        </div>
                        <Badge variant="outline">1d ago</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Network Insights */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Network Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">+24%</div>
                    <p className="text-sm text-gray-600">+20 connections this month</p>
                  </CardContent>
                </Card>
              </div>
            </Flex>
          </div>
        </div>
      ) : (
        <Flex>
          <NewConnections />
        </Flex>
      )
  )
}