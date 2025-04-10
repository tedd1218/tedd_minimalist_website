import type { Metadata } from "next";
import { Victor_Mono, IBM_Plex_Mono } from "next/font/google"
import "./globals.css";
import Navbar from "../components/Navbar";
import { cookies } from "next/headers"

import { ThemeProvider } from "next-themes";
import { ActiveThemeProvider } from "@/components/active-theme";
import { cn } from "@/lib/utils";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const activeThemeValue = cookieStore.get("active_theme")?.value
  return (
    <html lang="en" className={victorMono.className} suppressHydrationWarning>
      <body
        className={cn("antialiased", 
                      activeThemeValue ? `theme-${activeThemeValue}` : "")}
      >
        {/* <Navbar /> */}
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <ActiveThemeProvider initialTheme={activeThemeValue}>
            {children}
          </ActiveThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
