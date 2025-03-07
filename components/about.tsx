"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./section-heading";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto">
        <SectionHeading>About Me</SectionHeading>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div className="space-y-4">
            <p className="text-lg">
              I am a passionate Undergraduate Computer Science student with a
              dedication to continuous learning and innovation. I am driven by
              curiosity about emerging technologies and committed to delivering
              high-quality results.
            </p>
            <p className="text-lg">
              My journey in technology began with web development, and I have
              since expanded my skills to include mobile development with
              Flutter and full-stack development with the MERN stack.
            </p>
            <p className="text-lg">
              I believe in creating solutions that are not only functional but
              also user-friendly and aesthetically pleasing. My goal is to
              contribute to projects that make a positive impact on
              people&apos;s lives.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-xl">
              <img
                src="dinesh-profile.jpg"
                alt="About Dinesh Kumar Rana"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
