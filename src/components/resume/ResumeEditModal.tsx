import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "@/types/resume";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";

interface ResumeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  onSave: (data: ResumeData) => void;
}

export function ResumeEditModal({ isOpen, onClose, data, onSave }: ResumeEditModalProps) {
  const [editedData, setEditedData] = useState<ResumeData>(data);

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent className="dark:bg-[#222222] bg-white dark:border-[#444444] border-gray-200">
        <ModalHeader className="text-2xl font-bold dark:text-white text-black">
          Edit Resume
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody className="space-y-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white text-black">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="dark:!text-white !text-black">Name</Label>
                <Input
                  value={editedData.name}
                  onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white text-black">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="dark:!text-white !text-black">Email</Label>
                <Input
                  value={editedData.contact.email}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    contact: { ...editedData.contact, email: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label className="dark:!text-white !text-black">Phone</Label>
                <Input
                  value={editedData.contact.phone}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    contact: { ...editedData.contact, phone: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label className="dark:!text-white !text-black">Location</Label>
                <Input
                  value={editedData.contact.location}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    contact: { ...editedData.contact, location: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label className="dark:!text-white !text-black">LinkedIn (optional)</Label>
                <Input
                  value={editedData.contact.linkedin}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    contact: { ...editedData.contact, linkedin: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <Label className="dark:!text-white !text-black">Professional Summary</Label>
            <Textarea
              value={editedData.summary}
              onChange={(e) => setEditedData({ ...editedData, summary: e.target.value })}
              rows={4}
              className="dark:bg-[#222222] bg-white dark:border-[#444444] border-gray-200 dark:text-white text-black"
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label className="dark:!text-white !text-black">Skills (comma-separated)</Label>
            <Input
              value={editedData.skills.join(", ")}
              onChange={(e) => setEditedData({
                ...editedData,
                skills: e.target.value.split(",").map(s => s.trim())
              })}
            />
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white text-black">Experience</h3>
            {editedData.experience.map((exp, index) => (
              <div key={index} className="space-y-4 border dark:border-[#333333] border-gray-200 p-4 rounded">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="dark:!text-white !text-black">Title</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => {
                        const newExp = [...editedData.experience];
                        newExp[index] = { ...exp, title: e.target.value };
                        setEditedData({ ...editedData, experience: newExp });
                      }}
                    />
                  </div>
                  <div>
                    <Label className="dark:!text-white !text-black">Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => {
                        const newExp = [...editedData.experience];
                        newExp[index] = { ...exp, company: e.target.value };
                        setEditedData({ ...editedData, experience: newExp });
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="dark:!text-white !text-black">Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => {
                        const newExp = [...editedData.experience];
                        newExp[index] = { ...exp, location: e.target.value };
                        setEditedData({ ...editedData, experience: newExp });
                      }}
                    />
                  </div>
                  <div>
                    <Label className="dark:!text-white !text-black">Dates</Label>
                    <Input
                      value={exp.dates}
                      onChange={(e) => {
                        const newExp = [...editedData.experience];
                        newExp[index] = { ...exp, dates: e.target.value };
                        setEditedData({ ...editedData, experience: newExp });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label className="dark:!text-white !text-black">Description (one per line)</Label>
                  <Textarea
                    value={exp.description.join("\n")}
                    onChange={(e) => {
                      const newExp = [...editedData.experience];
                      newExp[index] = {
                        ...exp,
                        description: e.target.value.split("\n").map(s => s.trim())
                      };
                      setEditedData({ ...editedData, experience: newExp });
                    }}
                    rows={4}
                    className="dark:bg-[#222222] bg-white dark:border-[#444444] border-gray-200 dark:text-white text-black"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white text-black">Education</h3>
            {editedData.education.map((edu, index) => (
              <div key={index} className="space-y-4 border dark:border-[#333333] border-gray-200 p-4 rounded">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="dark:!text-white !text-black">Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => {
                        const newEdu = [...editedData.education];
                        newEdu[index] = { ...edu, degree: e.target.value };
                        setEditedData({ ...editedData, education: newEdu });
                      }}
                    />
                  </div>
                  <div>
                    <Label className="dark:!text-white !text-black">Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => {
                        const newEdu = [...editedData.education];
                        newEdu[index] = { ...edu, institution: e.target.value };
                        setEditedData({ ...editedData, education: newEdu });
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="dark:!text-white !text-black">Location</Label>
                    <Input
                      value={edu.location}
                      onChange={(e) => {
                        const newEdu = [...editedData.education];
                        newEdu[index] = { ...edu, location: e.target.value };
                        setEditedData({ ...editedData, education: newEdu });
                      }}
                    />
                  </div>
                  <div>
                    <Label className="dark:!text-white !text-black">Dates</Label>
                    <Input
                      value={edu.dates}
                      onChange={(e) => {
                        const newEdu = [...editedData.education];
                        newEdu[index] = { ...edu, dates: e.target.value };
                        setEditedData({ ...editedData, education: newEdu });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label className="dark:!text-white !text-black">Honors/Field of Study</Label>
                  <Input
                    value={edu.honors}
                    onChange={(e) => {
                      const newEdu = [...editedData.education];
                      newEdu[index] = { ...edu, honors: e.target.value };
                      setEditedData({ ...editedData, education: newEdu });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white">
              Save and Generate PDF
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
} 