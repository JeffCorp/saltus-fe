'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProfile } from "@/services/useProfile";
import { Spinner, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AtSign, Briefcase, Edit3, GraduationCap, Save, User2 } from "lucide-react";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const Profile = () => {
  const { data: session } = useSession();
  const { profile, isLoading: isLoadingProfile, updateProfile, isUpdating, updateProfileData, isUpdatingProfileData } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    currentRole: '',
    projectedRole: '',
    education: '',
    experience: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        bio: profile.bio || '',
        currentRole: profile.currentRole || '',
        projectedRole: profile.projectedRole || '',
        education: profile.education || '',
        experience: profile.experience || ''
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      updateProfileData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" color="#58CC02" />
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto">
      {/* Header Section */}
      <motion.div
        className="mb-8 bg-[#1A1A1A] p-6 rounded-2xl border border-[#333333]"
        {...fadeInUp}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#58CC02]/10">
              <User2 className="w-6 h-6 text-[#58CC02]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
              <Text className="text-gray-400">Manage your personal information and career goals</Text>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-[#1CB0F6] hover:bg-[#179ad9] text-white flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-[#1A1A1A] border-[#333333] text-white">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <Text fontWeight="bold" className="text-lg mb-4">Basic Information</Text>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <User2 className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-3 rounded-lg bg-[#222222] border border-[#333333] text-white disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <AtSign className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled
                    className="w-full p-3 rounded-lg bg-[#222222] border border-[#333333] text-white disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <Briefcase className="w-4 h-4" />
                    Current Role
                  </label>
                  <input
                    type="text"
                    value={formData.currentRole}
                    onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-3 rounded-lg bg-[#222222] border border-[#333333] text-white disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <GraduationCap className="w-4 h-4" />
                    Target Role
                  </label>
                  <input
                    type="text"
                    value={formData.projectedRole}
                    onChange={(e) => setFormData({ ...formData, projectedRole: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-3 rounded-lg bg-[#222222] border border-[#333333] text-white disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <Text fontWeight="bold" className="text-lg mb-4">Additional Information</Text>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full p-3 rounded-lg bg-[#222222] border border-[#333333] text-white disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    Education
                  </label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-3 rounded-lg bg-[#222222] border border-[#333333] text-white disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    Experience
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full p-3 rounded-lg bg-[#222222] border border-[#333333] text-white disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 pt-4 border-t border-[#333333]">
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-[#222222] hover:bg-[#2A2A2A] text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#58CC02] hover:bg-[#46a102] text-white"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;