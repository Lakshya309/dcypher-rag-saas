"use client";

import React, { useRef, MouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

// New InteractiveText component
const InteractiveText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(Infinity);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      mouseX.set(e.clientX);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
  };

  const letters = text.split("");

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-wrap justify-center"
    >
      {letters.map((letter, i) => (
        <Letter key={i} letter={letter === " " ? " " : letter} mouseX={mouseX} />
      ))}
    </motion.div>
  );
};

const Letter = ({ letter, mouseX }: { letter: string; mouseX: MotionValue<number> }) => {
  const ref = useRef<HTMLSpanElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    const centerX = bounds ? bounds.left + bounds.width / 2 : 0;
    return val - centerX;
  });

  // When mouse is far away, y is 0. When it's directly on a letter, y is -10.
  const y = useTransform(distance, [-100, 0, 100], [0, -20, 0]);
  const springY = useSpring(y, { damping: 12, stiffness: 150, mass: 0.1 });


  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ y: springY }}
    >
      {letter}
    </motion.span>
  );
};


const HeroSection = () => {
  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-white to-purple-light/10 py-20 md:py-32"
    >
      {/* Glowing borders */}
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-purple-light/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-dark/10 blur-3xl" />
      </div>
      
      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.h1
          className="font-sans text-4xl font-bold tracking-tighter text-gray-800 md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <InteractiveText text="Unlock Your Data's" />
          <InteractiveText text="potential" />
        </motion.h1>

        <motion.p
          className="mt-4 font-cursive text-xl text-purple-dark md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Experience the next generation of Retrieval-Augmented Generation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            href="/chat"
            className={cn(
              "group mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-lg font-bold text-primary-foreground shadow-lg",
              "transition-transform duration-300 ease-in-out hover:scale-105"
            )}
          >
            <span>Launch App</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
