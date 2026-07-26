import { supabase } from "@/lib/supabase";

// =============================================
// UMKM Data Service - Supabase Integration
// =============================================

export interface Umkm {
  id: number;
  nama: string;
  deskripsi: string;
  lokasi: string | null;
  foto: string | null;
  telp: string;
  pemilik: string;
}

export type UmkmInput = {
  nama: string;
  deskripsi: string;
  lokasi?: string | null;
  foto?: string | null;
  telp: string;
  pemilik: string;
};

/**
 * Upload foto UMKM ke Supabase Storage bucket "images".
 * Returns public URL of the uploaded file.
 */
export async function uploadUmkmFoto(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `umkm/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;

  const { error } = await supabase.storage
    .from("image")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(`Upload gagal: ${error.message}`);

  const { data } = supabase.storage.from("image").getPublicUrl(fileName);
  return data.publicUrl;
}

/**
 * Delete foto from Supabase Storage.
 */
async function deleteFotoFromStorage(url: string): Promise<void> {
  try {
    const match = url.match(/\/storage\/v1\/object\/public\/image\/(.+)$/);
    if (!match) return;
    await supabase.storage.from("image").remove([match[1]]);
  } catch {
    // Silently fail — old foto cleanup is best-effort
  }
}

/**
 * Get all UMKM entries.
 */
export async function getUmkm(): Promise<Umkm[]> {
  const { data, error } = await supabase
    .from("umkm")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

/**
 * Get a single UMKM by ID.
 */
export async function getUmkmById(id: number): Promise<Umkm | null> {
  const { data, error } = await supabase
    .from("umkm")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

/**
 * Add a new UMKM entry.
 */
export async function addUmkm(input: UmkmInput): Promise<Umkm> {
  const { data, error } = await supabase
    .from("umkm")
    .insert({
      nama: input.nama,
      deskripsi: input.deskripsi,
      lokasi: input.lokasi || null,
      foto: input.foto || null,
      telp: input.telp,
      pemilik: input.pemilik,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/**
 * Update an existing UMKM entry.
 */
export async function updateUmkm(
  id: number,
  input: Partial<UmkmInput>
): Promise<Umkm | null> {
  const updateData: Record<string, unknown> = {};
  if (input.nama !== undefined) updateData.nama = input.nama;
  if (input.deskripsi !== undefined) updateData.deskripsi = input.deskripsi;
  if (input.lokasi !== undefined) updateData.lokasi = input.lokasi || null;
  if (input.foto !== undefined) updateData.foto = input.foto || null;
  if (input.telp !== undefined) updateData.telp = input.telp;
  if (input.pemilik !== undefined) updateData.pemilik = input.pemilik;

  const { data, error } = await supabase
    .from("umkm")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/**
 * Delete a UMKM by ID. Also removes associated foto from storage.
 */
export async function deleteUmkm(id: number): Promise<boolean> {
  const existing = await getUmkmById(id);
  if (existing?.foto) {
    await deleteFotoFromStorage(existing.foto);
  }

  const { error } = await supabase.from("umkm").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}
