"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { Umkm } from "@/lib/data/umkm";

export interface UmkmFormData {
  nama: string;
  pemilik: string;
  telp: string;
  deskripsi: string;
  lokasi?: string | null;
  fotoFile?: File | null;
  existingFoto?: string | null;
  isFotoRemoved: boolean;
}

interface AdminUmkmFormProps {
  umkm?: Umkm | null;
  onSubmit: (data: UmkmFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function AdminUmkmForm({
  umkm,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: AdminUmkmFormProps) {
  const isEdit = !!umkm;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nama, setNama] = useState("");
  const [pemilik, setPemilik] = useState("");
  const [telp, setTelp] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (umkm) {
      setNama(umkm.nama);
      setPemilik(umkm.pemilik);
      setTelp(umkm.telp);
      setDeskripsi(umkm.deskripsi);
      setLokasi(umkm.lokasi || "");
      if (umkm.foto) {
        setFotoPreview(umkm.foto);
      }
    }
  }, [umkm]);

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, foto: "File harus berupa gambar." }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, foto: "Ukuran file maksimal 5MB." }));
      return;
    }

    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.foto;
      return next;
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const removeFoto = () => {
    setFotoFile(null);
    setFotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!nama.trim()) newErrors.nama = "Nama usaha wajib diisi.";
    if (!pemilik.trim()) newErrors.pemilik = "Nama pemilik wajib diisi.";
    if (!telp.trim()) newErrors.telp = "Nomor telepon wajib diisi.";
    if (!deskripsi.trim()) newErrors.deskripsi = "Deskripsi wajib diisi.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      nama: nama.trim(),
      pemilik: pemilik.trim(),
      telp: telp.trim(),
      deskripsi: deskripsi.trim(),
      lokasi: lokasi.trim() || null,
      fotoFile,
      existingFoto: umkm?.foto || null,
      isFotoRemoved: !fotoPreview && !fotoFile,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? "Edit UMKM" : "Tambah UMKM"}
          </h2>
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nama Usaha */}
          <div className="space-y-1.5">
            <label htmlFor="umkm-nama" className="block text-sm font-semibold text-gray-700">
              Nama Usaha <span className="text-red-500">*</span>
            </label>
            <input
              id="umkm-nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama usaha"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all"
            />
            {errors.nama && (
              <p className="text-xs text-red-500 font-medium">{errors.nama}</p>
            )}
          </div>

          {/* Nama Pemilik */}
          <div className="space-y-1.5">
            <label htmlFor="umkm-pemilik" className="block text-sm font-semibold text-gray-700">
              Nama Pemilik <span className="text-red-500">*</span>
            </label>
            <input
              id="umkm-pemilik"
              type="text"
              value={pemilik}
              onChange={(e) => setPemilik(e.target.value)}
              placeholder="Masukkan nama pemilik"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all"
            />
            {errors.pemilik && (
              <p className="text-xs text-red-500 font-medium">{errors.pemilik}</p>
            )}
          </div>

          {/* Telepon */}
          <div className="space-y-1.5">
            <label htmlFor="umkm-telp" className="block text-sm font-semibold text-gray-700">
              Nomor Telepon <span className="text-red-500">*</span>
            </label>
            <input
              id="umkm-telp"
              type="text"
              value={telp}
              onChange={(e) => setTelp(e.target.value)}
              placeholder="0812-3456-7890"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all"
            />
            {errors.telp && (
              <p className="text-xs text-red-500 font-medium">{errors.telp}</p>
            )}
          </div>

          {/* Deskripsi */}
          <div className="space-y-1.5">
            <label htmlFor="umkm-deskripsi" className="block text-sm font-semibold text-gray-700">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              id="umkm-deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Masukkan deskripsi usaha"
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all resize-none"
            />
            {errors.deskripsi && (
              <p className="text-xs text-red-500 font-medium">{errors.deskripsi}</p>
            )}
          </div>

          {/* Lokasi Google Maps */}
          <div className="space-y-1.5">
            <label htmlFor="umkm-lokasi" className="block text-sm font-semibold text-gray-700">
              Link Google Maps <span className="text-gray-400 font-normal">(opsional)</span>
            </label>
            <input
              id="umkm-lokasi"
              type="text"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              placeholder="https://maps.google.com/..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all"
            />
          </div>

          {/* Foto Upload */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              Foto <span className="text-gray-400 font-normal">(opsional, maks 5MB)</span>
            </label>

            {fotoPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={fotoPreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={removeFoto}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-brand-normal/40 hover:bg-brand-light/20 transition-all"
              >
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-sm text-gray-500 font-medium">
                  Drag & drop atau <span className="text-brand-normal">pilih file</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (maks. 5MB)</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
            />

            {errors.foto && (
              <p className="text-xs text-red-500 font-medium">{errors.foto}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 rounded-xl font-semibold"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="flex-1 rounded-xl font-semibold"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Menyimpan...
                </span>
              ) : isEdit ? (
                "Simpan Perubahan"
              ) : (
                "Tambah UMKM"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
