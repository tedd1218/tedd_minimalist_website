"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Disable animation for blog index and blog post pages
  const isBlog = pathname.startsWith("/blog/");
  
  // Special transition for photography album pages
  const isPhotoAlbum = pathname.startsWith("/photo/") && pathname !== "/photo";

  if (isBlog) {
    // Just render children with no animation for blog pages
    return <div style={{ height: "100%" }}>{children}</div>;
  }

  if (isPhotoAlbum) {
    // Special transition for photo album pages
    return (
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ height: "100%" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
} 