"use client";

import Image from "next/image";
import { useState } from "react";
import { IBM_Plex_Mono, Victor_Mono } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"]
});

const leftColumn = [
  {
    src: "/photo/beerwall.jpg",
    alt: "NEELAY'S BEER WALL",
    description: "Neelay's beer wall in his apartment at State College, PA",
    date: "04.29.2025",
    aspectRatio: "4/5"
  },
  {
    src: "/photo/bellmtn.jpg",
    alt: "BELL MOUNTAIN",
    description: "Sunset at Bell Mountain in Hiawasse, GA",
    date: "01.03.2025",
    className: "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5"
  },

  {
    src: "/photo/banff.jpg",
    alt: "LAKE LOUISE",
    description: "Mountains in Lake Louise in Banff National Park, Alberta, Canada",
    date: "05.24.2024",
    aspectRatio: "4/5"
  },
  {
    src: "/photo/cancun.jpg",
    alt: "SUNRISE",
    description: "Dreamy sunrise on the beach of Occidental Tucancún in Cancun, Mexico",
    date: "08.16.2023",
    aspectRatio: "4/5"
  },
  {
    src: "/photo/busan.jpg",
    alt: "BUSAN",
    description: "A boat under the Gwangan Bridge in Busan, South Korea",
    date: "06.12.2023",
    className: "w-full aspect-[4/5.35] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5.35"
  },
  {
    src: "/photo/amsterdam.jpg",
    alt: "AMSTERDAM",
    description: "Victoria Hotel near Amsterdam Central Station in Amsterdam, Netherlands",
    date: "03.05.2023",
    aspectRatio: "4/5"
  },
  {
    src: "/photo/sunset.jpg",
    alt: "SUNSET",
    description: "A beautiful sunset at the intersection of Bell Road and McGinnis Ferry Road",
    date: "08.18.2022",
    aspectRatio: "4/5"
  },
  {
    src: "/photo/hands.jpg",
    alt: "HANDS",
    description: "Sculpture of hands in the Eden Paradise Hotel in Gyeonggi-do, South Korea",
    date: "07.23.2018",
    className: "w-full aspect-[4/2.79] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/2.79"
  },
];

const rightColumn = [
  {
    src: "/photo/montserrat.jpg",
    alt: "MONTSERRAT",
    description: "Santa Maria de Montserrat Abbey in Catalonia, Spain",
    date: "03.04.2025",
    aspectRatio: "4/5"
  },
  {
    src: "/photo/forest.jpg",
    alt: "FOREST",
    description: "The Forests of Schenley Park in Pittsburgh, PA",
    date: "07.10.2024",
    aspectRatio: "4/5"
  },
  {
    src: "/photo/morantcurve.jpg",
    alt: "MORANT'S CURVE",
    description: "Famous train curve on Bow Valley Parkway in Banff National Park, Alberta, Canada",
    date: "05.24.2024",
    aspectRatio: "4/5"
  },
  {
    src: "/photo/pointstate.jpg",
    alt: "POINT STATE PARK",
    description: "July 4th at Point State Park in Pittsburgh, PA",
    date: "07.04.2023",
    className: "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5"
  },
  {
    src: "/photo/schenley.jpg",
    alt: "SCHENLEY PARK",
    description: "Blinking headlights at Schenley Park in Pittsburgh, PA",
    date: "04.15.2023",
    aspectRatio: "4/5"
  },
  {
    src: "/photo/carnegie.jpg",
    alt: "SNOWFALL",
    description: "Snowfall at the intersection of Morewood Avenue and Forbes Avenue in Pittsburgh, PA",
    date: "01.31.2023",
    aspectRatio: "4/5"
  },
  {
    src: "/photo/riverwalk.jpg",
    alt: "RIVERWALK",
    description: "Sunset outside Riverwalk in Johns Creek, GA",
    date: "08.05.2022",
    aspectRatio: "4/5"
  },
  {
    src: "/photo/waterfall.jpg",
    alt: "JIONNOTAKI",
    description: "Waterfall in Kusu, Japan",
    date: "07.18.2018",
    className: "w-full aspect-[4/2.83] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/2.83"
  }
];

// Combine for modal lookup
const allPhotos = [...leftColumn, ...rightColumn];

export default function Photo() {
  const [selected, setSelected] = useState<null | number>(null);

  return (
    <main className="flex flex-col min-h-screen px-4 py-8">
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-10 mt-20 ${victorMono.className}`}>PHOTO</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mx-auto">
          {/* Left column */}
          <div className="flex flex-col gap-10">
            {leftColumn.map((photo, idx) => (
              <div
                key={photo.src}
                className={photo.className || "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105"}
                onClick={() => setSelected(idx)}
              >
                <Image src={photo.src} alt={photo.alt} fill className="object-contain rounded"/>
              </div>
            ))}
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-10">
            {rightColumn.map((photo, idx) => (
              <div
                key={photo.src}
                className={photo.className || "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105"}
                onClick={() => setSelected(idx + leftColumn.length)}
              >
                <Image src={photo.src} alt={photo.alt} fill className="object-contain rounded" />
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
              <div className={`w-full aspect-[${allPhotos[selected].aspectRatio || "4/5.33"}] relative mb-4`}>
                <Image src={allPhotos[selected].src} alt={allPhotos[selected].alt} fill className="object-cover rounded-md" />
              </div>
              <div className="-mt-2 flex justify-between items-baseline">
                <div className="text-lg font-semibold">{allPhotos[selected].alt}</div>
                <div className="text-gray-500 text-md">{allPhotos[selected].date}</div>
              </div>
              <div className={`mt-1 text-base leading-none ${ibmMono.className}`}>{allPhotos[selected].description}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 