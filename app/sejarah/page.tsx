import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sejarah",
  description:
    "Sejarah Desa Panggungrejo, dari legenda Mbah Gadung Melati hingga berdirinya desa pada tahun 1891.",
};

export default function Sejarah() {
  return (
    <main className="flex flex-col min-h-screen bg-white font-sans text-black w-full px-8 md:px-16 pt-40 pb-24 gap-10">
      <section className="flex flex-col gap-10 w-full max-w-7xl mx-auto">
        <div className="relative pl-12 md:pl-16">
          <Link
            href="/#sejarah"
            className="absolute left-0 top-1 md:top-2 text-zinc-500 hover:text-black transition-colors shrink-0"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          </Link>
          <h1 className="text-5xl lg:text-6xl font-bold">
            Sejarah Desa Panggungrejo
          </h1>
        </div>
        <Image
          src="/fotosejarah.png"
          alt="Foto Punden Desa Panggungrejo Blitar"
          width={1200}
          height={800}
          draggable={false}
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl md:rounded-[2rem] shadow-sm"
        />
      </section>

      <p className="text-lg font-normal">
        Sejarah Desa Panggungrejo tidak terlepas dari Sejarah Legenda Mbah Nyai
        Gadung Melati bersama suaminya Eyang Aryo Dipati. Desa ini awalnya dari
        cerita padukuhan Panggung Dolok yang sekarang menjadi Desa Panggungrejo.
        Yang secara umum masyarakat meyakini bahwa orang atau tokoh dalam cerita
        tersebut merupakan orang pertama (cikal bakal) yang membuat hutan
        menjadi Desa Panggungrejo.
        <br />
        <br />
        <strong>
          Legenda Mbah Nyai Gadung Melati bersama Eyang Aryo Dipati
        </strong>
        <br />
        Pada akhir abad ke 18 terutama pasca perang Kesultanan Mataram, yaitu
        perang besar ditanah jawa antara bangsawan Kesultanan Mataram bersama
        pengikutnya yang dipimpin oleh Pangeran Diponegoro melawan penjajah
        Belanda, yang akhirnya dimenangkan oleh Belanda dengan kelicikannya.
        Setelah perang tersebut banyak pengikut Pangeran Diponegoro yang
        melarikan diri dari kejaran tentara Belanda. Mereka lari keluar daerah
        Mataram untuk mencari tempat yang aman guna menyusun kekuatan kembali
        untuk mengobarkan semangat anti penjajahan di daerah lain.
        <br />
        <br />
        Ada berbagai kisah tentang Mbah Nyai Gadung Melati, salah satunya adalah
        yang ada di Desa Panggungrejo ini. Menurut beberapa nara sumber yang ada
        di Desa Panggungrejo disebutkan bahwa salah satu cikal bakal Desa
        Panggungrejo adalah Mbah Nyai Gadung Melati bersama suaminya Eyang Aryo
        Dipati. Menurut ahli silsilah Kejawen, Nyai Gadung Melati merupakan
        seorang tokoh yang paling banyak membabat atau membuka desa di daerah
        Blitar termasuk salah satunya Desa Panggungrejo.
        <br />
        <br />
        Konon ceritanya, Mbah Nyai Gadung Melati bersama suaminya Eyang Aryo
        Dipati bersama ini adalah salah satu pengikut Pangeran Diponegoro dari
        Kerajaan Mataram. Usai Perang Diponegoro beliau melarikan diri ke arah
        timur hingga sampailah beliau ditengah hutan pegunungan kendeng dan
        beliau berjalan terus ke lereng selatan Gunung Kendeng.
        <br />
        <br />
        Di Pegunungan Kendeng inilah beliau beristirahat bersama para
        pengikutnya. Setelah dirasa tempat peristirahatannya aman maka beliau
        memutuskan untuk membuat tempat peristirahatan rumah yang dibuat dari
        kayu jati gelondongan / bulat yang disebut kayu dolog.
        <br />
        <br />
        Disebutkan pula bahwa diantara pengikut Nyai Gadung Melati bersama
        suaminya Eyang Aryo Dipati ada yang bernama Mbah Jahet dan Mbah Sutol.
        Dari hari kehari jumlah pengikut Nyai Gadung Melati dan suaminya Eyang
        Aryo Dipati terus bertambah. Setelah berhasil membuka hutan di kawasan
        Pegunungan Kendeng ini, datanglah rombongan berikutnya yang juga
        merupakan pengikut Pangeran Diponegoro yang berjumlah dari 10 orang yang
        diketuai oleh Mbah Djontono yang datang dari Mataram dan kesemuanya
        bertempat tinggal di hutan tersebut. Sedikit demi sedikit hutan dibabat
        dijadikan perumahan dan ladang pertanian sekitar tahun 1881.
        <br />
        <br />
        Mengingat dihutan tersebut banyak dihuni oleh harimau, sehingga gubuk /
        perumahan tersebut dibuat bentuk panggung untuk menghindari serangan
        binatang buas. Setelah rumah - rumah dari panggung tersebut semakin
        banyak maka wilayah itu diberi nama Panggung Dolok yang artinya rumah
        yang berbentuk panggung yang terbuat dari kayu Dolok (atau bisa disebut
        kayu bulat)
        <br />
        <br />
        Beberapa tahun kemudian Nyai Gadung Melati bersama suaminya Eyang Aryo
        Dipati dikabarkan telah meninggal. Oleh orang-orang sekitar,
        pesanggrahan atau persinggahan mereka dijadikan sebagai sadranan dengan
        sebutan Danyang Gadung Melati. Sampai saat ini punden tersebut oleh
        banyak orang masih dikeramatkan, karena setiap orang yang mempunyai
        hajat biasanya meminta do'a restu kepada Danyang Gadung Melati dengan
        harapan hajatnya berjalan dengan lancar dan selamat. Selain itu setiap
        tahun juga digunakan oleh banyak orang berkumpul bersama-sama ditempat
        itu guna memohon kepada Tuhan Yang Maha Kuasa bila mana terjadi
        kesulitan - kesulitan misalnya pada saat sulitnya turun hujan diwaktu
        permulaan musim penghujan.
        <br />
        <br />
        Tahun terus berjalan dan penghuni tempat tersebut makin banyak namun
        belum membentuk suatu wilayah (Desa) maka untuk itu pada tahun 1891
        dibentuk suatu desa dengan nama Panggung Dolok, dan untuk pertama
        kalinya dipimpin oleh lurah yang bernama Djontono (Lurah yang pertama)
        mulai tahun 1891 - 1901. Karena dari tahun ketahun desa tersebut semakin
        ramai maka nama Desa Panggung Dolok oleh Ki Lurah Djontono diubah
        menjadi Desa Panggungrejo, yang artinya Panggung = daerah tinggi dan
        Rejo = ramai, dengan harapan nantinya Desa Panggungrejo walaupun
        terletak di dataran tinggi (Pegunungan) tetapi tetap ramai.
        <br />
        <br />
        Demikian Sejarah singkat berdirinya ( terjadinya ) Desa Panggungrejo.
      </p>

      <a
        href="/#sejarah"
        className={buttonVariants({ variant: "default", size: "lg" })}
      >
        Kembali ke Beranda
      </a>
    </main>
  );
}
