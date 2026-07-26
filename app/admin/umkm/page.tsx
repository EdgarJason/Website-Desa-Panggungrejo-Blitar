"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { AdminUmkmForm, type UmkmFormData } from "@/components/admin/AdminUmkmForm";
import {
  getUmkm,
  addUmkm,
  updateUmkm,
  deleteUmkm,
  uploadUmkmFoto,
  type Umkm,
} from "@/lib/data/umkm";

export default function AdminUmkmPage() {
  const [data, setData] = useState<Umkm[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Umkm | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getUmkm();
      setData(result);
    } catch (err) {
      console.error("Failed to load UMKM:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAdd = async (formData: UmkmFormData) => {
    setIsSubmitting(true);
    try {
      let fotoUrl: string | null = null;
      if (formData.fotoFile) {
        fotoUrl = await uploadUmkmFoto(formData.fotoFile);
      }
      await addUmkm({
        nama: formData.nama,
        pemilik: formData.pemilik,
        telp: formData.telp,
        deskripsi: formData.deskripsi,
        lokasi: formData.lokasi || null,
        foto: fotoUrl,
      });
      await loadData();
      setShowForm(false);
    } catch (err: any) {
      console.error("Failed to add UMKM:", err);
      alert("Gagal menambah UMKM. Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (formData: UmkmFormData) => {
    if (!editItem) return;
    setIsSubmitting(true);
    try {
      let fotoUrl: string | undefined | null = undefined;
      if (formData.fotoFile) {
        fotoUrl = await uploadUmkmFoto(formData.fotoFile);
      } else if (formData.isFotoRemoved) {
        fotoUrl = null;
      }
      
      await updateUmkm(editItem.id, {
        nama: formData.nama,
        pemilik: formData.pemilik,
        telp: formData.telp,
        deskripsi: formData.deskripsi,
        lokasi: formData.lokasi || null,
        ...(fotoUrl !== undefined ? { foto: fotoUrl } : {}),
      });
      await loadData();
      setEditItem(null);
    } catch (err: any) {
      console.error("Failed to update UMKM:", err);
      alert("Gagal mengupdate UMKM. Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUmkm(id);
      await loadData();
      setDeleteConfirm(null);
    } catch (err: any) {
      console.error("Failed to delete UMKM:", err);
      alert("Gagal menghapus UMKM. Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen UMKM</h1>
          <p className="text-gray-500 mt-1">Kelola data UMKM Desa Panggungrejo.</p>
        </div>
        <Button size="lg" className="rounded-xl font-semibold" onClick={() => setShowForm(true)}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah UMKM
        </Button>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="font-medium">Belum ada data UMKM.</p>
            <p className="text-sm mt-1">Klik &quot;Tambah UMKM&quot; untuk memulai.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 w-12">No</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 w-16">Foto</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Nama Usaha</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Pemilik</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Telepon</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-600 w-36">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4">
                      {item.foto ? (
                        <img src={item.foto} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100" />
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{item.nama}</td>
                    <td className="px-6 py-4 text-gray-600">{item.pemilik}</td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{item.telp}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setEditItem(item)} className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer" title="Edit">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => setDeleteConfirm(item.id)} className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer" title="Hapus">
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

      {showForm && <AdminUmkmForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} isSubmitting={isSubmitting} />}
      {editItem && <AdminUmkmForm umkm={editItem} onSubmit={handleUpdate} onCancel={() => setEditItem(null)} isSubmitting={isSubmitting} />}

      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Hapus UMKM?</h3>
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
