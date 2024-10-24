import { SkillProgress } from '@/services/useSkillsProgress';
import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface ViewDetailedPlanProps {
  isOpen: boolean;
  onClose: () => void;
  skillsProgress: SkillProgress[];
  careerPath: string;

}

const ViewDetailedPlan: React.FC<ViewDetailedPlanProps> = ({ isOpen, onClose, skillsProgress, careerPath }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillProgress | null>();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detailed Career Path Plan: {careerPath}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* {isLoading && <Text>Loading skills progress...</Text>}
          {error && <Text color="red.500">Error: {error.message}</Text>} */}
          {skillsProgress && (
            <Flex gap={4}>
              <Flex gap={4} flexDirection="column" flex={1}>
                {skillsProgress.map((skill) => (
                  <Box key={skill._id} borderWidth={1} borderRadius="md" p={4} onClick={() => setSelectedSkill(skill)}>
                    <HStack justifyContent="space-between" mb={2}>
                      <Text fontWeight="bold">{typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name}</Text>
                      <Text>{skill.progress}%</Text>
                    </HStack>
                    <Progress value={skill.progress} colorScheme="blue" size="sm" />
                  </Box>
                ))}
              </Flex>
              {selectedSkill && (
                <Box flex={1} p={4} borderWidth={1} borderRadius="md">
                  <Text fontWeight="bold">{typeof selectedSkill.skillModuleId === 'string' ? selectedSkill.skillModuleId : selectedSkill.skillModuleId.name}</Text>
                  <Text>{typeof selectedSkill.skillModuleId === 'string' ? selectedSkill.skillModuleId : selectedSkill.skillModuleId.description}</Text>
                  <Text mt={4}>Skills Targeted: {typeof selectedSkill.skillModuleId === 'string' ? selectedSkill.skillModuleId : selectedSkill.skillModuleId.skillsTargeted.map(skill => skill).join(", ")}</Text>
                </Box>
              )}
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewDetailedPlan;

