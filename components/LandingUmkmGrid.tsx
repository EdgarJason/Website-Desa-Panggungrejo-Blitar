"use client";

import { UmkmCard } from "./UmkmCard";

export function LandingUmkmGrid({ data }: { data: any[] }) {
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14 w-full">
        {data.map((item, index) => (
          <div key={item.id} className={index >= 4 ? "hidden md:block" : ""}>
            <UmkmCard
              nama={item.nama}
              pemilik={item.pemilik}
              telp={item.telp}
              deskripsi={item.deskripsi}
              foto={item.foto}
              lokasi={item.lokasi}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
