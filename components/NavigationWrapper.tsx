'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavigationWrapper() {
  const pathname = usePathname();
  const is404Page = pathname === '/not-found';

  if (is404Page) {
    return null;
  }

  return (
    <>
      <div className="fixed top-5 left-6 flex items-center gap-2 z-50">
        <Navbar />
      </div>
    </>
  );
} 