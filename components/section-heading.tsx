"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-bold text-center mb-12 relative pb-4 inline-block mx-auto"
    >
      {children}
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-0 left-0 h-1 bg-primary rounded"
      ></motion.span>
    </motion.h2>
  );
}
