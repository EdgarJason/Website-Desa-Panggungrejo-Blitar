import { BeritaCard } from "@/components/BeritaCard";
import { supabase } from "@/lib/supabase";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function BeritaPage() {
  const { data: berita, error } = await supabase
    .from("berita")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    return <p className="p-10 text-red-500">Error: {error.message}</p>;
  }

  return (
    <main className="flex flex-col min-h-screen bg-white font-sans text-black w-full px-6 md:px-8 pt-40 pb-24">
      <div className="relative pl-12 md:pl-16 mb-16 max-w-7xl mx-auto w-full">
        <Link href="/#berita" className="absolute left-0 top-1 md:top-2 text-zinc-500 hover:text-black transition-colors shrink-0">
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
        </Link>
        <h1 className="text-5xl lg:text-6xl font-bold">
          Berita & Kegiatan Desa Panggungrejo
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        {berita?.map((item) => (
          <BeritaCard
            key={item.id}
            id={item.id}
            headline={item.headline}
            konten={item.konten}
            foto={item.foto}
            createdAt={item.date}
          />
        ))}
      </div>
    </main>
  );
}
