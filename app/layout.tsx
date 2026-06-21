import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fabrice Hafashimana — Full-Stack Developer",
  description: "Software engineer from Kigali, Rwanda. Building products with Node.js, Next.js, Python and more.",
  openGraph: {
    title: "Fabrice Hafashimana",
    description: "Full-Stack Developer from Kigali, Rwanda",
    url: "https://feyton.co.rw",
    images: ["/assets/profile.JPG"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
