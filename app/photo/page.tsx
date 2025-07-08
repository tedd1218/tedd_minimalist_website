"use client";

import Image from "next/image";
import Link from "next/link";
import { IBM_Plex_Mono, Victor_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import supabase from '@/lib/supabase';

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"]
});

export default function Photo() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("photo-albums")
      .select("*")
      .order("id")
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
        } else {
          setAlbums(data || []);
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col min-h-screen px-4 py-8">
        <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full mb-10">
          <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-10 mt-20 ${victorMono.className}`}>PHOTOGRAPHY</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
                <div className="mt-2 space-y-2">
                  <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col min-h-screen px-4 py-8">
        <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full mb-10">
          <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-10 mt-20 ${victorMono.className}`}>PHOTOGRAPHY</h1>
          <div className="text-red-500">Error loading albums: {error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen px-4 py-8">
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full mb-10">
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-10 mt-20 ${victorMono.className}`}>PHOTOGRAPHY</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {albums.map((album) => (
            <div
              key={album.id}
            >
              <Link href={`/photo/${album.album_id}`} className="block group">
                <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={album.cover_photo} 
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl font-semibold tracking-wide ${victorMono.className}`}>
                      {album.title}
                    </h3>
                    <span className="mr-1 text-base text-gray-500 dark:text-gray-400">{album.photo_counts}</span>
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