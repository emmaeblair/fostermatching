import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdoptionMatch | Find Your Rescue Companion",
  description: "Dating-app style discovery for adoptable shelter dogs and cats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F4F6FB] text-jet antialiased">
        {children}
      </body>
    </html>
  );
}
