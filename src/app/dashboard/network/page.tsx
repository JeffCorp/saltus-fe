'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Briefcase, ChevronRight, MessageSquare, Search, TrendingUp, UserPlus, Users } from "lucide-react"

// Mock data - In a real application, this would come from a backend API
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

export default function NetworkPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Professional Network</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Network Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 mr-2 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{networkData.totalConnections}</p>
                  <p className="text-sm text-muted-foreground">Total Connections</p>
                </div>
              </div>
              <div>
                <Badge variant="secondary">{networkData.newConnectionRequests} New</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Mentors:</span>
                <span className="font-semibold">{networkData.mentors}</span>
              </div>
              <div className="flex justify-between">
                <span>Mentees:</span>
                <span className="font-semibold">{networkData.mentees}</span>
              </div>
              <div className="flex justify-between">
                <span>Upcoming Events:</span>
                <span className="font-semibold">{networkData.upcomingEvents}</span>
              </div>
              <div className="flex justify-between">
                <span>Recent Messages:</span>
                <span className="font-semibold">{networkData.recentMessages}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Manage Network</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Connections</CardTitle>
            <CardDescription>People you interact with most</CardDescription>
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
                    <p className="font-semibold">{connection.name}</p>
                    <p className="text-sm text-muted-foreground">{connection.role} at {connection.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Connections</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Connections</CardTitle>
            <CardDescription>Expand your network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {networkData.recommendedConnections.map((connection, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={connection.image} alt={connection.name} />
                      <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{connection.name}</p>
                      <p className="text-sm text-muted-foreground">{connection.role} at {connection.company}</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Find More Connections</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Networking Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Tech Meetup 2024</p>
                  <p className="text-sm text-muted-foreground">July 15, 2024 • Virtual</p>
                </div>
                <Badge>Attending</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Women in Tech Conference</p>
                  <p className="text-sm text-muted-foreground">August 3-5, 2024 • New York</p>
                </div>
                <Button>RSVP</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Events</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
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
                    <p className="text-sm text-muted-foreground">Thanks for your advice on...</p>
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
                    <p className="text-sm text-muted-foreground">Are you attending the upcoming...</p>
                  </div>
                </div>
                <Badge variant="outline">1d ago</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Open Inbox</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Grow Your Network</h2>
        <div className="flex space-x-4">
          <div className="flex-1">
            <Input placeholder="Search for professionals or companies" />
          </div>
          <Button>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Network Insights</h2>
        <Button variant="outline">
          View Detailed Analytics <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+24%</div>
            <p className="text-xs text-muted-foreground">+20 connections this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Industry Reach</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 Industries</div>
            <p className="text-xs text-muted-foreground">Across 3 continents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">15% increase from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}