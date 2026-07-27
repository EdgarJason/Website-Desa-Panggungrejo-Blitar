"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <>
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
              ? "bg-white/90 md:bg-white/70 backdrop-blur-md shadow-md border border-white/40 text-black rounded-3xl md:rounded-full px-6 py-4 md:px-8 md:py-3"
              : "bg-transparent text-white px-0 py-6"
          )}
        >
          <div className="flex flex-col z-50">
            <Link href="/" className="font-bold text-lg md:text-xl tracking-wider leading-none">
              PANGGUNGREJO
            </Link>
            <span className="text-xs font-normal mt-1 opacity-90">Kab. Blitar</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 font-medium text-sm md:text-base">
            <Link href="/#hero" className="hover:opacity-70 transition-opacity">Home</Link>
            <Link href="/#tentang" className="hover:opacity-70 transition-opacity">Tentang</Link>
            <Link href="/#sejarah" className="hover:opacity-70 transition-opacity">Sejarah</Link>
            <Link href="/#wisata" className="hover:opacity-70 transition-opacity">Wisata</Link>
            <Link href="/#umkm" className="hover:opacity-70 transition-opacity">UMKM</Link>
            <Link href="/#berita" className="hover:opacity-70 transition-opacity">Berita</Link>
            <Link href="#kontak" className="hover:opacity-70 transition-opacity">Kontak</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-50 flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 text-current hover:opacity-70 transition-opacity"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center pt-20 pb-10 px-6 animate-in fade-in zoom-in-95 duration-200 md:hidden text-brand-dark">
          <div className="flex flex-col gap-6 text-xl font-bold text-center w-full h-full justify-center">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/#hero" className="py-2 hover:text-brand-normal transition-colors">Home</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/#tentang" className="py-2 hover:text-brand-normal transition-colors">Tentang</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/#sejarah" className="py-2 hover:text-brand-normal transition-colors">Sejarah</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/#wisata" className="py-2 hover:text-brand-normal transition-colors">Wisata</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/#umkm" className="py-2 hover:text-brand-normal transition-colors">UMKM</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/#berita" className="py-2 hover:text-brand-normal transition-colors">Berita</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="#kontak" className="py-2 hover:text-brand-normal transition-colors">Kontak</Link>
          </div>
        </div>
      )}
    </>
  );
}
