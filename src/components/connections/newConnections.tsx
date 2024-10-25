"use client"

import StatusIcon from '@/components/connections/StatusIcon'
import { Input } from "@/components/ui/input"
import { useAcceptConnection, useAddConnection, useGetConnections } from '@/services/useConnections'
import useUsers from '@/services/useUsers'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { Check, Search, UserPlus, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

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

export default function NewConnections() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{ _id: string, name: string, email: string, avatar: string }[]>([])
  const toast = useToast()
  const { mutate: getUsers, data: users } = useUsers()
  const { mutate: addConnection } = useAddConnection();
  const { data: connections, isPending, mutate: getConnections } = useGetConnections();
  const { mutate: acceptConnection } = useAcceptConnection();

  useEffect(() => {
    getUsers()
    getConnections()
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

    getConnections()

    toast({
      title: 'Connection request sent',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const acceptConnectionRequest = (userId: string) => {
    const connection = connections?.find((connection: any) => connection.recipient == session?.user.id && connection.requester == userId && connection.status.toLowerCase() === "pending")
    if (connection) {
      acceptConnection({
        _id: connection._id,
      })
    }

    getConnections()
  }

  const rejectConnectionRequest = (userId: string) => {
    // In a real application, this would be an API call
  }

  return (
    <Box className="max-w-2xl mx-auto">
      <VStack spacing={4} align="stretch">
        <HStack>
          <Input
            placeholder="Search by username or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow text-sm"
          />
          <Button variant="outline" onClick={handleSearch}>
            <Search className="w-4 h-4" />
          </Button>
        </HStack>

        {searchResults.length > 0 && (
          <VStack align="stretch" spacing={2}>
            <Text fontWeight="bold" className="text-lg">Search Results</Text>
            {searchResults.map((user) => (
              <HStack key={user._id} className="bg-white p-3 rounded-lg shadow-sm">
                <Avatar src={user.avatar} name={user.name} size="sm" />
                <VStack align="start" spacing={0} className="flex-grow">
                  <Text fontWeight="semibold">{user.name}</Text>
                  <Text fontSize="sm" color="gray.600">{user.email}</Text>
                </VStack>
                <Button
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => sendConnectionRequest(user._id)}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </HStack>
            ))}
          </VStack>
        )}

        <Divider />

        <VStack align="stretch" spacing={2}>
          {/* <Text fontWeight="bold" className="text-lg">Suggested Connections</Text> */}
          {users?.map((user: any) => (
            <HStack key={user._id} className="bg-white p-3 rounded-lg shadow-sm">
              <Flex gap={2} flexDirection="column">
                <Flex gap={2}>
                  <Avatar src={user.avatar} name={user.name} size="sm" />
                  <VStack align="start" spacing={0} className="flex-grow">
                    <Text fontWeight="semibold">{user.name}</Text>
                    <Text fontSize="sm" color="gray.600">{user.email}</Text>
                  </VStack>
                </Flex>
                {
                  connections?.find((connection: any) => connection.recipient == session?.user.id && connection.requester == user._id && connection.status.toLowerCase() === "pending") ?
                    <Flex gap={2}>
                      <Button size="sm" colorScheme="blue" variant="outline" onClick={() => acceptConnectionRequest(user._id)}>
                        <Check className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                      <Button size="sm" colorScheme="red" variant="outline" onClick={() => rejectConnectionRequest(user._id)}>
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </Flex>
                    :
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => sendConnectionRequest(user._id)}
                    >
                      <StatusIcon status={connections?.find((connection: any) => (connection.recipient === session?.user.id || connection.requester === session?.user.id) && (connection.requester === user._id || connection.recipient === user._id))?.status} />
                      {connections?.find((connection: any) => (connection.recipient === session?.user.id || connection.requester === session?.user.id) && (connection.requester === user._id || connection.recipient === user._id))?.status ?? "Connect"}
                    </Button>}
              </Flex>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  )
}