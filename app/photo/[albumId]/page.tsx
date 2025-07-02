"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { IBM_Plex_Mono, Victor_Mono } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"]
});

// Album data with photos
const albumData = {
  "2025": {
    title: "2025",
    photos: [
      {
        src: "/photo/beerwall.JPG",
        alt: "NEELAY'S BEER WALL",
        description: "Neelay's beer wall in his apartment at State College, PA.",
        date: "04.29.2025",
        aspectRatio: "4/5"
      },
      {
        src: "/photo/bellmtn.JPG",
        alt: "BELL MOUNTAIN",
        description: "Sunset at Bell Mountain in Hiawasse, GA.",
        date: "01.03.2025",
        aspectRatio: "4/5"
      }
    ]
  },
  "banff-2024": {
    title: "BANFF NATIONAL PARK",
    photos: [
      {
        src: "/photo/banff.JPG",
        alt: "LAKE LOUISE",
        description: "Mountains in Lake Louise in Banff National Park, Alberta, Canada.",
        date: "05.24.2024",
        aspectRatio: "4/5"
      },
      {
        src: "/photo/morantcurve.JPG",
        alt: "MORANT'S CURVE",
        description: "Famous train curve on Bow Valley Parkway in Banff National Park, Alberta, Canada.",
        date: "05.24.2024",
        aspectRatio: "4/5"
      }
    ]
  },
  "pittsburgh-2023-2024": {
    title: "PITTSBURGH",
    photos: [
      {
        src: "/photo/pointstate.JPG",
        alt: "POINT STATE PARK",
        description: "July 4th at Point State Park in Pittsburgh, PA.",
        date: "07.04.2023",
        aspectRatio: "4/5"
      },
      {
        src: "/photo/schenley.JPG",
        alt: "SCHENLEY PARK",
        description: "Blinking headlights at Schenley Park in Pittsburgh, PA.",
        date: "04.15.2023",
        aspectRatio: "4/5"
      },
      {
        src: "/photo/carnegie.JPG",
        alt: "SNOWFALL",
        description: "Snowfall at the intersection of Morewood Avenue and Forbes Avenue in Pittsburgh, PA.",
        date: "01.31.2023",
        aspectRatio: "4/5"
      },
      {
        src: "/photo/forest.JPG",
        alt: "FOREST",
        description: "The Forests of Schenley Park in Pittsburgh, PA.",
        date: "07.10.2024",
        aspectRatio: "4/5"
      }
    ]
  },
  "international-2023": {
    title: "INTERNATIONAL",
    photos: [
      {
        src: "/photo/amsterdam.JPG",
        alt: "AMSTERDAM",
        description: "Victoria Hotel near Amsterdam Central Station in Amsterdam, Netherlands.",
        date: "03.05.2023",
        aspectRatio: "4/5"
      },
      {
        src: "/photo/montserrat.JPG",
        alt: "MONTSERRAT",
        description: "Santa Maria de Montserrat Abbey in Catalonia, Spain.",
        date: "03.04.2025",
        aspectRatio: "4/5"
      }
    ]
  },
  "georgia-2022": {
    title: "GEORGIA",
    photos: [
      {
        src: "/photo/sunset.JPG",
        alt: "SUNSET",
        description: "A beautiful sunset at the intersection of Bell Road and McGinnis Ferry Road.",
        date: "08.18.2022",
        aspectRatio: "4/5"
      },
      {
        src: "/photo/riverwalk.JPG",
        alt: "RIVERWALK",
        description: "Sunset outside Riverwalk in Johns Creek, GA.",
        date: "08.05.2022",
        aspectRatio: "4/5"
      }
    ]
  },
  "asia-2018": {
    title: "ASIA",
    photos: [
      {
        src: "/photo/hands.jpg",
        alt: "HANDS",
        description: "Sculpture of hands in the Eden Paradise Hotel in Gyeonggi-do, South Korea.",
        date: "07.23.2018",
        aspectRatio: "4/3"
      },
      {
        src: "/photo/waterfall.jpg",
        alt: "JIONNOTAKI",
        description: "Waterfall in Kusu, Japan.",
        date: "07.18.2018",
        aspectRatio: "4/3"
      }
    ]
  }
};

export default function AlbumPage({ params }: { params: { albumId: string } }) {
  const [selected, setSelected] = useState<null | number>(null);
  const album = albumData[params.albumId as keyof typeof albumData];

  if (!album) {
    return (
      <main className="flex flex-col min-h-screen px-4 py-8">
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className={`text-2xl font-bold mb-4 ${victorMono.className}`}>Album not found</h1>
          <Link href="/photo" className="text-blue-500 hover:underline">
            Back to Photography
          </Link>
        </div>
      </main>
    );
  }

  // Flatten all photos for modal lookup and correct indexing
  const allPhotos = album.photos;

  // Split photos into two columns for display
  const leftColumn = allPhotos.filter((_, idx) => idx % 2 === 0);
  const rightColumn = allPhotos.filter((_, idx) => idx % 2 === 1);

  // Keyboard navigation for modal
  useEffect(() => {
    if (selected === null) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        setSelected((prev) => prev === null ? null : (prev - 1 + allPhotos.length) % allPhotos.length);
      } else if (e.key === 'ArrowRight') {
        setSelected((prev) => prev === null ? null : (prev + 1) % allPhotos.length);
      } else if (e.key === 'Escape') {
        setSelected(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, allPhotos.length]);

  return (
    <main className="flex flex-col min-h-screen px-4 py-8">
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-5 mt-20">
          <Link href="/photo" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            ← Back to Albums
          </Link>
        </div>
        
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-10 ${victorMono.className}`}>
          {album.title}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mx-auto">
          {/* Left column */}
          <div className="flex flex-col gap-10">
            {leftColumn.map((photo, idx) => {
              // Find the flat index in allPhotos
              const flatIndex = idx * 2;
              return (
                <div
                  key={photo.src}
                  className="w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105"
                  onClick={() => setSelected(flatIndex)}
                >
                  <Image src={photo.src} alt={photo.alt} fill className="object-contain rounded"/>
                </div>
              );
            })}
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-10">
            {rightColumn.map((photo, idx) => {
              // Find the flat index in allPhotos
              const flatIndex = idx * 2 + 1;
              return (
                <div
                  key={photo.src}
                  className="w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105"
                  onClick={() => setSelected(flatIndex)}
                >
                  <Image src={photo.src} alt={photo.alt} fill className="object-contain rounded" />
                </div>
              );
            })}
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
                <div className={`w-full aspect-[${allPhotos[selected].aspectRatio || "4/5.33"}] relative mb-4`}>
                  <Image src={allPhotos[selected].src} alt={allPhotos[selected].alt} fill className="object-cover rounded-md" />
                </div>
                <div className="-mt-2 flex justify-between items-baseline">
                  <div className="text-lg font-semibold">{allPhotos[selected].alt}</div>
                  <div className="text-gray-500 text-md">{allPhotos[selected].date}</div>
                </div>
                <div className={`mt-1 text-base leading-none ${ibmMono.className}`}>{allPhotos[selected].description}</div>
              </motion.div>
              {/* Right Arrow (next to modal, fixed width) */}
              <div className="ml-2 w-12 flex items-center justify-center">
                {selected < allPhotos.length - 1 && (
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