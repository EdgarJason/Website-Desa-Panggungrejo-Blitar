"use client";

import { BeritaCard } from "./BeritaCard";

export function LandingBeritaGrid({ data }: { data: any[] }) {
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {data.map((item) => (
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
    </div>
  );
}
