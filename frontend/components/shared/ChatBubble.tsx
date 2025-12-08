"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={cn(
        "mb-4 flex items-start gap-3 px-2",
        isUser ? "justify-end" : "justify-start"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Bot Icon */}
      {!isUser && (
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Bot className="h-5 w-5" />
        </div>
      )}

      {/* Message bubble */}
      <div
  className={cn(
    "rounded-2xl px-4 py-3 w-fit break-words",
    // UPDATED WIDTHS
    "max-w-[100%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%]",
    isUser
      ? "bg-primary text-primary-foreground"
      : "bg-card border shadow-sm"
  )}
  style={{ fontFamily: 'var(--font-geist-sans)' }}
>
  <p className="text-base leading-relaxed whitespace-pre-wrap">
    {message.content}
  </p>
</div>

    
    </motion.div>
  );
};

export default ChatBubble;
