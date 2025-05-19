"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Victor_Mono, IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const victorMono = Victor_Mono({ subsets: ['latin'] });
const ibmMono = IBM_Plex_Mono({ weight: ['400'], subsets: ['latin'] });

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then(res => res.json())
      .then(setPost);
  }, [slug]);

  if (!post) return null;
  const { data, contentHtml } = post;

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
        <Image src="/icons/leftarrow.svg" alt="Back" width={48} height={48} className=""/>
        <span className={`ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-base font-bold text-[#667085] dark:text-gray-200 ${victorMono.className}`}>
          BLOG HOME
        </span>
      </Link>
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        {/* Date */}
        <div className={`text-[#667085] text-md font-mono mt-20 font-semibold dark:text-[#667085] ${victorMono.className}`}>
          {data.date
            ? new Date(data.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : ''}
        </div>
        {/* Title */}
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-2 ${victorMono.className}`}>
          {data.title}
        </h1>
        {/* Meta row */}
        <div className="flex flex-col items-start gap-2 text-[#667085] text-xl font-mono mb-2 dark:text-[#667085]">
          {/* Author */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              <Image src="/icons/author.svg" alt={data.author || 'Author'} fill className="object-contain rounded" />
            </span>
            {data.author || 'Unknown Author'}
          </span>
          {/* Tags */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              <Image src="/icons/tag.svg" alt="Tags" fill className="object-contain rounded" />
            </span>
            {data.tags
              ? Array.isArray(data.tags)
                ? data.tags.map((tag: string) => `#${tag}`).join(' ')
                : data.tags
              : ''}
          </span>
          {/* Reading time */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              <Image src="/icons/read.svg" alt="Reading time" fill className="object-contain rounded" />
            </span>
            {data.readtime || ''}
          </span>
        </div>
        {/* Underline */}
        <div className="h-1 w-60 bg-[#E85860] mb-10" />
        {/* Content */}
        <article className="prose space-y-5 -mt-5" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </motion.main>
  );
}
