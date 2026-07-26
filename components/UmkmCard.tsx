import { User, Phone } from "lucide-react";
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
      <div className="w-full aspect-[16/9] bg-[#d9d9d9] rounded-[2rem] overflow-hidden mb-6 relative">
        {foto && (
          <img
            src={foto}
            alt={nama}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

        {lokasi ? (
          <a
            href={lokasi}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="w-full mt-auto rounded-full font-semibold transition-all hover:scale-[1.02] shadow-sm"
            >
              Lihat Lokasi
            </Button>
          </a>
        ) : (
          <Button
            size="lg"
            className="w-full mt-auto rounded-full font-semibold transition-all hover:scale-[1.02] shadow-sm opacity-50 cursor-not-allowed"
            disabled
          >
            Lokasi Belum Tersedia
          </Button>
        )}
      </div>
    </div>
  );
}
