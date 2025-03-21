"use client";
import { useTheme } from "@/components/theme-provider";
import { useLatestUpdatesMutation } from "@/services/useLatestUpdates";
import { useProfile } from "@/services/useProfile";
import { Flex, Link, Spinner } from "@chakra-ui/react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const generateRandomData = (count: number) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
};

// Mock data for news trends with randomized data
// const newsTrends = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "Electric Vehicles",
//       data: generateRandomData(6),
// borderColor: "rgb(255, 99, 132)",
// backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Autonomous Driving",
//       data: generateRandomData(6),
// borderColor: "rgb(53, 162, 235)",
// backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//     {
//       label: "Hydrogen Fuel Cells",
//       data: generateRandomData(6),
// borderColor: "rgb(75, 192, 192)",
// backgroundColor: "rgba(75, 192, 192, 0.5)",
//     },
//     {
//       label: "Car Sharing Services",
//       data: generateRandomData(6),
// borderColor: "rgb(255, 159, 64)",
// backgroundColor: "rgba(255, 159, 64, 0.5)",
//     },
//   ],
// };

const colors = [
  {
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    borderColor: "rgb(53, 162, 235)",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  },
  {
    borderColor: "rgb(75, 192, 192)",
    backgroundColor: "rgba(75, 192, 192, 0.5)",
  },
  {
    borderColor: "rgb(255, 159, 64)",
    backgroundColor: "rgba(255, 159, 64, 0.5)",
  }
]

const newsTrends = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Electric Vehicles",
      data: [65, 75, 70, 80, 60, 90],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      // Custom data for each point
      customData: [
        { title: "hello", sentiment: "positive", topBrands: ["Tesla", "VW"] },
        { title: "hello", sentiment: "neutral", topBrands: ["Ford", "GM"] },
        { title: "hello", sentiment: "positive", topBrands: ["BMW", "Tesla"] },
        { title: "hello", sentiment: "very positive", topBrands: ["Tesla", "Rivian"] },
        { title: "hello", sentiment: "negative", topBrands: ["Toyota", "Honda"] },
        { title: "hello", sentiment: "positive", topBrands: ["Tesla", "Lucid"] }
      ]
    },
    {
      label: "Autonomous Driving",
      data: [40, 45, 55, 65, 70, 80],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      // Different custom data for this dataset
      customData: [
        { title: 2, testMiles: "10K", companies: ["Waymo"] },
        { title: 1, testMiles: "15K", companies: ["Cruise"] },
        { title: 0, testMiles: "20K", companies: ["Waymo", "Tesla"] },
        { title: 1, testMiles: "25K", companies: ["Argo AI"] },
        { title: 0, testMiles: "30K", companies: ["Cruise", "Aurora"] },
        { title: 0, testMiles: "35K", companies: ["Waymo", "Cruise"] }
      ]
    }
  ]
};

const quickActions = [
  {
    href: "/dashboard/learn",
    title: "Continue Learning",
    description: "Pick up where you left off",
    color: "#58CC02"
  },
  {
    href: "/dashboard/news",
    title: "Latest Updates",
    description: "Check industry news",
    color: "#1CB0F6"
  },
  {
    href: "/dashboard/skills",
    title: "Skill Assessment",
    description: "Test your knowledge",
    color: "#8A2EFF"
  },
  {
    href: "/dashboard/network",
    title: "Join Community",
    description: "Connect with peers",
    color: "#FF4B4B"
  }
];

