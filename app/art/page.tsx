'use client';
import supabase from '@/lib/supabase';
import { IBM_Plex_Mono, Victor_Mono } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"]
});

// Animation variants for grid images
const imageVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.07,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Animation variants for modal overlay and modal
const overlayVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: { opacity: 1, backdropFilter: "blur(6px)", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.3, ease: "easeInOut" } },
};
const modalVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.28, ease: "easeInOut" } },
};
const modalImageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function ArtGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<null | number>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("art")
      .select("*")
      .order("id")
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setImages(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col min-h-screen px-4 py-8">
        <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
          <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-10 mt-20 ${victorMono.className}`}>ART</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

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
              <motion.div
                key={img.id}
                onClick={() => setSelected(index)}
                className={`${img.class_name} cursor-pointer`}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                tabIndex={0}
                role="button"
                aria-label={`View art: ${img.alt}`}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={img.image_url} alt={img.alt} className="w-full" />
              </motion.div>
            ))}
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-8">
            {rightColumn.map((img, index) => (
              <motion.div
                key={img.id}
                onClick={() => setSelected(index + leftColumn.length)}
                className={`${img.class_name} cursor-pointer`}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                tabIndex={0}
                role="button"
                aria-label={`View art: ${img.alt}`}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={img.image_url} alt={img.alt} className="w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal Popup */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            aria-modal="true"
            role="dialog"
          >
            <div className="flex items-center justify-center w-full h-full">
              {/* Left Arrow (next to modal, fixed width) */}
              <div className="mr-2 w-12 flex items-center justify-center">
                {selected > 0 && (
                  <button
                    className="bg-white/80 dark:bg-zinc-800/80 rounded-full p-2 shadow hover:bg-gray-200 dark:hover:bg-zinc-700 transition z-50 cursor-pointer flex items-center justify-center"
                    onClick={e => { e.stopPropagation(); setSelected(selected - 1); }}
                    aria-label="Previous art"
                    tabIndex={0}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                )}
              </div>
              <motion.div
                key="modal"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 max-w-lg w-full relative flex-shrink-0"
                onClick={e => e.stopPropagation()}
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={modalImageVariants}
                  className={`w-full aspect-[${images[selected].aspect_ratio || "4/5.33"}] relative mb-4`}
                >
                  <img src={images[selected].image_url} alt={images[selected].alt} className="object-cover rounded-md" />
                </motion.div>
                <div className="-mt-2 flex justify-between items-baseline">
                  <div className="text-lg font-semibold">{images[selected].alt}</div>
                  <div className="text-gray-500 text-md">{images[selected].date}</div>
                </div>
                <div className={`mt-1 text-base leading-none ${ibmMono.className}`}>{images[selected].description}</div>
              </motion.div>
              {/* Right Arrow (next to modal, fixed width) */}
              <div className="ml-2 w-12 flex items-center justify-center">
                {selected < images.length - 1 && (
                  <button
                    className="bg-white/80 dark:bg-zinc-800/80 rounded-full p-2 shadow hover:bg-gray-200 dark:hover:bg-zinc-700 transition z-50 cursor-pointer flex items-center justify-center"
                    onClick={e => { e.stopPropagation(); setSelected(selected + 1); }}
                    aria-label="Next art"
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

