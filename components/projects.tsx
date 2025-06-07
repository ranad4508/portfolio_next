"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SectionHeading from "./section-heading";

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
  year?: number; // Added year property
}

// Adding years to the projects
const projectsWithYears: Project[] = [
  // 2022 Projects
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
    year: 2022,
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
    year: 2022,
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
    year: 2022,
  },

  // 2023 Projects
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
    year: 2023,
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
    year: 2023,
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
    year: 2023,
  },

  // 2024 Projects
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
    year: 2024,
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
    year: 2024,
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
    year: 2024,
  },
  {
    id: 14,
    title: "Trinity Waterproofing",
    description: "A corporate website for a waterproofing company.",
    image: "/trinitywaterproofing.png",
    category: "web",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    fullDescription:
      "A professional website for Trinity Waterproofing showcasing their services, projects, and expertise in waterproofing solutions. The site features a modern design with responsive layouts and optimized performance.",
    liveDemo: "#",
    sourceCode: "#",
    year: 2024,
  },
  {
    id: 15,
    title: "WAS Media Marketing",
    description: "Digital marketing agency website with portfolio showcase.",
    image: "/wasmediamarketing.png",
    category: "web",
    tech: ["React", "TailwindCSS", "Typescript", "Motion"],
    fullDescription:
      "A dynamic website for WAS Media Marketing that highlights their digital marketing services, client success stories, and marketing strategies. The site includes interactive elements and a comprehensive portfolio section.",
    liveDemo: "https://wasmediamarketing.com/",
    sourceCode: "#",
    year: 2024,
  },
  {
    id: 16,
    title: "Dharma Ideal",
    description: "E-commerce platform for traditional and cultural products.",
    image: "/dharmaideal.png",
    category: "web",
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Typescript",
      "TailwindCSS",
      "Motion",
    ],
    fullDescription:
      "Dharma Ideal is an e-commerce platform specializing in traditional and cultural products. The site features product categorization, user authentication, shopping cart functionality, and secure payment processing.",
    liveDemo: "https://dharmaideal.org/",
    sourceCode: "#",
    year: 2024,
  },

  // 2025 Projects
  {
    id: 19,
    title: "Ngyungne.org",
    description: "A Buddhist event management and donation platform.",
    image: "/ngyungne.png",
    category: "web",
    tech: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB"],
    fullDescription:
      "Ngyungne.org is a spiritual platform built for managing Buddhist fasting events (Ngyungne) and facilitating online donations. It allows users to register for events, make contributions, and receive updates. The admin panel supports event scheduling and user management. Built using the MERN stack, the site is optimized for accessibility, responsiveness, and performance.",
    liveDemo: "https://ngyungne.org",
    sourceCode: "https://github.com/ranad4508/ngyungne",
    year: 2025,
  },

  {
    id: 21,
    title: "Expense Tracker",
    description: "A mobile app to track daily expenses and manage budgets.",
    image: "/expensetracker-native.png",
    category: "mobile",
    tech: ["React Native", "Expo", "JavaScript", "AsyncStorage"],
    fullDescription:
      "The Expense Tracker app helps users manage their daily income and expenses with ease. It features categorized transactions, budget setting, history filtering, and monthly summaries. Built with React Native and Expo for cross-platform compatibility, and uses AsyncStorage for offline data persistence.",
    liveDemo: "https://github.com/ranad4508/expense-tracker",
    sourceCode: "https://github.com/ranad4508/expense-tracker",
    year: 2025,
  },

  {
    id: 22,
    title: "Sijan Shrestha Portfolio",
    description: "A developer portfolio showcasing Sijan Shrestha’s projects.",
    image: "/sijan.png",
    category: "web",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    fullDescription:
      "This portfolio website showcases the work, skills, and experience of developer Sijan Shrestha. Built using Next.js and styled with Tailwind CSS, the site includes animated sections, a blog, contact form, and project showcases. It’s optimized for performance and SEO with responsive design for all devices.",
    liveDemo: "https://sijanshrestha.vercel.app",
    sourceCode: "https://github.com/ranad4508/sijan-portfolio",
    year: 2025,
  },
  {
    id: 23,
    title: "Tek Bahadur Tamang Portfolio",
    description: "Personal portfolio website for Tek Bahadur Tamang.",
    image: "/tek.png",
    category: "web",
    tech: ["Next.js", "React", "Tailwind CSS"],
    fullDescription:
      "A professional portfolio site for Tek Bahadur Tamang to showcase his skills, experience, and projects. Built using Next.js and styled with Tailwind CSS, the site features a clean UI, fast loading speed, and responsive layout. It includes project galleries, contact info, and a downloadable resume.",
    liveDemo: "https://tekbahadur.vercel.app",
    sourceCode: "https://github.com/ranad4508/tek-portfolio",
    year: 2025,
  },
  {
    id: 24,
    title: "Sonam Gyurme Tamang Portfolio",
    description: "A modern developer portfolio for Sonam Gyurme Tamang.",
    image: "/sonam.png",
    category: "web",
    tech: ["Next.js", "React", "Tailwind CSS"],
    fullDescription:
      "This is a personal portfolio website built for Sonam Gyurme Tamang to highlight his technical skills, resume, and projects. Built with Next.js, it leverages server-side rendering for speed and SEO, along with clean UI elements for an engaging presentation.",
    liveDemo: "https://sonamgyurme.vercel.app",
    sourceCode: "https://github.com/ranad4508/sonam-portfolio",
    year: 2025,
  },
  {
    id: 25,
    title: "Resume Builder AI",
    description: "AI-powered resume creation platform with live preview.",
    image: "/resumebuilder.png",
    category: "web",
    tech: ["Next.js", "React", "Tailwind CSS", "OpenAI API"],
    fullDescription:
      "Resume Builder AI allows users to generate professional resumes using AI assistance. Users can input experience, education, and skills, and the AI generates content suggestions. The app offers multiple templates, PDF export, and customization options. Built with Next.js for high performance and API routes integration.",
    liveDemo: "https://resumebuilderai.vercel.app",
    sourceCode: "https://github.com/ranad4508/resume-builder-ai",
    year: 2025,
  },
  {
    id: 26,
    title: "Nepali Land Converter",
    description: "Convert Nepali land units between Ropani, Aana, Paisa, Daam.",
    image: "/nepalilandconverter.png",
    category: "web",
    tech: ["Next.js", "React", "JavaScript", "Tailwind CSS"],
    fullDescription:
      "Nepali Land Converter is a utility web app that helps convert traditional Nepali land units such as Ropani, Aana, Paisa, and Daam to square feet or square meters. It provides real-time conversion, responsive design, and is ideal for students, surveyors, and property buyers.",
    liveDemo: "https://nepaliland.vercel.app",
    sourceCode: "https://github.com/ranad4508/land-converter",
    year: 2025,
  },

  {
    id: 17,
    title: "BTMC Foundation",
    description: "Non-profit organization website with donation system.",
    image: "/btmcfoundation.png",
    category: "web",
    tech: ["React", "TailwindCSS", "Motion", "Node.js", "MongoDB", "Express"],
    fullDescription:
      "A comprehensive website for BTMC Foundation featuring information about their mission, projects, and impact. The site includes a secure donation system, event calendar, and volunteer registration portal.",
    liveDemo: "https://btmcfoundation.org/",
    sourceCode: "#",
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
  },
  {
    id: 18,
    title: "WeatherWise",
    description: "Weather forecasting app with location-based predictions.",
    image: "weatherwise.png",
    category: "web",
    tech: [
      "Next.JS",
      "OpenWeatherMap API",
      "Geolocation",
      "TailwindCSS",
      "Motion",
    ],
    fullDescription:
      "WeatherWise is a comprehensive weather application that provides accurate forecasts, real-time weather updates, and location-based predictions. The app features interactive maps, severe weather alerts, and customizable widgets.",
    liveDemo: "https://weatherwise-next.vercel.app/",
    sourceCode: "https://github.com/ranad4508/weatherwise_next",
    year: 2025,
  },
];

