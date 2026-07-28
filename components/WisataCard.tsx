import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Image from "next/image";

interface WisataCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  mapUrl?: string;
}

export function WisataCard({
  title,
  description,
  imageUrl,
  mapUrl,
}: WisataCardProps) {
  return (
    <div className="flex flex-col h-full w-full font-sans group">
      {/* Image Placeholder / Image */}
      <div className="w-full aspect-[3/2] bg-[#d9d9d9] rounded-2xl md:rounded-[2rem] overflow-hidden mb-6 relative">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-2">
        <h3 className="text-[2rem] font-bold leading-tight mb-4 text-black">
          {title}
        </h3>

        <p className="text-[#3a3a3a] text-base leading-relaxed mb-8 font-medium">
          {description}
        </p>

        <div className="mt-auto w-full">
          {mapUrl ? (
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button 
                size="lg"
                className="w-full rounded-full font-semibold transition-all hover:scale-[1.02] shadow-sm"
              >
                Lihat Lokasi
              </Button>
            </a>
          ) : (
            <Button 
              size="lg"
              disabled
              className="w-full rounded-full font-semibold transition-all hover:scale-[1.02] shadow-sm opacity-50 cursor-not-allowed"
            >
              Lokasi Belum Tersedia
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
