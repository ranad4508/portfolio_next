"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  pdfUrl?: string; // Optional URL for PDF download
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
  },
  {
    id: 2,
    title: "PHP and MySQL",
    issuer: "YOU ACCEL Career & Learning Network",
    date: "2023",
    image: "/PHPMySQL.jpg",
    description:
      "Comprehensive certification covering PHP and MySQL fundamentals, including dynamic web development, database management, CRUD operations, security best practices, and backend integration.",
  },
  {
    id: 3,
    title: "Git & Version Control",
    issuer: "Simplilearn | SkillsUP",
    date: "2023",
    image: "/Git certificate.jpg",
    description:
      "Comprehensive certification in Git version control system, covering repositories, branching, merging, and collaborative workflows.",
  },
  {
    id: 4,
    title: "JavaScript, Bootstrap, PHP",
    issuer: "Udemy",
    date: "2023",
    image: "/JavaScript, Bootstrap, PHP.jpg",
    description:
      "Certification in web development stack including JavaScript for dynamic interactions, Bootstrap for responsive design, and PHP for server-side processing.",
  },
  {
    id: 5,
    title: "JavaScript, jQuery and React",
    issuer: "Udemy",
    date: "2023",
    image: "/JavaScript, jQuery and React.jpg",
    description:
      "Comprehensive certification covering JavaScript fundamentals, jQuery for DOM manipulation, and React for building modern user interfaces.",
  },
  {
    id: 6,
    title: "Mastering Python, Pandas, and Numpy",
    issuer: "Udemy",
    date: "2023",
    image: "/Mastering Python, Pandas, and Numpy for absolute beginners.jpg",
    description:
      "Advanced certification in Python data analysis ecosystem, covering Python programming fundamentals, Pandas for data manipulation, and NumPy for numerical computing.",
  },
];

export default function Certificates() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

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
    <section id="certificates" className="py-20">
      <div className="container mx-auto">
        <SectionHeading>Certificates</SectionHeading>
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border border-border/50"
                onClick={() => setSelectedCertificate(cert)}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Certificate
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    {cert.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground">{cert.date}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog
        open={selectedCertificate !== null}
        onOpenChange={(open) => !open && setSelectedCertificate(null)}
      >
        <DialogContent className="max-w-3xl sm:max-w-[425px] md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-auto">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedCertificate.title}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="rounded-md overflow-auto mb-4 relative mx-auto">
                  <Image
                    src={selectedCertificate.image || "/placeholder.svg"}
                    alt={selectedCertificate.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto w-auto"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Issuer:</span>
                    <span>{selectedCertificate.issuer}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Date:</span>
                    <span>{selectedCertificate.date}</span>
                  </div>
                  <div className="pt-2">
                    <span className="font-medium">Description:</span>
                    <p className="text-muted-foreground mt-1">
                      {selectedCertificate.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => handleDownload(selectedCertificate.pdfUrl)}
                    disabled={!selectedCertificate.pdfUrl}
                  >
                    {selectedCertificate.pdfUrl
                      ? "Download Certificate"
                      : "No PDF Available"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
