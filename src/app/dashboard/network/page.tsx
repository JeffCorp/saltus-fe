'use client'

import LoadingSpinner from "@/components/loaders/LoadingSpinner"
import NetworkLayout from "@/components/network/layout"
import Post from "@/components/network/post"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCreateComment, useGetComment } from "@/services/useComments"
import { ConnectionStatus, useGetConnections, useGetTopConnections } from "@/services/useConnections"
import { useCreatePost, useGetPost, useLikePost } from "@/services/usePosts"
import { Text } from "@chakra-ui/react"
import { MessageCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
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
  const { data: session } = useSession();
  const { data: connections, isPending, mutate: getConnections } = useGetConnections();
  const { data: topConnections, mutate: getTopConnections } = useGetTopConnections();
  const { mutate: createPost } = useCreatePost();
  const { data: posts, isLoading: isPostsPending } = useGetPost();
  const { mutate: createComment, data: newComment } = useCreateComment();
  const { data: comments, isPending: isCommentsPending, mutate: getComments } = useGetComment();
  const { mutate: likePost } = useLikePost()
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getConnections();
    getTopConnections();
  }, []);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!post.trim()) return;

    createPost({ title: "New Post", content: post });
    setPost("");
  }

  const handleLike = (postId: string) => {
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
    if (postId) {
      setShowComments(null);
    } else {
      getComments(postId)
      setShowComments(postId);
    }
  }

  if (isPending) {
    return <LoadingSpinner />;
  }

  const approvedConnections = connections?.filter(
    (connection: any) => connection.status === ConnectionStatus.APPROVED
  );

  // if (!approvedConnections || approvedConnections.length === 0) {
  //   return null;
  // }

  return (
    <NetworkLayout>
      {selectedPost ? (
        <Post post={selectedPost} />
      ) : (
        <div className="flex gap-6 w-full">
          {/* Right Column - Posts */}
          <div className="flex-1 space-y-6 min-w-0">
            {/* Create Post */}
            <Card className="dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-50">
              <CardContent className="p-4">
                <form onSubmit={handlePost} className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={session?.user?.image || ""} />
                    <AvatarFallback className="dark:bg-[#8A2EFF] bg-gray-50 text-white uppercase text-lg">
                      {session?.user?.name?.split(" ").map((n: any) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    placeholder="Share your thoughts..."
                    className="w-full px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-[#333333] rounded-lg focus:ring-2 focus:ring-[#1CB0F6] focus:border-transparent transition-colors text-gray-900 dark:text-white"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white px-6 text-lg"
                    disabled={!post.trim()}
                  >
                    Post
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            {isPostsPending ? (
              <LoadingSpinner />
            ) : posts?.length ? (
              <div className="space-y-6">
                {posts.map((post: any) => (
                  <div
                    key={post._id}
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <Post post={post} gotoLink={`/dashboard/network/posts/${post._id}`} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-50 p-8">
                <div className="text-center">
                  <MessageCircle className="mx-auto h-12 w-12 text-[#8A2EFF] opacity-50" />
                  <Text className="mt-4 text-lg font-medium dark:text-gray-300 text-gray-700">
                    No posts yet. Be the first to share!
                  </Text>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </NetworkLayout>
  );
}