import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-black">
      <section className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-black p-16 min-h-[40vh]">
        <div className="relative text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Desa Panggungrejo
          </h1>
          <p className="font-medium text-xl md:text-2xl italic mb-6">
            Kecamatan Panggungrejo, Kabupaten Blitar, Jawa Timur
          </p>
          <p className="font-normal text-lg md:text-2xl text-zinc-700 dark:text-zinc-300">
            Di balik hamparan alam yang asri, Panggungrejo menghadirkan kopi pilihan, hasil bumi berkualitas, dan UMKM lokal yang tumbuh bersama masyarakatnya.
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1200px] mx-auto py-24 px-6 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16">
          <div className="md:w-5/12">
            <h2 className="text-4xl md:text-[3.5rem] font-bold leading-[1.1] text-[#1c1c1c]">
              Tentang<br />Panggungrejo
            </h2>
          </div>
          <div className="md:w-7/12 flex items-center">
            <p className="text-[1.125rem] text-[#404040] leading-[1.75] font-medium">
              Desa Panggungrejo adalah pusat pemerintahan Kecamatan Panggungrejo, Kabupaten Blitar, sekaligus gerbang menuju berbagai destinasi wisata unggulan di Blitar Selatan. Didukung oleh potensi UMKM lokal seperti kopi robusta dan berbagai produk olahan, desa ini terus berkembang sebagai pusat pelayanan, pariwisata, dan ekonomi masyarakat.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#F5F2F0] rounded-3xl py-12 px-6 text-center flex flex-col items-center justify-center">
            <h3 className="text-[2.5rem] font-bold text-black mb-3">8.000+</h3>
            <p className="text-[#8C6D5F] font-bold tracking-widest text-base uppercase">Populasi</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-[#F5F2F0] rounded-3xl py-12 px-6 text-center flex flex-col items-center justify-center">
            <h3 className="text-[2.5rem] font-bold text-black mb-3">15.8 KM2</h3>
            <p className="text-[#8C6D5F] font-bold tracking-widest text-base uppercase">Luas Wilayah</p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-[#F5F2F0] rounded-3xl py-12 px-6 text-center flex flex-col items-center justify-center">
            <h3 className="text-[2.5rem] font-bold text-black mb-3">2.500+</h3>
            <p className="text-[#8C6D5F] font-bold tracking-widest text-base uppercase">Kepala Keluarga</p>
          </div>
        </div>
      </section>
    </main>
  );
}
