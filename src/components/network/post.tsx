import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateComment, useGetComment, useLikePost } from "@/services/useComments";
import { timeAgo } from "@/utils";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { Heart, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Post = ({ post }: { post: any }) => {
  const { data: comments, isPending: isCommentsPending, mutate: getComments } = useGetComment();
  const { mutate: likePost } = useLikePost()
  const { mutate: createComment, data: newComment } = useCreateComment();
  const [commentText, setCommentText] = useState("");
  const { data: session } = useSession();

  const handleAddComment = (e: any, postId: string) => {
    e.preventDefault();
    // Implement add comment functionality
    createComment({ content: commentText, postId })
    getComments(postId)
    setCommentText("")
  }

  const handleShowComment = (postId: string) => {
    getComments(postId)
  }

  const handleLike = (postId: string) => {
    post.likes.push(session?.user?.id)
    likePost(postId);
  }

  useEffect(() => {
    getComments(post._id)
  }, [post._id])

  console.log(post)

  return (
    <Card className="mb-8 p-4 w-full h-full">
      <CardContent>
        <Flex gap={4} className="h-full" alignItems="center">
          <Avatar>
            <AvatarImage src={post.authorImage} alt={post.authorName} />
            <AvatarFallback style={{ background: '#999', color: '#fff' }}>{post.user?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <Text className="text-xl font-bold">{post.content}</Text>
        </Flex>
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
        </div>

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
                <Avatar>
                  <AvatarImage src={comment.authorImage} alt={comment.authorName} />
                  <AvatarFallback style={{ background: '#999' }}>{comment.user?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
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
      </CardContent>
    </Card>
  )
}

export default Post;