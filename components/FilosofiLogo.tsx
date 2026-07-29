import Image from "next/image";

const filosofiElements = [
  { id: 1, src: "/segilima.png", title: "Segilima", description: "Melambangkan perisai pelindung yang berlandaskan lima sila dalam Pancasila sebagai dasar negara." },
  { id: 2, src: "/bintang.png", title: "Bintang Emas", description: "Melambangkan Ketuhanan Yang Maha Esa dan nilai-nilai religius masyarakat desa." },
  { id: 3, src: "/padikapasrantai.png", title: "Padi, Kapas, & Rantai", description: "Simbol kemakmuran pangan dan sandang, serta persatuan masyarakat yang kokoh." },
  { id: 4, src: "/gunungan.png", title: "Gunungan", description: "Representasi luhur kebudayaan, keindahan alam pegunungan, dan kelestarian hidup." },
  { id: 5, src: "/rumah4kaki.png", title: "Rumah Panggung", description: "Merepresentasikan bangunan panggung dari kayu jati gelondongan bulat. Empat tiang utama melambangkan filosofi sadulur papat kalimo pancer" },
  { id: 6, src: "/macan.png", title: "Macan Kembar", description: "Melambangkan keberanian, ketangguhan, dan perlindungan diri dari segala marabahaya." },
  { id: 7, src: "/bendera.png", title: "Bendera Merah Putih", description: "Menyimbolkan semangat nasionalisme, perjuangan, dan cinta tanah air tanpa henti." },
  { id: 8, src: "/pita.png", title: "Pita Bertuliskan Nama", description: "Ikatan persaudaraan yang erat serta kebanggaan sejati sebagai warga Desa Panggungrejo." },
];

export function FilosofiLogo() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full mt-8">
      {/* Large Logo - Left */}
      <div className="w-full lg:w-1/3 bg-gray-50 rounded-2xl md:rounded-[2.5rem] p-8 md:p-12 flex items-center justify-center border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-transparent opacity-50 z-0"></div>
        <Image 
          src="/logo_desapanggungrejo.png" 
          alt="Logo Utama Desa Panggungrejo" 
          width={400} 
          height={400} 
          className="relative z-10 w-full max-w-[280px] lg:max-w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out" 
        />
      </div>

      {/* 8 Elements - Right */}
      <div className="w-full lg:w-2/3 flex flex-col relative">
        {/* Tooltip Hint for Desktop (Floating Chip) */}
        <div className="hidden md:flex justify-start mb-4">
          <div className="flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-full shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300 relative">
            <div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.05)] -z-10 animate-pulse"></div>
            <svg className="w-4 h-4 text-brand-normal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span className="text-xs font-medium tracking-wide">Arahkan kursor ke kotak elemen untuk melihat filosofi</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {filosofiElements.map((item) => (
            <div 
              key={item.id} 
              className="group relative flex md:block overflow-hidden bg-white md:bg-gray-50 rounded-2xl md:aspect-square p-5 md:p-0 gap-5 items-center border border-gray-100 shadow-sm md:shadow-none hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="md:absolute md:inset-0 md:flex md:items-center md:justify-center shrink-0">
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  width={120} 
                  height={120} 
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-16 lg:h-16 xl:w-24 xl:h-24 object-contain transition-all duration-500 md:group-hover:scale-110 md:group-hover:blur-[3px] drop-shadow-sm" 
                />
              </div>
              
              {/* Text Overlay / Mobile Text */}
              <div className="md:absolute md:inset-0 md:bg-black/80 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:flex md:flex-col md:items-center md:justify-center md:p-4 text-left md:text-center z-10 md:backdrop-blur-[2px]">
                <div className="flex flex-col md:items-center">
                  <h3 className="font-bold text-gray-900 md:text-white mb-1.5 text-base md:text-sm lg:text-sm xl:text-base md:-translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 ease-out md:drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 md:text-gray-200 text-xs sm:text-sm md:text-[11px] lg:text-[11px] xl:text-xs md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 ease-out leading-relaxed md:leading-tight xl:leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
