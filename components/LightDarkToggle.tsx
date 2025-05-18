"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LightDarkToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";
  const knobX = mounted ? (isDark ? 44 : 0) : undefined;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-23 h-11 bg-[#FFEF9A] rounded-full flex items-center px-2 dark:bg-[#9FA9DE] transition-colors duration-300"
    >
      {/* Moon icon */}
      <span className="flex items-center justify-center w-8 h-8">
        <Image src={"/icons/moondark.svg"} alt={"moon"} width={50} height={50} />
      </span>
      {/* Sunn icon */}
      <span className="flex items-center justify-center w-8 h-8 ml-auto">
        <Image src={"/icons/sun.svg"} alt={"sun"} width={50} height={50} />
      </span>
      {/* Animated Knob */}
      <motion.span
        layout
        initial={false}
        animate={{ x: knobX }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="absolute w-8 h-8 rounded-full bg-[#FFF5C0] border-4 border-[#FFB53E] dark:bg-[#BCC5F0] dark:border-[#303867]"
      />
    </button>
  );
}