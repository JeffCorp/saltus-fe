'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ExternalLink, Newspaper, TrendingUp, Zap } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Mock data - In a real application, this would come from an API
const jobMarketTrends = [
  { month: 'Jan', demand: 100 },
  { month: 'Feb', demand: 120 },
  { month: 'Mar', demand: 115 },
  { month: 'Apr', demand: 130 },
  { month: 'May', demand: 140 },
  { month: 'Jun', demand: 155 },
]

const emergingSkills = [
  { name: 'AI and Machine Learning', relevance: 95 },
  { name: 'Data Analytics', relevance: 90 },
  { name: 'Cloud Computing', relevance: 85 },
  { name: 'Cybersecurity', relevance: 80 },
  { name: 'UX/UI Design', relevance: 75 },
]

const industryNews = [
  {
    title: 'AI Revolution in Healthcare',
    source: 'TechCrunch',
    date: '2024-05-15',
    url: 'https://techcrunch.com/ai-healthcare'
  },
  {
    title: 'The Rise of Remote Work Technologies',
    source: 'Forbes',
    date: '2024-05-12',
    url: 'https://forbes.com/remote-work-tech'
  },
  {
    title: 'Sustainable Energy Innovations',
    source: 'MIT Technology Review',
    date: '2024-05-10',
    url: 'https://technologyreview.mit.edu/sustainable-energy'
  },
]

export default function CareerTrendInsights() {
  return (
    <div className="min-h-screen bg-[#111111] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
          Career Trend Insights
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {[
            { title: "Job Market Trend", icon: TrendingUp, value: "+55% Growth", desc: "in the last 6 months", color: "#58CC02" },
            { title: "Top Emerging Skill", icon: Zap, value: "AI and Machine Learning", desc: "95% relevance to your profile", color: "#1CB0F6" },
            { title: "Latest Industry Update", icon: Newspaper, value: "AI Revolution in Healthcare", desc: "TechCrunch - May 15, 2024", color: "#8A2EFF" },
          ].map((stat, index) => (
            <Card key={index} className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-sm text-gray-400">{stat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="bg-[#1A1A1A] border-[#333333]">
            <CardHeader>
              <CardTitle className="text-white">Job Market Trends</CardTitle>
              <CardDescription className="text-gray-400">AI-powered analysis of job demand in your field</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={jobMarketTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                  <XAxis dataKey="month" stroke="#666666" />
                  <YAxis stroke="#666666" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#222222', border: '1px solid #444444' }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Line type="monotone" dataKey="demand" stroke="#8A2EFF" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#333333]">
            <CardHeader>
              <CardTitle className="text-white">Emerging Skills</CardTitle>
              <CardDescription className="text-gray-400">Personalized recommendations based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergingSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-[#58CC02]">{skill.relevance}% Relevance</span>
                    </div>
                    <Progress
                      value={skill.relevance}
                      className="w-full bg-[#222222] [&>div]:bg-gradient-to-r [&>div]:from-[#58CC02] [&>div]:to-[#1CB0F6]"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white">Skill Demand Forecast</CardTitle>
            <CardDescription className="text-gray-400">Projected demand for top skills over the next 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={emergingSkills}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                <XAxis dataKey="name" stroke="#666666" />
                <YAxis stroke="#666666" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#222222', border: '1px solid #444444' }}
                  labelStyle={{ color: '#ffffff' }}
                />
                <Bar dataKey="relevance" fill="#8A2EFF" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white">Industry News and Updates</CardTitle>
            <CardDescription className="text-gray-400">Stay informed with the latest developments in your field</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-[#222222] border-[#333333]">
                {["all", "ai", "data", "cloud"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="data-[state=active]:bg-[#333333] text-white"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="all">
                <div className="space-y-4">
                  {industryNews.map((news, index) => (
                    <Card key={index} className="bg-[#222222] border-[#444444]">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">{news.title}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {news.source} - {new Date(news.date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="outline"
                          className="bg-transparent border-[#444444] text-white hover:bg-[#333333] hover:text-white"
                        >
                          <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            Read More <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white">
            Explore More Career Insights <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}