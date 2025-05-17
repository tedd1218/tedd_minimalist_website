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
    src: "/art/Solitude_in_vignette.jpg",
    alt: "SOLITUDE IN VIGNETTE",
    description: "A drawing of the inside of my grandfather's hospital from the second floor. He passed away shortly thereafter from lung cancer.",
    date: "10.2021",
    className: "w-full aspect-[4/3] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/3"
  },
  {
    src: "/art/Alley.jpg",
    alt: "ALLEY",
    description: "My love for alleys is quite unique, and I first noticed this on a trip to Japan. Here, I replicated a picture I took of a narrow path filled with overgrown plants and closed shops. To emphasize the antique, traditional sentiment I initially felt, I used an age-old technique called printmaking. Utilizing a technique from the past while portraying today in black-and-white, I established an everlasting connection between the past and the present. ",
    date: "01.2020",
    className: "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5"
  },
  {
    src: "/art/Busan.jpeg",
    alt: "BUSAN",
    description: "As part of my experimentation with alleyways, this painting uses geometric and semi-abstract techniques to essentially create a simplified world, devoid of any complex lines or structures. The world is filled with complex ideas and ever changing principles, so I thought it would be a great experiment to try to perceive beyond reality and into the unknown.",
    date: "03.2020",
    className: "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5"
  },
  {
    src: "/art/Engraved_in_Time.JPG",
    alt: "ENGRAVED IN TIME",
    description: "At first glance, this drawing appears to show my mother decades ago in a traditional Korean hanbok. But the subtle bursts of color along the edges underscore the idea of rosy retrospection — our tendency to infuse otherwise dull, black-and-white memories with vivid hues to make them feel more real. Rosy retrospection is just one of the nostalgia-driven cognitive biases that recur throughout my work.",
    date: "02.2021",
    className: "w-full aspect-[4/6] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/6"
  },
  {
    src: "/art/The_Swings_of_Childhood_Nostalgia.jpg",
    alt: "THE SWINGS OF CHILDHOOD NOSTALGIA",
    description: "The original yellow swing in the background is the swing my mother played on when she was a child. Wanting to share the same joy, I added drawings of my sister and me, overlapping our shared memories. Through this, I explored the idea of nostalgia: connecting my mother’s memory of the swing and my love for them.",
    date: "12.2020",
    className: "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5"
  },
  {
    src: "/art/Mother_nature_Digests.JPG",
    alt: "MOTHER NATURE DIGESTS",
    description: "This painting highlights my concern for the environment through metaphorical experimentation. We normally see Mother Nature as this powerful being, representing all life on Earth. However, I added a twist, displaying her suffering as she slowly gets consumed and overwhelmed by the garbage she is 'responsible' for cleaning up. Through this artwork, I emphasize that there is a limit to what Mother Nature can do for our irresponsible, immature — that it’s time we take matters into our own hands and help her clean the Earth.",
    date: "05.2021",
    className: "w-full aspect-[4/4.1] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/4.1" 
  },
  {
    src: "/art/Passerby_of_Reflected_Ignorance.jpeg",
    alt: "PASSERBY OF REFLECTED IGNORANCE",
    description: "Located at a beautiful storefront in the middle of San Francisco, this artwork displays a mirrored window of bystanders walking unknowingly, unaware of their reflection. Hence, their reflected ignorance. Sometimes we need to take a moment and glance at our reflection, to understand who we really are as human beings.",
    date: "06.2020",
    className: "w-full aspect-[4/5.3] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5.3"
  },
  {
    src: "/art/Faces.jpg",
    alt: "FACES",
    description: "Sometimes when I’m in a pensive mood, I like to draw various poses that I find myself in, especially while I’m thinking. In a quick 30 minutes, a couple of lines turn into a full on self portrait that represents myself when I’m in a calm, tranquil state.",
    date: "09.2021",
    className: "w-full aspect-[4/5.5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5.5"
  }
];

const rightColumn: Photo[] = [
  {
    src: "/art/Birthplace.jpeg",
    alt: "BIRTHPLACE",
    description: "This artwork displays my obsession with alleyways, but with a twist. Instead of simply painting a picture, I added pictures of my young mother, showing not only her, but also her own birthplace in her hometown.",
    date: "05.2020",
    className: "w-full aspect-[4/5.2] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5.2"
  },
  {
    src: "/art/Common_Thread.jpeg",
    alt: "COMMON THREAD",
    description: "This artwork, from a glance, is simply a picture of my mother and my grandmother sitting on a beach. But I’ve woven in prints of myself in various poses — as though I were there with them that day — to evoke a shared nostalgia that transcends time.",
    date: "08.2021",
    className: "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5"
  },
  {
    src: "/art/Her_Precious.jpeg",
    alt: "HER PRECIOUS",
    description: "My mother’s cupboard was always filled with green glassware, ranging from cups to bowls to dishes. These are her precious artifacts, some originating from almost two decades ago. While I admire the history behind these objects, I’m also fascinated by the beautiful green hue that reflects off the glass.",
    date: "09.2020",
    className: "w-full aspect-[4/3] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/3"
  },
  {
    src: "/art/Incheon.jpeg",
    alt: "INCHEON",
    description: "This is another of my alleyway paintings, this time of a place in Incheon, South Korea. This was a continuation of my experimentation with simple shapes and solid colors, depicting a painting that is pleasant to the eye — like a flat design concept.",
    date: "04.2020",
    className: "w-full aspect-[4/5.15] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5.15"
  },
  {
    src: "/art/Neglected.jpeg",
    alt: "NEGLECTED",
    description: "Another one of my environmental escapades, this time I visited a junkyard filled with worn-out tires. There is so much potential for reuse in these tires, and yet they sit here to rust, abandoned and neglected. By carelessly throwing these tires away, we lose the ability to recycle the rubber in these tires, hurting the environment in the process.",
    date: "11.2019",
    className: "w-full aspect-[4/2.92] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/3"
  },
  {
    src: "/art/My_Plastic_Friend.jpg",
    alt: "MY PLASTIC FRIEND",
    description: "Inspired by my concern for environmental issues, I crafted a painting displaying a healthy, blue dolphin and his dying friend, who is filled with garbage floating around in the ocean that has accumulated in its body over time. The symbolic nature of the red netted dolphin emphasizes how humanity has harmed innocent animals, both directly and indirectly.",
    date: "05.2021",
    className: "w-full aspect-[4/5] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/5"
  },
  {
    src: "/art/Patriotic_Insulationism.jpg",
    alt: "PATRIOTIC INSULATIONISM",
    description: "Blending patriotic sentiment with environmental issues, I found a perfect middle ground in the bald eagle, a once endangered species that bounced back after multiple environmental protection laws. Its resilience inspired me to create this sculpture made purely of packing peanuts, emphasizing environmentally friendly materials and responsible recycling.",
    date: "12.2019",
    className: "w-full aspect-[4/1.87] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/3"
  },
  {
    src: "/art/Grandfather.jpg",
    alt: "GRANDFATHER",
    description: "As an homage to my late grandfather who passed away, I gathered corks of his favorite wine bottles and strategically placed tissue paper to replicate the last picture I took of him smiling. This is a commemoration for the man who raised me, stood by my side, and gave me the strength to take on any challenge I pursued.",
    date: "08.2020",
    className: "w-full aspect-[4/6] relative cursor-pointer transition-transform duration-200 hover:scale-105",
    aspectRatio: "4/6"
  },
  {
    src: "/art/Unplugged.jpg",
    alt: "UNPLUGGED",
    description: "A vintage antique telephone with a rotary dial.",
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