"use client";

import { Victor_Mono } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";

const victorMono = Victor_Mono({
    subsets: ["latin"]
});

const ibmMono = IBM_Plex_Mono({
    weight: ["400"],
    subsets: ["latin"]
});

export default function About() {
  return (
    <main className={`${ibmMono.className} flex flex-col min-h-screen px-4 py-8`}>
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-7 mt-20 ${victorMono.className}`}>ABOUT</h1>
        <p className="mb-4 text-lg">Hello! I'm <span style={{ color: '#E85860' }}>Tedd Jung</span>.</p>
        <p className="mb-4 text-lg">Welcome to my portfolio website.</p>
        <p className="mb-4 text-lg">
          I was born and raised in Johns Creek, a suburb just north of Atlanta. I'm currently studying Electrical and Computer Engineering at Carnegie Mellon University, where I developed a strong passion for web development.
        </p>
        <p className="mb-4 text-lg">
          This site is a curated showcase of my work — from coding projects to visual art and photography.
        </p>
        <p className="mb-4 text-lg">
          You'll also find my blog, where I share my thoughts on a variety of topics, including politics, sports, and pop culture.
        </p>
        <p className="mb-4 text-lg">
          As a fan of minimalist design, I built this website to reflect the idea that less is more. Eye-catching colors and flashy animations aren't always necessary to communicate effectively — in fact, I believe simplicity often conveys ideas more clearly and powerfully.
        </p>
        <p className="mb-2 text-lg">Here are some of my past projects:</p>
        <ul className="mb-6 pl-4 list-disc space-y-1 text-lg">
          <li>
            <span style={{ color: '#E85860' }}>Chip City</span>: 6 seated No Limit Hold'em Poker game connected with websockets with an HTML/CSS/VanillaJS frontend and a Django Framework backend
          </li>
          <li>
            <span style={{ color: '#E85860' }}>Fantasy Football Bot</span>: Utilized various Python libraries to generate optimized weekly position-based player rankings for Fantasy Football in the NFL
          </li>
          <li>
            <span style={{ color: '#E85860' }}>Scotty3D</span>: A functioning computer graphics software package
          </li>
        </ul>
        <p className="mb-4 text-lg">If you're just browsing, I hope you enjoy exploring my site.</p>
        <p className="mb-8 text-lg">
          If you're a recruiter, feel free to check out my{' '}
          <Link href="/tedd_resume.pdf" style={{ color: '#E85860' }} target="_blank" className="underline hover:opacity-80">resume</Link>.
        </p>
      </div>
    </main>
  );
} 