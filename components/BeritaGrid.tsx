"use client";

import { useState } from "react";
import { BeritaCard } from "./BeritaCard";
import { Search } from "lucide-react";

export function BeritaGrid({ data }: { data: any[] }) {
  const [query, setQuery] = useState("");

  const filtered = data.filter((item) =>
    item.headline.toLowerCase().includes(query.toLowerCase()) ||
    item.konten.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="relative max-w-7xl mx-auto w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari berita atau kegiatan..."
          className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        {filtered.map((item) => (
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
      
      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500 text-lg font-medium">
          Tidak ada berita yang sesuai dengan pencarian Anda.
        </div>
      )}
    </div>
  );
}
