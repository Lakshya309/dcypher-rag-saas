"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Lightbulb, Code } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-sans text-4xl font-bold tracking-tighter">About Cypher</h1>
        <p className="mt-2 font-cursive text-xl text-purple-dark">
          The story behind the intelligence.
        </p>
      </motion.div>

      <div className="space-y-8">
        <motion.div 
          className="rounded-2xl border border-border/50 bg-white p-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-light/20">
              <Rocket className="h-6 w-6 text-purple-dark" />
            </div>
            <h2 className="font-sans text-2xl font-bold">Our Mission</h2>
          </div>
          <p className="mt-4 text-muted-foreground" style={{fontFamily: 'var(--font-geist-sans)'}}>
            Our mission is to make complex information accessible and interactive. We believe that by leveraging the power of Large Language Models and Retrieval-Augmented Generation, we can unlock insights from documents in a way that feels natural and intuitive. Cypher is our first step towards that future.
          </p>
        </motion.div>

        <motion.div 
          className="rounded-2xl border border-border/50 bg-white p-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-light/20">
              <Lightbulb className="h-6 w-6 text-purple-dark" />
            </div>
            <h2 className="font-sans text-2xl font-bold">The Technology</h2>
          </div>
          <p className="mt-4 text-muted-foreground" style={{fontFamily: 'var(--font-geist-sans)'}}>
            Cypher is built on a modern, robust technology stack. The frontend you're currently interacting with is built with Next.js 14, Tailwind CSS, and Framer Motion for a smooth, responsive experience. The backend is powered by a FastAPI server, providing a high-performance API for our RAG pipeline, which intelligently retrieves relevant information from your documents to provide accurate, context-aware answers to your questions.
          </p>
        </motion.div>

        <motion.div 
          className="rounded-2xl border border-border/50 bg-white p-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-light/20">
              <Code className="h-6 w-6 text-purple-dark" />
            </div>
            <h2 className="font-sans text-2xl font-bold">For Developers</h2>
          </div>
          <p className="mt-4 text-muted-foreground" style={{fontFamily: 'var(--font-geist-sans)'}}>
            This project is designed to be easily understandable and extensible. The code is organized into logical modules for pages, components, and utilities. We've used industry best practices to ensure the code is clean, maintainable, and ready for production. Feel free to explore the codebase and adapt it to your needs.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;