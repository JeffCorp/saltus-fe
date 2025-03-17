import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreateComment, useGetComment } from "@/services/useComments";
import { useLikePost } from "@/services/usePosts";
import { timeAgo } from "@/utils";
import { Spinner, Text } from "@chakra-ui/react";
import { Heart, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Post = ({ post, gotoLink }: { post: any, gotoLink?: string }) => {
  const { data: comments, isPending: isCommentsPending, mutate: getComments } = useGetComment();
  const { mutate: likePost } = useLikePost()
  const { mutate: createComment } = useCreateComment();
  const [commentText, setCommentText] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = (e: any, postId: string) => {
    e.preventDefault();
    createComment({ content: commentText, postId })
    getComments(postId)
    setCommentText("")
  }

  const handleShowComment = (postId: string) => {
    setShowComments(!showComments)
    getComments(postId)

  }

  const handleLike = (postId: string) => {
    post.likes.push(session?.user?.id)
    likePost(postId);
  }

  // useEffect(() => {
  //   getComments(post._id)
  // }, [post._id])

  return (
    <Card className="bg-[#1A1A1A] border-[#333333] mb-8 p-4 w-full h-full">
      <CardContent>
        <div className="flex gap-4 items-center" onClick={() => router.push(`/dashboard/profiles/${post.user._id}`)}>
          <Avatar style={{ backgroundColor: '#58CC0288', color: 'white' }}>
            <AvatarImage src={post.authorImage} alt={post.authorName} />
            <AvatarFallback className="bg-[#8A2EFF] text-white uppercase">
              {post.user?.name?.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Text className="font-semibold text-white">{post.user?.name}</Text>
            <Text className="text-sm text-gray-400">{timeAgo(post.createdAt)}</Text>
          </div>
        </div>

        <Text className="text-white mt-4" onClick={() => gotoLink ? router.push(gotoLink) : null}>{post.content}</Text>

        <div className="mt-4 pt-3 border-t border-[#333333]">
          <div className="flex items-center gap-6">
            <button
              className="flex items-center gap-2 text-gray-400 hover:text-[#FF4B4B] transition-colors"
              onClick={() => handleLike(post._id)}
            >
              {post.likes.includes(session?.user?.id) ? (
                <Heart className="w-5 h-5 fill-[#FF4B4B] stroke-[#FF4B4B]" />
              ) : (
                <Heart className="w-5 h-5" />
              )}
              <span className="text-sm">{post.likes?.length || 0}</span>
            </button>

            <button
              className="flex items-center gap-2 text-gray-400 hover:text-[#1CB0F6] transition-colors"
              onClick={() => handleShowComment(post._id)}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{post.commentCount || 0}</span>
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {/* Comment input */}
          <form onSubmit={(e) => handleAddComment(e, post._id)}>
            <div className="flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-[#333333] rounded-lg focus:ring-2 focus:ring-[#1CB0F6] focus:border-transparent transition-colors text-gray-900 dark:text-white"
              />
              <Button
                type="submit"
                className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
              >
                Comment
              </Button>
            </div>
          </form>

          {/* Comments list */}
          {showComments &&
            <>
              {isCommentsPending ? (
                <div className="flex justify-center p-4">
                  <Spinner color="#8A2EFF" />
                </div>
              ) : (
                <div className="space-y-3">
                  {comments?.map((comment: any, idx: number) => (
                    <div key={idx} className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={comment.authorImage} alt={comment.authorName} />
                        <AvatarFallback className="bg-[#8A2EFF] text-white uppercase">
                          {comment.user?.name?.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 bg-[#222222] rounded-lg p-3">
                        <p className="text-sm font-semibold text-white">{comment.user.name}</p>
                        <p className="text-sm text-gray-300">{comment.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{timeAgo(comment.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>}
        </div>
      </CardContent>
    </Card>
  )
}

export default Post;