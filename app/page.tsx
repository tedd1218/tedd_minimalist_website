'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { ThemeSelector } from "@/components/theme-selector";
import { IBM_Plex_Mono } from "next/font/google"

const ibmMono = IBM_Plex_Mono({
  weight: ["300"],
  subsets: ["latin"]
});

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <main className="flex flex-col justify-between min-h-screen text-center px-4 py-8">
      <div className="flex justify-end w-full -mt-3 -ml-2">
      <button 
          ref={buttonRef}
          onClick={togglePopup}
          className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 focus:outline-none"
          aria-label="Theme settings"
        >
          <Image 
            src="/icons/paint.svg" 
            alt="Theme settings" 
            width={20} 
            height={20}
            className="dark:invert" 
          />
        </button>
        
        {isOpen && (
          <div ref={popupRef} 
            className={`absolute top-14.5 right-6 w-[280px] bg-white dark:bg-gray-900 rounded-md shadow-lg p-3 z-10 border border-gray-200 dark:border-gray-800 text-left [&_.grid_button]:px-11 py-2.5 [&_.grid]:gap-20 ${ibmMono.className}`}>
            <ThemeSelector />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center flex-grow space-y-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider">&lt;TEDD&gt;</h1>

        <nav className="flex flex-col items-center space-y-4 text-xl sm:text-2xl font-light">
          <Link href="/blog" className="hover:text-primary transition-colors">BLOG</Link>
          <Link href="/about" className="hover:text-primary transition-colors">ABOUT</Link>
          <Link href="/art" className="hover:text-primary transition-colors">ART</Link>
          <Link href="/photo" className="hover:text-primary transition-colors">PHOTOGRAPHY</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">CONTACT</Link>
        </nav>
      </div>

      <footer className="text-center text-[13px] text-muted-foreground transition-colors">
        © 2025 TEDD JUNG
      </footer>
    </main>
  );
}