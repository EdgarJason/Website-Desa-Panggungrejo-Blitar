import { supabase } from "@/lib/supabase";

// =============================================
// Berita Data Service - Supabase Integration
// =============================================

export interface Berita {
  id: number;
  headline: string;
  konten: string;
  foto: string | null;
  date: string;
  created_at: string;
}

export type BeritaInput = {
  headline: string;
  konten: string;
  foto?: string | null;
  date: string;
};

/**
 * Upload foto berita ke Supabase Storage bucket "images".
 * Returns public URL of the uploaded file.
 */
export async function uploadBeritaFoto(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `berita/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;

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
    // Extract path from public URL
    const match = url.match(/\/storage\/v1\/object\/public\/image\/(.+)$/);
    if (!match) return;
    await supabase.storage.from("image").remove([match[1]]);
  } catch {
    // Silently fail — old foto cleanup is best-effort
  }
}

/**
 * Get all berita, ordered by created_at descending.
 */
export async function getBerita(): Promise<Berita[]> {
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

/**
 * Get a single berita by ID.
 */
export async function getBeritaById(id: number): Promise<Berita | null> {
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

/**
 * Add a new berita.
 */
export async function addBerita(input: BeritaInput): Promise<Berita> {
  const { data, error } = await supabase
    .from("berita")
    .insert({
      headline: input.headline,
      konten: input.konten,
      foto: input.foto || null,
      date: input.date,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/**
 * Update an existing berita.
 */
export async function updateBerita(
  id: number,
  input: Partial<BeritaInput>
): Promise<Berita | null> {
  const updateData: Record<string, unknown> = {};
  if (input.headline !== undefined) updateData.headline = input.headline;
  if (input.konten !== undefined) updateData.konten = input.konten;
  if (input.foto !== undefined) updateData.foto = input.foto || null;
  if (input.date !== undefined) updateData.date = input.date;

  const { data, error } = await supabase
    .from("berita")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/**
 * Delete a berita by ID. Also removes associated foto from storage.
 */
export async function deleteBerita(id: number): Promise<boolean> {
  // Get the item first to clean up foto
  const existing = await getBeritaById(id);
  if (existing?.foto) {
    await deleteFotoFromStorage(existing.foto);
  }

  const { error } = await supabase.from("berita").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}
