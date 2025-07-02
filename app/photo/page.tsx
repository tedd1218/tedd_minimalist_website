"use client";

import Image from "next/image";
import Link from "next/link";
import { IBM_Plex_Mono, Victor_Mono } from "next/font/google";


const victorMono = Victor_Mono({
  subsets: ["latin"]
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"]
});

// Define albums with cover photos and metadata
const albums = [
  {
    id: "2025",
    title: "2025",
    coverPhoto: "/photo/beerwall.JPG"
  },
  {
    id: "banff-2024",
    title: "BANFF NATIONAL PARK",
    coverPhoto: "/photo/banff.JPG"
  },
  {
    id: "pittsburgh-2023-2024",
    title: "PITTSBURGH",
    coverPhoto: "/photo/pointstate.JPG"
  },
  {
    id: "international-2023",
    title: "INTERNATIONAL",
    coverPhoto: "/photo/amsterdam.JPG"
  },
  {
    id: "georgia-2022",
    title: "GEORGIA",
    coverPhoto: "/photo/sunset.JPG"
  },
  {
    id: "asia-2018",
    title: "ASIA",
    coverPhoto: "/photo/hands.jpg"
  }
];

const albumPhotoCounts: Record<string, number> = {
  "2025": 2,
  "banff-2024": 2,
  "pittsburgh-2023-2024": 4,
  "international-2023": 2,
  "georgia-2022": 2,
  "asia-2018": 2,
};

export default function Photo() {
  return (
    <main className="flex flex-col min-h-screen px-4 py-8">
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full mb-10">
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-10 mt-20 ${victorMono.className}`}>PHOTOGRAPHY</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {albums.map((album, index) => (
            <div
              key={album.id}
            >
              <Link href={`/photo/${album.id}`} className="block group">
                <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image 
                    src={album.coverPhoto} 
                    alt={album.title}
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl font-semibold tracking-wide ${victorMono.className}`}>
                      {album.title}
                    </h3>
                    <span className="mr-1 text-base text-gray-500 dark:text-gray-400">{albumPhotoCounts[album.id]}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 