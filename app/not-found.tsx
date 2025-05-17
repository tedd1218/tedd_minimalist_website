'use client';

import Link from "next/link";
import { Victor_Mono } from "next/font/google";

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="text-center space-y-6">
        <h1 className={`text-6xl font-bold tracking-wider ${victorMono.className}`}>404</h1>
        <p className="text-xl text-muted-foreground">PAGE NOT FOUND</p>
        <Link 
          href="/" 
          className="inline-block text-primary hover:text-[#E85860]"
        >
          RETURN HOME
        </Link>
      </div>
    </main>
  );
} 