"use client"

import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Select,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import { CreditCard, Edit, HelpCircle } from 'lucide-react'

export default function SettingsPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.800')
  const cardBgColor = useColorModeValue('white', 'gray.700')

  return (
    <Box bg={bgColor} minHeight="100vh" py={8}>
      <Container maxW="container.xl">
        <Heading as="h1" size="2xl" mb={8}>
          Settings
        </Heading>
        <Tabs variant="enclosed">
          <TabList mb={4}>
            <Tab>Profile</Tab>
            <Tab>Subscriptions</Tab>
            <Tab>Notifications</Tab>
            <Tab>Privacy</Tab>
            <Tab>Security</Tab>
            <Tab>Help & Support</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
                <ProfileSettings />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
                <SubscriptionSettings />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
                <NotificationSettings />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
                <PrivacySettings />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
                <SecuritySettings />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
                <HelpSupportSettings />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  )
}

function ProfileSettings() {
  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg" mb={4}>Profile Information</Heading>
      <HStack spacing={4}>
        <Avatar size="xl" name="John Doe" src="/placeholder.svg?height=100&width=100" />
        <IconButton aria-label="Edit profile picture" icon={<Edit />} />
      </HStack>
      <FormControl>
        <FormLabel>Full Name</FormLabel>
        <Input defaultValue="John Doe" />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input defaultValue="john.doe@example.com" type="email" />
      </FormControl>
      <FormControl>
        <FormLabel>Bio</FormLabel>
        <Textarea defaultValue="Software developer passionate about creating user-friendly applications." />
      </FormControl>
      <FormControl>
        <FormLabel>Location</FormLabel>
        <Input defaultValue="New York, USA" />
      </FormControl>
      <Button colorScheme="blue">Save Changes</Button>
    </VStack>
  )
}

function SubscriptionSettings() {
  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg" mb={4}>Subscription Management</Heading>
      <Box p={4} borderWidth={1} borderRadius="md">
        <Heading size="md" mb={2}>Current Plan: Pro</Heading>
        <Text mb={4}>Your subscription renews on May 1, 2024</Text>
        <HStack>
          <Button colorScheme="blue">Upgrade Plan</Button>
          <Button variant="outline">Cancel Subscription</Button>
        </HStack>
      </Box>
      <Divider />
      <Heading size="md" mb={4}>Payment Method</Heading>
      <HStack>
        <CreditCard />
        <Text>Visa ending in 1234</Text>
        <Button size="sm" variant="outline">Update</Button>
      </HStack>
      <Button colorScheme="blue">Add New Payment Method</Button>
    </VStack>
  )
}

function NotificationSettings() {
  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg" mb={4}>Notification Preferences</Heading>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Email Notifications
        </FormLabel>
        <Switch id="email-alerts" />
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="push-notifications" mb="0">
          Push Notifications
        </FormLabel>
        <Switch id="push-notifications" />
      </FormControl>
      <Divider />
      <Heading size="md" mb={4}>Notification Types</Heading>
      <VStack align="stretch" spacing={4}>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="new-messages" mb="0">
            New Messages
          </FormLabel>
          <Switch id="new-messages" />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="mentions" mb="0">
            Mentions
          </FormLabel>
          <Switch id="mentions" />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="updates" mb="0">
            Product Updates
          </FormLabel>
          <Switch id="updates" />
        </FormControl>
      </VStack>
      <Button colorScheme="blue" mt={4}>Save Preferences</Button>
    </VStack>
  )
}

function PrivacySettings() {
  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg" mb={4}>Privacy Settings</Heading>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="profile-visibility" mb="0">
          Profile Visibility
        </FormLabel>
        <Select id="profile-visibility" maxW="200px">
          <option value="public">Public</option>
          <option value="connections">Connections Only</option>
          <option value="private">Private</option>
        </Select>
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="search-visibility" mb="0">
          Show in Search Results
        </FormLabel>
        <Switch id="search-visibility" />
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="activity-visibility" mb="0">
          Activity Visibility
        </FormLabel>
        <Switch id="activity-visibility" />
      </FormControl>
      <Divider />
      <Heading size="md" mb={4}>Data Usage</Heading>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="data-collection" mb="0">
          Allow Data Collection for Personalization
        </FormLabel>
        <Switch id="data-collection" />
      </FormControl>
      <Button colorScheme="blue" mt={4}>Update Privacy Settings</Button>
    </VStack>
  )
}

function SecuritySettings() {
  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg" mb={4}>Security Settings</Heading>
      <FormControl>
        <FormLabel>Change Password</FormLabel>
        <Input type="password" placeholder="Current Password" mb={2} />
        <Input type="password" placeholder="New Password" mb={2} />
        <Input type="password" placeholder="Confirm New Password" mb={2} />
        <Button colorScheme="blue" mt={2}>Update Password</Button>
      </FormControl>
      <Divider />
      <Heading size="md" mb={4}>Two-Factor Authentication</Heading>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="2fa" mb="0">
          Enable Two-Factor Authentication
        </FormLabel>
        <Switch id="2fa" />
      </FormControl>
      <Button colorScheme="blue">Set Up Two-Factor Authentication</Button>
      <Divider />
      <Heading size="md" mb={4}>Login History</Heading>
      <Text>View and manage your recent login activity</Text>
      <Button variant="outline">View Login History</Button>
    </VStack>
  )
}

function HelpSupportSettings() {
  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg" mb={4}>Help & Support</Heading>
      <Box>
        <Heading size="md" mb={2}>Frequently Asked Questions</Heading>
        <Text mb={4}>Find answers to common questions about our platform.</Text>
        <Button leftIcon={<HelpCircle />} variant="outline">View FAQs</Button>
      </Box>
      <Divider />
      <Box>
        <Heading size="md" mb={2}>Contact Support</Heading>
        <Text mb={4}>Need help? Our support team is here to assist you.</Text>
        <Button colorScheme="blue">Contact Support</Button>
      </Box>
      <Divider />
      <Box>
        <Heading size="md" mb={2}>User Guide</Heading>
        <Text mb={4}>Learn how to make the most of our platform features.</Text>
        <Button variant="outline">View User Guide</Button>
      </Box>
      <Divider />
      <Box>
        <Heading size="md" mb={2}>Account Deletion</Heading>
        <Text mb={4}>Want to delete your account? Please note this action is irreversible.</Text>
        <Button colorScheme="red" variant="outline">Delete Account</Button>
      </Box>
    </VStack>
  )
}