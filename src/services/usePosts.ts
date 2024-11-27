import apiClient from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Post } from '../types/post'; // Assuming you have a Post type defined

interface CreatePostData {
  title: string;
  content: string;
  // Add other fields as needed
}

interface Post {}

async function createPost(data: CreatePostData): Promise<any> {
  const response = await apiClient.post("/posts", data);
  return response.data;
}

async function getPost(): Promise<any> {
  const response = await apiClient.get("/posts");
  return response.data;
}

async function likePost(postId: string): Promise<any> {
  const response = await apiClient.post(`/posts/${postId}/like`);
  return response.data;
}

export function useGetPost() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPost,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      // Optionally, you can update the cache directly
      queryClient.setQueryData<Post[]>(["posts"], (old) => {
        return old ? [...old, newPost] : [newPost];
      });
    },
  });
}

export function useLikePost() {
  return useMutation({
    mutationFn: likePost,
  });
}