// Group projects by year
const projectsByYear = projectsWithYears.reduce<Record<number, Project[]>>(
  (acc, project) => {
    const year = project.year || 2022;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  },
  {}
);

// Sort years in descending order
const sortedYears = Object.keys(projectsByYear)
  .map(Number)
  .sort((a, b) => b - a);

// Timeline entry component
const TimelineEntry = ({
  year,
  projects,
  index,
}: {
  year: number;
  projects: Project[];
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.8, 1, 1, 0.8]
  );
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [60, 0, 0, -60]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const springOpacity = useSpring(opacity, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springY = useSpring(y, springConfig);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div ref={containerRef} className="relative mb-20 md:mb-32">
      <motion.div
        style={{
          opacity: springOpacity,
          scale: springScale,
          y: springY,
        }}
        className="relative z-10"
      >
        <div className="flex flex-col md:flex-row items-start">
          <div className="sticky top-24 flex-shrink-0 w-full md:w-64 mb-8 md:mb-0 md:mr-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 pb-2">
                {year}
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xs">
                {projects.length} project{projects.length !== 1 ? "s" : ""}{" "}
                completed
              </p>
            </motion.div>
          </div>

          <div className="w-full" ref={ref}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                    }
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="bg-card border border-border/50 rounded-lg overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div className="text-white">
                            <div className="flex items-center">
                              <span className="text-sm font-medium">
                                View Details
                              </span>
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.tech.slice(0, 3).map((tech, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.tech.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tech.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

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
                    width={800}
                    height={450}
                    className="rounded-md object-cover"
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
  );
};

// Timeline connector component
const TimelineConnector = ({
  progress,
  isLast = false,
}: {
  progress: MotionValue<number>;
  isLast?: boolean;
}) => {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  const pathLength = useSpring(scaleY, { stiffness: 100, damping: 30 });

  return (
    <div
      className={`absolute left-4 md:left-auto md:right-[7.5rem] w-px h-full ${
        isLast ? "hidden" : ""
      }`}
    >
      <svg viewBox={`0 0 1 100`} preserveAspectRatio="none">
        <motion.path
          d="M 0,0 L 0,100"
          strokeWidth="2"
          stroke="url(#gradient)"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient
            id="gradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="100"
          >
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default function ProjectTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" className="py-20 relative" ref={containerRef}>
      <div className="container mx-auto px-4">
        <SectionHeading>My Project Journey</SectionHeading>

        <motion.p
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore my development journey through the years, from early learning
          projects to complex applications. Each project represents growth in my
          skills and expertise.
        </motion.p>

        <div className="relative">
          {sortedYears.map((year, index) => (
            <React.Fragment key={year}>
              <TimelineEntry
                year={year}
                projects={projectsByYear[year]}
                index={index}
              />
              <TimelineConnector
                progress={scrollYProgress}
                isLast={index === sortedYears.length - 1}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
