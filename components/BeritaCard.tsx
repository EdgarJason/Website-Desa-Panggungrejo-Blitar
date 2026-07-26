import { Calendar } from "lucide-react";
import Link from "next/link";

interface BeritaCardProps {
  id: number;
  headline: string;
  konten: string;
  foto?: string | null;
  createdAt: string;
}

export function BeritaCard({
  id,
  headline,
  konten,
  foto,
  createdAt,
}: BeritaCardProps) {
  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  return (
    <Link href={`/berita/${id}`} className="flex flex-col w-full font-sans group cursor-pointer block">
      {/* Image */}
      <div className="w-full aspect-[16/9] bg-[#d9d9d9] rounded-[2rem] overflow-hidden mb-6 relative">
        {foto && (
          <img
            src={foto}
            alt={headline}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col px-2">
        <h3 className="text-2xl font-bold leading-tight mb-3 text-black group-hover:text-brand-normal transition-colors">
          {headline}
        </h3>

        <div className="flex items-center gap-2 text-black mb-4">
          <Calendar className="w-[18px] h-[18px]" strokeWidth={2} />
          <span className="text-[15px] font-medium">{formatDate(createdAt)}</span>
        </div>

        <p className="text-[#3a3a3a] text-[15px] leading-relaxed mb-5 font-medium line-clamp-3">
          {konten}
        </p>
      </div>
    </Link>
  );
}
