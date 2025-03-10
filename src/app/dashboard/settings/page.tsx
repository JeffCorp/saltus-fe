"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Edit, HelpCircle } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#111111] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
          Settings
        </h1>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="bg-[#1A1A1A] border-[#333333]">
            {["profile", "subscriptions", "notifications", "privacy", "security", "help"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-[#222222] text-white"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-gray-400">Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    className="bg-[#222222] border-[#444444] text-white hover:bg-[#333333]"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Full Name</Label>
                    <Input
                      defaultValue="John Doe"
                      className="bg-[#222222] border-[#444444] text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Email</Label>
                    <Input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="bg-[#222222] border-[#444444] text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Bio</Label>
                    <Textarea
                      defaultValue="Software developer passionate about creating user-friendly applications."
                      className="bg-[#222222] border-[#444444] text-white min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Location</Label>
                    <Input
                      defaultValue="New York, USA"
                      className="bg-[#222222] border-[#444444] text-white"
                    />
                  </div>

                  <Button className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">Subscription Management</CardTitle>
                <CardDescription className="text-gray-400">Manage your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Card className="bg-[#222222] border-[#444444]">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Current Plan: Pro</h3>
                    <p className="text-gray-400 mb-4">Your subscription renews on May 1, 2024</p>
                    <div className="flex gap-4">
                      <Button className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white">
                        Upgrade Plan
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-transparent border-[#444444] text-white hover:bg-[#333333]"
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Payment Method</h3>
                  <div className="flex items-center gap-4 text-gray-300">
                    <CreditCard className="h-5 w-5" />
                    <span>Visa ending in 1234</span>
                    <Button
                      variant="outline"
                      className="bg-transparent border-[#444444] text-white hover:bg-[#333333]"
                    >
                      Update
                    </Button>
                  </div>
                  <Button className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white">
                    Add New Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription className="text-gray-400">Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Email Notifications</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Push Notifications</Label>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">New Messages</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Mentions</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Product Updates</Label>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Button className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">Privacy Settings</CardTitle>
                <CardDescription className="text-gray-400">Control your privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Profile Visibility</Label>
                    <Select className="w-[200px] bg-[#222222] border-[#444444] text-white">
                      <option value="public">Public</option>
                      <option value="connections">Connections Only</option>
                      <option value="private">Private</option>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Show in Search Results</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Activity Visibility</Label>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Data Usage</h3>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Allow Data Collection for Personalization</Label>
                    <Switch />
                  </div>
                </div>

                <Button className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white">
                  Update Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription className="text-gray-400">Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Change Password</h3>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Current Password"
                      className="bg-[#222222] border-[#444444] text-white"
                    />
                    <Input
                      type="password"
                      placeholder="New Password"
                      className="bg-[#222222] border-[#444444] text-white"
                    />
                    <Input
                      type="password"
                      placeholder="Confirm New Password"
                      className="bg-[#222222] border-[#444444] text-white"
                    />
                  </div>
                  <Button className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white">
                    Update Password
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Enable Two-Factor Authentication</Label>
                    <Switch />
                  </div>
                  <Button className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white">
                    Set Up Two-Factor Authentication
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Login History</h3>
                  <p className="text-gray-400">View and manage your recent login activity</p>
                  <Button
                    variant="outline"
                    className="bg-transparent border-[#444444] text-white hover:bg-[#333333]"
                  >
                    View Login History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">Help & Support</CardTitle>
                <CardDescription className="text-gray-400">Get help and support for your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Frequently Asked Questions</h3>
                  <p className="text-gray-400">Find answers to common questions about our platform.</p>
                  <Button
                    variant="outline"
                    className="bg-transparent border-[#444444] text-white hover:bg-[#333333]"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    View FAQs
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Contact Support</h3>
                  <p className="text-gray-400">Need help? Our support team is here to assist you.</p>
                  <Button className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white">
                    Contact Support
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">User Guide</h3>
                  <p className="text-gray-400">Learn how to make the most of our platform features.</p>
                  <Button
                    variant="outline"
                    className="bg-transparent border-[#444444] text-white hover:bg-[#333333]"
                  >
                    View User Guide
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Account Deletion</h3>
                  <p className="text-gray-400">Want to delete your account? Please note this action is irreversible.</p>
                  <Button
                    variant="outline"
                    className="bg-transparent border-[#FF4B4B] text-[#FF4B4B] hover:bg-[#FF4B4B] hover:text-white"
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}