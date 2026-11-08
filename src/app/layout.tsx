import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AdoptionMatch | Find Your Rescue Companion",
  description: "Dating-style discovery for adoptable shelter dogs and cats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className={`${plusJakartaSans.className} min-h-screen bg-[#DF4E30] text-[#1D130E] antialiased selection:bg-[#F8BC27] selection:text-[#1D130E]`}>
        {children}
      </body>
    </html>
  );
}
