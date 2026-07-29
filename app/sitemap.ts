import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://desapanggungrejoblitar.site";

  // Get all berita to dynamically add to sitemap
  const { data: berita } = await supabase.from("berita").select("id, date");

  const beritaUrls =
    berita?.map((item) => ({
      url: `${baseUrl}/berita/${item.id}`,
      lastModified: new Date(item.date).toISOString(),
    })) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/sejarah`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/umkm`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date().toISOString(),
    },
    ...beritaUrls,
  ];
}
