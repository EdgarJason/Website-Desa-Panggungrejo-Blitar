"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface StatCard {
  label: string;
  value: number;
  href: string;
  icon: React.ReactNode;
  color: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ berita: 0, umkm: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [beritaRes, umkmRes] = await Promise.all([
          supabase.from("berita").select("id", { count: "exact", head: true }),
          supabase.from("umkm").select("id", { count: "exact", head: true }),
        ]);
        setStats({
          berita: beritaRes.count ?? 0,
          umkm: umkmRes.count ?? 0,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards: StatCard[] = [
    {
      label: "Total Berita",
      value: stats.berita,
      href: "/admin/berita",
      color: "bg-blue-50 text-blue-600",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      label: "Total UMKM",
      value: stats.umkm,
      href: "/admin/umkm",
      color: "bg-emerald-50 text-emerald-600",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Selamat datang di panel admin Desa Panggungrejo.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-brand-light-active">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{card.label}</p>
                <p className="text-4xl font-bold text-gray-900">
                  {loading ? (
                    <span className="inline-block w-12 h-10 bg-gray-100 rounded-lg animate-pulse" />
                  ) : (
                    card.value
                  )}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                {card.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-brand-normal group-hover:text-brand-normal-hover transition-colors">
              Kelola
              <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/berita" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-normal text-white rounded-xl text-sm font-semibold hover:bg-brand-normal-hover transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Tambah Berita
          </Link>
          <Link href="/admin/umkm" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-normal text-white rounded-xl text-sm font-semibold hover:bg-brand-normal-hover transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Tambah UMKM
          </Link>
          <Link href="/" target="_blank" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Lihat Website
          </Link>
        </div>
      </div>
    </div>
  );
}
