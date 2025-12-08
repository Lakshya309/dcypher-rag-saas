"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Chat", href: "/chat" },
  { name: "About", href: "/about" },
];

const AnimatedNavbar = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-xl font-bold tracking-tighter text-foreground">
            <span className="font-sans">d'CYPHER</span>
          </Link>
        </div>

        <div className="hidden items-center space-x-6 rounded-full border border-border bg-white/50 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-lg md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-2 py-1"
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="relative z-10">{link.name}</span>
              <AnimatePresence>
                {hoveredLink === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 h-full w-full rounded-full bg-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/chat"
            className={cn(
              "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-md",
              "transition-transform duration-200 ease-in-out hover:scale-105"
            )}
          >
            Launch App
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default AnimatedNavbar;
