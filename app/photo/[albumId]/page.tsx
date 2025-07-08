"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { IBM_Plex_Mono, Victor_Mono } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import supabase from '@/lib/supabase';

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"]
});

export default function AlbumPage() {
  const { albumId } = useParams<{ albumId: string }>();
  const [selected, setSelected] = useState<null | number>(null);
  const [album, setAlbum] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!albumId) return;

    const fetchAlbumData = async () => {
      try {
        // Fetch album info
        const { data: albumData, error: albumError } = await supabase
          .from("photo-albums")
          .select("*")
          .eq("album_id", albumId)
          .single();

        if (albumError) {
          setError(albumError.message);
          setLoading(false);
          return;
        }

        // Fetch photos for this album
        const { data: photosData, error: photosError } = await supabase
          .from("photo-images")
          .select("*")
          .eq("album_id", albumId)
          .order("id", { ascending: true });

        if (photosError) {
          setError(photosError.message);
          setLoading(false);
          return;
        }

        setAlbum(albumData);
        setPhotos(photosData || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load album data");
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (selected === null) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        setSelected((prev) => prev === null ? null : (prev - 1 + photos.length) % photos.length);
      } else if (e.key === 'ArrowRight') {
        setSelected((prev) => prev === null ? null : (prev + 1) % photos.length);
      } else if (e.key === 'Escape') {
        setSelected(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, photos.length]);

  if (loading) {
    return (
      <main className="flex flex-col min-h-screen px-4 py-8">
        <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-5 mt-20">
            <Link href="/photo" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              ← Back to Albums
            </Link>
          </div>
          <div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full aspect-[4/5] relative cursor-pointer">
                  <div className="w-90 h-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !album) {
    return (
      <main className="flex flex-col min-h-screen px-4 py-8">
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className={`text-2xl font-bold mb-4 ${victorMono.className}`}>
            {error ? "Error loading album" : "Album not found"}
          </h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Link href="/photo" className="text-blue-500 hover:underline">
            Back to Photography
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen px-4 py-8">
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-5 mt-20">
          <Link href="/photo" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            ← Back to Albums
          </Link>
        </div>
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-2 ${victorMono.className}`}>{album.title}</h1>
        <div className="mb-8 text-gray-500 text-md">{photos.length} Photo{photos.length !== 1 ? 's' : ''}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              className={`w-full aspect-[${photo.aspect_ratio || "4/5"}] relative cursor-pointer transition-transform duration-200 hover:scale-105`}
              onClick={() => setSelected(idx)}
            >
              <img src={photo.image_url} alt={photo.alt_text} className="object-cover"/>
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal Popup */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" 
            onClick={() => setSelected(null)}
          >
            <div className="flex items-center justify-center w-full h-full">
              {/* Left Arrow (next to modal, fixed width) */}
              <div className="mr-2 w-12 flex items-center justify-center">
                {selected > 0 && (
                  <button
                    className="bg-white/80 dark:bg-zinc-800/80 rounded-full p-2 shadow hover:bg-gray-200 dark:hover:bg-zinc-700 transition z-50 cursor-pointer"
                    onClick={e => { e.stopPropagation(); setSelected(selected - 1); }}
                    aria-label="Previous photo"
                    tabIndex={0}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                )}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 max-w-lg w-full relative flex-shrink-0"
                onClick={e => e.stopPropagation()}
                tabIndex={-1}
              >
                <div className={`w-full aspect-[${photos[selected].aspect_ratio || "4/5"}] relative mb-4`}>
                  <img src={photos[selected].image_url} alt={photos[selected].alt} className="object-cover rounded-md" />
                </div>
                <div className="-mt-2 flex justify-between items-baseline">
                  <div className="text-lg font-semibold">{photos[selected].alt}</div>
                  <div className="text-gray-500 text-md">{photos[selected].date}</div>
                </div>
                <div className={`mt-1 text-base leading-none ${ibmMono.className}`}>{photos[selected].description}</div>
              </motion.div>
              {/* Right Arrow (next to modal, fixed width) */}
              <div className="ml-2 w-12 flex items-center justify-center">
                {selected < photos.length - 1 && (
                  <button
                    className="bg-white/80 dark:bg-zinc-800/80 rounded-full p-2 shadow hover:bg-gray-200 dark:hover:bg-zinc-700 transition z-50 cursor-pointer"
                    onClick={e => { e.stopPropagation(); setSelected(selected + 1); }}
                    aria-label="Next photo"
                    tabIndex={0}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 