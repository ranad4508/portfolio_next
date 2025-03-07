"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Building2 } from "lucide-react";

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto">
        <SectionHeading>Experience</SectionHeading>
        <div ref={ref} className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span>{exp.title}</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                  </CardTitle>
                  <div className="flex items-center text-primary">
                    <img
                      src={exp.logo}
                      alt="Company Logo"
                      className="w-12 h-12 rounded-full mr-2"
                    />
                    <span>{exp.company}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{exp.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
