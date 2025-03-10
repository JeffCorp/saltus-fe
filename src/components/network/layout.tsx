'use client'

import MyConnections from "@/components/connections/myconnections"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCreateComment, useGetComment } from "@/services/useComments"
import { useGetConnections, useGetTopConnections } from "@/services/useConnections"
import { useCreatePost, useGetPost, useLikePost } from "@/services/usePosts"
import { otherUser } from "@/utils"
import { Spinner, Text } from "@chakra-ui/react"
import { Users } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

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

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  const [post, setPost] = useState("");
  const [postList, setPostList] = useState<any[]>([]);
  const { data: session } = useSession();
  const { data: connections, isPending, mutate: getConnections } = useGetConnections();
  const { data: topConnections, isPending: isTopConnectionsPending, mutate: getTopConnections } = useGetTopConnections();
  const { mutate: createPost } = useCreatePost();
  const { data: posts } = useGetPost();
  const { mutate: createComment, data: newComment } = useCreateComment();
  const { data: comments, isPending: isCommentsPending, mutate: getComments } = useGetComment();
  const { mutate: likePost } = useLikePost()
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    getConnections();
    getTopConnections();
    setPostList(posts);
  }, []);

  const handlePost = (e: any) => {
    e.preventDefault();
    createPost({ title: "New Post", content: post });
    setPost("");
    setPostList([...postList, { authorName: session?.user?.name, authorImage: session?.user?.image, timeAgo: "just now", content: post }]);
  }

  const handleLike = (postId: string) => {
    console.log({ posts: posts.find((post: any) => post._id === postId) });
    console.log(postId);

    console.log(session?.user);

    posts.find((post: any) => post._id === postId).likes.push(session?.user?.id)
    likePost(postId);
    // Implement like functionality
  }

  const handleAddComment = (e: any, postId: string) => {
    e.preventDefault();
    // Implement add comment functionality
    createComment({ content: commentText, postId })
    getComments(postId)
    setCommentText("")
  }

  const handleShowComment = (postId: string) => {
    getComments(postId)
    setShowComments(postId);
  }

  return (
    <div className="bg-[#111111] min-h-[100vh] overflow-hidden">
      <div className="container mx-auto py-6 px-4 overflow-hidden">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-[3]">
            {topConnections?.length > 0 ? (
              children
            ) : (
              <div className="flex flex-col items-center justify-center h-[60vh] bg-[#1A1A1A] rounded-2xl border border-[#333333] p-8">
                <Text className="text-gray-400 text-center">
                  Make your first connection to view network posts
                </Text>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 flex-[1.1] w-[300px]">
            <div className="w-[300px] space-y-6">
              <Card className="bg-[#1A1A1A] border-[#333333] sticky top-[100px]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold text-white">Network Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Connection Stats */}
                  <div className="p-4 rounded-xl bg-[#222222] border border-[#444444]">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-[#8A2EFF]/20">
                        <Users className="w-7 h-7 text-[#8A2EFF]" />
                      </div>
                      <div>
                        <Text className="text-3xl font-bold text-white">{connections?.length || 0}</Text>
                        <Text className="text-sm font-medium text-gray-300">Total Connections</Text>
                      </div>
                    </div>
                  </div>

                  {/* Other Stats */}
                  <div className="space-y-3 mt-6">
                    {[
                      { label: "Mentors", value: "0", color: "#58CC02" },
                      { label: "Mentees", value: "0", color: "#1CB0F6" },
                      { label: "Upcoming Events", value: "0", color: "#FF9600" },
                      { label: "Recent Messages", value: "0", color: "#FF4B4B" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 rounded-lg hover:bg-[#222222] transition-colors border border-transparent hover:border-[#444444]"
                      >
                        <span className="text-gray-300 font-medium">{item.label}</span>
                        <span
                          className="font-bold text-lg"
                          style={{ color: item.color }}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Top Connections */}
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-semibold text-white">Top Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isTopConnectionsPending ? (
                    <div className="flex justify-center">
                      <Spinner color="#8A2EFF" />
                    </div>
                  ) : topConnections?.length > 0 ? (
                    topConnections?.map((connection: any, index: number) => (
                      <div key={index} className="flex items-center space-x-4 group hover:bg-[#222222] p-2 rounded-lg transition-colors">
                        <Avatar>
                          <AvatarImage src={connection.image} alt={connection.name} />
                          <AvatarFallback
                            className="bg-[#8A2EFF] text-white uppercase"
                          >
                            {otherUser(session, connection?.requester?._id)
                              ? connection?.requester?.name?.split(' ').map((n: string) => n[0]).join('')
                              : connection?.recipient?.name?.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Text className="font-semibold text-sm text-white">
                            {otherUser(session, connection?.requester?._id)
                              ? connection?.requester?.name
                              : connection?.recipient?.name}
                          </Text>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Text className="text-sm text-gray-400">No top connections found</Text>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Grow Your Network */}
            {!isPending && (
              <Card className="bg-[#1A1A1A] border-[#333333]">
                <CardContent className="p-4">
                  <MyConnections />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}