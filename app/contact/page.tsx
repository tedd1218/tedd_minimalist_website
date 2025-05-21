"use client";
import Image from "next/image";
import { IBM_Plex_Mono, Victor_Mono } from "next/font/google";

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

const ibmMono = IBM_Plex_Mono({
    weight: ["400"],
    subsets: ["latin"]
});

export default function Contact() {
  return (
    <main className={`${ibmMono.className} flex flex-col min-h-screen px-4 py-8`}>
        <div className="flex flex-col items-start justify-start flex-grow max-w-3xl mx-auto w-full">
            <h1 className={`text-4xl sm:text-4xl md:text-4xl font-bold tracking-wider mb-7 mt-20 ${victorMono.className}`}>CONTACT</h1>
            <div className="flex flex-col gap-8 w-full">
                {/* Email */}
                <div className="flex items-center gap-5 text-xl break-all">
                    <Image src="/icons/contact.svg" alt="email" width={36} height={36} />
                    <a href="mailto:tyjung@andrew.cmu.edu" className="underline font-mono mt-2 text-lg text-[#FFFFFF] hover:text-[#E85860]">tyjung@andrew.cmu.edu</a>
                </div>
                {/* LinkedIn */}
                <div className="flex items-center gap-5 text-xl -mt-1 break-all">
                    <Image src="/icons/linkedin.svg" alt="linkedin" width={36} height={36} />
                    <a href="https://www.linkedin.com/in/tedd-jung/" target="_blank" rel="noopener noreferrer" className="underline font-mono mt-2 text-lg text-[#FFFFFF] hover:text-[#E85860]">https://www.linkedin.com/in/tedd-jung/</a>
                </div>
                {/* GitHub */}
                <div className="flex items-center gap-5 text-xl break-all">
                    <Image src="/icons/github.svg" alt="github" width={36} height={36} className="dark:invert" />
                    <a href="https://github.com/tedd1218" target="_blank" rel="noopener noreferrer" className="underline font-mono mt-1 text-lg text-[#FFFFFF] hover:text-[#E85860]">https://github.com/tedd1218</a>
                </div>
            </div>
        </div>   
    </main>
  );
} 