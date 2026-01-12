import ProductCard from "@/components/public/ProductCard";
import foto_homapge from "../assets/gambar_homepage.png";
import batikBg from "../assets/batik_bg.png";

export default function Home({ events = [] }) {
  return (
    <div
      className="w-full flex flex-col"
      style={{
        backgroundImage: `url(${batikBg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "320px",
      }}
    >
      <section className="relative bg-blue-600/10 py-20 px-6 pt-32 mb-10 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 md:flex-row-reverse">

          {/* Ilustrasi Hero */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 blur-[80px] opacity-20 rounded-full"></div>
              <img
                src={foto_homapge}
                alt="foto_homepage"
                className="relative w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl animate-float"
              />
            </div>
          </div>

          {/* Teks Hero - SEARCH BAR SUDAH DIHAPUS */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black text-blue-900 mb-4 leading-[1.1] tracking-tight">
              CARI, TEMUKAN, <br />
              <span className="text-blue-600">& KLIK TIKETMU.</span>
            </h1>
            <p className="mb-8 text-lg text-slate-700 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Platform tiket event Jogja paling simpel. Temukan konser, festival,
              dan event seni, lalu booking langsung via WhatsApp admin.
            </p>
          </div>

        </div>
      </section>

      {/* JUDUL */}
      <div className="mt-16 mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Event Terbaru
          </h2>
          <p className="text-slate-600 mt-2 font-medium">
            Jelajahi konser dan festival musik seru di Yogyakarta
          </p>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      {/* CARD EVENT */}
      <div className="py-2 px-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {events.length === 0 ? (
          <p className="col-span-3 text-center text-slate-600 font-medium py-10">
            Belum ada event tersedia saat ini.
          </p>
        ) : (
          events.map((item) => (
            <ProductCard key={item.id} event={item} />
          ))
        )}
      </div>

      {/* INFORMASI */}
      <section className="py-24 bg-white/85 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Informasi Penting
            </h2>
            <p className="text-slate-600 mt-2 font-medium">
              Segala hal yang perlu kamu ketahui tentang Monggo Ticket
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
            {[
              {
                q: "Bagaimana cara mendapatkan tiketnya?",
                a: "Cukup pilih event favoritmu, klik tombol beli, dan kamu akan terhubung langsung dengan admin WhatsApp kami untuk proses pembayaran kilat."
              },
              {
                q: "Apakah tiket yang dijual resmi?",
                a: "100% Resmi. Kami bekerja sama langsung dengan promotor dan penyelenggara event."
              },
            ].map((item, index) => (
              <details
                key={index}
                className="group border border-slate-200 rounded-2xl p-4 hover:bg-blue-50 transition"
              >
                <summary className="flex justify-between cursor-pointer font-bold text-slate-800">
                  {item.q}
                  <span className="group-open:-rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-slate-600 border-t pt-4">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* TAGS AREA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Lagi Ramai di Jogja 🎶
            </h2>
            <p className="text-slate-600 mt-2 font-medium">
              Beberapa lokasi dan jenis konser yang sering dipilih penonton
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {[
              "📍 Kota Jogja",
              "📍 Sleman",
              "📍 Bantul",
              "🎸 Indie",
              "🎷 Jazz",
              "🎤 Festival",
            ].map((item, index) => (
              <div
                key={index}
                className="px-5 py-3 bg-white/80 backdrop-blur rounded-full
                     shadow-sm hover:shadow-md transition cursor-pointer
                     font-semibold text-slate-800 border border-slate-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}