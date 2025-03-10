"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Building2 } from "lucide-react";

export default function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const experiences = [
    {
      id: 1,
      logo: "/was-logo.png",
      title: "Frontend Developer",
      company: "W.A.S. Media Marketing",
      period: "Nov 2024 – Present",
      description:
        "Developing and maintaining responsive user interfaces with modern frontend technologies. Integrating APIs using Redux, SWR, and Axios. Ensuring optimal performance and seamless user experience across devices. Collaborating with backend teams to improve data fetching efficiency.",
    },
    {
      id: 2,
      logo: "/kswtechnology_logo.jpeg",
      title: "Frontend Intern",
      company: "KSW TechZone",
      period: "Aug 24, 2024 – Nov 29, 2024",
      description:
        "Worked on developing responsive web applications using modern frontend technologies. Collaborated with the design team to implement UI/UX designs. Participated in code reviews and team meetings.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -5,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading>Experience</SectionHeading>

        <motion.div
          ref={ref}
          className="mt-10 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={cardVariants}
              whileHover="hover"
              className="relative"
            >
              <Card className="border-primary/10 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle className="text-xl font-bold">
                      {exp.title}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-primary mt-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border border-primary/20">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} Logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium flex items-center">
                      <Building2 className="mr-1 h-4 w-4" />
                      {exp.company}
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
