'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import apiClient from "@/lib/api-client"
import { useSkillsProgressByUserId } from "@/services/useSkillsProgress"
import clsx from "clsx"
import { Book, Play } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Video {
  title: string;
  url: string;
  videoId: string;
  thumbnail: string;
  description: string;
  duration: string;
  views: string;
  channel: {
    name: string;
    url: string;
  }
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function LearnPage() {
  const { data: session } = useSession();
  const { mutate: getSkillsProgress, data: skillsProgress } = useSkillsProgressByUserId();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const skillName = searchParams.get('skillName');

  useEffect(() => {
    if (skillName) {
      console.log(skillName);
      fetchVideos(skillName);
    }
  }, [skillName])

  useEffect(() => {
    if (session?.user?.id) {
      getSkillsProgress(session.user.id);
    }
  }, [session?.user?.id]);

  // Filter skills that need improvement (progress < 100)
  const skillsToImprove = skillsProgress?.filter(
    (skill) => skill.progress < 100
  ) || [];

  const fetchVideos = async (skillName: string) => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await apiClient.get(`/youtube/search?q=${skillName}`);
      const data: Video[] = response.data;
      setVideos(data);

      // Generate questions based on video transcripts
      // const questionsResponse = await apiClient.post(`/youtube/search`, {
      //   skillName,
      //   videoIds: response.videos.map((v: Video) => v.id)
      // });
      // const questionsData = await questionsResponse.json();
      // setQuestions(questionsData.questions);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async (videoId: string) => {
    setLoading(true);

    const response = await apiClient.get(`/youtube/transcript?videoId=${videoId}`);
    const data: string[] = response.data;
    console.log(data);
    // setQuestions(data);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
        Learn & Practice
      </h1>

      <div className="flex flex-col gap-6">
        {/* Horizontal scrollable pills */}
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {skillsToImprove.map((skill) => (
              <div key={typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId._id}
                className="flex flex-col items-center gap-2">
                <Button
                  className={clsx(`whitespace-nowrap flex !p-2 h-5 md:!h-5 justify-start items-center ${selectedSkill === skill.skillModuleId
                    ? 'bg-[#8A2EFF] text-white'
                    : 'bg-[#222222] text-gray-300'
                    }`, {
                    'bg-[#1CB0F6] text-white': skillName === (typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name)
                  })}
                  onClick={() => {
                    setSelectedSkill(typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId._id);
                    fetchVideos(typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name);
                  }}
                >
                  <Book className="mr-2 h-4 w-4" />
                  {typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name}
                </Button>
                <Progress
                  value={skill.progress}
                  className="w-full min-w-[100px] bg-[#787878] [&>div]:bg-gradient-to-r [&>div]:from-[#58CC02] [&>div]:to-[#1CB0F6]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Learning Resources Card */}
        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white">Learning Resources</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center text-gray-400">Loading content...</div>
            ) : (!selectedSkill && !skillName) ? (
              <div className="text-center text-gray-400">Select a skill to start learning</div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 h-[60vh] overflow-y-auto">
                  {videos.map((video) => (
                    <Card key={video.url} className="bg-[#222222] border-[#444444] flex flex-col justify-between items-center">
                      <CardContent className="p-4">
                        <div className="relative w-full h-[200px] rounded-lg mb-2">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-col items-center">
                          <h3 className="text-white font-medium mb-2 line-clamp-2">{video.title}</h3>
                          <div className="flex">
                            <Button
                              variant="outline"
                              className="flex-1 md:w-[150px] bg-[#1CB0F6] hover:bg-[#19A0E3] text-white flex items-center justify-center"
                              onClick={() => window.open(video.url, '_blank')}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Watch Video
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 md:w-[120px] bg-[#1CB0F6] hover:bg-[#19A0E3] text-white flex items-center justify-center"
                              onClick={() => fetchQuestions(video.videoId)}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Take Quiz
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {questions.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-xl font-bold text-white mb-4">Practice Questions</h2>
                    <div className="space-y-4">
                      {questions.map((question, index) => (
                        <Card key={index} className="bg-[#222222] border-[#444444]">
                          <CardContent className="p-4">
                            <p className="text-white mb-3">{question.question}</p>
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <Button
                                  key={optionIndex}
                                  variant="outline"
                                  className="w-full text-left justify-start bg-[#333333] hover:bg-[#444444] text-gray-300"
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
