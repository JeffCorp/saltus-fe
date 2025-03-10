'use client'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select } from "@/components/ui/select"
import { useCreateProject, useGetScenarios } from "@/services/useProjects"
import { useGetSkillsByUserId } from "@/services/useSkills"
import { Badge, Box, Button, Checkbox, Flex, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import { FaInfoCircle } from "react-icons/fa"

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced']
const reportFrequencies = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly']

const scenariosByDifficulty = {
  'Beginner': ['Basic Project Management', 'Team Communication', 'Simple Budget Planning'],
  'Mid-level': ['Agile Development', 'Stakeholder Management', 'Risk Assessment'],
  'Experienced': ['Enterprise Software Implementation', 'Global Team Coordination', 'Complex Budget Optimization']
}

export function NewProjectSimulation({ isOpen, onOpen, onClose }: { isOpen: boolean, onOpen: () => void, onClose: () => void }) {
  const [difficulty, setDifficulty] = useState('')
  const { data: session } = useSession();
  const [reportFrequency, setReportFrequency] = useState('')
  const [selectedScenario, setSelectedScenario] = useState('')
  const [collaborators, setCollaborators] = useState([''])
  const [estimatedTimeFrame, setEstimatedTimeFrame] = useState(2)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { data: skills, mutate: getSkillsByUserId } = useGetSkillsByUserId();
  const { mutate: createProject, isSuccess: isSuccessCreation, status } = useCreateProject({
    onSuccess: () => {
      // Reset form
      setDifficulty('');
      setReportFrequency('');
      setSelectedScenario('');
      setCollaborators(['']);
      setEstimatedTimeFrame(2);
      setAcceptedTerms(false);

      onClose();
      // toast.success('Project created successfully');
    },
    onError: (error) => {
      console.log(error);

      // toast.error(error?.message || 'Failed to create project');
    }
  });
  const { mutate: getScenarios, isPending: isLoadingScenarios, data: scenarios } = useGetScenarios();

  const handleAddCollaborator = () => {
    setCollaborators([...collaborators, ''])
  }

  const handleCollaboratorChange = (index: number, value: string) => {
    const newCollaborators = [...collaborators]
    newCollaborators[index] = value
    setCollaborators(newCollaborators)
  }

  const handleStartProject = () => {
    createProject({
      difficulty,
      reportFrequency,
      selectedScenario: `
      ${scenarios?.map((scenario: { topic: string; description: string }, i: number) => (
        `${scenario.topic}: ${scenario.description} \n`
      ))}
      `,
      collaborators: collaborators.filter(c => c !== ''),
      duration: estimatedTimeFrame,
      id: ""
    })
  }

  useEffect(() => {
    console.log(session?.user);

    if (session?.user?.id)
      getSkillsByUserId(session?.user?.id)
  }, [session?.user?.id])

  return (
    <>
      <Flex justify="center" align="center" className="mt-4">
        <Button onClick={onOpen}>Start a New Project Simulation</Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Project Simulation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={4}>
              <Box flex={1}>
                <p>
                  Configure your new project simulation. You can adjust these settings to match your learning goals.
                </p>
                <Badge variant="subtle" p="5px" color="blue.600" style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                  <FaInfoCircle style={{ width: "50px", height: "50px" }} />
                  <Text style={{ textWrap: "wrap" }}>
                    Kindly note the documents, images, or proofs used in your project simulation would not be totally evaluated by the system.
                    We only ensure that proper reporting is done. The validity of the success of your project would be evaluated by the community herein
                    as well as the other communities where you choose to share your portfolio.
                  </Text>
                </Badge>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <RadioGroup id="difficulty" value={difficulty} onValueChange={(value) => {
                      setDifficulty(value)
                      getScenarios({ difficulty: value })
                    }}>
                      {difficultyLevels.map((level) => (
                        <div key={level} className="flex items-center space-x-2 mb-1">
                          <RadioGroupItem value={level} id={level} />
                          <Label htmlFor={level}>{level}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="grid gap-2">
                    <Flex gap={3}>
                      {selectedSkills?.map(skill => <Badge className="rounded-[10px] py-1 px-2">{skill}</Badge>)}
                    </Flex>
                    <Label htmlFor="report-frequency">Preferred skills</Label>
                    <Select value={selectedSkills} style={{ height: 100 }} multiple onChange={(e) => setSelectedSkills(selectedSkills.includes(e.target.value) ? selectedSkills.splice(selectedSkills.indexOf(e.target.value), 1) : [...selectedSkills, e.target.value])}>
                      {skills?.map((skill) => (
                        <option key={skill.id} value={skill.id}>{skill.name}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="report-frequency">Report Frequency</Label>
                    <Select value={reportFrequency} onChange={(e) => setReportFrequency(e.target.value)}>
                      {reportFrequencies.map((frequency) => (
                        <option key={frequency} value={frequency}>{frequency}</option>
                      ))}
                    </Select>
                  </div>
                  {/* {difficulty && (
                    <div className="grid gap-2">
                      <Label htmlFor="scenario">Scenario</Label>
                      <Select value={selectedScenario} onChange={(e) => setSelectedScenario(e.target.value)}>
                        {scenarios?.map((scenario: { topic: string, description: string }) => (
                          <option key={scenario.topic} value={scenario.topic}>{scenario.topic}</option>
                        ))}
                      </Select>
                    </div>
                  )} */}
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
              </Box>
              {difficulty &&
                <Flex flex={1} justify="center" align="center">
                  <Box className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md max-h-[60vh] overflow-y-scroll">
                    {
                      scenarios?.map((scenario: { topic: string, description: string }, i: number) => (
                        <Box key={i}>
                          <h4 className="mb-2 font-bold">{scenario.topic}</h4>
                          <p>
                            {scenario.description}
                          </p>
                        </Box>
                      ))
                    }
                  </Box>
                </Flex>
              }
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" isDisabled={!acceptedTerms} mr={3} onClick={handleStartProject}>
              Start Project
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
