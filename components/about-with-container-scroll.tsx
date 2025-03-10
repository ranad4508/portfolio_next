"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ContainerScroll } from "./container-scroll";
import SectionHeading from "./section-heading";

export default function AboutWithContainerScroll() {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <section id="about" className="py-20">
      <SectionHeading>About Me</SectionHeading>

      <ContainerScroll
        titleComponent={
          <motion.p
            className="text-muted-foreground text-center max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get to know more about my journey, skills, and passion for
            technology.
          </motion.p>
        }
      >
        <div className="h-full w-full relative">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.div
                key="image"
                className="absolute inset-0 cursor-pointer"
                onClick={handleReveal}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/dinesh-profile.jpg"
                    alt="Dinesh Kumar Rana"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-8">
                    <div className="text-white text-center">
                      <p className="text-lg font-medium mb-2">
                        Click to reveal my story
                      </p>
                      <motion.div
                        className="w-8 h-8 mx-auto rounded-full bg-white/20 flex items-center justify-center"
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1.5,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                className="absolute inset-0 p-8 overflow-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={handleReveal}
                    className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                      <div className="aspect-square rounded-xl overflow-hidden mb-4">
                        <Image
                          src="/dinesh-profile.jpg"
                          alt="Dinesh Kumar Rana"
                          width={300}
                          height={300}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">
                          Dinesh Kumar Rana
                        </h3>
                        <p className="text-gray-400">
                          Computer Science Student
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                      <motion.p
                        className="text-lg text-gray-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        I am a passionate Undergraduate Computer Science student
                        with a dedication to continuous learning and innovation.
                        I am driven by curiosity about emerging technologies and
                        committed to delivering high-quality results.
                      </motion.p>

                      <motion.p
                        className="text-lg text-gray-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        My journey in technology began with web development, and
                        I have since expanded my skills to include mobile
                        development with Flutter and full-stack development with
                        the MERN stack.
                      </motion.p>

                      <motion.p
                        className="text-lg text-gray-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        I believe in creating solutions that are not only
                        functional but also user-friendly and aesthetically
                        pleasing. My goal is to contribute to projects that make
                        a positive impact on people&apos;s lives.
                      </motion.p>

                      <motion.div
                        className="pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                      >
                        <h3 className="text-xl font-semibold mb-4 text-white">
                          My Skills
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            "React",
                            "Next.js",
                            "Flutter",
                            "Node.js",
                            "MongoDB",
                            "PHP",
                            "JavaScript",
                            "TypeScript",
                            "Tailwind CSS",
                          ].map((skill, index) => (
                            <div
                              key={index}
                              className="bg-white/10 rounded-lg px-4 py-2 text-center text-gray-200"
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ContainerScroll>
    </section>
  );
}
