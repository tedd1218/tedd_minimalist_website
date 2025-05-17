'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { IBM_Plex_Mono, Victor_Mono } from "next/font/google";
import FloatingNavbar from "@/components/Navbar";

const ibmMono = IBM_Plex_Mono({
  weight: ["300"],
  subsets: ["latin"]
});

const victorMono = Victor_Mono({
    subsets: ["latin"]
});

interface BlogPost {
  title: string;
  date: string;
  slug: string;
}

interface YearPosts {
  [key: string]: BlogPost[];
}

// Sample blog data - you can replace this with real data from your CMS or API
const blogPosts: YearPosts = {
  "2025": [
    { title: "Why Julio Jones is the Best Wide Receiver of all time", date: "APR 5", slug: "julio-jones" },
    { title: "Spain Trip", date: "MAR 28", slug: "spain-trip" },
    { title: "The World Has Gone to Shit", date: "FEB 12", slug: "world-gone" },
    { title: "New Year!", date: "JAN 1", slug: "new-year-2025" }
  ],
  "2024": [
    { title: "Test 1", date: "AUG 5", slug: "test-1-2024" },
    { title: "Test 2", date: "JUL 28", slug: "test-2-2024" },
    { title: "Testing 12345", date: "MAY 12", slug: "testing-12345-2024" },
    { title: "Hello World!", date: "FEB 1", slug: "hello-world-2024" }
  ],
  "2023": [
    { title: "Test 1", date: "AUG 5", slug: "test-1-2023" },
    { title: "Test 2", date: "JUL 28", slug: "test-2-2023" },
    { title: "Testing 12345", date: "MAY 12", slug: "testing-12345-2023" },
    { title: "Hello World!", date: "FEB 1", slug: "hello-world-2023" }
  ],
  "2022": [
    { title: "Test 1", date: "AUG 5", slug: "test-1-2022" },
    { title: "Test 2", date: "JUL 28", slug: "test-2-2022" },
    { title: "Testing 12345", date: "MAY 12", slug: "testing-12345-2022" },
    { title: "Hello World!", date: "FEB 1", slug: "hello-world-2022" }
  ]
};

export default function Blog() {
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
    <main className={`flex flex-col min-h-screen px-4 py-8 ${victorMono.className}`}>
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-10 mt-20 ${victorMono.className}`}>BLOG</h1>

        <div className="w-full space-y-12 mb-24">
          {Object.entries(blogPosts)
            .sort((a, b) => parseInt(b[0]) - parseInt(a[0])) // Sort years in descending order
            .map(([year, posts]) => (
            <div key={year} className="space-y-4">
              <h2 className="text-2xl font-light">{year}</h2>
              <div className="space-y-2">
                {posts.map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`} 
                    className="group block"
                  >
                    <div className="flex items-center justify-between hover:text-primary transition-colors">
                      <span>{post.title}</span>
                      <span className="text-right min-w-[80px]">{post.date}</span>
                    </div>
                    <div className="w-full border-b border-dotted border-gray-400 group-hover:border-primary mt-1"></div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <FloatingNavbar />
    </main>
  );
} 