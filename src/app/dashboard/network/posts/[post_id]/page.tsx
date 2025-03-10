'use client'

import LoadingSpinner from "@/components/loaders/LoadingSpinner"
import NetworkLayout from "@/components/network/layout"
import Post from "@/components/network/post"
import { useGetConnections, useGetTopConnections } from "@/services/useConnections"
import { useGetPostById } from "@/services/usePosts"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function PostPage() {
  const { mutate: getConnections } = useGetConnections();
  const { mutate: getTopConnections } = useGetTopConnections();
  const { mutate: getPostById, data: post, isPending: isPostPending } = useGetPostById();
  const params = useParams();

  useEffect(() => {
    getConnections();
    getTopConnections();
    getPostById(params.post_id as string);
  }, []);

  return (
    <NetworkLayout>
      {isPostPending ? <LoadingSpinner /> :
        post && <Post post={post} />
      }
    </NetworkLayout>
  )
}