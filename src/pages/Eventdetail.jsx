import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import calendar from "@/assets/icon_calendar.svg";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Eventdetail({ events, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const event = events.find((e) => e.id.toString() === id.toString());

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <p className="text-lg font-semibold mb-4 text-slate-700">
          Event tidak ditemukan
        </p>
        <Button onClick={() => navigate("/")}>Kembali ke Beranda</Button>
      </div>
    );
  }

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID").format(number);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login"); 
    }
    addToCart(event);
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-100 min-h-screen flex justify-center">
      <Card className="max-w-6xl w-full rounded-[2.5rem] shadow-2xl border-none bg-white">
        <CardContent className="p-8 md:p-12">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mb-6"
          >
            ← <span className="uppercase tracking-widest text-sm">Kembali</span>
          </button>

          <div className="grid lg:grid-cols-[420px_1fr] gap-12 items-start">

            <div className="flex justify-center">
              <img
                src={event.image}
                alt={event.name}
                className="w-full max-w-[380px] aspect-[3/4] object-cover rounded-3xl shadow-2xl border"
              />
            </div>

            <div className="flex flex-col h-full">

              <div className="mb-6">
                <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-3">
                  {event.name}
                </h1>

                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <img src={calendar} alt="calendar" className="w-5 h-5 opacity-70" />
                  <span>{event.date}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border mb-6">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Lokasi Utama
                </p>
                <p className="font-bold text-slate-700 text-lg">
                  📍 {event.location}
                </p>
              </div>

              <div className="mb-8">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">
                  Deskripsi
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {event.detail}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Harga Tiket
                </p>
                <p className="text-4xl font-extrabold text-blue-600 mb-6">
                  Rp {formatRupiah(event.price)}
                </p>

                <Button
                  onClick={handleAddToCart}
                  className={`
                    w-full h-16 text-xl font-black rounded-2xl
                    flex items-center justify-center gap-3 transition-all
                    ${
                      isAuthenticated
                        ? "bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 active:scale-[0.97]"
                        : "bg-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  <ShoppingCart size={24} />
                  {isAuthenticated
                    ? "Masukkan Keranjang"
                    : "Login untuk membeli tiket"}
                </Button>

                {!isAuthenticated && (
                  <p className="text-center mt-3 text-sm text-red-500 font-semibold">
                    Kamu harus login atau daftar terlebih dahulu
                  </p>
                )}

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
