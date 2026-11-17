import type { Metadata } from "next";
import { Urbanist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-urbanist",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Idea Innovation Cell | VSSUT Burla",
  description:
    "MAKE. BREAK. CREATE. - Student rocketry and innovation club at Veer Surendra Sai University of Technology, Burla, Odisha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-background text-text min-h-screen selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
