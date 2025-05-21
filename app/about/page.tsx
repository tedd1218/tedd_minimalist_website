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
          You’ll also find my blog, where I share my own insights — and occasionally those of my friends — on a wide range of topics.
        </p>
        <p className="mb-4 text-lg">
          As a fan of minimalist design, I built this website to reflect the idea that less is more. Complicated visuals and flashy animations aren't always necessary to communicate effectively — in fact, I believe simplicity often conveys ideas more clearly and powerfully.
        </p>
        <p className="mb-2 text-lg">Here are some of my past projects:</p>
        <ul className="mb-6 pl-4 list-disc space-y-1 text-lg">
          <li>
            <a style={{ color: '#E85860' }} href="https://github.com/tedd1218/chipcity" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Chip City</a>: 6 seated No Limit Hold'em Poker game connected with websockets with an HTML/CSS/VanillaJS frontend and a Django Framework backend
          </li>
          <li>
            <a style={{ color: '#E85860' }} href="https://github.com/tedd1218/FantasyFootballBot" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Fantasy Football Bot</a>: Utilized various Python libraries to generate optimized weekly position-based player rankings for Fantasy Football in the NFL
          </li>
          <li>
            <a style={{ color: '#E85860' }} href="https://cmu-graphics.github.io/Scotty3D-docs/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Scotty3D</a>: A functioning computer graphics software package
          </li>
        </ul>
        <p className="mb-4 text-lg">If you're just browsing, I hope you enjoy exploring my site.</p>
        <p className="mb-4 text-lg">
          If you're a recruiter, feel free to check out my{' '}
          <Link href="/tedd_resume.pdf" style={{ color: '#E85860' }} target="_blank" className="underline hover:opacity-80">resume</Link>.
        </p>
        <p className="mb-8 text-lg">And a special thanks to <a href="https://angezanetti.com/" className="underline text-[#E85860] hover:opacity-80" target="_blank" rel="noopener noreferrer">Xavier Coiffard</a> and <a href="https://pixelwrld.co//" className="underline text-[#E85860] hover:opacity-80" target="_blank" rel="noopener noreferrer">Roman Tesliuk</a> for the website design inspiration.</p>
      </div>
    </main>
  );
} 