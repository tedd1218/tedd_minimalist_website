'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Victor_Mono, IBM_Plex_Mono } from "next/font/google";

const victorMono = Victor_Mono({ subsets: ['latin'] });
const ibmMono = IBM_Plex_Mono({ weight: ['400'], subsets: ['latin'] });

const TAG_UNDERLINE_COLORS: { [key: string]: string } = {
  "#Essay": "#EA2B2B",
  "#Food": "#FF8800",
  "#Journal": "#FFCC00",
  "#Media/Film": "#58A700",
  "#Politics": "#1CB0F6",
  "#Sports": "#06B6D4",
  "#Tech": "#9345C6",
  "#Travel": "#A56644"
};

// Define the blog post data
const data = {
    title: "Italy Trip",
    date: "05-25-2025",
    author: "Tedd Jung",
    tags: ["#Travel"],
    readtime: "9 Min Read"
};

function safeDateString(date: string | undefined) {
  if (!date) return '';
  try {
    // Handle MM-DD-YYYY format
    const parts = date.split('-');
    if (parts.length === 3) {
      const [month, day, year] = parts;
      const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      }
    }
    // Fallback to standard date parsing
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return '';
  } catch (error) {
    return '';
  }
}

export default function EatingBlogPost() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`${ibmMono.className} flex flex-col min-h-screen px-4 py-8`}
    >
      {/* Return to Blog Home Button */}
      <Link
        href="/blog"
        className="fixed left-4 top-9 -translate-y-1/2 z-40 flex items-center group"
        aria-label="Back to Blog Home"
      >
        {/* Light mode icon */}
        <Image
          src="/icons/leftarrowlighttwotone.svg"
          alt="Back"
          width={48}
          height={48}
          className="block dark:hidden"
        />
        {/* Dark mode icon */}
        <Image
          src="/icons/leftarrowdarktwotone.svg"
          alt="Back"
          width={48}
          height={48}
          className="hidden dark:block"
        />
        <span className={`ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-base font-bold text-[#667085] dark:text-gray-200 ${victorMono.className}`}>
          BLOG HOME
        </span>
      </Link>
      <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
        {/* Date */}
        <div className={`text-[#667085] text-lg -mb-1 font-mono mt-20 font-semibold dark:text-[#959595] ${victorMono.className}`}>
          {safeDateString(data.date)}
        </div>
        {/* Title */}
        <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-2 leading-snug ${victorMono.className}`}>
          {data.title}
        </h1>
        {/* Meta row */}
        <div className="flex flex-col items-start gap-2 text-[#667085] text-xl font-mono mb-2 dark:text-[#959595]">
          {/* Author */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              {/* Light mode */}
              <Image src="/icons/author.svg" alt={data.author || 'Author'} fill className="object-contain rounded block dark:hidden" />
              {/* Dark mode */}
              <Image src="/icons/authordark.svg" alt={data.author || 'Author'} fill className="object-contain rounded hidden dark:block" />
            </span>
            {data.author || 'Unknown Author'}
          </span>
          {/* Tags */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              {/* Light mode */}
              <Image src="/icons/tag.svg" alt="Tags" fill className="object-contain rounded block dark:hidden" />
              {/* Dark mode */}
              <Image src="/icons/tagdark.svg" alt="Tags" fill className="object-contain rounded hidden dark:block" />
            </span>
            {data.tags
              ? Array.isArray(data.tags)
                ? data.tags.map((tag: string) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))
                : <span>{data.tags}</span>
              : ''}
          </span>
          {/* Reading time */}
          <span className={`flex items-center gap-2 text-sm ${ibmMono.className}`}>
            <span className="relative w-4 h-4">
              {/* Light mode */}
              <Image src="/icons/read.svg" alt="Reading time" fill className="object-contain rounded block dark:hidden" />
              {/* Dark mode */}
              <Image src="/icons/readtimedark.svg" alt="Reading time" fill className="object-contain rounded hidden dark:block" />
            </span>
            {data.readtime || ''}
          </span>
        </div>
        {/* Underline */}
        {(() => {
          const firstTag = Array.isArray(data.tags) ? data.tags[0] : data.tags;
          const underlineColor = TAG_UNDERLINE_COLORS[firstTag] || "#E85860";
          return <div className="h-1 w-60 mb-10" style={{ backgroundColor: underlineColor }} />;
        })()}
        
        {/* Content */}
        <article className="prose space-y-5 -mt-5">
          <p className="italic">The following is a journal of my trip to Italy.</p> 
          <h1 className="leading-tight">Day 1 - Trevi Fountain, Spanish Steps, and the Belvedere</h1>
          <p>We landed at the Leonardo da Vinci International Airport at around 10:30AM. Because our check-in time was at 1PM, we had to store our luggage in the hotel lobby. From there, we made our way to the city center.</p> 
          <p>We first came across a Tvboy mural, commemorating the Liberation of Italy. Instead of rambling on about how symbolic this artwork is, I'd rather just show you.</p>
          <Image src="/blog/italy/tvboy.JPG" alt="Tvboy mural" width={800} height={800} className="m-auto my-6"/>
          <p>Next, we made our way to the Trevi Fountain, one of the most iconic fountains in the world. It was a beautiful sight, but the crowd was overwhelming. There was a long line in front of the fountain, presumably to take pictures right at the front, but I was too lazy to wait in line.</p>    
          <Image src="/blog/italy/trevi.JPG" alt="Trevi Fountain" width={800} height={800} className="m-auto my-6"/>
          <p>After a quick stop by a gelato shop, we made our way to the Spanish Steps. These steps were created between 1723 and 1725, and are one of the most iconic symbols of Rome. Fun fact, Audrey Hepburn sat on these steps in the 1953 film <a href="https://www.imdb.com/title/tt0046250/" target="_blank" rel="noopener noreferrer" className="underline text-[#A56644] hover:opacity-80 italic">Roman Holiday</a>.</p>
          <Image src="/blog/italy/spanishsteps.JPG" alt="Spanish Steps" width={800} height={800} className="m-auto my-6"/>
          <p>To finish off the evening, we trekked up the streets of Rome to the <a href="https://g.co/kgs/tmKJ2a4" target="_blank" rel="noopener noreferrer" className="underline text-[#A56644] hover:opacity-80">Terrazza del Belvedere</a>. This spot is noted as one of the best places to see the sunset in Rome. Although my phone camera is severely lacking, it did get a few good shots of the beautiful colors of the sunset, shining down on St. Peter's Basilica and the Altare della Patria.</p>
          <div className="flex justify-center gap-4 my-6">
            <Image src="/blog/italy/basilica.JPG" alt="St. Peter's Basilica" width={375} height={375} className="m-auto"/>
            <Image src="/blog/italy/altaredellapatria.JPG" alt="Altare della Patria" width={375} height={375} className="m-auto"/>
          </div>
          <h1 className="leading-tight">Day 2 - Pompeii & Amalfi Coast</h1>
          <p>Today we had a tour booked for Pompeii and the Amalfi Coast. We started the day at 6AM at a meeting point a few blocks away from our hotel. From there, a bus took us straight to Pompeii, where we spent the next few hours exploring the ruins. The weather was very nice, surprisingly, and cool enough to wear long pants. Here are a few pictures from the Pompeii ruins.</p>
          <div className="flex justify-center gap-4 my-6">
            <Image src="/blog/italy/pompeicolumns.JPG" alt="Pompeii Columns" width={375} height={375} className="m-auto"/>
            <Image src="/blog/italy/pompeibuilding.JPG" alt="Pompeii Building" width={375} height={375} className="m-auto"/>
          </div>
          <Image src="/blog/italy/pompeicast.JPG" alt="Pompeii Cast" width={800} height={800} className="m-auto my-6"/>
          <p>The Amalfi Coast was honestly breathtaking. I've never seen a city so concentrated next to the ocean. The water had a distinct Colbalt and Azure-esque color, creating this shade of blue that was so vibrant and pure. The juxtaposition of the colorful buildings and the crystal clear waters created a striking image — for the first time, it felt like Instagram did not do enough justice for this wonderous place.</p>
          <div className="flex justify-center gap-4 my-6">
            <Image src="/blog/italy/boats.jpg" alt="Amalfi Boats" width={375} height={375} className="m-auto"/>
            <Image src="/blog/italy/amalficoast.JPG" alt="Amalfi Coast" width={375} height={375} className="m-auto"/>
          </div>
          <p>After the tour, we made our way back to Rome, where we had a quick dinner near the Rome Termini station. I have to wake up early tomorrow because we're seeing the Colosseum, the Roman Forum, and Vatican City.</p>
          <h1 className="leading-tight">Day 3 - The Colosseum, Roman Forum, and Vatican City</h1>
          <p>We started the day at 7AM with Vatican City, the iconic city-state that is home to the Pope. It certainly did not disappoint.</p>
          <div className="flex justify-center gap-4 my-6">
            <Image src="/blog/italy/vaticancitybasilica.JPG" alt="Outside the Basilica" width={375} height={375} className="m-auto"/>
            <Image src="/blog/italy/vaticancity.JPG" alt="Vatican City" width={375} height={375} className="m-auto"/>
          </div>
          <Image src="/blog/italy/insidethebasilica.JPG" alt="Inside the Basilica" width={800} height={800} className="m-auto my-6"/>
          <p>After Vatican City, we made our way to the Colosseum, the iconic amphitheater that was used for gladiatorial battles and other public spectacles. It is truly an understatement to say that the Ancient Romans were ahead of their time in terms of their architecture (still stole from the Greek though).</p>
          <Image src="/blog/italy/colosseumoutside.JPG" alt="Inside the Basilica" width={800} height={800} className="m-auto my-6"/>
          <div className="flex justify-center gap-4 my-6">
            <Image src="/blog/italy/colosseum.JPG" alt="Outside the Basilica" width={375} height={375} className="m-auto"/>
            <Image src="/blog/italy/columnsinsunlight.JPG" alt="Vatican City" width={375} height={375} className="m-auto"/>
          </div>
          <p>Tomorrow, we'll go to Pisa to see the Leaning Tower of Pisa, then spend the night in Florence.</p>
          <h1 className="leading-tight">Day 4 - Leaning Tower of Pisa & Florence</h1>
          <p>We had to wake up really early today to catch our train to Pisa at 6AM. While we initially intended on staying for a full 4 hours, we decided to cut our trip short in Pisa as we realized the only real attraction was the Leaning Tower of Pisa.</p>
          <Image src="/blog/italy/leaningtowerofpisa.JPG" alt="Leaning Tower of Pisa" width={800} height={800} className="m-auto my-6"/>
          <p>Thus, we left for Florence at 12PM. The train ride was only an hour, so we didn't miss much time.</p>
          <p>The Duomo was such a fascinating sight to see. We initially didn't have tickets to enter, but we were able to snag last second tickets from a tour guide, allowing us full access to the top of the Duomo after an arduous climb.</p>
          <p>While the main attraction of the Duomo is the outside, the inside is just as impressive. The intricate details of the paintings along the walls of the dome are an incredible testament of the artists that toiled away centuries ago. What an engineering and artistic marvel.</p>
          <Image src="/blog/italy/duomo.JPG" alt="Duomo" width={800} height={800} className="m-auto my-6"/>
          <div className="flex justify-center gap-4 my-6">
            <Image src="/blog/italy/insideduomo.JPG" alt="Inside the Duomo" width={375} height={375} className="m-auto"/>
            <Image src="/blog/italy/duomorooftop.JPG" alt="Rooftop of the Duomo" width={375} height={375} className="m-auto"/>
          </div>
          <p>Finally, we ended the night walking along the Arno River, admiring the sunset that donned the beautiful city of Florence.</p>
          <Image src="/blog/italy/sunsetflorence.JPG" alt="Florence Sunset" width={800} height={800} className="m-auto my-6"/>
          <p>Tomorrow is our last day, but the most exciting, as we will be taking a train to the wonderous City of Bridges.</p>
          <h1 className="leading-tight">Day 5 - Venice</h1>
          <p>Venice is probably one of the most beautiful cities I've visited in my lifetime. There is a reason why the Venetian in Las Vegas copied the city's entire aesthetic. Seeing the city in person was a breathtaking experience. It really reminded me of Amsterdam, another city that is known for its beautiful canals. The city is also known for its beautiful architecture, with many buildings dating back to the 16th century. </p>
          <p>We started the day at Ponte di Rialto, the oldest of the four bridges spanning Venice. Unfortunately, I did not take that many pictures of other attractions in Venice, as the main attraction were the canals themselves.</p>
          <div className="flex justify-center gap-4 my-6">
            <Image src="/blog/italy/venicecanal.JPG" alt="On Top of the Rialto" width={375} height={375} className="m-auto"/>
            <Image src="/blog/italy/venicesmallcanal.JPG" alt="Small Canal" width={375} height={375} className="m-auto"/>
          </div>
          <Image src="/blog/italy/saintmarkbasilica.JPG" alt="Saint Mark's Basilica" width={800} height={800} className="m-auto my-6"/>
          <p>Venice was not initially part of our Italy trip plans at all. However, I knew that I had to see it, as I've formed quite an affinity to canals, partly due to my trip to Amsterdam a few years ago.</p>
          <p>More importantly, the heartbreaking reality of Venice is that it is slowly sinking into the water, all the while sea levels are steadily rising from climate change. As a result, it is predicted that Venice will be completely underwater by 2100.</p>
          <p>I hope there are substantial efforts to preserve the city from impending doom, as it is such a beautiful city with such a rich history and incredible architecture.</p>
          <h1>Reflection</h1>
          <p>This family trip to Italy was very packed to say the least. Our days started really early and ended relatively late, and I am thoroughly exhausted from this trip. However, I'd like to share a few thoughts of what I've learned from this trip.</p>
          <p>First, Italy is a country that has everything: beautiful beaches, breathtaking architecture, delicious foods, rich history, and stunning artworks. To date, I have never been to a country that has so much to do and see in a concentrated area. On top of that, every city had its own vibe, so it was not repetitive at all.</p>
          <p>Second, transportation in Italy completely outranks that of the United States. It's honestly pathetic how terrible the quality of train stations and metro systems are in America compared to those in Europe. Italy has proved once again that this statement holds true.</p>
          <p>Third, Italians are a bit impatient. I would not go as far as to say that they are outright rude, but there were times when I could clearly tell their patience was being tested after some complications with communicating. Nonetheless, I don't blame them because tourists can be quite annoying.</p>
          <p>Overall, I would definitely recommend visiting Italy. Do try to choose only a couple cities and stay there for a longer period of time. Your trip should not be needlessly chaotic. Here is my final ranking of each city:</p>
          <ol className="list-decimal ml-10 pl-6 space-y-2 my-6">
            <li>Venice - The most unique city I've visited in Italy. The threat of total submersion warrants this high of a ranking, among other things. </li>
            <li>Florence - Home to incredible art and architecture, particularly the Duomo. The city has a perfect blend of history and modern Italian culture.</li>
            <li>Rome - The eternal city offers an unparalleled concentration of historical sites and monuments. Vatican City alone makes it worth visiting, especially with Pope Leo XIV's recent election.</li>
            <li>Amalfi Coast - Breathtaking coastal views. A nice beach destination.</li>
            <li>Pisa - While the Leaning Tower is iconic, there's not much else to see. Worth a quick stop but not worth spending more than a few hours.</li>
          </ol>
          
        </article>
      </div>
    </motion.main>
  );
} 