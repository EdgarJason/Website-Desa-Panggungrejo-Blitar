import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("umkm") // ganti sesuai nama tabelmu
    .select("*");

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Data UMKM</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}