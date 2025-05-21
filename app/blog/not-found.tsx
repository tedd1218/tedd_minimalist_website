'use client';

import Link from "next/link";
import { Victor_Mono, IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"]
});

export default function BlogNotFound() {
  return (
    <main className={`${ibmMono.className} flex flex-col min-h-screen px-4 py-8`}>
      <div className="flex flex-col items-center justify-center flex-grow max-w-3xl mx-auto w-full">
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
        
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src="/icons/nofilefound.svg"
            alt="Blog post not found"
            width={400}
            height={400}
          />
          <h1 className={`text-4xl font-bold tracking-wider -mt-10 mb-4 ${victorMono.className}`}>BLOG POST NOT FOUND</h1>
          <p className="text-lg text-[#667085] dark:text-gray-400 mb-6 max-w-md">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
    </main>
  );
} 