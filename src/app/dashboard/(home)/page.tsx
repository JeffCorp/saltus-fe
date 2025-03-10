"use client";
import { useLatestUpdatesMutation } from "@/services/useLatestUpdates";
import { useProfile } from "@/services/useProfile";
import { Box, Flex, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Text } from "@chakra-ui/react";
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
import { Rss, UserCheck, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Line, Radar } from "react-chartjs-2";

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
      {/* Welcome Section */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#333333]">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
          Welcome to your dashboard
        </h1>
        <p className="mt-2 text-gray-400">
          Hello, {session?.user?.name || session?.user?.email}! Let's continue your career journey.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-[#1A1A1A] rounded-2xl border border-[#333333] overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="p-6 flex items-center gap-6">
            <div className="p-3 rounded-xl" style={{ backgroundColor: '#58CC02' }}>
              <Rss className="h-8 w-8 text-white" />
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-400">Total Posts</dt>
              <dd className="mt-1 text-4xl font-bold text-white">{userStats.postsCount}</dd>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] rounded-2xl border border-[#333333] overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="p-6 flex items-center gap-6">
            <div className="p-3 rounded-xl" style={{ backgroundColor: '#1CB0F6' }}>
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-400">Followers</dt>
              <dd className="mt-1 text-4xl font-bold text-white">{userStats.followersCount}</dd>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] rounded-2xl border border-[#333333] overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="p-6 flex items-center gap-6">
            <div className="p-3 rounded-xl" style={{ backgroundColor: '#8A2EFF' }}>
              <UserCheck className="h-8 w-8 text-white" />
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-400">Following</dt>
              <dd className="mt-1 text-4xl font-bold text-white">{userStats.followingCount}</dd>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="h-[400px]">
          <h2 className="text-2xl font-bold mb-4 text-white">Learning Progress</h2>
          <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#333333] h-full">
            <Radar
              data={{
                ...learningProgressData,
                datasets: learningProgressData.datasets.map((dataset, index) => ({
                  ...dataset,
                  backgroundColor: index === 0 ? 'rgba(88, 204, 2, 0.2)' : 'rgba(138, 46, 255, 0.2)',
                  borderColor: index === 0 ? '#58CC02' : '#8A2EFF',
                  pointBackgroundColor: index === 0 ? '#58CC02' : '#8A2EFF',
                }))
              }}
              options={{
                ...learningProgressOptions,
                scales: {
                  r: {
                    ...learningProgressOptions.scales.r,
                    grid: { color: '#333333' },
                    pointLabels: { color: '#FFFFFF' },
                  }
                },
                plugins: {
                  ...learningProgressOptions.plugins,
                  legend: {
                    ...learningProgressOptions.plugins.legend,
                    labels: { color: '#FFFFFF' }
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="h-[400px]">
          <h2 className="text-2xl font-bold mb-4 text-white">News Trends</h2>
          <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#333333] h-full">
            {isLoadingLatestUpdates ? (
              <Flex justifyContent="center" alignItems="center" height="100%">
                <Spinner color="#8A2EFF" />
              </Flex>
            ) : (
              <Line
                data={newsTrendsData}
                options={{
                  ...options,
                  scales: {
                    ...options.scales,
                    y: {
                      ...options.scales.y,
                      grid: { color: '#333333' },
                      ticks: { color: '#FFFFFF' }
                    },
                    x: {
                      grid: { color: '#333333' },
                      ticks: { color: '#FFFFFF' }
                    }
                  },
                  plugins: {
                    ...options.plugins,
                    legend: {
                      ...options.plugins.legend,
                      position: 'top' as const,
                      labels: { color: '#FFFFFF' }
                    }
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* News Updates */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Your News Updates</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {isLoadingLatestUpdates ? (
            <Flex justifyContent="center" alignItems="center" height="100px">
              <Spinner color="#8A2EFF" />
            </Flex>
          ) : latestUpdates?.data?.length && latestUpdates?.data?.length > 0 ? (
            latestUpdates.data.map((update, index) => (
              <Box
                key={index}
                className="bg-[#1A1A1A] rounded-2xl border border-[#333333] p-6 transform hover:scale-105 transition-transform duration-300"
              >
                <Flex direction="column" gap={3}>
                  <Text
                    className="font-bold text-lg text-white line-clamp-1"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {update.title}
                  </Text>
                  <Text className="text-sm text-gray-400">
                    Author: {update.author}
                  </Text>
                  <Text className="text-gray-300 line-clamp-2">
                    {update.description || update.selftext}
                  </Text>
                  <Link
                    href={`https://www.reddit.com${update.permalink}`}
                    isExternal
                    className="text-[#1CB0F6] hover:text-[#58CC02] transition-colors"
                  >
                    Read more
                  </Link>
                </Flex>
              </Box>
            ))
          ) : (
            <div className="text-center text-gray-400">No news updates found</div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isGraphDataModalOpen} onClose={() => setIsGraphDataModalOpen(false)}>
        <ModalOverlay />
        <ModalContent className="bg-[#1A1A1A] text-white border border-[#333333]">
          <ModalHeader>News</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-4">
            {selectedGraphData?.posts?.map((data, i) => (
              <Link
                key={i}
                href={data?.url}
                target="_blank"
                className="text-[#1CB0F6] hover:text-[#58CC02] transition-colors block"
              >
                {data?.title}
              </Link>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Dashboard;
