import { Button, buttonVariants } from "@/components/ui/button"
import { WisataCard } from "@/components/WisataCard";
import { LandingUmkmGrid } from "@/components/LandingUmkmGrid";
import { LandingBeritaGrid } from "@/components/LandingBeritaGrid";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 0;

export default async function Home() {
  const [umkmRes, beritaRes] = await Promise.all([
    supabase.from("umkm").select("*").order("id", { ascending: true }).limit(8),
    supabase.from("berita").select("*").order("date", { ascending: false }).limit(3),
  ]);

  const umkmData = umkmRes.data ?? [];
  const beritaData = beritaRes.data ?? [];

  return (
    <main className="flex flex-col min-h-screen bg-white font-sans text-black w-full">
      <section id="hero" className="relative flex flex-col items-start justify-end min-h-[100svh] overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload='auto'
          poster="/herothumbnail.png"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/herowebm.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
        
        <div className="relative text-left max-w-5xl z-20 px-6 md:px-16 pb-16 md:pb-24 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            Desa Panggungrejo
          </h1>
          <p className="font-normal text-sm md:text-lg mb-6 drop-shadow-md text-zinc-100">
            Kecamatan Panggungrejo · Kabupaten Blitar · Jawa Timur
          </p>
          <p className="font-normal text-sm md:text-xl text-zinc-200 drop-shadow-md max-w-3xl">
            Di balik hamparan alam yang asri, Panggungrejo menghadirkan kopi pilihan, hasil bumi berkualitas, dan UMKM lokal yang tumbuh bersama masyarakatnya.
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-20 w-full max-w-300 mx-auto px-6 md:px-8 pt-20 pb-12">
      <section id="tentang" className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16">
          <div className="md:w-5/12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1c1c1c]">
              Tentang<br />Panggungrejo
            </h2>
          </div>
          <div className="md:w-7/12 flex items-center">
            <p className="text-lg text-[#404040] leading-[1.75] font-regular">
              Desa Panggungrejo adalah pusat pemerintahan Kecamatan Panggungrejo, Kabupaten Blitar, sekaligus gerbang menuju berbagai destinasi wisata unggulan di Blitar Selatan. Didukung oleh potensi UMKM lokal seperti kopi robusta dan berbagai produk olahan, desa ini terus berkembang sebagai pusat pelayanan, pariwisata, dan ekonomi masyarakat.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row w-full gap-6">
          <div className="w-full md:w-1/3 bg-brand-light hover:bg-brand-light-hover rounded-3xl py-12 px-6 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.02] duration-300 cursor-pointer">
            <h3 className="text-[2.5rem] font-bold text-brand-dark mb-3">8.254</h3>
            <p className="text-brand-normal font-bold tracking-widest text-base uppercase">Populasi</p>
          </div>
          
          <div className="w-full md:w-1/3 bg-brand-light hover:bg-brand-light-hover rounded-3xl py-12 px-6 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.02] duration-300 cursor-pointer">
            <h3 className="text-[2.5rem] font-bold text-brand-dark mb-3">15.8 KM2</h3>
            <p className="text-brand-normal font-bold tracking-widest text-base uppercase">Luas Wilayah</p>
          </div>
          
          <div className="w-full md:w-1/3 bg-brand-light hover:bg-brand-light-hover rounded-3xl py-12 px-6 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.02] duration-300 cursor-pointer">
            <h3 className="text-[2.5rem] font-bold text-brand-dark mb-3">2.500+</h3>
            <p className="text-brand-normal font-bold tracking-widest text-base uppercase">Kepala Keluarga</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col w-full gap-5">
        <p className="text-base font-bold text-brand-normal uppercase tracking-widest text-center">
          Profile Desa Panggungrejo, Kab. Blitar
        </p>
        <div className="w-full aspect-video bg-gray-100 rounded-2xl md:rounded-[2rem] border border-gray-200 flex items-center justify-center shadow-sm relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
          
          <div className="w-20 h-20 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
            <svg className="w-8 h-8 text-brand-normal ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          
          <p className="absolute bottom-6 font-medium text-gray-400 z-10">Video Placeholder</p>
        </div>
      </section>

      <section id="sejarah" className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Sejarah Panggungrejo</h1>
          <Image src="/fotosejarah.png" alt="Foto Kantor Desa Panggungrejo" width={1200} height={800} draggable={false} className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl md:rounded-[2rem] shadow-sm"/>
        </div>

        <p className="text-lg font-normal">
          Desa Panggungrejo memiliki sejarah yang erat dengan legenda Pangeran Prabu Gadung Melati, tokoh yang dipercaya membuka kawasan hutan di lereng Gunung Kendeng menjadi permukiman dan lahan pertanian pada akhir abad ke-19. Karena wilayah tersebut masih dihuni banyak satwa liar, masyarakat membangun rumah-rumah berbentuk panggung dari kayu gelondongan (dolok), sehingga kawasan ini dikenal sebagai Panggung Dolok. Pada tahun 1891, desa resmi dibentuk dan kemudian berganti nama menjadi Panggungrejo, yang berarti daerah dataran tinggi yang ramai dan makmur. Hingga kini, kisah serta makam Pangeran Prabu Gadung Melati tetap menjadi bagian penting dari identitas budaya dan sejarah Desa Panggungrejo.
        </p>

          <a href="/sejarah" className="text-lg font-medium underline underline-offset-4 hover:text-brand-normal transition-colors cursor-pointer">
            Lihat lebih lengkap mengenai sejarah Desa Panggungrejo →
          </a>

         </section>

      <section id="wisata" className="flex flex-col gap-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Wisata Unggulan Panggungrejo</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          <WisataCard 
            title="Air Terjun Bidadari"
            description="Tersembunyi di Dusun Panggungrejo, Air Terjun Bidadari menawarkan pesona aliran air jernih bertingkat yang diapit dinding tebing batu eksotis. Suasananya yang masih sangat perawan dan dikelilingi hutan asri menjadikannya spot terbaik di Desa Panggungrejo untuk menenangkan diri serta berburu foto alam yang estetik."
            imageUrl="/cobanbidadari.png"
            mapUrl="https://share.google/cUSEpMDYNzGgDI79n"
          />
          <WisataCard 
            title="Air Terjun Grenjeng"
            description="Berada tepat di kawasan perbatasan antara Desa Panggungrejo dan Desa Balerejo, Air Terjun Grenjeng adalah definisi nyata dari keindahan yang tersembunyi. Destinasi ini menyuguhkan paket lengkap bagi para petualang: udara pegunungan yang bersih, rimbunnya pepohonan hijau, dan aliran air murni yang mengalir langsung di atas bebatuan alami."
            imageUrl="/cobangrenjeng.png"
            mapUrl="https://share.google/7Sy4GwtoRbr9hc2LO"
          />
        </div>
      </section>

      <section id="umkm" className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">UMKM Desa Panggungrejo</h1>
            <p className="text-lg font-normal text-zinc-700 max-w-2xl">UMKM yang menjadi tulang punggung ekonomi Desa Panggungrejo dan menyediakan kebutuhan masyarakat.</p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/umkm" className={buttonVariants({ size: "lg", className: "rounded-full px-6 transition-all hover:scale-[1.02]" })}>
              Lihat Semua UMKM →
            </Link>
          </div>
        </div>

        <LandingUmkmGrid data={umkmData} />

        <div className="flex justify-center">
          <a href="/umkm" className="text-lg font-medium underline underline-offset-4 hover:text-brand-normal transition-colors cursor-pointer">
            Lihat Selengkapnya →
          </a>
        </div>
      </section>

      <section id="berita" className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Berita / Kegiatan Panggungrejo</h1>
            <p className="text-lg font-normal text-zinc-700 max-w-2xl">Informasi terkini mengenai kegiatan dan acara yang diadakan di Desa Panggungrejo.</p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/berita" className={buttonVariants({ size: "lg", className: "rounded-full px-6 transition-all hover:scale-[1.02]" })}>
              Lihat Semua Berita →
            </Link>
          </div>
        </div>

        <LandingBeritaGrid data={beritaData} />

        <div className="flex justify-center">
          <Link href="/berita" className="text-lg font-medium underline underline-offset-4 hover:text-brand-normal transition-colors cursor-pointer">
            Lihat Selengkapnya →
          </Link>
        </div>
      </section>

      <section className="relative flex flex-col justify-center items-center py-20 px-6 md:p-24 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-sm">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center hover:scale-105 transition-transform duration-1000"
          style={{ backgroundImage: "url('/kantorkades.png')" }}
        />
        
        {/* Card Container */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 p-8 md:p-16 bg-brand-light/65 backdrop-blur-md rounded-2xl md:rounded-[2.5rem] text-center max-w-4xl w-full border border-white/20">
          <div className="flex flex-col items-center justify-center gap-4">       
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark leading-tight">
              Siap Mengeksplorasi<br/>Panggungrejo?
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-gray-800 font-medium">
              Nantikan pengalaman menyenangkan bersama kami!
            </p>
          </div>
          <a href="https://share.google/IaYbg7qRndKjAlKBO" target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg", className: "rounded-full px-8 py-6 text-lg shadow-md transition-all hover:scale-[1.02] hover:shadow-lg mt-2" })}>
            Lokasi Kami
          </a>
        </div>
      </section>

      </div>

    </main>
  );
}
