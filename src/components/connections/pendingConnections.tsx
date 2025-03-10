"use client"

import StatusIcon from '@/components/connections/StatusIcon'
import { useAcceptConnection, useAddConnection, useGetPendingConnections } from '@/services/useConnections'
import useUsers from '@/services/useUsers'
import { otherUser } from '@/utils'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import { Check, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FaInfoCircle } from "react-icons/fa"

// Mock data for users and suggested connections
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', avatar: '/placeholder.svg?height=40&width=40' },
]

const suggestedConnections = [
  { id: 4, name: 'Saltus AI', email: 'contact@saltus.ai', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 5, name: 'Tech Innovators', email: 'info@techinnovators.com', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 6, name: 'Sarah Lee', email: 'sarah@example.com', avatar: '/placeholder.svg?height=40&width=40' },
]

export default function PendingConnections() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{ _id: string, name: string, email: string, avatar: string }[]>([])
  const toast = useToast()
  const { mutate: getUsers, data: users } = useUsers()
  const { mutate: addConnection } = useAddConnection();
  const { data: connections, isPending, mutate: getPendingConnections } = useGetPendingConnections();
  const { mutate: acceptConnection } = useAcceptConnection();

  useEffect(() => {
    getUsers()
    getPendingConnections()
  }, [])

  console.log("connections =>", connections);

  console.log(users);
  const handleSearch = () => {
    // In a real application, this would be an API call
    // const results = mockUsers.filter(
    //   user => user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     user.email.toLowerCase().includes(searchQuery.toLowerCase())
    // )
    // setSearchResults(results)
  }

  const sendConnectionRequest = (userId: string) => {
    // In a real application, this would be an API call
    addConnection({
      requester: session?.user?.id,
      recipient: userId,
    })

    getPendingConnections()

    toast({
      title: 'Connection request sent',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const acceptConnectionRequest = (userId: string) => {
    const connection = connections?.find((connection: any) => connection.recipient._id == session?.user.id && connection.requester._id == userId && connection.status.toLowerCase() === "pending")
    if (connection) {
      acceptConnection({
        _id: connection._id,
      })
    }
  }

  const rejectConnectionRequest = (userId: string) => {
    // In a real application, this would be an API call
  }

  return (
    <Box className="max-w-2xl">
      <VStack spacing={4} align="stretch">
        <VStack alignItems={"start"} width="100%">
          <Text>Pending</Text>
        </VStack>
        <Divider />
        <VStack align="stretch" spacing={2} pb={5}>
          {/* <Text fontWeight="bold" className="text-lg">Suggested Connections</Text> */}
          {
            !isPending && session?.user &&
              connections?.length === 0 ?
              <Flex justifyContent="center" alignItems="center" gap={2}>
                <Text color="#676767">No pending requests</Text>
                <FaInfoCircle />
              </Flex>
              :
              connections?.map((connection: any, index: number) => (
                <div key={index} className="flex justify-center space-x-4 flex-col gap-3">
                  <div className='flex items-center justify-start gap-2'>
                    <Avatar src={connection.avatar} name={connection.name} size="sm" />
                    <div>
                      <Text className="font-semibold text-sm">{otherUser(session, connection?.requester?._id) ? connection?.requester?.name : connection?.recipient?.name}</Text>
                      {/* <Text className="text-sm text-gray-600">{connection.role} at {connection.company}</Text> */}
                    </div>
                  </div>
                  <div className='!ml-0'>
                    {
                      (connection?.recipient?._id == session?.user.id && connection.status.toLowerCase() === "pending") ?
                        <Flex gap={2} alignItems="start">
                          <Button size="xs" colorScheme="blue" variant="outline" onClick={() => acceptConnectionRequest(connection.requester._id)}>
                            <Check className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                          <Button size="xs" colorScheme="red" variant="outline" onClick={() => rejectConnectionRequest(session?.user?.id)}>
                            <X className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </Flex>
                        :
                        <Box>
                          <Button
                            size="xs"
                            colorScheme="blue"
                            variant="outline"
                            onClick={() => sendConnectionRequest(session?.user?._id)}
                          >
                            <StatusIcon status={connections?.find((connection: any) => (connection.recipient._id === session?.user.id || connection.requester._id === session?.user.id))?.status} />
                            {connections?.find((connection: any) => (connection.recipient._id === session?.user.id || connection.requester._id === session?.user.id))?.status ?? "Connect"}
                          </Button>
                        </Box>
                    }
                  </div>
                </div>
              ))
          }
        </VStack>
      </VStack>
    </Box>
  )
}