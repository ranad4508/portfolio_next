"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin, BookOpen, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  period: string;
  achievements?: string[];
  logo?: string;
  current?: boolean;
}

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education: EducationItem[] = [
    {
      institution: "Orchid International College",
      location: "Gaushala, Kathmandu",
      degree: "Bachelor's in Computer Application",
      period: "2021 - 2025",
      current: true,
      achievements: [
        "Member of Computer Science Club",
        "Participated in Can Info Tech for representing college",
      ],
      logo: "/oic.png",
    },
    {
      institution: "Nasa Int'l College",
      location: "Tinkune, Kathmandu",
      degree: "Higher Secondary Education",
      period: "2018 - 2020",
      achievements: [
        "Science stream with Computer Science",
        "Participated in quiz competition",
      ],
      logo: "/nasacollege.png",
    },
    {
      institution: "Soo-Jung English Boarding School",
      location: "Rajpur, Doti",
      degree: "Secondary Education",
      period: "2015 - 2017",
      achievements: [
        "Winner of intra school quiz competition",
        "First position in drawing competition",
        "Second position in poem competition",
        "Good rank holder in NCC program",
      ],
      logo: "/soojung.jpeg", // Add your logo path here or remove if not available
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container mx-auto">
        <SectionHeading>Education Journey</SectionHeading>

        <div className="relative mt-12">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary/20 rounded-full hidden md:block"></div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`md:flex ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center relative`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary z-10"></div>

                {/* Content */}
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                    <div className="absolute top-0 right-0 p-2">
                      {edu.current && (
                        <Badge
                          variant="default"
                          className="bg-primary text-primary-foreground"
                        >
                          Current
                        </Badge>
                      )}
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        {edu.logo && (
                          <div className="w-12 h-12 rounded-md flex items-center justify-center overflow-hidden">
                            <Image
                              src={edu.logo}
                              alt={edu.institution}
                              width={0}
                              height={0}
                              className="h-auto w-48"
                            />
                            {/* <GraduationCap className="h-6 w-6 text-primary" /> */}
                          </div>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>{edu.period}</span>
                        </div>
                      </div>

                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {edu.institution}
                      </CardTitle>

                      <div className="flex items-center text-primary mt-1">
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span className="font-medium">{edu.degree}</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{edu.location}</span>
                      </div>

                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium flex items-center mb-2">
                            <Award className="mr-2 h-4 w-4 text-primary" />
                            Achievements
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1 pl-6 list-disc">
                            {edu.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
