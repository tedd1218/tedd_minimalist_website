'use client';

import { useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Victor_Mono, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import blogPosts from '../../data/blogPosts';
import { Metadata } from 'next';

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

// This component will check if the blog post exists in our registry
export default function BlogPostWrapper() {
  // Get the current slug from the URL params
  const params = useParams();
  const slug = params?.slug as string;
  
  // Find the post metadata from our registry
  const postData = blogPosts.find(post => post.slug === slug);
  
  // If post doesn't exist in our registry, show 404
  useEffect(() => {
    if (!slug || !postData) {
      notFound();
    }
  }, [slug, postData]);

  // Return null during check to prevent flash
  if (!postData) {
    return null;
  }

  // Now we'll attempt to dynamically render the blog post content
  // This assumes that a component exists for this blog post
  return (
    <DynamicBlogPost slug={slug} postData={postData} />
  );
}

// Component that renders the blog post if the component exists
function DynamicBlogPost({ slug, postData }: { slug: string, postData: any }) {
  return (
    <div className={`${ibmMono.className} flex flex-col min-h-screen px-4 py-8`}>
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
          {safeDateString(postData.date)}
        </div>
        {/* Title */}
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-2 leading-snug ${victorMono.className}`}>
          {postData.title}
        </h1>
        {/* Meta row */}
        <div className="flex flex-col items-start gap-2 text-[#667085] text-xl font-mono mb-2 dark:text-[#959595]">
          {/* Author */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              {/* Light mode */}
              <Image src="/icons/author.svg" alt={postData.author || 'Author'} fill className="object-contain rounded block dark:hidden" />
              {/* Dark mode */}
              <Image src="/icons/authordark.svg" alt={postData.author || 'Author'} fill className="object-contain rounded hidden dark:block" />
            </span>
            {postData.author || 'Unknown Author'}
          </span>
          {/* Tags */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              {/* Light mode */}
              <Image src="/icons/tag.svg" alt="Tags" fill className="object-contain rounded block dark:hidden" />
              {/* Dark mode */}
              <Image src="/icons/tagdark.svg" alt="Tags" fill className="object-contain rounded hidden dark:block" />
            </span>
            {postData.tags
              ? Array.isArray(postData.tags)
                ? postData.tags.map((tag: string) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))
                : <span>{postData.tags}</span>
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
            {postData.readtime || ''}
          </span>
        </div>
        {/* Underline */}
        {(() => {
          const firstTag = Array.isArray(postData.tags) ? postData.tags[0] : postData.tags;
          const underlineColor = TAG_UNDERLINE_COLORS[firstTag] || "#E85860";
          return <div className="h-1 w-60 mb-10" style={{ backgroundColor: underlineColor }} />;
        })()}
        
        {/* Empty article - will show a message to help users */}
        <article className="prose space-y-5 -mt-5">
          <div className="flex flex-col items-center justify-center py-12">
            <Image 
              src="/icons/nofilefound.svg" 
              alt="Post component missing"
              width={400}
              height={400}
              className="mb-4"
            />
            <h3 className={`text-xl font-bold text-center mb-2 ${victorMono.className}`}>
              Post found in registry but component missing
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              This blog post exists in the data registry, but the component file doesn't exist. Please create a component for this blog post.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

// Generate metadata for the page based on the slug
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Find the blog post data based on the slug
  const post = blogPosts.find(post => post.slug === params.slug);
  
  // If the post doesn't exist, return default metadata
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }
  
  // Otherwise, return metadata for the specific blog post
  return {
    title: `${post.title} | Tedd Jung`,
    description: `${post.readtime} - ${post.tags.join(', ')}`,
    openGraph: {
      title: post.title,
      description: `${post.readtime} - ${post.tags.join(', ')}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags.map(tag => tag.replace('#', '')),
      images: [
        {
          url: `/blog/${post.slug}.JPG`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: `${post.readtime} - ${post.tags.join(', ')}`,
      images: [`/blog/${post.slug}.JPG`],
    },
  };
} 