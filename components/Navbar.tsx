"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
          "fixed z-50 w-full flex justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          isScrolled || !isHome || isMobileMenuOpen ? "top-4 md:top-6 px-4 md:px-8" : "top-0 px-6 md:px-16"
        )}
      >
        <div 
          className={cn(
            "flex items-center justify-between w-full max-w-7xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            isScrolled || !isHome || isMobileMenuOpen
              ? "bg-white/85 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] border border-white/50 text-black rounded-[2rem] md:rounded-full px-6 py-3 md:px-8 md:py-3"
              : "bg-transparent text-white px-0 py-8"
          )}
        >
          <div className="flex items-center gap-3 md:gap-4 z-50">
            <Link href="/" className="shrink-0 transition-transform duration-300 hover:scale-105">
              <Image 
                src="/logo_desapanggungrejo.png" 
                alt="Logo Desa Panggungrejo" 
                width={48} 
                height={48} 
                draggable="false"
                className="object-contain w-10 h-auto md:w-12"
              />
            </Link>
            <div 
              className={cn(
                "flex flex-col transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-left",
                isScrolled || !isHome ? "scale-90 md:scale-95" : "scale-100"
              )}
            >
              <Link href="/" className="font-normal text-lg md:text-xl tracking-wider leading-none font-berkshire">
                Desa Panggungrejo
              </Link>
              <span className="text-xs font-normal mt-1 opacity-90">Kab. Blitar</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div 
            className={cn(
              "hidden md:flex items-center font-medium text-sm md:text-base transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              isScrolled || !isHome ? "gap-5" : "gap-7"
            )}
          >
            {[
              { name: "Home", href: "/#hero" },
              { name: "Tentang", href: "/#tentang" },
              { name: "Sejarah", href: "/#sejarah" },
              { name: "Wisata", href: "/#wisata" },
              { name: "UMKM", href: "/#umkm" },
              { name: "Berita", href: "/#berita" },
              { name: "Kontak", href: "#kontak" }
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="relative hover:-translate-y-0.5 transition-all duration-300 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-current hover:after:w-full after:transition-all after:duration-300"
              >
                {item.name}
              </Link>
            ))}
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
        <div className="fixed inset-0 z-40 bg-white/60 backdrop-blur-2xl flex flex-col items-center justify-center pt-20 pb-10 px-6 animate-in fade-in zoom-in-95 duration-300 md:hidden text-black">
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
