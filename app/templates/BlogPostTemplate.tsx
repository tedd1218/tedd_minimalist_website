'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Victor_Mono, IBM_Plex_Mono } from "next/font/google";

const victorMono = Victor_Mono({ subsets: ['latin'] });
const ibmMono = IBM_Plex_Mono({ weight: ['400'], subsets: ['latin'] });

const TAG_UNDERLINE_COLORS: { [key: string]: string } = {
  "#Essay": "#EA2B2B",
  "#Food": "#FF8800",
  "#Journal": "#FFCC00",
  "#Media/Film": "#58A700",
  "#Politics": "#1CB0F6",
  "#Sports": "#06B6D4",
  "#Tech": "#9345C6",
  "#Travel": "#A56644"
};

// Define the blog post data - Update this with your post data
const data = {
  title: "Your Post Title",
  date: "YYYY-MM-DD", // Format: YYYY-MM-DD
  author: "Your Name",
  tags: ["#Category"], // Always include the # symbol in the tag
  readtime: "X Min Read"
};

function safeDateString(date: string | undefined) {
  if (!date) return '';
  try {
    // Handle MM-DD-YYYY format
    const parts = date.split('-');
    if (parts.length === 3) {
      const [month, day, year] = parts;
      const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      }
    }
    // Fallback to standard date parsing
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return '';
  } catch (error) {
    return '';
  }
}

export default function BlogPostTemplate() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`${ibmMono.className} flex flex-col min-h-screen px-4 py-8`}
    >
      {/* Return to Blog Home Button */}
      <Link
        href="/blog"
        className="fixed left-4 top-9 -translate-y-1/2 z-40 flex items-center group"
        aria-label="Back to Blog Home"
      >
        {/* Light mode icon */}
        <Image
          src="/icons/leftarrowlighttwotone.svg"
          alt="Back"
          width={48}
          height={48}
          className="block dark:hidden"
        />
        {/* Dark mode icon */}
        <Image
          src="/icons/leftarrowdarktwotone.svg"
          alt="Back"
          width={48}
          height={48}
          className="hidden dark:block"
        />
        <span className={`ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-base font-bold text-[#667085] dark:text-gray-200 ${victorMono.className}`}>
          BLOG HOME
        </span>
      </Link>
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        {/* Date */}
        <div className={`text-[#667085] text-md font-mono mt-20 font-semibold dark:text-[#959595] ${victorMono.className}`}>
          {safeDateString(data.date)}
        </div>
        {/* Title */}
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-2 leading-snug ${victorMono.className}`}>
          {data.title}
        </h1>
        {/* Meta row */}
        <div className="flex flex-col items-start gap-2 text-[#667085] text-xl font-mono mb-2 dark:text-[#959595]">
          {/* Author */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              {/* Light mode */}
              <Image src="/icons/author.svg" alt={data.author || 'Author'} fill className="object-contain rounded block dark:hidden" />
              {/* Dark mode */}
              <Image src="/icons/authordark.svg" alt={data.author || 'Author'} fill className="object-contain rounded hidden dark:block" />
            </span>
            {data.author || 'Unknown Author'}
          </span>
          {/* Tags */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              {/* Light mode */}
              <Image src="/icons/tag.svg" alt="Tags" fill className="object-contain rounded block dark:hidden" />
              {/* Dark mode */}
              <Image src="/icons/tagdark.svg" alt="Tags" fill className="object-contain rounded hidden dark:block" />
            </span>
            {data.tags
              ? Array.isArray(data.tags)
                ? data.tags.map((tag: string) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))
                : <span>{data.tags}</span>
              : ''}
          </span>
          {/* Reading time */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              {/* Light mode */}
              <Image src="/icons/read.svg" alt="Reading time" fill className="object-contain rounded block dark:hidden" />
              {/* Dark mode */}
              <Image src="/icons/readtimedark.svg" alt="Reading time" fill className="object-contain rounded hidden dark:block" />
            </span>
            {data.readtime || ''}
          </span>
        </div>
        {/* Underline */}
        {(() => {
          const firstTag = Array.isArray(data.tags) ? data.tags[0] : data.tags;
          const underlineColor = TAG_UNDERLINE_COLORS[firstTag] || "#E85860";
          return <div className="h-1 w-60 mb-10" style={{ backgroundColor: underlineColor }} />;
        })()}
        
        {/* Content - Replaced with Blog Post content */}
        <article className="prose space-y-5 -mt-5">
          {/* This is where your blog post content goes */}
          <h1>{data.title}</h1>
          
          {/* Write your content here */}
          <p>Your first paragraph goes here.</p>
          
          {/* Add images like this */}
          {/* <img src="/blog/your-image.jpg" alt="Description" style={{ width: 400 }} /> */}
          
          {/* Section headers */}
          <h2>First Section Title</h2>
          <p>More content here...</p>
          
          <h2>Second Section Title</h2>
          <p>Even more content here...</p>
        </article>
      </div>
    </motion.main>
  );
} 