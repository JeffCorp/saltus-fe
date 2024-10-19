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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Career Trend Insights</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Market Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+55% Growth</div>
            <p className="text-xs text-muted-foreground">in the last 6 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Emerging Skill</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AI and Machine Learning</div>
            <p className="text-xs text-muted-foreground">95% relevance to your profile</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Industry Update</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">AI Revolution in Healthcare</div>
            <p className="text-xs text-muted-foreground">TechCrunch - May 15, 2024</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Job Market Trends</CardTitle>
            <CardDescription>AI-powered analysis of job demand in your field</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jobMarketTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="demand" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emerging Skills</CardTitle>
            <CardDescription>Personalized recommendations based on your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergingSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>{skill.name}</span>
                    <span>{skill.relevance}% Relevance</span>
                  </div>
                  <Progress value={skill.relevance} className="w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Skill Demand Forecast</CardTitle>
          <CardDescription>Projected demand for top skills over the next 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={emergingSkills}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="relevance" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Industry News and Updates</CardTitle>
          <CardDescription>Stay informed with the latest developments in your field</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="ai">AI & ML</TabsTrigger>
              <TabsTrigger value="data">Data Science</TabsTrigger>
              <TabsTrigger value="cloud">Cloud Computing</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="space-y-4">
                {industryNews.map((news, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{news.title}</CardTitle>
                      <CardDescription>{news.source} - {new Date(news.date).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="p-0">
                        <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          Read More <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {/* Other tab contents would be similar, filtered by category */}
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Button className="flex items-center">
          Explore More Career Insights <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}