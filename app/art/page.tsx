"use client";

import Image from "next/image";
import { useState } from "react";
import { IBM_Plex_Mono, Victor_Mono } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

type Photo = {
  src: string;
  alt: string;
  description: string;
  date: string;
  className: string;
  aspectRatio?: string;
};

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"]
});

const leftColumn: Photo[] = [
  {
    src: "/art/Solitude_in_Vignette.jpg",
    alt: "SOLITUDE IN VIGNETTE",
    description: "A drawing of the inside of my grandfather's hospital from the second floor.",
    date: "10.2021",
    className: "w-full aspect-[4/3] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/3"
  },
  {
    src: "/art/Alley.jpg",
    alt: "ALLEY",
    description: "A printmaking of an alleyway in Japan.",
    date: "01.2020",
    className: "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5"
  },
  {
    src: "/art/Busan.jpeg",
    alt: "BUSAN",
    description: "A geometric reimagination of an alleyway in Busan, South Korea.",
    date: "03.2020",
    className: "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5"
  },
  {
    src: "/art/Engraved_in_Time.JPG",
    alt: "ENGRAVED IN TIME",
    description: "A color pencil drawing of my mother in a traditional Korean hanbok.",
    date: "02.2021",
    className: "w-full aspect-[4/6] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/6"
  },
  {
    src: "/art/The_Swings_of_Childhood_Nostalgia.jpg",
    alt: "THE SWINGS OF CHILDHOOD NOSTALGIA",
    description: "A yellow swing from my mother's childhood overlayed with drawings of my sister and me.",
    date: "12.2020",
    className: "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5"
  },
  {
    src: "/art/Mother_Nature_Digests.JPG",
    alt: "MOTHER NATURE DIGESTS",
    description: "An environmental message about the consequences of our negligence, portrayed through a metaphor of Mother Nature digesting garbage.",
    date: "05.2021",
    className: "w-full aspect-[4/4.1] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/4.1" 
  },
  {
    src: "/art/Passerby_of_Reflected_Ignorance.jpeg",
    alt: "PASSERBY OF REFLECTED IGNORANCE",
    description: "A color pencil drawing of a passerby in front of a mirrored window.",
    date: "06.2020",
    className: "w-full aspect-[4/5.3] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5.3"
  },
  {
    src: "/art/Faces.jpg",
    alt: "FACES",
    description: "Some sketches of my face.",
    date: "09.2021",
    className: "w-full aspect-[4/5.5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5.5"
  }
];

const rightColumn: Photo[] = [
  {
    src: "/art/Birthplace.jpeg",
    alt: "BIRTHPLACE",
    description: "An alleyway in my mother's hometown, overlayed with drawings of my mother as a child.",
    date: "05.2020",
    className: "w-full aspect-[4/5.2] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5.2"
  },
  {
    src: "/art/Common_Thread.jpeg",
    alt: "COMMON THREAD",
    description: "A painting of my mother and grandmother on a beach, overlayed with drawings of me.",
    date: "08.2021",
    className: "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5"
  },
  {
    src: "/art/Her_Precious.jpeg",
    alt: "HER PRECIOUS",
    description: "A watercolor painting of my mother's green glassware.",
    date: "09.2020",
    className: "w-full aspect-[4/3] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/3"
  },
  {
    src: "/art/Incheon.jpeg",
    alt: "INCHEON",
    description: "A dreamy painting of an alleyway in Incheon, South Korea.",
    date: "04.2020",
    className: "w-full aspect-[4/5.15] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5.15"
  },
  {
    src: "/art/Neglected.jpeg",
    alt: "NEGLECTED",
    description: "A watercolor painting of a junkyard filled with worn-out tires.",
    date: "11.2019",
    className: "w-full aspect-[4/2.92] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/3"
  },
  {
    src: "/art/My_Plastic_Friend.jpg",
    alt: "MY PLASTIC FRIEND",
    description: "An environmental message about the consequences of our negligence, portrayed through a metaphor of a dolphin filled with garbage.",
    date: "05.2021",
    className: "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5"
  },
  {
    src: "/art/Patriotic_Insulationism.jpg",
    alt: "PATRIOTIC INSULATIONISM",
    description: "A bald eagle made of packing peanuts.",
    date: "12.2019",
    className: "w-full aspect-[4/1.87] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/3"
  },
  {
    src: "/art/Grandfather.jpg",
    alt: "GRANDFATHER",
    description: "An homage to my late grandfather, created with wine corks and tissue paper.",
    date: "08.2020",
    className: "w-full aspect-[4/6] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/6"
  },
  {
    src: "/art/Unplugged.jpg",
    alt: "UNPLUGGED",
    description: "A printmaking of avintage antique telephone with a rotary dial.",
    date: "02.2020",
    className: "w-full aspect-[4/4.2] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/4.2"
  }
];

// Combine for modal lookup
const allPhotos = [...leftColumn, ...rightColumn];

export default function Art() {
  const [selected, setSelected] = useState<null | number>(null);

  return (
    <main className="flex flex-col min-h-screen px-4 py-8">
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-10 mt-20 ${victorMono.className}`}>ART</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mx-auto">
          {/* Left column */}
          <div className="flex flex-col gap-10">
            {leftColumn.map((photo, idx) => (
              <div
                key={photo.src}
                className={photo.className}
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
                className={photo.className}
                onClick={() => setSelected(idx + leftColumn.length)}
              >
                <Image src={photo.src} alt={photo.alt} fill className="object-contain rounded"/>
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