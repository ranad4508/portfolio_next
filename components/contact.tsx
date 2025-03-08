"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone_number?: string; // Added to match your email template
}

export default function Contact() {
  const { toast } = useToast();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone_number: "", // Added to match your email template
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual EmailJS public key
      const PUBLIC_KEY = "Gv6G4LoBkC0RorzaD";

      await emailjs.send(
        "service_0ed7wt8", // Your service ID
        "template_53ac9ce", // Your template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          phone_number: formData.phone_number || "Not provided",
          to_name: "Dinesh Kumar Rana",
        },
        PUBLIC_KEY
      );

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        duration: 5000,
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone_number: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Error",
        description:
          "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto">
        <SectionHeading>Contact Me</SectionHeading>
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold">Get In Touch</h3>
            <p className="text-muted-foreground">
              Feel free to reach out to me for any questions, opportunities, or
              just to say hello. I'll get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">ranad4508@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">+977 9865747518</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">
                    Mahalaxmi - 05, Lalitpur, Nepal
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone_number" className="text-sm font-medium">
                  Phone Number (Optional)
                </label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
