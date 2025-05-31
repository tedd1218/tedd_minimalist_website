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
  title: "What Punishments of God Are Not Gifts?",
  date: "05-31-2025",
  author: "Tedd Jung",
  tags: ["#Journal"],
  readtime: "5 Min Read"
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
          <iframe width="800" height="450" src="https://www.youtube.com/embed/Kf6Z_m6Hh0A?si=1syGki_O6HOb7xrx" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <p>I recently came across an old interview of comedian and television host Stephen Colbert, conducted by Anderson Cooper. In this particular interview, Colbert sheds light on a tragedy that occured when he was very young (I later did some research and found out that his father and two brothers died in a plane crash).</p>
          <p>In context of this particular tragedy, Cooper questions Colbert on a particular quote he inserted in an editorial, which he later credits to J.R.R Tolkien: "What punishments of God are not gifts?"</p>
          <p>Upon processing the gravity of this particular quote, I was instantly moved. Regardless of whether he took the quote from Tolkien, the sentiment is the same. Rather than cursing God for his terrible trials and tribulations, Colbert seems to have accepted the outcome of his unfortunate fate, demonstrating the utmost sign of human maturity.</p>
          <p>To Cooper's question on whether he believes this quote, Colbert replies, "It's a gift to exist, and with existence comes suffering. There's no escaping that."</p>
          <p>***</p>
          <p>As I look back on my life, I can pinpoint every moment that has led me to where I am right now. Every decision, mistake, accident, death, betrayal, and heartbreak has all been a part of my journey, and thus influenced me to become the person I am today.</p>
          <p>There were certainly times along the way when I was angry at my piss-poor luck, questioning myself and God for the trials and tribulations He has burdened me with. It is without a doubt a contributing factor as to why I have such a fragile relationship with God.</p>
          <p>But I would not be the person I am today if I had not experienced all these hardships. Many relationships would not have been formed, my personality would certainly have been different, and I would still have a pretty naive perspective on life. Admittedly, it has opened my eyes to the reality of suffering, and just like Colbert, I have accepted the fact that with life comes suffering.</p>
          <p>This is certainly not a hard concept to grasp. But suprisingly, there are more people in the world blinded by their own selfishness and ignorance than those that are blessed with maturity. There will always be those that are fortunate to always get what they want, to live a life so spoiled and entitled that they simply cannot understand the reality of suffering.</p>
          <p>***</p>
          <p>I am not a perfect person. Not only because of the fact that no human in the universe is perfect, but because I periodically make irrational decisions, along with my sometimes stubborn immaturity. Because if I were to demonstrate Colbert's level of maturity, I would have forgiven all those that have hurt me in the past. While to an extent I have, there is always a fleeting thought of a world where these heartaching experiences did not exist.</p>
          <p>Colbert's maturity stands out to me because his experience surrounded the loss of three of the closest people in his life, something that I cannot even fathom at my point in life. Perhaps it is pure irony that one of the deepest, most profound quotes would come from a comedian.</p>
          <p>***</p>
          <p>To those who are reading this: I hope you understand that the beauty of life is in its suffering. Just like how death gives life meaning, so too does suffering. We can either embrace it to our fullest extent or spend the rest of our lives cursing our unfortunate fate.</p>
          <p>Hell, despite his tragic past, Colbert is still making people laugh decades later. Life goes on.</p>
          <br></br>
        </article>
      </div>
    </motion.main>
  );
} 