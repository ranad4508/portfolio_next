"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useState, useEffect } from "react";

// Define the skill type
interface Skill {
  name: string;
  level: number;
  icon: string;
}

// Define the category type
interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
}

// Define skill categories with proper SVG images
const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: "Programming Languages",
    icon: "/icons/code.svg",
    skills: [
      { name: "JavaScript", level: 85, icon: "/icons/javascript.svg" },
      { name: "TypeScript", level: 80, icon: "/icons/typescript.svg" },
      { name: "Java", level: 70, icon: "/icons/java-svgrepo-com.svg" },
      { name: "C", level: 65, icon: "/icons/c.png" },
      { name: "C++", level: 60, icon: "/icons/c++.png" },
      { name: "Dart", level: 75, icon: "/icons/dart.svg" },
      { name: "PHP", level: 80, icon: "/icons/php-svgrepo-com.svg" },
    ],
  },
  {
    id: "web",
    name: "Web Development",
    icon: "/icons/web.svg",
    skills: [
      { name: "HTML5", level: 95, icon: "/icons/html5.svg" },
      { name: "CSS3", level: 90, icon: "/icons/css3.svg" },
      { name: "JavaScript", level: 85, icon: "/icons/javascript.svg" },
      { name: "TypeScript", level: 80, icon: "/icons/typescript.svg" },
      { name: "React.js", level: 85, icon: "/icons/react.svg" },
      { name: "Redux", level: 75, icon: "/icons/redux.svg" },
      { name: "SWR", level: 70, icon: "/icons/swr.png" },
      { name: "jQuery", level: 80, icon: "/icons/jquery.svg" },
      { name: "Tailwind CSS", level: 90, icon: "/icons/tailwind.svg" },
      { name: "Bootstrap", level: 85, icon: "/icons/bootstrap.svg" },
    ],
  },
  {
    id: "mobile",
    name: "Mobile Development",
    icon: "/icons/mobile.svg",
    skills: [
      { name: "Flutter", level: 65, icon: "/icons/flutter.svg" },
      { name: "Dart", level: 75, icon: "/icons/dart.svg" },
      { name: "Android", level: 80, icon: "/icons/android-svgrepo-com.svg" },
      {
        name: "Java (Android)",
        level: 65,
        icon: "/icons/java-svgrepo-com.svg",
      },
      { name: "Kotlin", level: 60, icon: "/icons/kotlin-svgrepo-com.svg" },
      { name: "XML", level: 75, icon: "/icons/xml-svgrepo-com.svg" },
      {
        name: "Android Studio",
        level: 70,
        icon: "/icons/android-studio.png",
      },
    ],
  },
  {
    id: "backend",
    name: "Backend & Database",
    icon: "/icons/database-svgrepo-com.svg",
    skills: [
      { name: "Node.js", level: 75, icon: "/icons/node-js-svgrepo-com.svg" },
      { name: "Express.js", level: 70, icon: "/icons/express.png" },
      { name: "PHP", level: 80, icon: "/icons/php-svgrepo-com.svg" },
      { name: "DotNet", level: 65, icon: "/icons/dotnet-svgrepo-com.svg" },
      { name: "MySQL", level: 85, icon: "/icons/mysql-logo-svgrepo-com.svg" },
      {
        name: "PostgreSQL",
        level: 75,
        icon: "/icons/postgresql-svgrepo-com.svg",
      },
      { name: "MongoDB", level: 70, icon: "/icons/mongo-svgrepo-com.svg" },
      { name: "Firebase", level: 60, icon: "/icons/firebase-svgrepo-com.svg" },
    ],
  },
  {
    id: "tools",
    name: "Tools & Others",
    icon: "/icons/tools-svgrepo-com.svg",
    skills: [
      { name: "Git", level: 85, icon: "/icons/git-svgrepo-com.svg" },
      { name: "GitHub", level: 90, icon: "/icons/github-142-svgrepo-com.svg" },
      { name: "VS Code", level: 95, icon: "/icons/vs-code-svgrepo-com.svg" },
      { name: "Figma", level: 50, icon: "/icons/figma-svgrepo-com.svg" },
      {
        name: "Atlassian Jira",
        level: 75,
        icon: "/icons/jira-svgrepo-com.svg",
      },
      { name: "Netlify", level: 80, icon: "/icons/netlify-svgrepo-com.svg" },
    ],
  },
];

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Use web as default tab
  const [activeTab, setActiveTab] = useState("web");
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Check if viewport is mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Initial check
      checkIfMobile();

      // Add event listener
      window.addEventListener("resize", checkIfMobile);

      // Cleanup
      return () => window.removeEventListener("resize", checkIfMobile);
    }
  }, []);

  // Get current category skills
  const currentSkills =
    skillCategories.find((category) => category.id === activeTab)?.skills || [];

  // Get current category name for display
  const currentCategoryName = skillCategories.find(
    (category) => category.id === activeTab
  )?.name;

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0.5 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  const tabsVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="skills"
      className="py-20 overflow-hidden bg-gradient-to-b from-background to-background/80"
    >
      <div className="container mx-auto px-4">
        <SectionHeading>Skills</SectionHeading>

        <motion.div
          variants={tabsVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          {isMobile ? (
            // Mobile view with stylized dropdown
            <div className="relative mb-8 max-w-sm mx-auto">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full p-3 pl-10 border border-primary/20 rounded-lg bg-card text-foreground shadow-sm appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 focus:outline-none transition-all duration-300"
                aria-label="Select skill category"
              >
                {skillCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="w-5 h-5 relative">
                  {skillCategories.find((cat) => cat.id === activeTab)
                    ?.icon && (
                    <Image
                      src={
                        skillCategories.find((cat) => cat.id === activeTab)
                          ?.icon || "/placeholder.svg"
                      }
                      alt="Category icon"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Desktop view with animated tabs
            <div className="mb-10">
              <Tabs
                defaultValue="web"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex flex-wrap justify-center p-1 bg-background/90 border border-primary/10 rounded-xl backdrop-blur">
                  {skillCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-5 h-5 mr-2 relative"
                      >
                        <Image
                          src={category.icon || "/placeholder.svg"}
                          alt={category.name}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </motion.div>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )}
        </motion.div>

        {/* Display skills with animated transitions */}
        <div ref={ref} className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              exit="exit"
            >
              {currentSkills.map((skill) => (
                <motion.div
                  key={`${activeTab}-${skill.name}`}
                  variants={cardVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  layout
                >
                  <Card className="h-full border border-primary/10 bg-card/90 backdrop-blur-sm overflow-hidden transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center p-2 border border-primary/10"
                          variants={iconVariants}
                          animate={
                            hoveredSkill === skill.name ? "hover" : "visible"
                          }
                        >
                          <div className="relative w-8 h-8">
                            <Image
                              src={skill.icon || "/placeholder.svg"}
                              alt={skill.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </motion.div>
                        <div>
                          <h3 className="font-medium text-lg">{skill.name}</h3>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-primary">
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-3 rounded-full bg-gradient-to-r from-primary/70 to-primary"
                          variants={progressVariants}
                          custom={skill.level}
                          initial="hidden"
                          animate={inView ? "visible" : "hidden"}
                        >
                          {hoveredSkill === skill.name && (
                            <motion.div
                              className="h-full w-2 bg-white/30 absolute right-0"
                              animate={{
                                x: [0, 5, 0],
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 1.5,
                              }}
                            />
                          )}
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
