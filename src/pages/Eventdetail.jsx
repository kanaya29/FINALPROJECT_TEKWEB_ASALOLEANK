import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import calendar from "@/assets/icon_calendar.svg";
import { ShoppingCart } from "lucide-react";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";

// 1. Import Firebase untuk update stok
import { db } from "../firebase"; 
import { doc, updateDoc, increment } from "firebase/firestore";

export default function Eventdetail({ events }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mencari data event berdasarkan ID
  const event = events.find((e) => e.id.toString() === id.toString());

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <p className="text-lg font-semibold mb-4 text-slate-700">Event tidak ditemukan</p>
        <Button onClick={() => navigate("/")}>Kembali ke Beranda</Button>
      </div>
    );
  }

  // 2. Logika Sisa Tiket & Status Sold Out
  const remaining = (event.totalTicket || 0) - (event.soldTicket || 0);
  const isSoldOut = remaining <= 0;

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID").format(number);

  // 3. Fungsi Checkout & Kurangi Stok Otomatis
  const handleCheckout = async () => {
    if (isSoldOut) return;

    try {
      // A. Update angka terjual di Firestore (+1)
      const eventRef = doc(db, "tickets", event.id);
      await updateDoc(eventRef, {
        soldTicket: increment(1) 
      });

      // B. Arahkan ke WhatsApp Admin
      const adminNumber = "628123456789"; // Ganti dengan nomor WhatsApp Anda
      const pesan = `Halo Admin, saya ingin memesan tiket untuk event:\n\n🎟️ *${event.name}*\n📍 Lokasi: ${event.location}\n💰 Harga: Rp ${formatRupiah(event.price)}`;
      const waLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(pesan)}`;
      
      window.open(waLink, "_blank");

    } catch (error) {
      console.error("Gagal memperbarui stok:", error);
      alert("Terjadi kesalahan saat memproses pesanan.");
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-100 min-h-screen flex justify-center">
      <Card className="max-w-6xl w-full rounded-[2.5rem] shadow-2xl border-none bg-white">
        <CardContent className="p-8 md:p-12">

          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mb-6 group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> 
            <span className="uppercase tracking-widest text-sm">Kembali</span>
          </button>

          {/* MAIN CONTENT */}
          <div className="grid lg:grid-cols-[420px_1fr] gap-12 items-start">

            {/* POSTER */}
            <div className="flex justify-center relative">
              <img
                src={event.image}
                alt={event.name}
                className={`w-full max-w-[380px] aspect-[3/4] object-cover rounded-3xl shadow-2xl border ${isSoldOut ? "grayscale opacity-70" : ""}`}
              />
              {/* Overlay Habis Terjual */}
              {isSoldOut && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-red-600 text-white px-8 py-3 rounded-xl font-black rotate-[-15deg] shadow-2xl border-4 border-white text-2xl uppercase tracking-widest">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="flex flex-col h-full">

              <div className="mb-6">
                <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-3">
                  {event.name}
                </h1>

                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <img src={calendar} alt="calendar" className="w-5 h-5 opacity-70" />
                  <span>
                    {event.date ? format(new Date(event.date), "dd MMMM yyyy", { locale: localeID }) : "Segera Hadir"}
                  </span>
                </div>
              </div>

              {/* LOKASI */}
              <div className="bg-slate-50 p-5 rounded-2xl border mb-6">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Lokasi Utama</p>
                <p className="font-bold text-slate-700 text-lg">📍 {event.location}</p>
              </div>

              {/* STOK INFO */}
              <div className="mb-6 flex items-center justify-between px-2">
                <p className="text-[10px] uppercase font-bold text-slate-400">Ketersediaan Tiket</p>
                <p className={`text-sm font-black ${isSoldOut ? "text-red-600" : "text-green-600"}`}>
                  {isSoldOut ? "TIKET HABIS" : `${remaining} Tiket Tersisa`}
                </p>
              </div>

              {/* DESKRIPSI */}
              <div className="mb-8">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Deskripsi</p>
                <p className="text-slate-600 leading-relaxed">{event.description}</p>
              </div>

              {/* PRICE & CTA */}
              <div className="mt-auto pt-6 border-t">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Harga Tiket</p>
                <p className="text-4xl font-extrabold text-blue-600 mb-6">Rp {formatRupiah(event.price)}</p>

                {/* Tombol dengan proteksi Stok */}
                <Button
                  onClick={handleCheckout}
                  disabled={isSoldOut}
                  className={`
                    w-full h-16 text-xl font-black rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all
                    ${isSoldOut ? "bg-slate-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.97] shadow-blue-200"}
                  `}
                >
                  <ShoppingCart size={24} />
                  {isSoldOut ? "Habis Terjual" : "Beli Sekarang (WhatsApp)"}
                </Button>

                <p className="text-center mt-4 text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                  Official Ticket • Secure Transaction
                </p>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}