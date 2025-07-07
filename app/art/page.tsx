'use client';
import supabase from '@/lib/supabase';
import { IBM_Plex_Mono, Victor_Mono } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"]
});

export default function ArtGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<null | number>(null);

  useEffect(() => {
    supabase
      .from("art")
      .select("*")
      .order("id")
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setImages(data || []);
      });
  }, []);

  if (error) return <div>Error loading images: {error}</div>;
  
  // Split images
  const mid = Math.floor(images.length / 2);
  const leftColumn = images.slice(0, mid);
  const rightColumn = images.slice(mid);

  return (
    <main className="flex flex-col min-h-screen px-4 py-8">
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-10 mt-20 ${victorMono.className}`}>ART</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Left column */}
          <div className="flex flex-col gap-8">
            {leftColumn.map((img, index) => (
              <div key={img.id} onClick={() => setSelected(index)} className={`${img.class_name} cursor-pointer`}>
                <img src={img.image_url} alt={img.alt} className="w-full" />
              </div>
            ))}
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-8">
            {rightColumn.map((img, index) => (
              <div key={img.id} onClick={() => setSelected(index + leftColumn.length)} className={`${img.class_name} cursor-pointer`}>
                <img src={img.image_url} alt={img.alt} className="w-full" />
              </div>
            ))}
          </div>
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
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 max-w-lg w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <div className={`w-full aspect-[${images[selected].aspect_ratio || "4/5.33"}] relative mb-4`}>
                <img src={images[selected].image_url} alt={images[selected].alt} className="object-cover rounded-md" />
              </div>
              <div className="-mt-2 flex justify-between items-baseline">
                <div className="text-lg font-semibold">{images[selected].alt}</div>
                <div className="text-gray-500 text-md">{images[selected].date}</div>
              </div>
              <div className={`mt-1 text-base leading-none ${ibmMono.className}`}>{images[selected].description}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 

