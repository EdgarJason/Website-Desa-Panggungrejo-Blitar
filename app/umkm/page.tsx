import { UmkmGrid } from "@/components/UmkmGrid";
import { supabase } from "@/lib/supabase";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UMKM",
  description: "Daftar UMKM dan potensi ekonomi lokal di Desa Panggungrejo, Kabupaten Blitar.",
};

export const revalidate = 0;

export default async function UMKMPage() {
  const { data: umkm, error } = await supabase
    .from("umkm")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return <p className="p-10 text-red-500">Error: {error.message}</p>;
  }

  return (
    <main className="flex flex-col min-h-screen bg-white font-sans text-black w-full px-6 md:px-8 pt-40 pb-24">
      <div className="relative pl-12 md:pl-16 mb-16 max-w-7xl mx-auto w-full">
        <Link href="/#umkm" className="absolute left-0 top-1 md:top-2 text-zinc-500 hover:text-black transition-colors shrink-0">
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
        </Link>
        <h1 className="text-5xl lg:text-6xl font-bold">
          UMKM Desa Panggungrejo
        </h1>
      </div>

      <UmkmGrid data={umkm ?? []} />
    </main>
  );
}