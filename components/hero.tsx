"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  // Array of phrases to cycle through
  const phrases = [
    "Frontend Developer",
    "MERN Stack Developer",
    "Mobile Developer",
    "Mobile App Developer",
  ];

  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const typingDelay = 100; // Delay between typing each character
    const deletingDelay = 50; // Delay between deleting each character
    const waitAfterTyping = 1500; // Wait time after typing complete
    const waitAfterDeleting = 500; // Wait time after deleting complete

    let timer: NodeJS.Timeout | undefined;

    if (isWaiting) {
      // If in waiting state, wait for the specified time before continuing
      const waitTime = isDeleting ? waitAfterDeleting : waitAfterTyping;
      timer = setTimeout(() => {
        setIsWaiting(false);

        // If we just finished waiting after deletion, move to next phrase
        if (isDeleting) {
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
          setIsDeleting(false);
        } else {
          // If we just finished waiting after typing, start deleting
          setIsDeleting(true);
        }
      }, waitTime);
    } else if (isDeleting) {
      // Deleting mode
      if (charIndex > 0) {
        // Still have characters to delete
        timer = setTimeout(() => {
          setCharIndex(charIndex - 1);
          setDisplayText(phrases[phraseIndex].substring(0, charIndex - 1));
        }, deletingDelay);
      } else {
        // Finished deleting
        setIsWaiting(true);
      }
    } else {
      // Typing mode
      if (charIndex < phrases[phraseIndex].length) {
        // Still have characters to type
        timer = setTimeout(() => {
          setCharIndex(charIndex + 1);
          setDisplayText(phrases[phraseIndex].substring(0, charIndex + 1));
        }, typingDelay);
      } else {
        // Finished typing
        setIsWaiting(true);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [charIndex, isDeleting, isWaiting, phraseIndex, phrases]);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Hi, I&apos;m <span className="text-primary">Dinesh Kumar Rana</span>
          </h1>
          <h2 className="text-xl sm:text-2xl text-muted-foreground h-8">
            {displayText}
            <span className="animate-blink">|</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Passionate Computer Science student dedicated to continuous learning
            and innovation in emerging technologies.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="shadow-lg shadow-primary/20">
              <Link href="/contact">Get In Touch</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-primary/30 hover:border-primary"
            >
              <Link href="/projects">View Projects</Link>
            </Button>
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full bg-card hover:bg-primary/20"
            >
              <Link
                href="https://github.com/ranad4508"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full bg-card hover:bg-primary/20"
            >
              <Link
                href="https://www.linkedin.com/in/dinesh-rana-616a18225/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full bg-card hover:bg-primary/20"
            >
              <Link href="mailto:ranad4508@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl shadow-primary/10">
            <Image
              src="/_DSC0642.jpg"
              alt="Dinesh Kumar Rana"
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      </div>
      <div className="flex justify-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Link href="/about">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Scroll down"
              className="rounded-full bg-card/50 backdrop-blur-sm hover:bg-primary/20"
            >
              <ArrowDown className="h-6 w-6" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
