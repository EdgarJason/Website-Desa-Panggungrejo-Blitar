"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { AdminBeritaForm, type BeritaFormData } from "@/components/admin/AdminBeritaForm";
import {
  getBerita,
  addBerita,
  updateBerita,
  deleteBerita,
  uploadBeritaFoto,
  type Berita,
} from "@/lib/data/berita";

export default function AdminBeritaPage() {
  const [data, setData] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Berita | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getBerita();
      setData(result);
    } catch (err) {
      console.error("Failed to load berita:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAdd = async (formData: BeritaFormData) => {
    setIsSubmitting(true);
    try {
      let fotoUrl: string | null = null;
      if (formData.fotoFile) {
        fotoUrl = await uploadBeritaFoto(formData.fotoFile);
      }
      await addBerita({
        headline: formData.headline,
        konten: formData.konten,
        foto: fotoUrl,
        date: formData.date,
      });
      await loadData();
      setShowForm(false);
    } catch (err: any) {
      console.error("Failed to add berita:", err);
      alert("Gagal menambah berita. Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (formData: BeritaFormData) => {
    if (!editItem) return;
    setIsSubmitting(true);
    try {
      let fotoUrl: string | undefined | null = undefined;
      if (formData.fotoFile) {
        fotoUrl = await uploadBeritaFoto(formData.fotoFile);
      } else if (formData.isFotoRemoved) {
        fotoUrl = null;
      }
      
      await updateBerita(editItem.id, {
        headline: formData.headline,
        konten: formData.konten,
        date: formData.date,
        ...(fotoUrl !== undefined ? { foto: fotoUrl } : {}),
      });
      await loadData();
      setEditItem(null);
    } catch (err: any) {
      console.error("Failed to update berita:", err);
      alert("Gagal mengupdate berita. Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBerita(id);
      await loadData();
      setDeleteConfirm(null);
    } catch (err: any) {
      console.error("Failed to delete berita:", err);
      alert("Gagal menghapus berita. Error: " + err.message);
    }
  };

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

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((item) => 
      item.headline.toLowerCase().includes(lowerQuery) ||
      item.konten.toLowerCase().includes(lowerQuery)
    );
  }, [data, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manajemen Berita
          </h1>
          <p className="text-gray-500 mt-1">
            Kelola berita dan kegiatan Desa Panggungrejo.
          </p>
        </div>
        <Button
          size="lg"
          className="rounded-xl font-semibold"
          onClick={() => setShowForm(true)}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Berita
        </Button>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berita berdasarkan judul atau konten..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-brand-normal border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="font-medium">Belum ada data berita.</p>
            <p className="text-sm mt-1">Klik &quot;Tambah Berita&quot; untuk memulai.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 w-12">No</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 w-16">Foto</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Judul</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 w-32">Tanggal</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Konten</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-600 w-36">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4">
                      {item.foto ? (
                        <img src={item.foto} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100" />
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{item.headline}</td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{formatDate(item.date)}</td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{item.konten}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setEditItem(item)}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Form Modal */}
      {showForm && (
        <AdminBeritaForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Edit Form Modal */}
      {editItem && (
        <AdminBeritaForm
          berita={editItem}
          onSubmit={handleUpdate}
          onCancel={() => setEditItem(null)}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Hapus Berita?</h3>
              <p className="text-sm text-gray-500 mb-6">Data yang dihapus tidak dapat dikembalikan.</p>
              <div className="flex gap-3 w-full">
                <Button variant="outline" size="lg" onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl font-semibold">Batal</Button>
                <Button variant="destructive" size="lg" onClick={() => handleDelete(deleteConfirm)} className="flex-1 rounded-xl font-semibold">Hapus</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
