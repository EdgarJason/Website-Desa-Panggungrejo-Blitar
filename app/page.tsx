import { Button, buttonVariants } from "@/components/ui/button";
import { WisataCard } from "@/components/WisataCard";
import { LandingUmkmGrid } from "@/components/LandingUmkmGrid";
import { LandingBeritaGrid } from "@/components/LandingBeritaGrid";
import { FilosofiLogo } from "@/components/FilosofiLogo";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 0;

export default async function Home() {
  const [umkmRes, beritaRes] = await Promise.all([
    supabase.from("umkm").select("*").order("id", { ascending: true }).limit(8),
    supabase
      .from("berita")
      .select("*")
      .order("date", { ascending: false })
      .limit(3),
  ]);

  const umkmData = umkmRes.data ?? [];
  const beritaData = beritaRes.data ?? [];

  return (
    <main className="flex flex-col min-h-screen bg-white font-sans text-black w-full">
      <section
        id="hero"
        className="relative flex flex-col items-start justify-end min-h-[100svh] overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/herothumbnail.png"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/herowebm.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

        <div className="relative text-left max-w-5xl z-20 px-6 md:px-16 pb-16 md:pb-24 text-white">
          <h1 className="text-5xl md:text-7xl mb-4 drop-shadow-lg font-berkshire">
            Desa Panggungrejo
          </h1>
          <p className="font-normal text-sm md:text-lg mb-6 drop-shadow-md text-zinc-100">
            Kecamatan Panggungrejo · Kabupaten Blitar · Jawa Timur
          </p>
          <p className="font-normal text-sm md:text-xl text-zinc-200 drop-shadow-md max-w-3xl">
            Di balik hamparan alam yang asri, Panggungrejo menghadirkan kopi
            pilihan, hasil bumi berkualitas, dan UMKM lokal yang tumbuh bersama
            masyarakatnya.
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-20 w-full max-w-300 mx-auto px-6 md:px-8 pt-20 pb-12">
        <section id="tentang" className="flex flex-col w-full">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16">
            <div className="md:w-5/12 flex flex-row items-center gap-4 md:gap-5">
              <Image 
                src="/logo_desapanggungrejo.png" 
                alt="Logo Desa Panggungrejo Blitar" 
                width={80} 
                height={80} 
                className="object-contain w-16 h-16 md:w-20 md:h-20 drop-shadow-sm shrink-0"
              />
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight text-[#1c1c1c]">
                Tentang
                <br />
                Desa Panggungrejo
              </h2>
            </div>
            <div className="md:w-7/12 flex items-center">
              <p className="text-lg text-[#404040] leading-[1.75] font-regular">
                Desa Panggungrejo adalah pusat pemerintahan Kecamatan
                Panggungrejo, Kabupaten Blitar, sekaligus gerbang menuju
                berbagai destinasi wisata unggulan di Blitar Selatan. Didukung
                oleh potensi UMKM lokal seperti kopi robusta dan berbagai produk
                olahan, desa ini terus berkembang sebagai pusat pelayanan,
                pariwisata, dan ekonomi masyarakat.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full gap-6">
            <div className="w-full md:w-1/3 bg-brand-light hover:bg-brand-light-hover rounded-3xl py-12 px-6 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.02] duration-300 cursor-pointer">
              <h3 className="text-[2.5rem] font-bold text-brand-dark mb-3">
                8.254
              </h3>
              <p className="text-brand-normal font-bold tracking-widest text-base uppercase">
                Populasi
              </p>
            </div>

            <div className="w-full md:w-1/3 bg-brand-light hover:bg-brand-light-hover rounded-3xl py-12 px-6 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.02] duration-300 cursor-pointer">
              <h3 className="text-[2.5rem] font-bold text-brand-dark mb-3">
                15.8 KM2
              </h3>
              <p className="text-brand-normal font-bold tracking-widest text-base uppercase">
                Luas Wilayah
              </p>
            </div>

            <div className="w-full md:w-1/3 bg-brand-light hover:bg-brand-light-hover rounded-3xl py-12 px-6 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.02] duration-300 cursor-pointer">
              <h3 className="text-[2.5rem] font-bold text-brand-dark mb-3">
                2.500+
              </h3>
              <p className="text-brand-normal font-bold tracking-widest text-base uppercase">
                Kepala Keluarga
              </p>
            </div>
          </div>
          
          
        </section>

        <section>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight text-[#1c1c1c]">
              Filosofi Logo Desa Panggungrejo
            </h2>
          </div>
          <FilosofiLogo />
        </section>

        <section className="flex flex-col w-full gap-5">
          <p className="text-base font-bold text-brand-normal uppercase tracking-widest text-center">
            Profile Desa Panggungrejo, Kab. Blitar
          </p>
          <div className="w-full aspect-video bg-gray-100 rounded-2xl md:rounded-[2rem] border border-gray-200 flex items-center justify-center shadow-sm relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />

            <div className="w-20 h-20 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
              <svg
                className="w-8 h-8 text-brand-normal ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <p className="absolute bottom-6 font-medium text-gray-400 z-10">
              Video Placeholder
            </p>
          </div>
        </section>

        <section id="sejarah" className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Sejarah Desa Panggungrejo
            </h1>
            <Image
              src="/fotosejarah.png"
              alt="Foto Punden Desa Panggungrejo Blitar"
              width={1200}
              height={800}
              draggable={false}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl md:rounded-[2rem] shadow-sm"
            />
          </div>

          <p className="text-lg font-normal">
            Desa Panggungrejo berawal dari kisah pembukaan hutan di lereng
            Pegunungan Kendeng oleh Nyai Gadung Melati dan Eyang Aryo Dipati
            beserta pengikut Pangeran Diponegoro usai Perang Mataram. Pemukiman
            awal berupa rumah panggung kayu jati gelondongan untuk menghindari
            harimau ini dinamai Panggung Dolok, sebelum akhirnya resmi dibentuk
            menjadi desa pada tahun 1891 dan berganti nama menjadi Desa
            Panggungrejo di bawah kepemimpinan Lurah Djontono dengan harapan
            menjadi daerah dataran tinggi yang ramai.{" "}
          </p>

          <Link
            href="/sejarah"
            className="text-lg font-medium underline underline-offset-4 hover:text-brand-normal transition-colors cursor-pointer"
          >
            Lihat lebih lengkap mengenai sejarah Desa Panggungrejo →
          </Link>
        </section>

        <section id="wisata" className="flex flex-col gap-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Wisata Unggulan Desa Panggungrejo
          </h1>

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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                UMKM Desa Panggungrejo
              </h1>
              <p className="text-lg font-normal text-zinc-700 max-w-2xl">
                UMKM yang menjadi tulang punggung ekonomi Desa Panggungrejo dan
                menyediakan kebutuhan masyarakat.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/umkm"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "rounded-full px-6 transition-all hover:scale-[1.02]",
                })}
              >
                Lihat Semua UMKM →
              </Link>
            </div>
          </div>

          <LandingUmkmGrid data={umkmData} />

          <div className="flex justify-center">
            <Link
              href="/umkm"
              className="text-lg font-medium underline underline-offset-4 hover:text-brand-normal transition-colors cursor-pointer"
            >
              Lihat Selengkapnya →
            </Link>
          </div>
        </section>

        <section id="berita" className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Kegiatan Desa Panggungrejo
              </h1>
              <p className="text-lg font-normal text-zinc-700 max-w-2xl">
                Informasi terkini mengenai kegiatan dan acara yang diadakan di
                Desa Panggungrejo.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/berita"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "rounded-full px-6 transition-all hover:scale-[1.02]",
                })}
              >
                Lihat Semua Berita →
              </Link>
            </div>
          </div>

          <LandingBeritaGrid data={beritaData} />

          <div className="flex justify-center">
            <Link
              href="/berita"
              className="text-lg font-medium underline underline-offset-4 hover:text-brand-normal transition-colors cursor-pointer"
            >
              Lihat Selengkapnya →
            </Link>
          </div>
        </section>

        <section id="peta" className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Peta Lokasi Desa Panggungrejo
            </h1>
            <p className="text-lg font-normal text-zinc-700 max-w-full">
              Jelajahi Desa Panggungrejo secara interaktif. Anda dapat menggeser, memperbesar, atau klik rute untuk melihat detail navigasi.
            </p>
          </div>
          <div className="w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm border border-gray-200 bg-gray-100">
            <iframe 
              src="https://maps.google.com/maps?q=Desa%20Panggungrejo,%20Kec.%20Panggungrejo,%20Blitar,%20Jawa%20Timur&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="500" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Desa Panggungrejo"
            ></iframe>
          </div>
        </section>

      </div>
    </main>
  );
}
