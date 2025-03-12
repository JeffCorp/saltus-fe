"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useLatestNewsUpdatesMutation } from "@/services/useLatestUpdates"
import { useProfile } from "@/services/useProfile"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, MessageSquare, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export default function NewsPage() {
  const { profile } = useProfile()
  const {
    data: latestUpdates,
    mutate: getLatestUpdates,
    isPending: isLoadingLatestUpdates,
  } = useLatestNewsUpdatesMutation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    if (profile) {
      getLatestUpdates(profile.topic);
    }
  }, [profile]);

  const categories = [
    { id: "all", name: "All Updates" },
    { id: "trending", name: "Trending" },
    { id: "latest", name: "Latest" },
    { id: "popular", name: "Most Popular" }
  ]

  return (
    <div className="p-6 space-y-8 bg-[#111111]">
      {/* Header Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
          Latest Updates in {profile?.topic || "Your Field"}
        </h1>
        <p className="text-gray-400">
          Stay informed with the latest news, trends, and developments in your industry
        </p>
      </motion.div>

      {/* Categories */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="flex gap-4 overflow-x-auto pb-2"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${selectedCategory === category.id
              ? "bg-[#1CB0F6] text-white hover:bg-[#1890d0]"
              : "bg-[#1A1A1A] text-gray-400 hover:bg-[#222222] border border-[#333333]"
              }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoadingLatestUpdates ? (
          // Loading skeletons
          Array(6).fill(0).map((_, i) => (
            <Card key={i} className="bg-[#1A1A1A] border-[#333333] animate-pulse">
              <CardHeader className="h-32 bg-[#222222] rounded-t-xl" />
              <CardContent className="p-4 space-y-4">
                <div className="h-4 bg-[#222222] rounded w-3/4" />
                <div className="h-4 bg-[#222222] rounded w-1/2" />
              </CardContent>
            </Card>
          ))
        ) : latestUpdates?.data && latestUpdates?.data?.length > 0 ? (
          latestUpdates.data.map((update: any, index: number) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`https://www.reddit.com${update.permalink}`}
                target="_blank"
                className="block h-full"
              >
                <Card className="bg-[#1A1A1A] border-[#333333] hover:border-[#1CB0F6] hover:bg-[#222222] transition-all h-full">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-white line-clamp-2 text-lg">
                      {update.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-3">
                      {update.selftext || "Click to read more..."}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {update.score}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {update.num_comments}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(update.created_utc * 1000).toLocaleDateString()}
                      </div>
                      <ArrowUpRight className="w-4 h-4 ml-auto text-[#1CB0F6]" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-12">
            No updates found. Please check back later.
          </div>
        )}
      </div>
    </div>
  )
}
