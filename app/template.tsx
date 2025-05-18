"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ height: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 