"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Victor_Mono } from "next/font/google";

interface NavItemProps {
  href: string;
  label: string;
  icon: string;
}

const navItems: NavItemProps[] = [
  { href: "/", label: "HOME", icon: "/icons/home.svg" },
  { href: "/blog", label: "BLOG", icon: "/icons/blog.svg" },
  { href: "/about", label: "ABOUT", icon: "/icons/about.svg" },
  { href: "/art", label: "ART", icon: "/icons/art.svg" },
  { href: "/photo", label: "PHOTO", icon: "/icons/photo.svg" },
  { href: "/contact", label: "CONTACT", icon: "/icons/contact.svg" },
];

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

export default function FloatingNavbar() {
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close on click outside (for mobile) 
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (expanded && navRef.current && !navRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [expanded]);

  return (
    <div
      ref={navRef}
      className={`fixed left-1/2 bottom-8 z-50 -translate-x-1/2 flex items-center transition-all duration-300 overflow-hidden`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <button
        aria-label="Open navigation"
        className={`outline-none focus:ring-2 focus:ring-primary`}
        onClick={() => setExpanded((v) => !v)}
      >
        <div
          className={`flex items-center justify-center transition-all duration-300 bg-gray-200 dark:bg-zinc-700 overflow-hidden ${
            expanded
              ? "w-[680px] h-[120px] px-2 py-2 rounded-full flex-col relative"
              : "w-[66px] h-[29px] rounded-3xl"
          }`}
        >
          <div className={`flex items-center justify-center w-full h-full transition-all duration-500 ${expanded ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100 relative'}`} style={{transitionProperty:'opacity,transform'}}>
            <span className="block w-1.5 h-1.5 bg-gray-500 rounded-full mx-1" />
            <span className="block w-1.5 h-1.5 bg-gray-500 rounded-full mx-1" />
            <span className="block w-1.5 h-1.5 bg-gray-500 rounded-full mx-1" />
          </div>
          <div className={`flex flex-row w-full justify-center items-center transition-all duration-500 ${expanded ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 pointer-events-none absolute'}`} style={{transitionProperty:'opacity,transform'}}>
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
        </div>
      </button>
    </div>
  );
}

function NavItem({ href, label, icon }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center rounded-[21px] transition-colors duration-200"
    >
      <span className="group flex flex-col items-center justify-center bg-white rounded-xl px-4 py-3 w-20 h-20 dark:bg-[#262626] hover:bg-[#444444] dark:hover:bg-gray-200 transition-colors duration-200 mx-3">
        <Image src={icon} alt={label} width={40} height={40} className="mb-1" />
        <span className={`text-[10px] font-[1000] text-base font-mono tracking-wide text-black dark:text-white -mt-1 ${victorMono.className} group-hover:text-white dark:group-hover:text-black`}>{label}</span>
      </span>
    </Link>
  );
}