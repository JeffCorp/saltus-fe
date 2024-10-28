'use client'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select } from "@/components/ui/select"
import { Box, Button, Checkbox, Flex, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { useState } from 'react'

const difficultyLevels = ['Beginner', 'Mid-level', 'Experienced']
const reportFrequencies = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly']

const scenariosByDifficulty = {
  'Beginner': ['Basic Project Management', 'Team Communication', 'Simple Budget Planning'],
  'Mid-level': ['Agile Development', 'Stakeholder Management', 'Risk Assessment'],
  'Experienced': ['Enterprise Software Implementation', 'Global Team Coordination', 'Complex Budget Optimization']
}

export function NewProjectSimulation() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [difficulty, setDifficulty] = useState('')
  const [reportFrequency, setReportFrequency] = useState('')
  const [selectedScenario, setSelectedScenario] = useState('')
  const [collaborators, setCollaborators] = useState([''])
  const [estimatedTimeFrame, setEstimatedTimeFrame] = useState(2)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleAddCollaborator = () => {
    setCollaborators([...collaborators, ''])
  }

  const handleCollaboratorChange = (index: number, value: string) => {
    const newCollaborators = [...collaborators]
    newCollaborators[index] = value
    setCollaborators(newCollaborators)
  }

  const handleStartProject = () => {
    // Here you would typically send the project configuration to your backend
    console.log('Starting new project with configuration:', {
      difficulty,
      reportFrequency,
      selectedScenario,
      collaborators: collaborators.filter(c => c !== ''),
      estimatedTimeFrame,
    })
    onClose()
    // Reset form
    setDifficulty('')
    setReportFrequency('')
    setSelectedScenario('')
    setCollaborators([''])
    setEstimatedTimeFrame(2)
    setAcceptedTerms(false)
  }

  return (
    <>
      <Flex justify="center" align="center" className="mt-4">
        <Button onClick={onOpen}>Start a New Project Simulation</Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Project Simulation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Configure your new project simulation. You can adjust these settings to match your learning goals.
            </p>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <RadioGroup id="difficulty" value={difficulty} onValueChange={setDifficulty}>
                  {difficultyLevels.map((level) => (
                    <div key={level} className="flex items-center space-x-2 mb-1">
                      <RadioGroupItem value={level} id={level} />
                      <Label htmlFor={level}>{level}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="report-frequency">Report Frequency</Label>
                <Select value={reportFrequency} onChange={(e) => setReportFrequency(e.target.value)}>
                  {reportFrequencies.map((frequency) => (
                    <option key={frequency} value={frequency}>{frequency}</option>
                  ))}
                </Select>
              </div>
              {difficulty && (
                <div className="grid gap-2">
                  <Label htmlFor="scenario">Scenario</Label>
                  <Select value={selectedScenario} onChange={(e) => setSelectedScenario(e.target.value)}>

                    {scenariosByDifficulty[difficulty as keyof typeof scenariosByDifficulty].map((scenario) => (
                      <option key={scenario} value={scenario}>{scenario}</option>
                    ))}
                  </Select>
                </div>
              )}
              <div className="grid gap-2">
                <Label>Collaborators (Optional)</Label>
                {collaborators.map((collaborator, index) => (
                  <Input
                    key={index}
                    placeholder={`Collaborator ${index + 1} email`}
                    value={collaborator}
                    onChange={(e) => handleCollaboratorChange(index, e.target.value)}
                  />
                ))}
                <Button type="button" variant="outline" onClick={handleAddCollaborator}>
                  Add Collaborator
                </Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time-frame">Estimated Time Frame</Label>
                <InputGroup>
                  <Input
                    id="time-frame"
                    type="number"
                    value={estimatedTimeFrame}
                    onChange={(e) => setEstimatedTimeFrame(Number(e.target.value))}
                  />
                  <InputRightElement>
                    <Box className="flex items-center justify-center mr-[2rem] bg-gray-200 rounded-md py-1 px-2">
                      <Text>Weeks</Text>
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <Label htmlFor="terms">I accept the terms of the project</Label>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleStartProject}>
              Start Project
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
