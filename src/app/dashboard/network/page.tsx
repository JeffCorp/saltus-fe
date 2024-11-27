'use client'

import NewConnections from "@/components/connections/newConnections"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCreateComment, useGetComment } from "@/services/useComments"
import { ConnectionStatus, useGetConnections, useGetTopConnections } from "@/services/useConnections"
import { useCreatePost, useGetPost, useLikePost } from "@/services/usePosts"
import { otherUser, timeAgo } from "@/utils"
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react"
import { Heart, MessageCircle, Users } from "lucide-react"
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

export default function NetworkPage() {
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

  console.log(session?.user);

  useEffect(() => {
    getConnections();
    getTopConnections();
    setPostList(posts);
  }, []);

  console.log({ posts });
  const handlePost = (e: any) => {
    e.preventDefault();
    createPost({ title: "New Post", content: post });
    setPostList([...postList, { authorName: session?.user?.name, authorImage: session?.user?.image, timeAgo: "just now", content: post }]);
    setPost("");
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
                          <Text className="text-xs font-bold">{connections?.length}</Text>
                          <Text className="text-xs text-gray-600">Total Connections</Text>
                        </Flex>
                      </div>
                      {/* <Badge variant="secondary" className="text-xs">{networkData.newConnectionRequests} New</Badge> */}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mentors:</span>
                        <span className="font-semibold">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mentees:</span>
                        <span className="font-semibold">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Upcoming Events:</span>
                        <span className="font-semibold">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recent Messages:</span>
                        <span className="font-semibold">0</span>
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

              {/* Center Column */}
              <div className="space-y-6 flex-[3]">
                {/* Start a post */}
                <Card>
                  <CardContent className="pt-4">
                    <div>
                      {/* <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your profile" />
                        <AvatarFallback>YO</AvatarFallback>
                      </Avatar> */}
                      <form onSubmit={handlePost} className="flex items-center space-x-4">
                        <Input
                          placeholder="Start a post"
                          className="bg-gray-100 border-gray-300"
                          value={post}
                          onChange={(e) => setPost(e.target.value)}
                        />
                        <Button type="submit">Post</Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Posts */}
                {posts?.length > 0 ?
                  <Box overflowY="auto" maxHeight="100vh" gap={4} display="flex" flexDirection="column">
                    {posts.map((post: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="pt-4">
                          <div className="flex items-center space-x-4 mb-4">
                            <Avatar>
                              <AvatarImage src={post.authorImage} alt={post.authorName} />
                              <AvatarFallback style={{ background: '#999' }}>{post.user?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{post.user.name}</p>
                              <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
                            </div>
                          </div>
                          <p className="text-sm">{post.content}</p>

                          {/* Post interactions */}
                          <div className="mt-4 pt-3 border-t">
                            <div className="flex items-center gap-6">
                              <button
                                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                                onClick={() => handleLike(post._id)}
                              >
                                {post.likes.includes(session?.user?.id) ? (
                                  <Heart className="w-5 h-5 fill-red-500 stroke-red-500" />
                                ) : (
                                  <Heart className="w-5 h-5" />
                                )}
                                <span className="text-sm">{post.likes?.length || 0}</span>
                              </button>

                              <button
                                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                                onClick={() => handleShowComment(post._id)}
                              >
                                <MessageCircle className="w-5 h-5" />
                                <span className="text-sm">{post.commentCount || 0}</span>
                              </button>
                            </div>

                            {/* Comments section */}
                            {showComments === post._id && (
                              <div className="mt-4 space-y-4">
                                {/* Comment input */}
                                <form onSubmit={(e) => handleAddComment(e, post._id)}>
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Add a comment..."
                                      value={commentText}
                                      onChange={(e) => setCommentText(e.target.value)}
                                      className="flex-1"
                                    />
                                    <Button
                                      size="sm"
                                      type="submit"
                                    >
                                      Comment
                                    </Button>
                                  </div>
                                </form>

                                {/* Comments list */}
                                <div className="space-y-3">
                                  {comments?.map((comment: any, idx: number) => (
                                    <div key={idx} className="flex gap-3">
                                      <Avatar className="w-8 h-8">
                                        <AvatarImage src={comment.user.image} />
                                        <AvatarFallback>{comment?.user?.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1 bg-gray-50 rounded-lg p-3">
                                        <p className="text-sm font-semibold">{comment.user.name}</p>
                                        <p className="text-sm">{comment.content}</p>
                                        <p className="text-xs text-gray-500 mt-1">{timeAgo(comment.createdAt)}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                  :
                  <Text className="text-sm text-gray-600">No posts found</Text>
                }
              </div>

              {/* Right Column */}
              <div className="space-y-6 flex-[1.1] w-[300px]">
                {/* Grow Your Network */}
                <Card>
                  <CardContent className="p-2 ">
                    <div>
                      <NewConnections />
                      {/* {networkData.recommendedConnections.map((connection, index) => (
                        <Flex key={index} className="items-center justify-between flex-col">
                          <Box className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={connection.image} alt={connection.name} />
                              <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <Box>
                              <Text className="font-semibold text-sm">{connection.name}</Text>
                              <Text className="text-sm text-gray-600">{connection.role} at {connection.company}</Text>
                              <Link className="flex items-center text-sm pt-2">
                                <UserPlus className="h-4 mr-2" />
                                Network
                              </Link>
                            </Box>
                          </Box>
                        </Flex>
                      ))} */}
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
      ) : (
        <Flex>
          <NewConnections />
        </Flex>
      )
  )
}