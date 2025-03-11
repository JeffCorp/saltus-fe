"use client"

import { SkillProgress } from '@/services/useSkillsProgress'
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface ViewDetailedPlanProps {
  isOpen: boolean
  onClose: () => void
  skillsProgress: SkillProgress[]
  careerPath: string
}

const ViewDetailedPlan: React.FC<ViewDetailedPlanProps> = ({ isOpen, onClose, skillsProgress, careerPath }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillProgress | null>(null)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-[#111111] rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-[#333333]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Career Path Plan:{" "}
              <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                {careerPath}
              </span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto max-h-[calc(90vh-8rem)]">
          {/* Skills List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Required Skills</h3>
            {skillsProgress.map((skill) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedSkill?._id === skill._id
                    ? 'border-[#1CB0F6] bg-[#1CB0F6]/5'
                    : 'border-gray-200 dark:border-[#333333] hover:border-[#1CB0F6] dark:hover:border-[#1CB0F6]'
                  }`}
                onClick={() => setSelectedSkill(skill)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#1CB0F6]" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{skill.progress}%</span>
                    {skill.progress === 100 && (
                      <CheckCircle className="w-5 h-5 text-[#58CC02]" />
                    )}
                  </div>
                </div>
                <div className="relative h-2 bg-gray-100 dark:bg-[#333333] rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#58CC02] to-[#1CB0F6] rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skill Details */}
          {selectedSkill ? (
            <div className="bg-gray-50 dark:bg-[#1A1A1A] p-6 rounded-xl border border-gray-200 dark:border-[#333333]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {typeof selectedSkill.skillModuleId === 'string'
                  ? selectedSkill.skillModuleId
                  : selectedSkill.skillModuleId.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {typeof selectedSkill.skillModuleId === 'string'
                  ? selectedSkill.skillModuleId
                  : selectedSkill.skillModuleId.description}
              </p>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Skills Targeted:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {(typeof selectedSkill.skillModuleId === 'string'
                    ? [selectedSkill.skillModuleId]
                    : selectedSkill.skillModuleId.skillsTargeted
                  ).map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-white dark:bg-[#111111] rounded-lg border border-gray-200 dark:border-[#333333]"
                    >
                      <ArrowRight className="w-4 h-4 text-[#1CB0F6]" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              Select a skill to view details
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ViewDetailedPlan

