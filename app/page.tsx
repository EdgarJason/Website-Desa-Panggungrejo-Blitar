import Image from "next/image";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white font-sans gap-20 text-black w-full max-w-300 mx-auto md:px-8">
      <section className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-black min-h-[40vh]">
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

      <section className="flex flex-col w-full max-w-300 mx-auto py-24 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16">
          <div className="md:w-5/12">
            <h2 className="text-6xl font-bold leading-[1.1] text-[#1c1c1c]">
              Tentang<br />Panggungrejo
            </h2>
          </div>
          <div className="md:w-7/12 flex items-center">
            <p className="text-lg text-[#404040] leading-[1.75] font-medium">
              Desa Panggungrejo adalah pusat pemerintahan Kecamatan Panggungrejo, Kabupaten Blitar, sekaligus gerbang menuju berbagai destinasi wisata unggulan di Blitar Selatan. Didukung oleh potensi UMKM lokal seperti kopi robusta dan berbagai produk olahan, desa ini terus berkembang sebagai pusat pelayanan, pariwisata, dan ekonomi masyarakat.
            </p>
          </div>
        </div>
        
        <div className="flex flex-row justify-between gap-6">
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

      <section className="flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl font-bold">Sejarah Panggungrejo</h1>
          <img src="/fotosejarah.png" alt="Foto Kantor Desa Panggungrejo" draggable='false'/>
        </div>

        <p className="text-lg font-normal">
          Desa Panggungrejo memiliki sejarah yang erat dengan legenda Pangeran Prabu Gadung Melati, tokoh yang dipercaya membuka kawasan hutan di lereng Gunung Kendeng menjadi permukiman dan lahan pertanian pada akhir abad ke-19. Karena wilayah tersebut masih dihuni banyak satwa liar, masyarakat membangun rumah-rumah berbentuk panggung dari kayu gelondongan (dolok), sehingga kawasan ini dikenal sebagai Panggung Dolok. Pada tahun 1891, desa resmi dibentuk dan kemudian berganti nama menjadi Panggungrejo, yang berarti daerah dataran tinggi yang ramai dan makmur. Hingga kini, kisah serta makam Pangeran Prabu Gadung Melati tetap menjadi bagian penting dari identitas budaya dan sejarah Desa Panggungrejo.
        </p>

        <p className="text-lg underline cursor-pointer">Lihat lebih lanjut sejarah Desa Panggungrejo →</p>
      </section>

      <section className="flex flex-col">
        <h1>Wisata Unggulan Panggungrejo</h1>
      </section>

      <section className="flex flex-col">
        <div className="flex flex-row justify-between items-stretch">
          <div className="flex flex-col gap-2">
            <h1>UMKM Desa Panggungrejo</h1>
            <p>UMKM yang menjadi tulang punggung ekonomi Desa Panggungrejo dan menyediakan kebutuhan masyarakat.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button>Lihat Semua UMKM →</Button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-row justify-between items-stretch">
          <div className="flex flex-col gap-2">
            <h1>Berita / Kegiatan di Panggungrejo</h1>
            <p>Informasi terkini mengenai kegiatan dan acara yang diadakan di Desa Panggungrejo.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button>Lihat Semua Berita →</Button>
          </div>
        </div>
      </section>

      <section>
        <h1>Siap Mengeksplorasi Panggungrejo?</h1>
        <p>Nantikan pengalaman menyenangkan bersama kami!</p>
        <Button>Lokasi Kami</Button>
      </section>

      <footer>
        <div className="flex flex-col justify-between">
          <div>
            <h1>PANGGUNGREJO</h1>
            <p>Kab. Blitar</p>
          </div>
          <div>
            <div>
              <h2>Kontak</h2>
              <div className="flex flex-row">
      
              </div>
            </div>
            <div>
              <h2>Navigasi</h2>
              <div className="flex flex-row">
                <a href="#">
                  <p>Home</p>
                </a>
                <a href="#">
                  <p>Tentang</p>
                </a>
                <a href="#">
                  <p>Wisata</p>
                </a>
                <a href="#">
                  <p>UMKM</p>
                </a>
                <a href="#">
                  <p>Kontak</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="w-10 h-10 rounded-full border-2 border-white/40">
          </div>
          <p>Made by Divisi DDM - MMD 57 FILKOM UB 2026</p>
        </div>
      </footer>

    </main>
  );
}