const Dashboard = () => {
  const { data: session } = useSession();
  const { profile, isLoading, isError, error, updateProfile, isUpdating } =
    useProfile();
  const router = useRouter();
  const {
    data: latestUpdates,
    mutate: getLatestUpdates,
    isPending: isLoadingLatestUpdates,
  } = useLatestUpdatesMutation();
  const theme = useTheme();
  const [newsTrendsData, setNewsTrendsData] = useState<any>(newsTrends);
  const [isGraphDataModalOpen, setIsGraphDataModalOpen] = useState(false);
  const [selectedGraphData, setSelectedGraphData] = useState<{ posts: { title: string; url: string }[] }>();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          afterBody: (context: any) => {
            const datasetIndex = context[0].datasetIndex;
            const pointIndex = context[0].dataIndex;
            const customData = newsTrendsData.datasets[datasetIndex].customData[pointIndex];

            // Create different tooltip content based on dataset
            if (datasetIndex === 0) {
              return [
                `Posts: ${customData?.posts?.map((post: any) => post.title)}`,
              ];
            }
          }
        }
      }
    },
    onClick: (e: any, elem: any) => {
      if (elem.length > 0) {
        const { datasetIndex, index } = elem[0];

        console.log(newsTrendsData.datasets[datasetIndex].customData[index]);

        setSelectedGraphData(newsTrendsData.datasets[datasetIndex].customData[index])
        setIsGraphDataModalOpen(true)
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  useEffect(() => {
    if (profile) {
      getLatestUpdates(profile.topic);
    }
  }, [profile]);

  useEffect(() => {
    if (latestUpdates) {
      console.log("latestupdates =>", latestUpdates);

      setNewsTrendsData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: latestUpdates?.graph_data?.map((update: any, i: number) => ({
          label: update.topic,
          data: update.monthly_data.map((d: any) => d.average_ratio),
          customData: [
            ...update.monthly_data.map((d: any) => ({ posts: d.posts.filter((post: any, i: number) => i < 5).map((post: any) => ({ title: post.title, url: post.url })) }))
          ],
          ...colors[i]
        }))
      })
    }
  }, [latestUpdates]);
  // if (session) {
  //   router.push('/login')
  // }

  // Mock data for user statistics
  const userStats = {
    postsCount: 5,
    followersCount: 120,
    followingCount: 80,
  };

  // Mock data for learning progress
  // Create an endpoint to handle the requests from gsthering all the skills updates from the skills module for the different validations
  // Also make modifications to the tests to accomodate questions that require writting your answer.

  const learningProgressData = {
    labels: [
      "Technical Skills",
      "Soft Skills",
      "Industry Knowledge",
      "Project Management",
      "Leadership",
      "Innovation",
    ],
    datasets: [
      {
        label: "Current Progress",
        data: [65, 75, 70, 80, 60, 72],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Target",
        data: [80, 90, 85, 90, 75, 80],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       position: "top" as const,
  //     },
  //     title: {
  //       display: true,
  //       text: `News Trends in ${profile?.topic}`,
  //     },
  //   },
  // };

  const learningProgressOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Learning Progress",
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section with Quick Actions */}
      <div className="dark:bg-[#1A1A1A] bg-white rounded-2xl p-6 border dark:border-[#333333] border-gray-50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
          Welcome back, {session?.user?.name || session?.user?.email}!
        </h1>

        {/* Quick Actions Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="dark:bg-[#222222] bg-gray-100 dark:hover:bg-[#2a2a2a] hover:bg-gray-50 p-4 rounded-xl border dark:border-[#333333] border-gray-50 transition-all hover:scale-105"
            >
              <h3 className="font-semibold dark:text-white text-black" style={{ color: action.color }}>{action.title}</h3>
              <p className="text-sm dark:text-gray-400 text-gray-400 mt-1">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest News Section - Simplified */}
      <div className="dark:bg-[#1A1A1A] bg-white rounded-2xl p-6 border dark:border-[#333333] border-gray-50">
        <h2 className="text-2xl font-bold dark:text-white text-black mb-4">Latest Updates in {profile?.topic}</h2>
        {isLoadingLatestUpdates ? (
          <Flex justifyContent="center" alignItems="center" height="100px">
            <Spinner color="#8A2EFF" />
          </Flex>
        ) : latestUpdates?.data?.length && latestUpdates?.data?.length > 0 ? (
          <div className="space-y-4">
            {latestUpdates.data.slice(0, 3).map((update, index) => (
              <Link
                key={index}
                href={`https://www.reddit.com${update.permalink}`}
                target="_blank"
                className="block dark:bg-[#222222] bg-gray-100 p-4 rounded-xl dark:hover:bg-[#2a2a2a] hover:bg-gray-50 transition-all"
              >
                <h3 className="font-semibold dark:text-white text-black line-clamp-1">{update.title}</h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {update.description || update.selftext}
                </p>
              </Link>
            ))}
            <Link href="/dashboard/news" className="block text-center dark:text-[#1CB0F6] text-[#58CC02] hover:text-[#58CC02] transition-colors">
              View all updates →
            </Link>
          </div>
        ) : (
          <div className="text-center text-gray-400">No news updates found</div>
        )}
      </div>

      {/* Learning Progress - Simplified */}
      <div className="dark:bg-[#1A1A1A] bg-white rounded-2xl p-6 border dark:border-[#333333] border-gray-50">
        <h2 className="text-2xl font-bold dark:text-white text-black mb-4">Your Progress</h2>
        <div className="h-[300px]">
          <Radar
            data={{
              ...learningProgressData,
              datasets: [learningProgressData.datasets[0]] // Only show current progress
            }}
            options={{
              ...learningProgressOptions,
              scales: {
                r: {
                  ...learningProgressOptions.scales.r,
                  grid: { color: '#333333' },
                  pointLabels: { color: theme.theme === 'dark' ? '#FFFFFF' : '#000000' },
                }
              },
              plugins: {
                ...learningProgressOptions.plugins,
                legend: {
                  display: false // Hide legend for simplicity
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
