import type { Metadata } from "next";
import { Victor_Mono } from "next/font/google"
import "./globals.css";
import Navbar from "./components/Navbar";

const victorMono = Victor_Mono({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Tedd Jung",
  description: "Tedd's Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={victorMono.className}>
      <body
        className={`antialiased light:bg-slate-800`}
      >
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
