"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tech: string[];
  fullDescription: string;
  liveDemo: string;
  sourceCode: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "NextGen: E-Learning System",
    description: "A comprehensive e-learning platform built with PHP.",
    image: "/nextgen.png",
    category: "web",
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Ajax", "JQuery"],
    fullDescription:
      "NextGen is a comprehensive e-learning system that allows instructors to create courses and students to enroll and learn at their own pace. The platform includes features such as video lectures, quizzes, assignments, and a discussion forum.",
    liveDemo: "https://github.com/ranad4508/ProjectI_NextGen",
    sourceCode: "https://github.com/ranad4508/ProjectI_NextGen",
  },
  {
    id: 2,
    title: "GadgetHub: E-Commerce System",
    description:
      "An e-commerce platform for electronic gadgets built with PHP.",
    image: "/gadgethub.png",
    category: "web",
    tech: ["PHP", "MySQL", "JavaScript", "jQuery", "Bootstrap", "Ajax"],
    fullDescription:
      "GadgetHub is an e-commerce platform specializing in electronic gadgets. It features product listings, user authentication, shopping cart, checkout process, and order tracking. The admin panel allows for product and order management.",
    liveDemo: "https://github.com/ranad4508/GadgetHub",
    sourceCode: "https://github.com/ranad4508/GadgetHub",
  },
  {
    id: 3,
    title: "GPT-3: Learning Project",
    description: "A project to learn and implement GPT-3 API with ReactJS.",
    image: "/gpt-3.png",
    category: "web",
    tech: ["ReactJS", "TailwindCSS", "JavaScript", "CSS3"],
    fullDescription:
      "This learning project explores the capabilities of OpenAI's GPT-3 API. It includes various demos showcasing text generation, completion, and conversation capabilities of the model, all built with a clean React interface.",
    liveDemo: "https://dineshgpt-3.netlify.app/",
    sourceCode: "https://github.com/ranad4508/GPT-3-using-react",
  },
  {
    id: 4,
    title: "Portfolio: Personal Site",
    description: "My personal portfolio website built with ReactJS.",
    image: "/portfolio.png",
    category: "web",
    tech: ["ReactJS", "Tailwind CSS", "Framer Motion"],
    fullDescription:
      "My personal portfolio website showcasing my skills, projects, and experience. Built with ReactJS and styled with Tailwind CSS, it features smooth animations powered by Framer Motion and a responsive design for all devices.",
    liveDemo: "https://dineshkumarrana.com.np/",
    sourceCode: "https://github.com/ranad4508/portfolio_next",
  },
  {
    id: 5,
    title: "Dice Game: Interactive Game",
    description: "An interactive dice game built with ReactJS.",
    image: "/dicegame.png",
    category: "web",
    tech: ["ReactJS", "CSS", "JavaScript"],
    fullDescription:
      "A fun and interactive dice game where players can roll dice and compete against each other or the computer. The game includes features like score tracking, game history, and customizable rules.",
    liveDemo: "https://dicegame-dinesh.netlify.app/",
    sourceCode: "https://github.com/ranad4508/dice_game_react",
  },
  {
    id: 6,
    title: "Calculator: Functional App",
    description: "A functional calculator app built with ReactJS.",
    image: "/calculator.png",
    category: "web",
    tech: ["ReactJS", "CSS"],
    fullDescription:
      "A fully functional calculator app with standard and scientific modes. It supports basic arithmetic operations, as well as more advanced functions like trigonometry, logarithms, and exponents.",
    liveDemo: "https://calculator-dinesh.netlify.app/",
    sourceCode: "https://github.com/ranad4508/calculator_react",
  },
  {
    id: 7,
    title: "Expense Tracker: Budgeting App",
    description: "A budgeting app to track expenses built with ReactJS.",
    image: "/expensetracker.png",
    category: "web",
    tech: ["ReactJS", "LocalStorage", "Chart.js"],
    fullDescription:
      "An expense tracking application that helps users manage their finances by recording income and expenses. It includes features like categorization, date filtering, and visual reports using Chart.js.",
    liveDemo: "https://expense-tracker-dinesh.netlify.app/",
    sourceCode: "https://github.com/ranad4508/expense_tracker-using-react",
  },
  {
    id: 8,
    title: "Pawsome Pets",
    description:
      "A static website for a pet adoption center developed using HTML, CSS, and Bootstrap.",
    image: "/pawsomepets.png",
    category: "web",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    fullDescription:
      "Pawsome Pets is a static website designed for a pet adoption center. It features an attractive UI with responsive design, sections for available pets, adoption details, and a contact form.",
    liveDemo: "https://pawsomepet.netlify.app/",
    sourceCode: "https://github.com/ranad4508/pet_shop",
  },
  {
    id: 9,
    title: "Grow & Grace",
    description: "A business website built with HTML, CSS, and Bootstrap.",
    image: "/growandgrace.png",
    category: "web",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    fullDescription:
      "Grow & Grace is a beautifully designed static website for a business brand. It includes sections for services, testimonials, and contact details. The site is fully responsive and optimized for fast loading.",
    liveDemo: "https://growandgrace.netlify.app/",
    sourceCode: "https://github.com/ranad4508/grow_and_grace",
  },
  {
    id: 10,
    title: "E-Mall",
    description:
      "A mobile e-commerce application built with Flutter and Firebase.",
    image: "/emall.jpg",
    category: "mobile",
    tech: [
      "Flutter",
      "Dart",
      "Firestore Database",
      "Firebase",
      "Android Studio",
    ],
    fullDescription:
      "E-Mall is a modern e-commerce mobile application that allows users to browse products, add items to their cart, and make secure transactions. It features real-time database updates using Firestore and seamless authentication with Firebase.",
    liveDemo: "https://github.com/ranad4508/ecommerce_flutter",
    sourceCode: "https://github.com/ranad4508/ecommerce_flutter",
  },
  {
    id: 11,
    title: "Job Sathi",
    description: "A job portal mobile app developed using Java and PHP.",
    image: "/job-sathi.jpg",
    category: "mobile",
    tech: ["Java", "Gradle", "XML", "PHP", "MySQL"],
    fullDescription:
      "Job Sathi is a job portal mobile application designed for job seekers and employers. It provides features like job listings, applications, and resume uploads. The backend is powered by PHP and MySQL, while the frontend is developed using Java and XML in Android Studio.",
    liveDemo: "https://github.com/ranad4508/job_portal_android",
    sourceCode: "https://github.com/ranad4508/job_portal_android",
  },
  {
    id: 12,
    title: "Tab Manager Plus",
    description:
      "A Chrome extension for tab management, clipboard, and auto-fill.",
    image: "/tab-manager.png",
    category: "web",
    tech: ["Bootstrap", "HTML5", "CSS3", "JavaScript"],
    fullDescription:
      "Smart Tab Manager is a powerful Chrome extension designed to enhance productivity. It helps users efficiently manage browser tabs, save clipboard history, and auto-fill repetitive forms. The extension offers a clean UI, quick access to saved data, and customizable settings for a seamless browsing experience.",
    liveDemo: "https://github.com/ranad4508/chrome_extension_tab_manager",
    sourceCode: "https://github.com/ranad4508/chrome_extension_tab_manager",
  },
  {
    id: 13,
    title: "E-Mall Rider",
    description: "A rider app for E-Mall, built with Flutter and Firebase.",
    image: "/emall-rider.jpg",
    category: "mobile",
    tech: [
      "Flutter",
      "Dart",
      "Firestore Database",
      "Firebase",
      "Android Studio",
    ],
    fullDescription:
      "E-Mall Rider is a delivery application designed for riders assigned by the E-Mall admin. It allows riders to manage their assigned orders, update delivery status, and track earnings. The app is built using Flutter for a seamless cross-platform experience, with Firebase handling authentication and Firestore for real-time order updates.",
    liveDemo:
      "https://github.com/ranad4508/ecommerce_flutter/tree/main/rider%20app",
    sourceCode:
      "https://github.com/ranad4508/ecommerce_flutter/tree/main/rider%20app",
  },
];

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto">
        <SectionHeading>Projects</SectionHeading>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-8"
        >
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="web">Web Application</TabsTrigger>
              <TabsTrigger value="mobile">Mobile Application</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-6">
            <div
              ref={ref}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                  >
                    <Card className="h-full flex flex-col overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300 border border-border/50">
                      <div
                        className="relative aspect-video overflow-hidden"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button variant="secondary">View Details</Button>
                        </div>
                      </div>
                      <CardContent className="flex-grow pt-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {project.description}
                        </p>
                      </CardContent>
                      <CardFooter className="flex flex-wrap gap-2 pt-0">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <Badge key={i} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 3 && (
                          <Badge variant="outline">
                            +{project.tech.length - 3}
                          </Badge>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>

        <Dialog
          open={selectedProject !== null}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        >
          <DialogContent className="max-w-3xl sm:max-w-[425px] md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedProject.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="rounded-md overflow-auto mb-4 relative mx-auto">
                    <Image
                      src={selectedProject.image || "/placeholder.svg"}
                      alt={selectedProject.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-auto w-auto"
                    />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground mb-6">
                    {selectedProject.fullDescription}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild>
                      <a
                        href={selectedProject.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href={selectedProject.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Source Code
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
