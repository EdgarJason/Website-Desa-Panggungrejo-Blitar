"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed z-50 transition-all duration-300 ease-in-out w-full flex justify-center",
        isScrolled || !isHome ? "top-4 px-4 md:px-8" : "top-0 px-6 md:px-16"
      )}
    >
      <div 
        className={cn(
          "flex items-center justify-between w-full max-w-7xl transition-all duration-300",
          isScrolled || !isHome
            ? "bg-white/70 backdrop-blur-md shadow-md border border-white/40 text-black rounded-full px-8 py-3"
            : "bg-transparent text-white px-0 py-6"
        )}
      >
        <div className="flex flex-col">
          <Link href="/" className="font-bold text-lg md:text-xl tracking-wider leading-none">
            PANGGUNGREJO
          </Link>
          <span className="text-xs font-normal mt-1 opacity-90">Kab. Blitar</span>
        </div>

        <div className="hidden md:flex items-center gap-6 font-medium text-sm md:text-base">
          <Link href="/#hero" className="hover:opacity-70 transition-opacity">Home</Link>
          <Link href="/#tentang" className="hover:opacity-70 transition-opacity">Tentang</Link>
          <Link href="/#sejarah" className="hover:opacity-70 transition-opacity">Sejarah</Link>
          <Link href="/#wisata" className="hover:opacity-70 transition-opacity">Wisata</Link>
          <Link href="/#umkm" className="hover:opacity-70 transition-opacity">UMKM</Link>
          <Link href="/#berita" className="hover:opacity-70 transition-opacity">Berita</Link>
          <Link href="#kontak" className="hover:opacity-70 transition-opacity">Kontak</Link>
        </div>
      </div>
    </nav>
  );
}
