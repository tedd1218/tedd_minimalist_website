import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Victor_Mono, IBM_Plex_Mono } from 'next/font/google';
import Image from 'next/image';

interface PageProps {
  params: { slug: string }
}

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"]
});

export default async function BlogPost({ params }: PageProps) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  
  return (
    <main className={`${ibmMono.className} flex flex-col min-h-screen px-4 py-8`}>
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        
        {/* Date */}
        <div className={`text-[#667085] text-md font-mono mt-20 font-semibold ${victorMono.className}`}>{data.date ? new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</div>
        
        {/* Title */}
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-2 ${victorMono.className}`}>{data.title}</h1>
        
        {/* Meta row */}
        <div className="flex flex-col items-start gap-2 text-[#667085] text-xl font-mono mb-2">
          {/* Author */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              <Image src="/icons/author.svg" alt={data.author || "Author"} fill className="object-contain rounded" />
            </span>
            {data.author || "Unknown Author"}
          </span>
          {/* Tags */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              <Image src="/icons/tag.svg" alt="Tags" fill className="object-contain rounded" />
            </span>
            {data.tags ? Array.isArray(data.tags) ? data.tags.map((tag: string) => `#${tag}`).join(' ') : `${data.tags}` : ""}
          </span>
          {/* Reading time */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              <Image src="/icons/read.svg" alt="Reading time" fill className="object-contain rounded" />
            </span>
            {data.readtime || ""}
          </span>
        </div>
        {/* Underline */}
        <div className="h-1 w-60 bg-[#E85860] mb-10" />
        <article className="prose -mt-5" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </main>
  );
} 