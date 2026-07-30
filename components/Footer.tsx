import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

const InstagramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 7.1C2.1 8.4 2 10.5 2 12s.1 3.6.5 4.9a4 4 0 0 0 2.8 2.8c1.3.4 4 .5 6.7.5s5.4-.1 6.7-.5a4 4 0 0 0 2.8-2.8c.4-1.3.5-3.4.5-4.9s-.1-3.6-.5-4.9a4 4 0 0 0-2.8-2.8C17.4 4 14.7 4 12 4s-5.4 0-6.7.4a4 4 0 0 0-2.8 2.8z"/>
    <polygon points="10 15 15 12 10 9 10 15"/>
  </svg>
);

export function Footer() {
  return (
    <footer id="kontak" className="bg-brand-normal text-white rounded-t-[2rem] md:rounded-t-[3rem] px-8 py-12 md:px-16 md:py-16 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Left Side */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl tracking-wider mb-2 font-berkshire">Desa Panggungrejo</h2>
            <p className="text-xl md:text-2xl text-white/80">Kab. Blitar</p>
          </div>
          
          {/* Made by DDM (Desktop only - hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3 mt-12 md:mt-24 text-sm text-white/80">
            <Image src="/logommd.png" alt="Logo MMD 57" width={32} height={32} className="object-contain" />
            <p>Made by DDM MMD 57 FILKOM UB 2026</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-10 md:text-right">
          {/* Kontak Section */}
          <div className="flex flex-col gap-4 items-start md:items-end">
            <h3 className="text-xl font-semibold">Kontak</h3>
            <div className="flex gap-4">
              <Link href="#" aria-label="Instagram" className="hover:text-white/80 transition-colors">
                <InstagramIcon className="w-6 h-6" />
              </Link>
              <Link href="#" aria-label="Facebook" className="hover:text-white/80 transition-colors">
                <FacebookIcon className="w-6 h-6" />
              </Link>
              <Link href="#" aria-label="Telepon" className="hover:text-white/80 transition-colors">
                <Phone className="w-6 h-6" />
              </Link>
              <Link href="#" aria-label="Youtube" className="hover:text-white/80 transition-colors">
                <YoutubeIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Navigasi Section */}
          <div className="flex flex-col gap-4 items-start md:items-end">
            <h3 className="text-xl font-semibold">Navigasi</h3>
            <nav className="flex flex-wrap gap-4 md:gap-4 lg:gap-6 font-regular md:justify-end">
              <Link href="/#hero" className="hover:text-white/80 transition-colors">Home</Link>
              <Link href="/#tentang" className="hover:text-white/80 transition-colors">Tentang</Link>
              <Link href="/#sejarah" className="hover:text-white/80 transition-colors">Sejarah</Link>
              <Link href="/#wisata" className="hover:text-white/80 transition-colors">Wisata</Link>
              <Link href="/#umkm" className="hover:text-white/80 transition-colors">UMKM</Link>
              <Link href="/#berita" className="hover:text-white/80 transition-colors">Berita</Link>
              <Link href="#kontak" className="hover:text-white/80 transition-colors">Kontak</Link>
            </nav>
            <Link href="/admin/berita" target="_blank" rel="noopener noreferrer" className="hidden lg:block text-xs font-normal opacity-50 hover:opacity-100 underline transition-opacity mt-4">
              Akses Admin
            </Link>
          </div>
        </div>

        {/* Made by DDM (Mobile only - visible at bottom) */}
        <div className="flex md:hidden flex-col items-center gap-3 mt-4 pt-8 border-t border-white/20 text-sm text-white/80">
          <div className="flex items-center gap-3">
            <Image src="/logommd.png" alt="Logo MMD 57" width={32} height={32} className="object-contain" />
            <p>Made by DDM MMD 57 FILKOM UB 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
