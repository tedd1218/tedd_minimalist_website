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

// Define the blog post data
const data = {
  title: "My Favorite Songs of 2025 (So Far)",
  date: "06-21-2025",
  author: "Tedd Jung",
  tags: ["#Journal"],
  readtime: "2 Min Read"
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

export default function EatingBlogPost() {
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
        <div className={`text-[#667085] text-lg -mb-1 font-mono mt-20 font-semibold dark:text-[#959595] ${victorMono.className}`}>
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
        
        {/* Content */}
        <article className="prose space-y-6 -mt-5">
          <p>I realized I don't have a #Music tag for my blog, but I'm too lazy to create one so this will be under #Journal for the time being. I'll try to be more consistent with blog posts but I really doubt anyone reads these anyway.</p>
          <p>To clarify, these are songs that I either discovered or started listening to more in 2025. Here's the list:</p>
          
          <h2 className="text-2xl font-bold">1. Jagged Jaw, MINOVA - "Again And Again"</h2>
          <p>The synths in this song are just otherworldly. Nothing more needs to be said. Hands down my favorite song of 2025.</p>
          <iframe className="-mt-5" style={{borderRadius: "12px"}} src="https://open.spotify.com/embed/track/0jhgOpwjx6TgKmiUkuV3ba?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

          <h2 className="text-2xl font-bold">2. Dog silent - "Flew"</h2>
          <p>Something about the repeated scale in the background is just so soothing. Feels like I'm floating.</p>
          <iframe className="-mt-5" style={{borderRadius: "12px"}} src="https://open.spotify.com/embed/track/1aZgq68S4CqJ40sHL9ba7Y?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          
          <h2 className="text-2xl font-bold">3. wave to earth - "Love"</h2>
          <p>Most of the song is in Korean, but the instrumentals are so beautiful. And the lyrics — if you translate them — are so poetic. w2e will always be my favorite Korean indie rock band.</p>
          <iframe className="-mt-5" style={{borderRadius: "12px"}} src="https://open.spotify.com/embed/track/5mtTAScDytxMMqZj14NmlN?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          
          <h2 className="text-2xl font-bold">4. Dr.Dog - "Where'd All the Time Go?"</h2>
          <p>This is definitely one of their most famous songs. Not sure if TikTok popularized this song, but it's definitely possible. This song makes me feels really introspective.</p>
          <iframe className="-mt-5" style={{borderRadius: "12px"}} src="https://open.spotify.com/embed/track/0UV5zxRMz6AO4ZwUOZNIKI?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        
          <h2 className="text-2xl font-bold">5. Coldplay - "Sparks (Live 2025)"</h2>
          <p>This doesn't really count because I've known this song for many years now. But Coldplay's recent rendition of this song did something I thought was impossible: it made an already incredibly sad song a thousand times more sad. Love you Chris Martin.</p>
          <iframe className="-mt-5" width="800" height="450" src="https://www.youtube.com/embed/QXCwmztBIHI?si=SrvxHpqYQPHKRd4z" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true}></iframe>        
          <br></br>
        </article>
      </div>
    </motion.main>
  );
} 