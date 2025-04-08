import Link from "next/link";
import Image from "next/image";

interface NavItemProps {
  href: string;
  label: string;
  icon: string;
}

export default function FloatingNavbar() {
  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-300 px-7 py-2 rounded-full shadow-lg flex gap-2 z-50">
      <NavItem href="/" label="HOME" icon="/icons/home.svg" />
      <NavItem href="/blog" label="BLOG" icon="/icons/blog.svg" />
      <NavItem href="/about" label="ABOUT" icon="/icons/about.svg" />
      <NavItem href="/art" label="ART" icon="/icons/art.svg" />
      <NavItem href="/photo" label="PHOTO" icon="/icons/photo.svg" />
      <NavItem href="/contact" label="CONTACT" icon="/icons/contact.svg" />
    </nav>
  );
}

function NavItem({ href, label, icon }: NavItemProps) {
  return (
    <Link href={href} className="flex flex-col items-center hover:bg-gray-500 text-black px-2 py-2 rounded-xl transition-all">
      <Image src={icon} alt={label} width={40} height={40} />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
}