"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useState, useEffect } from "react";

// Define skill categories with proper SVG images
const skillCategories = [
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Use web as default tab
  const [activeTab, setActiveTab] = useState("web");
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading>Skills</SectionHeading>

        {isMobile ? (
          // Mobile view with dropdown
          <div className="mb-8">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full p-3 border border-border/50 rounded-md bg-card text-foreground"
              aria-label="Select skill category"
            >
              {skillCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          // Desktop view with tabs
          <div className="mb-8">
            <Tabs
              defaultValue="web"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="flex flex-wrap justify-center">
                {skillCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center"
                  >
                    <div className="w-5 h-5 mr-2 relative">
                      <Image
                        src={category.icon || "/placeholder.svg"}
                        alt={category.name}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Display skills for current tab */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {currentSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow border border-border/50 bg-card">
                <CardContent className="pt-4 md:pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center p-2">
                      <div className="relative w-6 h-6 md:w-8 md:h-8">
                        <Image
                          src={skill.icon || "/placeholder.svg"}
                          alt={skill.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="font-medium text-base md:text-lg">
                      {skill.name}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium uppercase text-muted-foreground">
                        Proficiency
                      </span>
                    </div>
                    <span className="text-sm font-medium">{skill.level}%</span>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className="bg-primary h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={
                        inView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                    ></motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
