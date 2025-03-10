'use client'

import MyConnections from "@/components/connections/myconnections"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCreateComment, useGetComment } from "@/services/useComments"
import { useGetConnections, useGetTopConnections } from "@/services/useConnections"
import { useCreatePost, useGetPost, useLikePost } from "@/services/usePosts"
import { otherUser } from "@/utils"
import { Flex, Spinner, Text } from "@chakra-ui/react"
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
  const [postList, setPostList] = useState(recentPosts);
  const { data: session } = useSession();
  const { data: connections, isPending, mutate: getConnections } = useGetConnections();
  const { data: topConnections, isPending: isTopConnectionsPending, mutate: getTopConnections } = useGetTopConnections();
  const { mutate: createPost, data: newPost } = useCreatePost();
  const { data: posts, isLoading: isPostsPending } = useGetPost();
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
    <div className="bg-white min-h-[100vh] overflow-hidden">
      <div className="container mx-auto py-6 px-4 overflow-hidden">
        <Flex className="gap-6">
          {/* Other Column */}
          {/* Add the other column here */}
          {
            topConnections?.length > 0 ?
              <Flex className="flex-[3]">
                {children}
              </Flex>
              :
              <Flex className="flex-[3]" flexDirection="column" justifyContent="center" alignItems="center">
                <Text>Kindly make a connection to view network posts</Text>
              </Flex>
          }

          {/* Right Column */}
          <div className="space-y-6 flex-[1.1] w-[300px]">
            {/* Top Connections */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-semibold">Top Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {
                    isTopConnectionsPending ? <Spinner /> :
                      topConnections?.length > 0 ?
                        topConnections?.map((connection: any, index: number) => (
                          <div key={index} className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={connection.image} alt={connection.name} />
                              <AvatarFallback style={{ textTransform: 'uppercase', backgroundColor: '#456', color: '#fff' }}>{otherUser(session, connection?.requester?._id) ? connection?.requester?.name?.split(' ').map((n: string) => n[0]).join('') : connection?.recipient?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Text className="font-semibold text-sm">{otherUser(session, connection?.requester?._id) ? connection?.requester?.name : connection?.recipient?.name}</Text>
                              {/* <Text className="text-sm text-gray-600">{connection.role} at {connection.company}</Text> */}
                            </div>
                          </div>
                        ))
                        :
                        <Text className="text-sm text-gray-600">No top connections found</Text>
                  }
                </div>
              </CardContent>
            </Card>
            {/* Grow Your Network */}
            {!isPending && <Card>
              <CardContent className="p-2 ">
                <div>
                  <MyConnections />
                </div>
              </CardContent>
            </Card>}

            {/* Upcoming Events */}
            {/* <Card>
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
                </Card> */}

            {/* Recent Messages */}
            {/* <Card>
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
                </Card> */}
          </div>
        </Flex>
      </div>
    </div>
  )

}