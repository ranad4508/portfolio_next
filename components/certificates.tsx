"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  ExternalLink,
  Download,
  Calendar,
  Building2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  pdfUrl?: string; // Optional URL for PDF download
  skills?: string[]; // Optional skills covered in the certificate
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Front end / Web Designing",
    issuer: "School of Information Technologies",
    date: "2022",
    image: "/frontend certificate-1.png",
    description:
      "Comprehensive certification in front-end web development covering HTML, CSS, JavaScript, and responsive design principles.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
  },
  {
    id: 2,
    title: "PHP and MySQL",
    issuer: "YOU ACCEL Career & Learning Network",
    date: "2023",
    image: "/PHPMySQL.jpg",
    description:
      "Comprehensive certification covering PHP and MySQL fundamentals, including dynamic web development, database management, CRUD operations, security best practices, and backend integration.",
    skills: ["PHP", "MySQL", "Database Design", "Backend Development"],
  },
  {
    id: 3,
    title: "Git & Version Control",
    issuer: "Simplilearn | SkillsUP",
    date: "2023",
    image: "/Git certificate.jpg",
    description:
      "Comprehensive certification in Git version control system, covering repositories, branching, merging, and collaborative workflows.",
    skills: ["Git", "GitHub", "Version Control", "Collaboration"],
  },
  {
    id: 4,
    title: "JavaScript, Bootstrap, PHP",
    issuer: "YOU ACCEL Career & Learning Network",
    date: "2023",
    image: "/JavaScript, Bootstrap, PHP.jpg",
    description:
      "Certification in web development stack including JavaScript for dynamic interactions, Bootstrap for responsive design, and PHP for server-side processing.",
    skills: ["JavaScript", "Bootstrap", "PHP", "Web Development"],
  },
  {
    id: 5,
    title: "JavaScript, jQuery and React",
    issuer: "YOU ACCEL Career & Learning Network",
    date: "2023",
    image: "/JavaScript, jQuery and React.jpg",
    description:
      "Comprehensive certification covering JavaScript fundamentals, jQuery for DOM manipulation, and React for building modern user interfaces.",
    skills: ["JavaScript", "jQuery", "React", "Frontend Development"],
  },
  {
    id: 6,
    title: "Mastering Python, Pandas, and Numpy",
    issuer: "Udemy",
    date: "2023",
    image: "/Mastering Python, Pandas, and Numpy for absolute beginners.jpg",
    description:
      "Advanced certification in Python data analysis ecosystem, covering Python programming fundamentals, Pandas for data manipulation, and NumPy for numerical computing.",
    skills: ["Python", "Pandas", "NumPy", "Data Analysis"],
  },
];

export default function Certificates() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleDownload = (pdfUrl?: string) => {
    if (!pdfUrl) return;

    // Create an anchor element and trigger download
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrl.split("/").pop() || "certificate.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="certificates"
      className="py-20 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div
        style={{ opacity }}
        className="container mx-auto relative z-10"
      >
        <SectionHeading>My Certifications</SectionHeading>

        <motion.p
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Professional certifications that validate my skills and expertise in
          various technologies and methodologies.
        </motion.p>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredCard(cert.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card
                className="overflow-hidden h-full flex flex-col cursor-pointer group border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedCertificate(cert)}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Certificate
                    </Button>
                  </div>

                  {/* Certificate ribbon */}
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground py-1 px-3 shadow-md transform rotate-0 origin-top-right">
                    <span className="text-xs font-medium">{cert.date}</span>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="flex items-start gap-2 text-xl">
                    <Award className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span>{cert.title}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium text-sm">{cert.issuer}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{cert.date}</p>
                  </div>

                  {cert.skills && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {cert.skills.slice(0, 3).map((skill, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs bg-primary/10"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {cert.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{cert.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>

                {/* Hover effect indicator */}
                <motion.div
                  className="h-1 bg-primary w-0 group-hover:w-full transition-all duration-300"
                  animate={{ width: hoveredCard === cert.id ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedCertificate && (
          <Dialog
            open={selectedCertificate !== null}
            onOpenChange={(open) => !open && setSelectedCertificate(null)}
          >
            <DialogContent className="max-w-3xl sm:max-w-[425px] md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    {selectedCertificate.title}
                  </DialogTitle>
                  <DialogDescription>
                    Issued by {selectedCertificate.issuer} in{" "}
                    {selectedCertificate.date}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-6 space-y-6">
                  <div className="rounded-lg overflow-hidden mb-4 relative mx-auto border border-border/50 shadow-lg">
                    <Image
                      src={selectedCertificate.image || "/placeholder.svg"}
                      alt={selectedCertificate.title}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">
                      About this certification
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedCertificate.description}
                    </p>

                    {selectedCertificate.skills && (
                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">
                          Skills covered:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCertificate.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => handleDownload(selectedCertificate.pdfUrl)}
                      disabled={!selectedCertificate.pdfUrl}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      {selectedCertificate.pdfUrl
                        ? "Download Certificate"
                        : "No PDF Available"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
