import type { Metadata } from "next";
import { Victor_Mono } from "next/font/google"
import "./globals.css";
import NavigationWrapper from "../components/NavigationWrapper";
import { cookies } from "next/headers";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import LightDarkToggle from "../components/LightDarkToggle";
import ScrollToTop from "../components/ScrollToTop";

const victorMono = Victor_Mono({
  subsets: ["latin"]
});

// const ibmMono = IBM_Plex_Mono({
//   weight: ["300"],
//   subsets: ["latin"]
// });

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
    <html lang="en" className={victorMono.className} suppressHydrationWarning>
      <body className={cn("antialiased")}> 
        <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="light">
          <ScrollToTop />
          <div className="fixed top-4 right-6 z-50">
            <LightDarkToggle />
          </div>
          <NavigationWrapper />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
