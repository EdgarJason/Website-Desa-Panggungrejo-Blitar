import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";

export const revalidate = 0;

export default async function BeritaDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  
  const { data: berita, error } = await supabase
    .from("berita")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !berita) {
    notFound();
  }

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-white font-sans text-black w-full px-6 md:px-16 pt-40 pb-24">
      <div className="max-w-4xl mx-auto w-full pl-12 md:pl-16">
        {/* Header (Back button + Headline) */}
        <div className="relative mb-6">
          <Link href="/berita" className="absolute -left-12 md:-left-16 top-1 md:top-2 text-zinc-500 hover:text-black transition-colors shrink-0">
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {berita.headline}
            </h1>
            <p className="text-zinc-500 font-medium text-sm md:text-base">
              Dipublikasikan pada {formatDate(berita.date)}
            </p>
          </div>
        </div>

        {/* Photo */}
        {berita.foto && (
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 rounded-[2rem] overflow-hidden mb-10">
            <Image
              src={berita.foto}
              alt={berita.headline}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="text-lg leading-relaxed text-zinc-800 mb-16 whitespace-pre-wrap">
          {berita.konten}
        </div>

        {/* Back Button */}
        <div className="flex w-full">
          <Link href="/berita" className={buttonVariants({ size: "lg", className: "w-full rounded-full" })}>
            Kembali ke Daftar Berita
          </Link>
        </div>
      </div>
    </main>
  );
}
