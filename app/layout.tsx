import type { Metadata } from "next";
import { Geist, Geist_Mono, Hanken_Grotesk, Berkshire_Swash } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LayoutShell } from "@/components/LayoutShell";

const berkshire = Berkshire_Swash({
  variable: "--font-berkshire",
  subsets: ["latin"],
  weight: ["400"],
});

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
  metadataBase: new URL("https://desapanggungrejoblitar.site"),
  title: {
    default: "Desa Panggungrejo - Kab. Blitar",
    template: "%s | Desa Panggungrejo",
  },
  description: "Website resmi Desa Panggungrejo, Kecamatan Panggungrejo, Kabupaten Blitar, Jawa Timur. Pusat informasi kegiatan, wisata, UMKM, dan sejarah desa.",
  keywords: ["Panggungrejo", "Desa Panggungrejo", "Blitar", "Wisata Blitar", "UMKM Panggungrejo", "Jawa Timur"],
  openGraph: {
    title: "Desa Panggungrejo - Kab. Blitar",
    description: "Website resmi Desa Panggungrejo, Kecamatan Panggungrejo, Kabupaten Blitar, Jawa Timur.",
    url: "https://desapanggungrejoblitar.site",
    siteName: "Desa Panggungrejo",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/herothumbnail.png",
        width: 1200,
        height: 630,
        alt: "Desa Panggungrejo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Panggungrejo - Kab. Blitar",
    description: "Website resmi Desa Panggungrejo, Kecamatan Panggungrejo, Kabupaten Blitar, Jawa Timur.",
    images: ["/herothumbnail.png"],
  },
  verification: {
    google: "yuzPJi65hn8e-1laKxaJIAd_BpedSP34LNnnAtxej1M",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", hanken.variable, berkshire.variable)}
    >
      <body className="min-h-full flex flex-col">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

