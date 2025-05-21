'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { FaGoogle, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SiGlassdoor, SiIndeed, SiQuora, SiReddit, SiWikipedia } from "react-icons/si";

interface TechField {
  title: string;
  description: string;
  skills: string[];
  details: string;
}

interface TechGroup {
  name: string;
  description: string;
  fields: TechField[];
}

const techGroups: TechGroup[] = [
  {
    name: "Software Development",
    description: "Build and maintain software applications",
    fields: [
      {
        title: "Frontend Development",
        description: "Create user interfaces and interactive web applications",
        skills: ["HTML", "CSS", "JavaScript", "React", "Angular", "Vue.js", "UI/UX"],
        details: "Frontend developers focus on creating the visual and interactive elements that users see and interact with. They work closely with designers and ensure websites are responsive and accessible."
      },
      {
        title: "Backend Development",
        description: "Build server-side applications and APIs",
        skills: ["Python", "Java", "C#", "Node.js", "Databases", "API Design", "Server Management"],
        details: "Backend developers handle server-side logic, database management, and API development. They ensure data is processed securely and efficiently."
      },
      {
        title: "Full Stack Development",
        description: "Work on both frontend and backend technologies",
        skills: ["Frontend", "Backend", "DevOps", "System Design", "Database Management"],
        details: "Full stack developers have broad knowledge of both frontend and backend development, allowing them to build complete applications from start to finish."
      },
      {
        title: "Mobile Development",
        description: "Create applications for mobile devices",
        skills: ["Swift", "Kotlin", "React Native", "Flutter", "Mobile UI Design"],
        details: "Mobile developers specialize in building applications for iOS, Android, or cross-platform solutions. They focus on creating smooth experiences optimized for mobile devices."
      },
      {
        title: "Game Development",
        description: "Design and develop video games",
        skills: ["Unity", "Unreal Engine", "C++", "3D Modeling", "Game Physics"],
        details: "Game developers create interactive entertainment software, combining programming, art, sound design, and storytelling to build engaging gaming experiences."
      },
      {
        title: "DevOps Engineering",
        description: "Bridge development and operations for faster delivery",
        skills: ["CI/CD", "Docker", "Kubernetes", "Cloud Platforms", "Automation"],
        details: "DevOps engineers implement practices that automate and integrate the processes between software development and IT operations, focusing on continuous delivery and infrastructure management."
      },
      {
        title: "Embedded Systems Development",
        description: "Program software for specialized hardware devices",
        skills: ["C", "C++", "Microcontrollers", "IoT", "Hardware Interfaces"],
        details: "Embedded developers write software for specific hardware beyond traditional computers, such as IoT devices, automotive systems, and industrial equipment."
      }
    ]
  },
  {
    name: "Data & Analytics",
    description: "Work with data to derive insights and build data solutions",
    fields: [
      {
        title: "Data Science",
        description: "Analyze data and build predictive models",
        skills: ["Python", "R", "Statistics", "Machine Learning", "Data Visualization"],
        details: "Data scientists use statistical methods and machine learning to analyze complex data and provide actionable insights for business decisions."
      },
      {
        title: "Data Engineering",
        description: "Build and maintain data infrastructure",
        skills: ["ETL", "Big Data", "Data Warehousing", "SQL", "Apache Spark"],
        details: "Data engineers design and build systems to collect, store, and process large amounts of data, making it accessible for analysis."
      },
      {
        title: "Data Analysis",
        description: "Interpret data to support business decisions",
        skills: ["SQL", "Excel", "Power BI", "Tableau", "Statistical Analysis"],
        details: "Data analysts examine data sets to identify trends, create visualizations, and generate reports that help businesses make informed decisions."
      },
      {
        title: "Machine Learning Engineering",
        description: "Implement and deploy ML models at scale",
        skills: ["Python", "TensorFlow", "PyTorch", "MLOps", "Cloud ML Services"],
        details: "ML engineers focus on implementing machine learning models in production environments, optimizing them for performance and scalability."
      },
      {
        title: "Business Intelligence",
        description: "Transform data into actionable business insights",
        skills: ["SQL", "Data Warehousing", "Dashboard Design", "Tableau", "Power BI"],
        details: "BI professionals create systems to collect, analyze, and present business data to help organizations make strategic decisions."
      }
    ]
  },
  {
    name: "Cybersecurity",
    description: "Protect systems, networks, and data from digital attacks",
    fields: [
      {
        title: "Security Engineering",
        description: "Design and implement security solutions",
        skills: ["Network Security", "Cryptography", "Security Frameworks", "Programming"],
        details: "Security engineers build systems, methods, and processes to protect digital assets from threats and vulnerabilities."
      },
      {
        title: "Penetration Testing",
        description: "Identify and exploit security vulnerabilities",
        skills: ["Ethical Hacking", "Security Tools", "Vulnerability Assessment", "Social Engineering"],
        details: "Penetration testers (ethical hackers) simulate cyberattacks to identify security weaknesses before malicious actors can exploit them."
      },
      {
        title: "Security Operations",
        description: "Monitor and respond to security incidents",
        skills: ["SIEM", "Threat Detection", "Incident Response", "Digital Forensics"],
        details: "Security operations professionals monitor systems for security breaches and respond to incidents, implementing protocols to mitigate damage."
      },
      {
        title: "Identity and Access Management",
        description: "Control access to resources and systems",
        skills: ["Authentication Systems", "Directory Services", "Access Control", "Security Policies"],
        details: "IAM specialists ensure that the right individuals have appropriate access to technological resources, implementing and managing permission systems."
      },
      {
        title: "Governance, Risk, and Compliance",
        description: "Manage security regulations and policies",
        skills: ["Security Frameworks", "Risk Assessment", "Auditing", "Compliance Standards"],
        details: "GRC professionals develop and enforce security policies, ensuring organizations meet regulatory requirements and industry standards."
      }
    ]
  },
  {
    name: "Cloud Computing",
    description: "Design and manage cloud-based services and infrastructure",
    fields: [
      {
        title: "Cloud Architecture",
        description: "Design scalable cloud solutions",
        skills: ["AWS", "Azure", "GCP", "Infrastructure as Code", "System Design"],
        details: "Cloud architects design and oversee the implementation of cloud computing strategies, ensuring optimal performance, security, and cost-efficiency."
      },
      {
        title: "Cloud Engineering",
        description: "Build and maintain cloud infrastructure",
        skills: ["Terraform", "CloudFormation", "Kubernetes", "Containerization", "Microservices"],
        details: "Cloud engineers implement and manage infrastructure in cloud environments, focusing on automation, scalability, and reliability."
      },
      {
        title: "Cloud Security",
        description: "Secure cloud environments and applications",
        skills: ["Identity Management", "Security Controls", "Compliance", "Network Security"],
        details: "Cloud security specialists protect cloud-based systems and data, implementing security measures specific to cloud environments."
      },
      {
        title: "Site Reliability Engineering",
        description: "Ensure system reliability and performance",
        skills: ["Monitoring", "Automation", "Incident Response", "Performance Optimization"],
        details: "SREs apply software engineering principles to infrastructure and operations problems, focusing on system availability, latency, and efficiency."
      }
    ]
  },
  {
    name: "Artificial Intelligence & ML",
    description: "Create systems that can learn and make decisions",
    fields: [
      {
        title: "Machine Learning Research",
        description: "Develop new ML algorithms and approaches",
        skills: ["Advanced Mathematics", "Research Methodologies", "ML Frameworks", "Academic Publishing"],
        details: "ML researchers advance the field by developing new algorithms, models, and theoretical approaches to machine learning problems."
      },
      {
        title: "Natural Language Processing",
        description: "Build systems that understand human language",
        skills: ["Linguistics", "Deep Learning", "Text Processing", "Transformer Models"],
        details: "NLP specialists develop systems that can understand, interpret, and generate human language, working on applications like chatbots and language translation."
      },
      {
        title: "Computer Vision",
        description: "Create systems that can interpret visual information",
        skills: ["Image Processing", "Deep Learning", "Pattern Recognition", "Neural Networks"],
        details: "Computer vision engineers build systems that can analyze and interpret images and video, used in applications from facial recognition to medical imaging."
      },
      {
        title: "AI Ethics",
        description: "Address ethical implications of AI systems",
        skills: ["Ethics", "Policy Analysis", "AI Systems", "Social Impact Assessment"],
        details: "AI ethics professionals work to ensure AI systems are designed and deployed responsibly, addressing issues like bias, privacy, and societal impact."
      },
      {
        title: "Robotics",
        description: "Develop intelligent physical systems",
        skills: ["Control Systems", "Sensor Integration", "Motion Planning", "Computer Vision"],
        details: "Robotics engineers combine AI with mechanical and electrical engineering to create robots and autonomous systems that can sense and interact with the world."
      }
    ]
  },
  {
    name: "User Experience & Design",
    description: "Create intuitive and engaging user experiences",
    fields: [
      {
        title: "UX Design",
        description: "Design user-friendly digital experiences",
        skills: ["User Research", "Wireframing", "Usability Testing", "Information Architecture"],
        details: "UX designers focus on understanding user needs and behaviors to create intuitive, accessible, and enjoyable digital experiences."
      },
      {
        title: "UI Design",
        description: "Create visually appealing interfaces",
        skills: ["Visual Design", "Typography", "Color Theory", "Design Systems"],
        details: "UI designers focus on the visual aspects of interfaces, creating aesthetically pleasing designs that align with brand identity and enhance usability."
      },
      {
        title: "Product Design",
        description: "Design complete product experiences",
        skills: ["UX/UI", "Product Strategy", "Design Thinking", "Prototyping"],
        details: "Product designers combine UX and UI skills with product strategy to create cohesive product experiences that meet user needs and business goals."
      },
      {
        title: "Interaction Design",
        description: "Design how users interact with systems",
        skills: ["Motion Design", "Microinteractions", "User Flows", "Behavior Design"],
        details: "Interaction designers focus specifically on how users interact with systems, designing intuitive flows and meaningful feedback mechanisms."
      },
      {
        title: "Research",
        description: "Understand user needs and behaviors",
        skills: ["User Interviews", "Usability Testing", "Data Analysis", "Research Methodologies"],
        details: "UX researchers use various methods to gather insights about users, informing design decisions with empirical data about user needs and behaviors."
      }
    ]
  },
  {
    name: "IT & Operations",
    description: "Maintain and support technology infrastructure",
    fields: [
      {
        title: "Network Administration",
        description: "Manage computer networks",
        skills: ["Networking Protocols", "Router Configuration", "Network Security", "Troubleshooting"],
        details: "Network administrators design, implement, and maintain the communication networks that connect computer systems within organizations."
      },
      {
        title: "Systems Administration",
        description: "Maintain computer systems and servers",
        skills: ["Operating Systems", "Server Management", "Automation", "Troubleshooting"],
        details: "System administrators keep computer systems running smoothly, managing operating systems, software deployment, and system security."
      },
      {
        title: "IT Support",
        description: "Provide technical assistance to users",
        skills: ["Troubleshooting", "Customer Service", "Technical Documentation", "Help Desk Systems"],
        details: "IT support professionals help users resolve technical issues, providing assistance with hardware, software, and network problems."
      },
      {
        title: "Database Administration",
        description: "Manage database systems",
        skills: ["SQL", "Database Systems", "Data Modeling", "Performance Tuning"],
        details: "Database administrators design, implement, maintain, and secure database systems to ensure data availability, integrity, and performance."
      }
    ]
  },
  {
    name: "Product & Project Management",
    description: "Lead and coordinate tech projects and products",
    fields: [
      {
        title: "Product Management",
        description: "Define and guide product development",
        skills: ["Product Strategy", "Market Research", "Roadmapping", "Stakeholder Management"],
        details: "Product managers define product vision and strategy, working with cross-functional teams to bring products to market that meet user needs and business goals."
      },
      {
        title: "Project Management",
        description: "Plan and execute projects",
        skills: ["Project Planning", "Resource Allocation", "Risk Management", "Agile/Scrum"],
        details: "Project managers plan, execute, and close projects, coordinating resources and stakeholders to deliver projects on time and within budget."
      },
      {
        title: "Program Management",
        description: "Coordinate multiple related projects",
        skills: ["Strategic Planning", "Cross-Project Coordination", "Change Management", "Portfolio Management"],
        details: "Program managers oversee groups of related projects, managing dependencies and ensuring alignment with broader organizational objectives."
      },
      {
        title: "Technical Product Management",
        description: "Product management with technical focus",
        skills: ["Technical Knowledge", "Product Management", "System Architecture", "API Design"],
        details: "Technical product managers combine product management skills with deep technical knowledge to guide the development of complex technical products."
      }
    ]
  },
  {
    name: "Quality Assurance & Testing",
    description: "Ensure software quality and reliability",
    fields: [
      {
        title: "Manual Testing",
        description: "Test software manually to find defects",
        skills: ["Test Cases", "Bug Reporting", "User Scenarios", "Exploratory Testing"],
        details: "Manual testers methodically check software functionality to identify bugs and usability issues that automated tests might miss."
      },
      {
        title: "Automation Testing",
        description: "Develop automated test scripts",
        skills: ["Selenium", "Test Frameworks", "Programming", "CI/CD Integration"],
        details: "Test automation engineers create scripts and frameworks to automate repetitive testing tasks, enabling continuous testing in development pipelines."
      },
      {
        title: "Performance Testing",
        description: "Test system performance under load",
        skills: ["Load Testing", "Stress Testing", "Performance Analysis", "JMeter"],
        details: "Performance testers evaluate how systems perform under various conditions, identifying bottlenecks and ensuring systems can handle expected user loads."
      },
      {
        title: "Security Testing",
        description: "Identify security vulnerabilities",
        skills: ["Penetration Testing", "Security Tools", "Vulnerability Assessment", "Risk Analysis"],
        details: "Security testers specifically focus on finding security vulnerabilities and weaknesses in applications before they can be exploited."
      },
      {
        title: "Quality Engineering",
        description: "Build quality into development processes",
        skills: ["Test Strategy", "Quality Metrics", "Process Improvement", "Automation"],
        details: "Quality engineers work to improve the overall development process, implementing practices that prevent defects rather than just finding them."
      }
    ]
  },
  {
    name: "Blockchain & Distributed Systems",
    description: "Build decentralized applications and systems",
    fields: [
      {
        title: "Blockchain Development",
        description: "Build applications on blockchain platforms",
        skills: ["Smart Contracts", "Solidity", "Web3.js", "Blockchain Platforms"],
        details: "Blockchain developers create decentralized applications and smart contracts, working with blockchain platforms like Ethereum to build trustless systems."
      },
      {
        title: "Distributed Systems Engineering",
        description: "Design systems across multiple computers",
        skills: ["Consensus Algorithms", "Fault Tolerance", "Distributed Databases", "System Design"],
        details: "Distributed systems engineers build systems that operate across multiple computers, focusing on coordination, fault tolerance, and consistency."
      },
      {
        title: "Cryptography Engineering",
        description: "Implement cryptographic systems",
        skills: ["Cryptographic Algorithms", "Security Protocols", "Mathematics", "Security Analysis"],
        details: "Cryptography engineers implement and design secure systems using cryptographic techniques to ensure data confidentiality, integrity, and authentication."
      }
    ]
  },
  {
    name: "Mixed Reality & Gaming",
    description: "Create immersive digital experiences",
    fields: [
      {
        title: "Augmented Reality Development",
        description: "Create applications that blend virtual and real worlds",
        skills: ["ARKit", "ARCore", "3D Modeling", "Spatial Computing"],
        details: "AR developers create applications that overlay digital content on the physical world, building experiences for mobile devices, headsets, and other platforms."
      },
      {
        title: "Virtual Reality Development",
        description: "Build immersive virtual environments",
        skills: ["Unity", "Unreal Engine", "3D Design", "Interaction Design"],
        details: "VR developers create fully immersive digital experiences, focusing on realistic environments and intuitive interactions for VR headsets."
      },
      {
        title: "Game Design",
        description: "Create concepts and mechanics for games",
        skills: ["Game Mechanics", "Level Design", "Narrative Design", "User Psychology"],
        details: "Game designers develop the rules, challenges, and overall player experience of games, balancing fun, difficulty, and engagement."
      },
      {
        title: "3D Modeling & Animation",
        description: "Create 3D assets for games and applications",
        skills: ["Blender", "Maya", "Texturing", "Rigging", "Animation"],
        details: "3D artists create models, environments, characters, and animations for games, VR/AR applications, and other interactive media."
      }
    ]
  },
  {
    name: "Technical Communication & Education",
    description: "Explain complex technical concepts",
    fields: [
      {
        title: "Technical Writing",
        description: "Create technical documentation",
        skills: ["Writing", "Information Architecture", "Documentation Tools", "Technical Knowledge"],
        details: "Technical writers create clear, concise documentation for technical products, helping users understand how to use complex systems effectively."
      },
      {
        title: "Developer Relations",
        description: "Build relationships with developer communities",
        skills: ["Communication", "Community Building", "Technical Knowledge", "Public Speaking"],
        details: "Developer relations professionals serve as a bridge between companies and external developers, creating resources and fostering community engagement."
      },
      {
        title: "Technical Training",
        description: "Teach technical skills to others",
        skills: ["Teaching", "Curriculum Design", "Technical Knowledge", "Assessment"],
        details: "Technical trainers develop and deliver educational content for technical topics, helping others learn new technologies and skills."
      },
      {
        title: "Developer Advocacy",
        description: "Advocate for developers' needs",
        skills: ["Public Speaking", "Content Creation", "Technical Knowledge", "Community Management"],
        details: "Developer advocates promote platforms and tools to developers while bringing developer feedback back to product teams to improve offerings."
      }
    ]
  }
];

