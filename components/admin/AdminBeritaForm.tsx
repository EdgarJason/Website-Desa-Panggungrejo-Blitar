"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { Berita } from "@/lib/data/berita";

export interface BeritaFormData {
  headline: string;
  konten: string;
  date: string;
  fotoFile?: File | null;
  existingFoto?: string | null;
  isFotoRemoved: boolean;
}

interface AdminBeritaFormProps {
  berita?: Berita | null;
  onSubmit: (data: BeritaFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function AdminBeritaForm({
  berita,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: AdminBeritaFormProps) {
  const isEdit = !!berita;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [headline, setHeadline] = useState("");
  const [konten, setKonten] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (berita) {
      setHeadline(berita.headline);
      setKonten(berita.konten);
      if (berita.date) setDate(berita.date);
      if (berita.foto) {
        setFotoPreview(berita.foto);
      }
    }
  }, [berita]);

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, foto: "File harus berupa gambar." }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        foto: "Ukuran file maksimal 5MB.",
      }));
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
    if (!headline.trim()) newErrors.headline = "Judul berita wajib diisi.";
    if (!konten.trim()) newErrors.konten = "Konten wajib diisi.";
    if (!date) newErrors.date = "Tanggal wajib diisi.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      headline: headline.trim(),
      konten: konten.trim(),
      date,
      fotoFile,
      existingFoto: berita?.foto || null,
      isFotoRemoved: !fotoPreview && !fotoFile,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? "Edit Berita" : "Tambah Berita"}
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
          {/* Headline */}
          <div className="space-y-1.5">
            <label htmlFor="berita-headline" className="block text-sm font-semibold text-gray-700">
              Judul Berita <span className="text-red-500">*</span>
            </label>
            <input
              id="berita-headline"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Masukkan judul berita"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all"
            />
            {errors.headline && (
              <p className="text-xs text-red-500 font-medium">{errors.headline}</p>
            )}
          </div>

          {/* Tanggal */}
          <div className="space-y-1.5">
            <label htmlFor="berita-date" className="block text-sm font-semibold text-gray-700">
              Tanggal <span className="text-red-500">*</span>
            </label>
            <input
              id="berita-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all"
            />
            {errors.date && (
              <p className="text-xs text-red-500 font-medium">{errors.date}</p>
            )}
          </div>

          {/* Konten */}
          <div className="space-y-1.5">
            <label htmlFor="berita-konten" className="block text-sm font-semibold text-gray-700">
              Konten <span className="text-red-500">*</span>
            </label>
            <textarea
              id="berita-konten"
              value={konten}
              onChange={(e) => setKonten(e.target.value)}
              placeholder="Masukkan isi konten berita"
              rows={6}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all resize-none"
            />
            {errors.konten && (
              <p className="text-xs text-red-500 font-medium">{errors.konten}</p>
            )}
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
                "Tambah Berita"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
