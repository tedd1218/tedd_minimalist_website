"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Victor_Mono, IBM_Plex_Mono } from "next/font/google";

const ibmMono = IBM_Plex_Mono({ weight: ["400"], subsets: ["latin"] });
const victorMono = Victor_Mono({ subsets: ["latin"] });

function getYear(date: string | undefined) {
  if (!date) return 'Unknown';
  const d = new Date(date);
  if (!isNaN(d.getTime())) {
    return d.getFullYear().toString();
  }
  const match = date.match(/\d{4}/);
  return match ? match[0] : 'Unknown';
}

function safeDateString(date: string | undefined) {
  return date ? new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric' }).toUpperCase() : '';
}

export default function BlogIndex() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then(res => res.json())
      .then(setPosts);
  }, []);

  // Group posts by year
  const postsByYear: { [year: string]: any[] } = {};
  posts.forEach(post => {
    const year = getYear(post.date);
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  });

  const sortedYears = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a));

  return (
    <main className={`${ibmMono.className} flex flex-col min-h-screen px-4 py-8`}>
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-7 mt-20 ${victorMono.className}`}>BLOG</h1>
        {sortedYears.map(year => (
          <div key={year} className="mb-10 w-full">
            <h2 className={`text-3xl font-mono font-bold text-gray-500 mb-2 dark:text-gray-300 ${victorMono.className}`}>{year}</h2>
            <ul>
              {postsByYear[year]
                .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
                .map(post => (
                  <li key={post.slug} className="mb-1 pl-[20px] text-gray-500">
                    <Link href={`/blog/${post.slug}`}>
                      <div className={`flex items-center justify-between font-mono text-[20px] hover:text-[#E85860] dark:text-gray-300 dark:hover:text-[#E85860] ${ibmMono.className}`}>
                        <span>{post.title}</span>
                        <span className={`text-[18px] ml-4 whitespace-nowrap ${victorMono.className}`}>
                          {safeDateString(post.date)}
                        </span>
                      </div>
                    </Link>
                    <div className="border-b border-dashed border-gray-400 mt-1" />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
} 