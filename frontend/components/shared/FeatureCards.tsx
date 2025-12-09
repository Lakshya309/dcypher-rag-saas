"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FileUp, MessageCircle, Database } from 'lucide-react';

const features = [
  {
    icon: <FileUp className="h-8 w-8 text-purple-dark" />,
    title: 'Upload Documents',
    description: 'Easily upload and process your documents to build a powerful knowledge base.',
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-purple-dark" />,
    title: 'Chat with Your Data',
    description: 'Engage in natural conversations with your documents and get instant insights.',
  },
  {
    icon: <Database className="h-8 w-8 text-purple-dark" />,
    title: 'Advanced RAG',
    description: 'Leverage a cutting-edge RAG pipeline for accurate, context-aware answers.',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  },
};

const FeatureCards = () => {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-center font-sans text-3xl font-bold tracking-tighter">
          A Better Workflow
        </h2>
        <p className="mt-2 text-center text-2xl text-muted-foreground font-cursive">
          Everything you need, in one place.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="rounded-2xl border border-border/50 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={i}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-light/20">
                {feature.icon}
              </div>
              <h3 className="mt-6 font-sans text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 font-Lora text-xl text-muted-foreground" style={{fontFamily: 'var(--font-cursive)'}}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
