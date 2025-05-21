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
  title: "My Grandfather’s Harmonium",
  date: "05-21-2025",
  author: "Isha Jayadev",
  tags: ["#Journal"],
  readtime: "11 Min Read"
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
          <p><span className="italic">This piece was authored by <a href="https://www.linkedin.com/in/isha-jayadev-603302187/" className="underline text-[#FFCC00] hover:opacity-80" target="_blank" rel="noopener noreferrer">Isha Jayadev</a>, a senior economics major and creative writing minor at the University of Michigan. You can reach her at <a href="mailto:ishajay@umich.edu" className="underline text-[#FFCC00] hover:opacity-80" target="_blank" rel="noopener noreferrer">ishajay@umich.edu</a>. This piece was originally published in <a href="https://www.michigandaily.com/statement/my-grandfathers-harmonium/?fbclid=PAZXh0bgNhZW0CMTEAAacWS_esCwIaTsSTnhvra5MJLpGZySIsYZ5sj-Z5j2h7Z10G73-2d0An09yuzQ_aem_2J_OlNDLhytUxYEUYKzBSg" className="underline text-[#FFCC00] hover:opacity-80" target="_blank" rel="noopener noreferrer">The Michigan Daily</a>.</span></p>
          <img src="/blog/ishagrandfather.jpg" alt="Isha and her grandfather" className="w-full h-auto"></img>
          <p>The streetlight quietly hums above him, shining a warm yellow light onto the keys in front of him. It’s his first real gift — a second-hand harmonium — and he’s spent the past week learning how to move his fingers across the keys. It’s much smaller than a piano, with only 42 keys as opposed to a piano’s 88, but the hard part is training his left hand to pump air every few seconds, breathing life into the sound. It’s a small rectangular box, just big enough to reach his hands comfortably while he sits cross-legged on the dirt. The daylight has run out and there’s no electricity in the hut, which is why he’s gravitated to the only part of the village with a lightbulb.</p>
          <p>He knows he’ll be called in soon and all eight of his siblings will be asleep together on the floor. He dreads returning to his one-room hut, built from just mud and water, never sturdy enough to keep out the lizards. So before the sound of his mother’s voice permeates the village air, he lets his music fill the silence, relishing in the harmonium his father gifted him despite struggling to feed his children three meals a day. He doesn’t know it yet, but 50 years later, he’ll be yelling at his children to handle it carefully, to always hold it with two hands and to never set it down on the hardwood floor. 50 years later and it’ll still be the most important thing he owns.</p>
          <p>***</p>
          <p>My grandpa, Thatha in my native tongue, was only eight when he was gifted his first harmonium — worn but sturdy. From that day on, he spent every waking minute teaching himself to play. It was the 1950s in some of the poorest parts of India and his family didn’t have much besides cows, a few acres of farming land and a radio. Thatha and his siblings would spend their evenings finishing their homework while listening to popular Bollywood songs that crackled over their radio — melodies that eventually had him hunched over the keyboard, following the notes with his fingers. Finally, his dad, the first person to notice his son’s passion for the instrument, searched far and wide for a teacher who would train Thatha for cheap. </p>
          <p>His dad finally found a blind music teacher and brought him from the village he was from to their home. They couldn’t pay him, but the teacher was willing to give Thatha proper harmonium lessons in exchange for care. He needed Thatha to take him to the bathroom, shower him and give him an easier life in exchange for his musical expertise.</p>
          <p>When I asked my grandmother, Ajji, when he would even get the chance to play, she responded, “Oh, there’s always a hubba.” </p>
          <p>I laughed, mainly because she’s right — there is no shortage of hubbas, or religious gatherings, in India; there is always a god to celebrate and always people there to celebrate it.</p>
          <p>***</p>
          <p>He’s sitting at the front, facing the crowd of freshly-showered villagers, all in their nicest garments. He’s only had his harmonium for a year and he’s keenly aware of that as his fingers race across the keyboard, trying to keep pace with the seasoned <a href="https://www.britannica.com/art/Carnatic-music" className="underline text-[#FFCC00] hover:opacity-80" target="_blank" rel="noopener noreferrer">Carnatic</a> singer beside him. Everyone’s hands are together in prayer to show respect for the bhajan being played. </p>
          <p>He didn’t know it at the time, but a swamiji, a religious leader, was in the audience, patiently waiting for the bhajans to end before he could meet the boy playing the harmonium. He was mesmerized by this young boy swaying to the tune of his keys and, when he finally got the chance to speak to him, he fervently clutched the boy’s hands in his own and implored for his presence at his residential school.</p>
          <p>When the boy told his parents, his mother cried and wailed and begged his father not to let him go. The son she birthed, left alone in a different town — nothing could be worse. The swamiji spoke calmly to them, explaining the education he hoped to give the boy and the opportunities it would open up for him. Swayed by this proposal, the boy’s dad agreed and, with a heavy heart, sent the boy off to live at this new school. </p>
          <p>***</p>
          <p>Thatha stayed at the school until he was 16. The students were all poor and the school wasn’t much better off. They ate the same thing every day — rice and <a href="https://chasingcalories.com/2021/12/06/mudde/" className="underline text-[#FFCC00] hover:opacity-80" target="_blank" rel="noopener noreferrer">mudde</a> — and were only fed twice a day. When Thatha first arrived, there wasn’t even a resident music teacher at the school, but the swamiji kept his promise and began bringing him to the ashram, where Hindu sages stay, to learn from his new teacher, Raju Master.</p>
          <p>Thatha continued to play in every entertainment program in this new village. When he finally moved out for his 1st PUC (11th grade by American standards) he made sure he had his harmonium by his side. </p>
          <p>Thatha spent the next few decades hosting music programs, becoming close with every musician in town and playing at every event.  He built a community of like-minded musicians and, although Hindustani music was never quite as popular in South India as it was in the North, people would still travel from all parts of India to attend the programs he would host. He was even invited to play at the <a href="https://mysore.nic.in/en/tourist-place/mysuru-palace/" className="underline text-[#FFCC00] hover:opacity-80" target="_blank" rel="noopener noreferrer">Mysuru Palace</a>, one of the highest honors a musician in Karnataka can receive. He did all of this while refusing to accept payment and, if anyone tried to pay him, he gave it away to the other musicians he played with.</p>
          <p>***</p>
          <p>He’s much older now — his hair nearly gone, his face lined with decade-old wrinkles. He sits at the side of the stage, watching as his daughter and two granddaughters sing a song he taught them just days before. His daughter wears a pink sari, a kind of Indian dress, her face glowing as her voice echoes through the hall.</p>
          <p>All the children of his music school, which opened over 30 years ago, sit quietly beneath the stage. He watches as his eldest granddaughter, 12 years old now, follows the notes she’s written out in front of her as she plays his harmonium. He chuckles to himself, knowing that’s not really how it’s done but appreciating her dedication regardless. She catches his eye for a second and smiles, full of the joy he only ever felt when he found himself in her current position: harmonium in hand and a crowd to please.</p>
          <p>***</p>
          <p>It’s been almost a decade since I played the harmonium for Thatha’s music school. It’s funny when I look back at pictures of us — the harmonium is in almost all of them. If it’s not, it’s replaced by a keyboard or a sitar or a tabla. I grew up in a house that was constantly filled with music, but my grandpa will always be my very first introduction to this world — teaching me that melodies said everything words failed to. </p>
          <p>A year after we visited India, my mother got the dreadful call on Christmas morning — Thatha had been rushed into surgery. Within hours, we received the news: He had passed away due to complications with his medicine.</p>
          <p>In the eight years since his death, whenever I see that harmonium, I’m reminded of everything he stood for: persistence in indulging your passions, something I tend to lose the second I feel overwhelmed with school or jobs or clubs. His harmonium is a reminder that doing something you enjoy is never a waste of your time, that the nourishment of your soul should always be a priority and that fulfillment should be sought out every day.</p>
          <p>I think about him every time I’m in bed on my third hour of scrolling through my phone. I’m snapped back into reality — this can’t be my whole life — and my hands reach for a book or the guitar next to me. </p>
          <p>And as the guitar chords ripple through the air around me, filling the silence the same way his did so long ago, I am as sure as ever that a life cut short yet well spent is better than a long one spent unhappily. It’s a reminder to spend every one of my years on this planet the way Thatha did because, if I do, I know it’ll be a life well spent.</p>
          <br></br>
        </article>
      </div>
    </motion.main>
  );
} 