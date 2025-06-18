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
  title: "Why Our Country Is So Divided",
  date: "06-17-2025",
  author: "Tedd Jung",
  tags: ["#Politics"],
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
          <p>To preface, there has always been a prominent divide in this country. But in recent years, it seems to be more and more ubiquitous. The Palestinian and Israeli conflict has been a long-standing war, spanning almost a century. In the United States, the divide between Democrats and Republicans has existed for even longer.</p>
          <p>But I noticed there has been a recent surge in aggression, likely attributed to the rise of Donald Trump. No longer are there diplomatic debates between the two sides of the political spectrum. The same maturity seen in the political campaigns of Barack Obama and the late John McCain is now unheard of in today's political landscape.</p>
          <p>Electing such a polarizing figure as one of the most important positions in the country — and the world — has only exacerbated the divide. His rhetoric and uncharismatic approach to issues, like race, has only worsened this divide.</p>
          <p>But blaming our country's division on one man is quite childish: his presidency would not have been possible without the support of his own — almost cultish — followers. In reality, the real reason for this divide is the fact that people refuse to accept that everyone has different opinions.</p>
          <p>Take Charlie Kirk for example. Whether you like it or not, he is one of our country's most prominent conservative voices. And while he comes across as very educated in what he says and believes in, he also has a very narrow-minded view when it comes to the opinions of others. A lot of his content is him bashing "liberals" and "progressives" for having different opinions as himself. As a college dropout himself, he actively promotes the idea that college is a waste of time and that people who go to college are "brainwashed" by the liberal left.</p>
          <p>It is pure irony that someone who pushes the idea of being vigilant to "brainwashing" would so blindly support every single move Donald Trump has made since his presidency. But this is only one of the many millions of people who share the same sentiment. Our country is so divided because half of our citizens refuse to bat an eye with every questionable decision that our President makes.</p>
          <p>I would say that I am quite liberal, or the very lease progressive. But I don't worship the leaders of the Democratic party. In fact, I seldom agree with much of the party's decisions and policies. But in a country where it seems like half the country is so willing to worship a politician, it is very hard to understand the Republican side.</p>
          <p>Democrats face the same issue as well. Many of its followers are narrow-minded as well, constantly attacking Trump supporters for their beliefs and opinions. While a lot of these criticisms are valid, I hate to see how divided our country has become. Civilians are fighting civilians. Politicians are fighting civilians. Politicians are fighting politicians. Hell, even the President is fighting all sorts of groups of people.</p>
          <p>It's very clear where the problem stems from. Back in November, I did not forsee any of this happening. The US economy has suffered for months. There have been multiple security breaches at the hands of the government. The United States is poised to enter another war. And the country is more divided than ever: on race, on politics, on religion, on almost anything imaginable.</p>
          <br></br>
        </article>
      </div>
    </motion.main>
  );
} 