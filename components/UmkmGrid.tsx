"use client";

import { useState } from "react";
import { UmkmCard } from "./UmkmCard";
import { Search } from "lucide-react";

export function UmkmGrid({ data }: { data: any[] }) {
  const [query, setQuery] = useState("");

  const filtered = data.filter((item) =>
    item.nama.toLowerCase().includes(query.toLowerCase()) ||
    item.deskripsi.toLowerCase().includes(query.toLowerCase()) ||
    item.pemilik.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="relative max-w-7xl mx-auto w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari UMKM (nama, deskripsi, pemilik)..."
          className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14 max-w-7xl mx-auto w-full">
        {filtered.map((item) => (
          <UmkmCard
            key={item.id}
            nama={item.nama}
            pemilik={item.pemilik}
            telp={item.telp}
            deskripsi={item.deskripsi}
            foto={item.foto}
            lokasi={item.lokasi}
          />
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500 text-lg font-medium">
          Tidak ada UMKM yang sesuai dengan pencarian Anda.
        </div>
      )}
    </div>
  );
}
