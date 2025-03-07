"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold text-primary">
              <Image
                src="/logo.png"
                height={0}
                width={0}
                alt="Logo"
                className="h-auto w-28"
              />
            </Link>
            <p className="mt-2 text-muted-foreground">
              Frontend Developer | MERN Stack | Flutter
            </p>
          </div>

          <div className="flex space-x-4">
            <Link
              href="https://github.com/ranad4508"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-background flex items-center justify-center hover:bg-primary/10 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/dinesh-rana-616a18225/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-background flex items-center justify-center hover:bg-primary/10 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:ranad4508@gmail.com"
              className="h-10 w-10 rounded-full bg-background flex items-center justify-center hover:bg-primary/10 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-center md:text-left mb-4 md:mb-0">
              &copy; {currentYear} Dinesh Kumar Rana. All rights reserved.
            </p>

            <div className="flex space-x-4">
              <nav>
                <ul className="flex flex-wrap justify-center gap-4">
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
