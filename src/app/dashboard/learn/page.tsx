'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useSkillsProgressByUserId } from "@/services/useSkillsProgress"
import { Book, Play } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
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

  useEffect(() => {
    if (session?.user?.id) {
      getSkillsProgress(session.user.id);
    }
  }, [session?.user?.id]);

  // Filter skills that need improvement (progress < 100)
  const skillsToImprove = skillsProgress?.filter(
    (skill) => skill.progress < 100
  ) || [];

  const fetchVideosAndQuestions = async (skillName: string) => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/youtube/search?q=${skillName}`);
      const data = await response.json();
      setVideos(data.videos);

      // Generate questions based on video transcripts
      // Replace with your actual API endpoint
      const questionsResponse = await fetch(`/api/questions/generate`, {
        method: 'POST',
        body: JSON.stringify({ skillName, videoIds: data.videos.map((v: Video) => v.id) })
      });
      const questionsData = await questionsResponse.json();
      setQuestions(questionsData.questions);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
        Learn & Practice
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white">Skills to Improve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsToImprove.map((skill) => (
                <div key={typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId._id} className="space-y-2">
                  <Button
                    variant="outline"
                    className={`w-full justify-start ${selectedSkill === skill.skillModuleId
                      ? 'bg-[#8A2EFF] text-white'
                      : 'bg-[#222222] text-gray-300'
                      }`}
                    onClick={() => {
                      setSelectedSkill(typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId._id);
                      fetchVideosAndQuestions(typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name);
                    }}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    {typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name}
                  </Button>
                  <Progress
                    value={skill.progress}
                    className="w-full bg-[#222222] [&>div]:bg-gradient-to-r [&>div]:from-[#58CC02] [&>div]:to-[#1CB0F6]"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white">Learning Resources</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center text-gray-400">Loading content...</div>
            ) : !selectedSkill ? (
              <div className="text-center text-gray-400">Select a skill to start learning</div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {videos.map((video) => (
                    <Card key={video.id} className="bg-[#222222] border-[#444444]">
                      <CardContent className="p-4">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full rounded-lg mb-2"
                        />
                        <h3 className="text-white font-medium mb-2">{video.title}</h3>
                        <Button
                          variant="outline"
                          className="w-full bg-[#1CB0F6] hover:bg-[#19A0E3] text-white"
                          onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, '_blank')}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Watch Video
                        </Button>
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
