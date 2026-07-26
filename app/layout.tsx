import type { Metadata } from "next";
import { Geist, Geist_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LayoutShell } from "@/components/LayoutShell";

const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desa Panggungrejo - Kab. Blitar",
  description: "Website resmi Desa Panggungrejo, Kecamatan Panggungrejo, Kabupaten Blitar, Jawa Timur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", hanken.variable)}
    >
      <body className="min-h-full flex flex-col">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

