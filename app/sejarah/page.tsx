import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Sejarah() {
  return (
    <main className="flex flex-col min-h-screen bg-white font-sans text-black w-full px-8 md:px-16 pt-40 pb-24 gap-10">
      <section className="flex flex-col gap-10 w-full max-w-7xl mx-auto">
        <div className="relative pl-12 md:pl-16">
          <Link href="/#sejarah" className="absolute left-0 top-1 md:top-2 text-zinc-500 hover:text-black transition-colors shrink-0">
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          </Link>
          <h1 className="text-5xl lg:text-6xl font-bold">
            Sejarah Desa Panggungrejo
          </h1>
        </div>
        <img
          src="/fotosejarah.png"
          alt="Foto Kantor Desa Panggungrejo"
          draggable="false"
        />
      </section>

      <p className="text-lg font-normal">
        Sejarah Desa Panggungrejo sangat erat kaitannya dengan legenda Mbah
        Gadung Melati. Desa ini bermula dari sebuah pedukuhan bernama Panggung
        Dolok. Masyarakat setempat secara umum meyakini bahwa tokoh dalam cerita
        tersebut adalah sosok cikal bakal yang membuka hutan dan membangun
        kawasan ini menjadi Desa Panggungrejo.
        <br />
        <br />
        <strong>Legenda Pangeran Prabu Gadung Melati</strong>
        <br />
        Kisah ini bermula pada akhir abad ke-18, tepatnya pascaperang Kesultanan
        Mataram. Pada masa itu, terjadi perang besar di Tanah Jawa ketika
        Pangeran Diponegoro berjuang melawan penjajah Belanda. Sayangnya,
        peperangan tersebut akhirnya dimenangkan oleh pihak Belanda melalui
        taktik licik mereka. Setelah kekalahan itu, banyak pengikut Pangeran
        Diponegoro yang terpaksa melarikan diri dari kejaran tentara Belanda.
        Mereka keluar dari wilayah Mataram untuk mencari tempat perlindungan
        yang aman, sekaligus menyusun kembali kekuatan demi mengobarkan semangat
        antipenjajahan di daerah lain.
        <br />
        <br />
        Menurut cerita yang beredar, salah satu pengikut Pangeran Diponegoro
        yang melarikan diri ke arah timur adalah Pangeran Gadung Melati. Beliau
        juga dikenal sebagai kerabat Kerajaan Majapahit dan keturunan dari
        Batoro Kathong. Perjalanannya membawa beliau ke tengah hutan di kawasan
        Gunung Kendeng, terus berjalan hingga tiba di lereng bagian selatan. Di
        sana beliau beristirahat dan merasa bahwa tempat tersebut sangat aman.
        Beliau kemudian memutuskan untuk membangun sebuah rumah peristirahatan
        yang terbuat dari kayu jati gelondongan utuh yang biasa disebut kayu
        dolok. Proses pembuatan rumah ini dibantu oleh dua orang abdi setianya,
        yaitu Mbah Jahet dan Mbah Sutol. Konon Mbah Sutol adalah sosok yang
        memiliki keterbatasan fisik pada kakinya.
        <br />
        <br />
        Seiring berjalannya waktu, pengikut Pangeran Gadung Melati terus
        bertambah. Rombongan kecil dari Mataram yang dipimpin oleh Mbah Karso
        Drono juga datang dan menetap di hutan tersebut. Sedikit demi sedikit,
        kawasan hutan mulai dibabat untuk dijadikan area perumahan dan ladang
        pertanian sekitar tahun 1881. Karena hutan itu masih banyak dihuni oleh
        harimau, rumah-rumah warga dibangun dengan model panggung untuk
        menghindari serangan binatang buas. Ketika rumah panggung di kawasan
        tersebut semakin banyak, wilayah ini akhirnya diberi nama Panggung
        Dolok, yang berarti deretan rumah panggung dari kayu dolok.
        <br />
        <br />
        Beberapa tahun kemudian, Pangeran Gadung Melati beserta Mbah Jahet dan
        Mbah Sutol wafat dan dimakamkan di pinggiran desa. Sebagai penghormatan
        atas status bangsawannya, dibangunlah astana makam khusus yang hingga
        kini sering dijadikan lokasi tradisi sadranan. Makam tersebut dikenal
        dengan sebutan makam Mbah Danyang Aryo Dipati Pangeran Prabu Gadung
        Melati. Sampai sekarang tempat ini masih dianggap keramat oleh
        masyarakat setempat. Banyak orang yang memiliki hajat datang untuk
        memanjatkan doa, memohon kelancaran dan keselamatan. Selain itu, makam
        ini sering menjadi tempat berkumpul masyarakat setiap tahunnya untuk
        memohon pertolongan kepada Tuhan Yang Maha Kuasa, terutama saat
        menghadapi masa sulit seperti kemarau panjang di awal musim penghujan.
        <br />
        <br />
        Tahun-tahun berlalu dan penduduk di kawasan tersebut semakin padat,
        tetapi mereka belum memiliki struktur pemerintahan desa yang resmi.
        Akhirnya pada tahun 1891, dibentuklah Desa Panggung Dolok secara resmi
        yang dipimpin oleh lurah pertama bernama Djontono, dengan masa jabatan
        dari tahun 1891 hingga 1901. Karena desa ini terus berkembang dan
        semakin ramai dari tahun ke tahun, Lurah Djontono kemudian memutuskan
        untuk mengubah nama Desa Panggung Dolok menjadi Desa Panggungrejo.
        <br />
        <br />
        Nama Panggungrejo sendiri memiliki makna filosofis yang mendalam. Kata
        "Panggung" berarti daerah yang tinggi, sedangkan "Rejo" bermakna ramai.
        Perubahan nama ini menyematkan harapan bahwa meskipun terletak di
        dataran tinggi pegunungan, desa ini akan selalu menjadi tempat yang
        makmur dan sejahtera bagi penduduknya.{" "}
      </p>

      <a href="/#sejarah" className={buttonVariants({ variant: "default", size: "lg" })}>
        Kembali ke Beranda
      </a>
    </main>
  );
}
