import apiClient from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateCommentData {
  content: string;
  postId: string;
}

interface Post {}

async function createComment(data: CreateCommentData): Promise<any> {
  const response = await apiClient.post("/comments", data);
  return response.data;
}

async function getComment(postId: string): Promise<any> {
  const response = await apiClient.get(`/comments/post/${postId}`);
  return response.data;
}

async function likeComment(commentId: string): Promise<any> {
  const response = await apiClient.post(`/comments/${commentId}/like`);
  return response.data;
}

export function useGetComment() {
  return useMutation({
    mutationFn: getComment,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (newComment) => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      // Optionally, you can update the cache directly
      queryClient.setQueryData<Post[]>(["comments"], (old) => {
        return old ? [...old, newComment] : [newComment];
      });
    },
  });
}

export function useLikePost() {
  return useMutation({
    mutationFn: likeComment,
  });
}
