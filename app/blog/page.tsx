"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Victor_Mono, IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";

const ibmMono = IBM_Plex_Mono({ weight: ["400"], subsets: ["latin"] });
const victorMono = Victor_Mono({ subsets: ["latin"] });

const PRESELECTED_TAGS = [
  "#Essay",
  "#Food",
  "#Journal",
  "#Media/Film",
  "#Politics",
  "#Sports",
  "#Tech",
  "#Travel"
];

const TAG_COLORS: { [key: string]: string } = {
  "#Essay": "text-[#EA2B2B] dark:text-[#EA2B2B]",
  "#Food": "text-[#FF8800] dark:text-[#FF8800]",
  "#Journal": "text-[#FFCC00] dark:text-[#FFCC00]",
  "#Media/Film": "text-[#58A700] dark:text-[#58A700]",
  "#Politics": "text-[#1CB0F6] dark:text-[#1CB0F6]",
  "#Sports": "text-cyan-600 dark:text-cyan-600",
  "#Tech": "text-[#9345C6] dark:text-[#9345C6]",
  "#Travel": "text-[#A56644] dark:text-[#A56644]"
};

const TAG_BACKGROUNDS: { [key: string]: string } = {
  "#Essay": "bg-[#EA2B2B]/10 dark:bg-[#EA2B2B]/20",
  "#Food": "bg-[#FF8800]/10 dark:bg-[#FF8800]/20",
  "#Journal": "bg-[#FFCC00]/10 dark:bg-[#FFCC00]/20",
  "#Media/Film": "bg-[#58A700]/10 dark:bg-[#58A700]/20",
  "#Politics": "bg-[#1CB0F6]/10 dark:bg-[#1CB0F6]/20",
  "#Sports": "bg-cyan-600/10 dark:bg-cyan-600/20",
  "#Tech": "bg-[#9345C6]/10 dark:bg-[#9345C6]/20",
  "#Travel": "bg-[#A56644]/10 dark:bg-[#A56644]/20"
};

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
  if (!date) return '';
  try {
    // Handle MM-DD-YYYY format
    const parts = date.split('-');
    if (parts.length === 3) {
      const [month, day, year] = parts;
      const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
      }
    }
    // Fallback to standard date parsing
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      return d.toLocaleString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
    }
    return '';
  } catch (error) {
    return '';
  }
}

export default function BlogIndex() {
  const [posts, setPosts] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then(res => res.json())
      .then(setPosts);
  }, []);

  // Use only preselected tags
  const allTags = PRESELECTED_TAGS;

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setShowDropdown(false);
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const filteredPosts = selectedTags.length
    ? posts.filter(post =>
        Array.isArray(post.tags)
          ? post.tags.some((t: string) => selectedTags.includes(t))
          : selectedTags.includes(post.tags)
      )
    : posts;

  // Group posts by year
  const postsByYear: { [year: string]: any[] } = {};
  filteredPosts.forEach(post => {
    const year = getYear(post.date);
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  });

  const sortedYears = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a));

  return (
    <main className={`${ibmMono.className} flex flex-col min-h-screen px-4 py-8`}>
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between w-full mb-7 mt-20">
          <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider ${victorMono.className}`}>BLOG</h1>
          <div className="relative">
            <button
              className="p-2"
              onClick={() => setShowDropdown(v => !v)}
              aria-label="Filter by tag"
            >
              <Image
                src="/icons/filterhorz.svg"
                alt="Filter"
                width={40}
                height={40}
                className="transition-transform duration-200 ease-in-out hover:scale-125 cursor-pointer"
              />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded shadow-lg z-50">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:font-bold hover:bg-gray-100 dark:hover:font-bold dark:hover:bg-zinc-700 cursor-pointer"
                  onClick={() => { setSelectedTags([]); setShowDropdown(false); }}
                >
                  Show All
                </button>
                {allTags.filter(tag => !selectedTags.includes(tag)).map(tag => (
                  <button
                    key={tag}
                    className={`block w-full text-left px-4 py-2 text-sm hover:font-bold hover:bg-gray-100 dark:hover:font-bold dark:hover:bg-zinc-700 cursor-pointer ${TAG_COLORS[tag]}`}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 -mt-5 mb-4">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className={`inline-flex items-center rounded-full px-4 py-1.75 text-md font-bold ${TAG_COLORS[tag]} ${TAG_BACKGROUNDS[tag]}`}
              >
                {tag}
                <button
                  className="ml-2.5 -mt-0.5 text-gray-400 hover:text-red-600 focus:outline-none text-2xl cursor-pointer"
                  onClick={() => handleTagRemove(tag)}
                  aria-label={`Remove ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {selectedTags.length > 0 && filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 w-full">
            <Image
              src="/icons/nofilefound.svg"
              alt="No posts found"
              width={400}
              height={400}
              className="-mb-14"
            />
            <div className={`text-gray-500 dark:text-[#667085] dark:text-[#667085] text-2xl font-mono font-bold ml-3 ${victorMono.className}`}>
              NO BLOG POSTS FOUND
            </div>
          </div>
        ) : (
          sortedYears.map(year => (
            <div key={year} className="mb-10 w-full">
              <h2 className={`text-3xl font-mono font-bold text-[#667085] mb-2 dark:text-gray-400 ${victorMono.className}`}>{year}</h2>
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
          ))
        )}
      </div>
    </main>
  );
} 