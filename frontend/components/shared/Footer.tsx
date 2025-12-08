import React from 'react';
import Link from 'next/link';
import { Globe, File } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Cypher Inc. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm font-medium">
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
