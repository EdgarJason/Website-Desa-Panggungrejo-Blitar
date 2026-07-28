import { MapPin, User, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface UmkmCardProps {
  nama: string;
  pemilik: string;
  telp: string;
  deskripsi: string;
  foto?: string | null;
  lokasi?: string | null;
}

export function UmkmCard({
  nama,
  pemilik,
  telp,
  deskripsi,
  foto,
  lokasi,
}: UmkmCardProps) {
  return (
    <div className="flex flex-col h-full w-full font-sans group">
      {/* Image */}
      <div className="w-full aspect-[16/9] bg-[#d9d9d9] rounded-2xl md:rounded-[2rem] overflow-hidden mb-6 relative">
        {foto && (
          <Image
            src={foto}
            alt={nama}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-2">
        <h3 className="text-2xl font-bold leading-tight mb-4 text-black">
          {nama}
        </h3>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-black">
            <User className="w-[18px] h-[18px]" strokeWidth={2} />
            <span className="text-[15px] font-medium">{pemilik}</span>
          </div>
          <div className="flex items-center gap-2 text-black">
            <Phone className="w-[18px] h-[18px]" strokeWidth={2} />
            <span className="text-[15px] font-medium">{telp}</span>
          </div>
        </div>

        <p className="text-[#3a3a3a] text-[15px] leading-relaxed mb-5 font-medium">
          {deskripsi}
        </p>

        <div className="mt-auto w-full">
          {lokasi ? (
            <a
              href={lokasi}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
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
              className="w-full rounded-full font-semibold transition-all hover:scale-[1.02] shadow-sm opacity-50 cursor-not-allowed"
              disabled
            >
              Lokasi Belum Tersedia
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