interface TechFieldsSuggestionProps {
  onSelect: (field: string) => void;
  suggestedPaths?: string[];
  onClearSuggestions?: () => void;
  onFinish?: (careerPath: string) => void;
}

export default function TechFieldsSuggestion({
  onSelect,
  suggestedPaths,
  onClearSuggestions,
  onFinish
}: TechFieldsSuggestionProps) {
  const [selectedGroup, setSelectedGroup] = useState<TechGroup | null>(null);
  const [selectedField, setSelectedField] = useState<TechField | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Function to get all fields from all groups
  const getAllFields = () => {
    return techGroups.flatMap(group => group.fields);
  };

  // Function to get suggested fields
  const getSuggestedFields = () => {
    const allFields = getAllFields();

    if (selectedGroup) {
      return selectedGroup.fields;
    }

    return suggestedPaths && suggestedPaths?.length > 0
      ? allFields.filter(field => suggestedPaths.includes(field.title))
      : allFields;
  };

  return (
    <div className="space-y-6">
      {/* Add back button to clear suggestions and show groups */}
      {selectedGroup && (
        <Button
          variant="ghost"
          onClick={() => {
            setSelectedGroup(null);
            setSelectedField(null);
            setIsModalOpen(false);
          }}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeftIcon className="w-4 h-4" /> Back
        </Button>
      )}
      {(suggestedPaths && suggestedPaths?.length > 0) || selectedGroup ? (
        // Show personalized recommendations
        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              Recommended Fields Based on Your Preferences
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              These fields match your work style and interests
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getSuggestedFields().map((field, index) => (
              <Card
                key={index}
                className="bg-[#222222] border-2 border-[#8A2EFF] hover:border-[#7325D4] cursor-pointer"
                onClick={() => {
                  setSelectedField(field);
                  setIsModalOpen(true);
                  setSelectedCourse(field.title);
                }}
              >
                <CardHeader>
                  <CardTitle className="text-white">{field.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {field.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">Key Skills:</div>
                    <div className="flex flex-wrap gap-2">
                      {field.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-[#333333] text-white text-sm px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
          <div className="p-4 text-center">
            <Button
              variant="ghost"
              onClick={onClearSuggestions}
              className="text-gray-400 hover:text-white"
            >
              View All Fields →
            </Button>
          </div>
        </Card>
      ) : (
        // Show all groups
        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              Explore Tech Fields
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Choose a field group to see specific roles and opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techGroups.map((group, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setSelectedGroup(group)}
                className="!h-auto min-h-[70px] !p-3 text-left flex flex-col items-start gap-1 !border-[#8A2EFF] hover:!border-[#7325D4]"
              >
                <div className="font-bold text-white">{group.name}</div>
                <div className="text-sm text-gray-400 max-w-[300px] text-wrap">
                  <p>{group.description}</p>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#2A2A2A] border-[#444444] max-w-[50vw]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              About {selectedField?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <p className="text-gray-400">{selectedField?.details}</p>
              <Button
                variant="outline"
                onClick={() => {
                  onSelect(selectedField!.title);
                  setIsModalOpen(false);
                  onFinish?.(selectedField!.title);
                }}
                className="w-full bg-[#8A2EFF] hover:bg-[#7325D4] text-white mt-4"
              >
                Choose This Path
              </Button>
            </div>
            <div className="flex flex-col gap-4 flex-1 bg-[#222222] border-2 border-[#8A2EFF] p-4 rounded-lg overflow-y-auto">
              {/* More information about the occupation */}
              <a href={`http://youtube.com/results?search_query=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-gray-400 hover:text-[#8A2EFF] flex items-center gap-2"><FaYoutube className="w-4 h-4" /> Youtube Learn more</a>
              <a href={`https://www.google.com/search?q=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-gray-400 hover:text-[#8A2EFF] flex items-center gap-2 "><FaGoogle className="w-4 h-4" /> Google Learn more</a>
              <a href={`https://www.linkedin.com/search/results/learning/?keywords=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-gray-400 hover:text-[#8A2EFF] flex items-center gap-2 "><FaLinkedin className="w-4 h-4" /> LinkedIn Learn more</a>
              <a href={`https://www.indeed.com/jobs?q=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-gray-400 hover:text-[#8A2EFF] flex items-center gap-2 "><SiIndeed className="w-4 h-4" /> Indeed Learn more</a>
              <a href={`https://www.glassdoor.com/search/?q=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-gray-400 hover:text-[#8A2EFF] flex items-center gap-2 "><SiGlassdoor className="w-4 h-4" /> Glassdoor Learn more</a>
              <a href={`https://www.reddit.com/search?q=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-gray-400 hover:text-[#8A2EFF] flex items-center gap-2 "><SiReddit className="w-4 h-4" /> Reddit Learn more</a>
              <a href={`https://www.quora.com/search?q=${selectedCourse?.split(' ').join('+')}`} target="_blank" className="text-sm text-gray-400 hover:text-[#8A2EFF] flex items-center gap-2 "><SiQuora className="w-4 h-4" /> Quora Learn more</a>
              <a href={`https://www.wikipedia.org/wiki/${selectedCourse?.split(' ').join('_')}`} target="_blank" className="text-sm text-gray-400 hover:text-[#8A2EFF] flex items-center gap-2 "><SiWikipedia className="w-4 h-4" /> Wikipedia Learn more</a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 