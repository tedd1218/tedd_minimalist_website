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
  title: "The Exploration of Death Through Three Religious Texts",
  date: "05-20-2025",
  author: "Tedd Jung",
  tags: ["#Essay"],
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
        <div className={`text-[#667085] text-md font-mono mt-20 font-semibold dark:text-[#959595] ${victorMono.className}`}>
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
          <p>Hello. This is my first ever blog post. As an homage to my favorite class this past semester, <a href="https://www.coursicle.com/cmu/courses/HIS/79281/" className="underline text-[#E85860] hover:opacity-80" target="_blank" rel="noopener noreferrer">Intro to Religion</a> taught by Dr. Alexandra Garnhart-Bushakra, I would like to share one of the essays I wrote for the class.</p>
          <p>Throughout the Eurasian world, ancient authors appear fascinated with the concept of death. In particular, three historical texts – <span className="italic">The Epic of Gilgamesh from Mesopotamia</span>, c. 2100-1400 B.C.E, the philosophical dialogue, entitled the <span className="italic">Bhagavad Gita</span>, from India, c. 400-100 B.C.E, and the Greek tragedy <span className="italic">Hippolytus</span> c. 428 B.C.E – provide crucial insights into death through their respective protagonists. In the Mesopotamian epic that bears his name, the lugal Gilgamesh, after witnessing his friend Enkidu’s death, embarks on a futile quest for immortality. Moreover, in India, a prince named Arjuna faces a moral crisis after refusing to fight against his relatives during wartime, which leads to his re-evaluation of his Hindu faith. Later in ancient Greece, the young charioteer and devotee of Artemis, Hippolytus, finds himself a victim of divine retribution after infuriating the goddess Aphrodite when he prioritizes sexual purity over all other aspects of life — an act of hubris that leads to his tragic demise. Within each story, the main figure learns to accept that mortality — which may seem like the greatest weakness of humanity — not only distinguishes mortals from the divine, but it serves as the catalyst for people to seek profound growth and enlightenment.  By recognizing the inevitably of death, all three individuals begin to accept change as the necessary first step towards seeking a more purposeful life and reaching their ultimate potential.</p>
          <p>Each protagonist begins their journey at very different points in their lives: while Gilgamesh and Hippolytus begin their stories with immense arrogance, Arjuna begins his story with uncertainty. Gilgamesh is portrayed by the poet as a powerful king, who is quite tyrannical and fairly unlikeable. The poet states: “The city is his possession, he struts through it, arrogant, his head raised high, trampling its citizens like a wild bull” (Gilgamesh 72). Feared and resented by his subjects, Gilgamesh initially lacks empathy and takes excessive pride in himself for his immense strength. In response, the gods create Enkidu to guide and accompany him towards a more humble life. Prior to Enkidu, Gilgamesh does not contemplate the prospect of his own morality, as he lives as though he is untouchable. Hippolytus parallels to Gilgamesh as he was also arrogant, choosing to lead a life of incredible chastity and sexual purity. In his opening monologue, Hippolytus exclaims to his servant that the “God of nocturnal prowess is not my God” (Euripides, 168). His devotion to Artemis and her obsession with purity gets in the way of his relationship with other gods, specifically Aphrodite, as he rejects the essence of who and what she is — the personification of desire. Like Gilgamesh, Hippolytus does not think about death as an issue to him, as his hubris causes him to become extremely intolerant. Arjuna, however, begins his story in a very different situation. Standing on the battlefield of Kurukshetra, Arjuna is in a state of immense turmoil as he recognizes his relatives in the opposition. He cries out to Krishna “I see perverse omens; and before me I see no good in killing my people in battle, Lovely-Haired Krishna!” (BG, 11). Arjuna is not like the other two protagonists as he is easier to empathize with; he appreciates human life and doesn't wish to serve as an instrument of death. Whereas Gilgamesh and Hippolytus are disconnected from the reality of death, Arjuna is met with it as soon as his story begins. Each protagonist in their respective texts begin their story with a very narrow-minded understanding of death: Gilgamesh and Hippolytus both are oblivious of the reality of mortality, while Arjuna believes death is permanent and tragic. However, as each character encounters death — either through loss, divine punishment, or moral crisis—they are forced to change, ultimately achieving profound enlightenment before their tales conclude.</p>
          <p>In each protagonist's story, they reach a point where they not only face death, but their recognition of it causes them anguish and uncertainty. In <span className="italic">The Epic of Gilgamesh</span>, Gilgamesh is forced to face the reality of Enkidu’s ailing health, as Enkidu himself pleads: “Dear friend, dear brother, they are taking me from you. I will not return. I will sit with the dead in the underworld, and never will I see my dear brother again” (Gilgamesh, 141-142). It becomes very clear that a once powerful creature that could size up against the hero Gilgamesh has been reduced to a shriveled and helpless body. It is only until after Enkidu’s death where he realizes the difference between himself and divine beings: for the first time, Gilgamesh realizes for the first time that just like Enkidu, he is emotionally and physically vulnerable. Ultimately, this awareness sets off Gilgamesh’s quest for immortality, a journey that will take him through multiple challenges, hardships, and physically impossible stunts. Arjuna meets death early, forcing him into despair, which invites the council of Krishna. This sets off a series of philosophical conversations between the two, as Krishna challenges Arjuna’s perception of death: “Just as one throws out old clothes and then takes on other, new ones; so the embodied self casts out old bodies as it gets other, new ones. Weapons do not cut the self, nor does fire burn it, nor do waters drench it, nor does wind dry it” (BG, 22). Through this teaching, Krishna attempts to help Arjuna understand that what appears as death is merely a transition, not an ending. What distinguishes Hippolytus' narrative is that his enlightenment occurs after his fatal injury, compressing his journey of enlightenment into his final moments of life. Unlike Gilgamesh who has time to quest for immortality or Arjuna who receives the benefit of divine counseling, Hippolytus must rapidly process the meaning of mortality and humanity before his soul leaves his body. Each protagonist's encounter with death forces them to abandon their previous arrogance, hubris, or understanding of mortality and begin a transformative journey toward acceptance.</p>
          <p>The crux of each narrative is when each protagonist begins to accept the reality of death, leading them to realize their full potential in accordance with their culture’s values. For Gilgamesh, his acceptance comes as he returns to Uruk empty-handed without the cure for mortality nor the secret plant to restore his youth. Though he fails to accomplish his quest, he gains something else: the realization that his legacy and reputation as a lugal can long outlast any human. As a result, Gilgamesh ends his tale by showing the boatsman the walls of his own city, signifying that his contributions to his civilization is his purpose in life, a stark contrast to the Gilgamesh before his journey, who was arrogant and tyrannical. In a similar fashion, Arjuna’s acceptance occurs through spiritual enlightenment with his conversations with Krishna. Krishna says to Arjuna: “Your authority is in action alone, and never in its fruits; motive should never be in the fruits of action nor should you cling to inaction” (BG, 29), imploring Arjuna to act selflessly without obsessing over its results. Near the end of their discussion, Krishna reveals himself of Arjuna as a god, allowing Arjuna to finally realize that everything happens through divine will. Krishna urges Arjuna to accept his teachings as a way of achieving <span className="italic">moksha</span> as he says: “Letting go of all dharmas, take me alone as your place of rest, and do not grieve, because I will free you from all evils” (BG, 202).  This revelation is transformative as Krishna guides Arjuna to realize that he will experience multiple lifetimes — and deaths. Through this acceptance, Arjuna recommits to his warrior duties with newfound understanding that this path leads toward higher spiritual evolution across multiple incarnations, ultimately culminating in <span className="italic">moksha</span>. In contrast, Hippolytus demonstrates his acceptance of death in the last pages of the tragedy, as he says to Artemis and Theseus: “You can lightly leave a long companionship. You bid me end my quarrel with my father, and I obey. In the past, too, I obeyed you” (Euripides, 220). In the end, Hippolytus ends his quarrel with his father and wholly forgives him, showing that he has certainly found peace and change through the painful reality of his impending death. Euripides <span className="italic">Hippolytus</span> suggests that humans cannot interfere with divine will and rather must respect that it is inevitable.</p>
          <p>Despite their different cultural backgrounds, <span className="italic">The Epic of Gilgamesh</span>, <span className="italic">The Bhagavad Gita</span>, and Euripides' <span className="italic">Hippolytus</span> converge on a profound understanding of humanity's relationship with mortality. Rather than depicting death as merely humanity's tragedy, they present it as the essential catalyst that enables humans to transcend their limitations through acceptance and transformation. Ultimately, these narratives suggest that what truly defines being "human" is the capacity to face mortality with courage and to find meaning within a limited existence.</p>
          <br></br>
        </article>
      </div>
    </motion.main>
  );
} 