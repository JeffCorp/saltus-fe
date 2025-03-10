import apiClient from "@/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

interface RedditPost {
  id: string;
  title: string;
  description: string;
  author: string;
  url: string;
  created_utc: number;
  subreddit: string;
  score: number;
  thumbnail: string;
  permalink: string;
  selftext: string;
}

interface FullResponse {
  data: RedditPost[];
  graph_data: any;
}

interface LatestUpdatesResponse {
  data: RedditPost[];
}

export function useLatestUpdates(topic: string) {
  return useQuery<RedditPost[], Error>({
    queryKey: ["latestUpdates", topic],
    queryFn: async () => {
      const { data } = await apiClient.get<RedditPost[]>(
        `/reddit/new?topic=${encodeURIComponent(topic)}`
      );

      console.log(data);

      return data;
    },
    enabled: !!topic, // Only run the query if a topic is provided
    // refetchInterval: 300000, // Refetch every 5 minutes (300000 ms)
    staleTime: 60000, // Consider data stale after 1 minute
  });
}

// Create mutation to get latest updates
export function useLatestUpdatesMutation() {
  return useMutation<FullResponse, Error, string>({
    mutationFn: async (topic) => {
      const { data } = await apiClient.get<FullResponse>(
        `/reddit/new?topic=${encodeURIComponent(topic)}`
      );
      return data;
    },
  });
}
