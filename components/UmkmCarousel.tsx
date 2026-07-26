"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UmkmCard } from "@/components/UmkmCard";

interface UmkmCarouselProps {
  data: {
    id?: number;
    nama: string;
    pemilik: string;
    telp: string;
    deskripsi: string;
    foto?: string | null;
    lokasi?: string | null;
  }[];
}

export function UmkmCarousel({ data }: UmkmCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative -mx-6 md:-mx-8 px-6 md:px-8 group py-4">
      {/* Left Chevron */}
      <button 
        onClick={scrollLeft}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black hover:bg-gray-100 hidden md:block"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar pb-6 pt-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {data.map((item, index) => (
          <div key={item.id ?? index} className="snap-start shrink-0">
            <UmkmCard 
              nama={item.nama}
              pemilik={item.pemilik}
              telp={item.telp}
              deskripsi={item.deskripsi}
              foto={item.foto}
              lokasi={item.lokasi}
            />
          </div>
        ))}
      </div>
      
      {/* Right Chevron */}
      <button 
        onClick={scrollRight}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black hover:bg-gray-100 hidden md:block"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
