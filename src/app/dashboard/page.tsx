'use client'
import { useLatestUpdatesMutation } from '@/services/useLatestUpdates';
import { useProfile } from '@/services/useProfile';
import { Box, Flex, Link, Spinner, Text } from '@chakra-ui/react';
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
} from 'chart.js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Line, Radar } from 'react-chartjs-2';

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
const newsTrends = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Electric Vehicles',
      data: generateRandomData(6),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Autonomous Driving',
      data: generateRandomData(6),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Hydrogen Fuel Cells',
      data: generateRandomData(6),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    {
      label: 'Car Sharing Services',
      data: generateRandomData(6),
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
    },
  ],
};

const Dashboard = () => {
  const { data: session } = useSession();
  const { profile, isLoading, isError, error, updateProfile, isUpdating } = useProfile()
  const router = useRouter()
  const { data: latestUpdates, mutate: getLatestUpdates, isPending: isLoadingLatestUpdates } = useLatestUpdatesMutation()
  const [newsTrendsData, setNewsTrendsData] = useState<any>(newsTrends)

  console.log(profile);

  useEffect(() => {
    if (profile) {
      getLatestUpdates(profile.topic)
    }
  }, [profile])

  useEffect(() => {
    if (latestUpdates) {
      // setNewsTrendsData({
      //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      //   datasets: latestUpdates.map((update: any) => ({
      //     label: update.title,
      //     data: generateRandomData(6),
      //     borderColor: 'rgb(255, 99, 132)',
      //     backgroundColor: `rgba(255, 99, ${Math.floor(Math.random() * 255)}, 0.5)`,
      //   }))
      // })
    }
  }, [latestUpdates])
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
  const learningProgressData = {
    labels: ['Technical Skills', 'Soft Skills', 'Industry Knowledge', 'Project Management', 'Leadership', 'Innovation'],
    datasets: [
      {
        label: 'Current Progress',
        data: [65, 75, 70, 80, 60, 72],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      },
      {
        label: 'Target',
        data: [80, 90, 85, 90, 75, 80],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `News Trends in ${profile?.topic}`,
      },
    },
  };

  const learningProgressOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Learning Progress',
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg min-h-screen">
      <div className="px-4 py-5 sm:p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome to your dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Hello, {session?.user?.name || session?.user?.email}! This is your personal dashboard.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-indigo-100 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Posts</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{userStats.postsCount}</dd>
            </div>
          </div>
          <div className="bg-indigo-100 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Followers</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{userStats.followersCount}</dd>
            </div>
          </div>
          <div className="bg-indigo-100 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Following</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{userStats.followingCount}</dd>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="h-[400px]">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Learning Progress</h2>
            <div className="bg-white p-4 rounded-lg shadow h-full">
              <Radar data={learningProgressData} options={learningProgressOptions} />
            </div>
          </div>
          <div className="h-[400px]">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">News Trends</h2>
            <div className="bg-white p-4 rounded-lg shadow h-full">
              <Line options={options} data={newsTrendsData} />
            </div>
          </div>
        </div>

        <div className="mt-[100px]">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your News Updates</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {
              isLoadingLatestUpdates ?
                <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
                  <Spinner />
                </Flex>
                :
                (latestUpdates && latestUpdates?.length > 0) ?
                  latestUpdates?.map((update, index) => (
                    <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                      <Flex align="start" gap={1}>
                        {/* <Box flex={1}>
                          {update.thumbnail != "self" && (
                            <Image src={update.thumbnail} alt={update.title} height={100} width={100} objectFit="cover" />
                          )}
                        </Box> */}
                        <Flex flex={3} direction="column" gap={2}>
                          <Text fontWeight="bold" fontSize="lg" noOfLines={1} textTransform="capitalize">{update.title}</Text>
                          <Text fontSize="sm" color="gray.500">Author: {update.author}</Text>

                          <Text noOfLines={2}>{update.description || update.selftext}</Text>
                          <Link href={`https://www.reddit.com${update.permalink}`} isExternal color="blue.500">
                            Read more
                          </Link>
                        </Flex>
                      </Flex>
                    </Box>
                  ))
                  :
                  <Flex justifyContent="center" alignItems="center" height="100%">
                    <Text>No news updates found</Text>
                  </Flex>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
