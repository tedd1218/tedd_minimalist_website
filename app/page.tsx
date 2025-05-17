'use client';

import Image from "next/image";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google"
import LightDarkToggle from "../components/LightDarkToggle";

const ibmMono = IBM_Plex_Mono({
  weight: ["300"],
  subsets: ["latin"]
});

export default function Home() {
  return (
    <main className="flex flex-col justify-between min-h-screen text-center px-4 py-8">
      <div className="flex flex-col items-center justify-center flex-grow space-y-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider">&lt;TEDD&gt;</h1>

        <nav className="flex flex-col items-center space-y-4 text-xl sm:text-2xl font-light">
          <Link href="/blog" className="hover:text-[#E85860] transition-colors">BLOG</Link>
          <Link href="/about" className="hover:text-[#E85860] transition-colors">ABOUT</Link>
          <Link href="/art" className="hover:text-[#E85860] transition-colors">ART</Link>
          <Link href="/photo" className="hover:text-[#E85860] transition-colors">PHOTOGRAPHY</Link>
          <Link href="/contact" className="hover:text-[#E85860] transition-colors">CONTACT</Link>
        </nav>
      </div>
    </main>
  );
}