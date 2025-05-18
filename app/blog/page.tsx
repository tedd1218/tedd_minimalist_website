import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Victor_Mono, IBM_Plex_Mono } from 'next/font/google';

export const dynamic = 'force-static'; // SSG

type PostMeta = {
  title?: string;
  date?: string;
  tags?: string[] | string;
  author?: string;
  readtime?: string;
  slug: string;
};

const ibmMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"]
});

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

function getYear(date: string | undefined) {
  if (!date) return 'Unknown';
  const d = new Date(date);
  if (!isNaN(d.getTime())) {
    return d.getFullYear().toString();
  }
  // fallback: try to extract 4-digit year from string
  const match = date.match(/\d{4}/);
  return match ? match[0] : 'Unknown';
}

function safeDateString(date: string | undefined) {
  return date ? new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric' }).toUpperCase() : '';
}

export default function BlogIndex() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch {
    filenames = [];
  }

  const posts: PostMeta[] = filenames.filter(f => f.endsWith('.md')).map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.md$/, '');
    return {
      title: data.title || slug,
      date: data.date || '',
      tags: data.tags || [],
      author: data.author || '',
      readtime: data.readtime || '',
      slug,
    };
  });

  // Group posts by year
  const postsByYear: { [year: string]: PostMeta[] } = {};
  posts.forEach(post => {
    const year = getYear(post.date);
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  });

  // Sort years descending
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