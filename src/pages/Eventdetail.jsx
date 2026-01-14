import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import calendar from "@/assets/icon_calendar.svg";
import { ShoppingCart, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Eventdetail({ events = [], addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  const event = events.find(
    (e) => e.id?.toString() === id?.toString()
  );

  // Format tanggal → DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "Segera Hadir";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // Event tidak ditemukan
  if (!isLoading && !event) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white p-6">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">
          Event Tidak Ditemukan
        </h2>
        <p className="text-slate-500 mb-6">
          Gagal mengambil data dari server.
        </p>
        <Button onClick={() => navigate("/")}>
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  // Skeleton loading
  if (isLoading) {
    return (
      <div className="pt-32 pb-20 px-6 bg-slate-100 min-h-screen flex justify-center">
        <div className="max-w-6xl w-full h-[500px] bg-slate-200 animate-pulse rounded-[2.5rem]" />
      </div>
    );
  }

  const remaining =
    (event.totalTicket || 0) - (event.soldTicket || 0);
  const isSoldOut = remaining <= 0;

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID").format(number || 0);

  // HANYA ADD TO CART
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (isSoldOut) return;

    if (addToCart) {
      addToCart(event);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-100 min-h-screen flex justify-center">
      <Card className="max-w-6xl w-full rounded-[2.5rem] shadow-2xl border-none bg-white">
        <CardContent className="p-8 md:p-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mb-6 transition-colors"
          >
            ← <span className="uppercase tracking-widest text-sm">Kembali</span>
          </button>

          <div className="grid lg:grid-cols-[420px_1fr] gap-12 items-start">
            {/* Poster */}
            <div className="flex justify-center relative">
              <img
                src={event.image}
                alt={event.name}
                className={`w-full max-w-[380px] aspect-[3/4] object-cover rounded-3xl shadow-2xl border ${
                  isSoldOut ? "grayscale opacity-60" : ""
                }`}
              />

              {isSoldOut && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-red-600 text-white px-6 py-2 rounded-lg font-black text-2xl rotate-[-15deg] shadow-2xl border-4 border-white">
                    SOLD OUT
                  </span>
                </div>
              )}
            </div>

            {/* Detail */}
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-3">
                  {event.name}
                </h1>

                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <img
                    src={calendar}
                    alt="calendar"
                    className="w-5 h-5 opacity-70"
                  />
                  <span>{formatDate(event.date)}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border mb-6 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Lokasi Utama
                  </p>
                  <p className="font-bold text-slate-700 text-lg">
                    📍 {event.location}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Sisa Tiket
                  </p>
                  <p
                    className={`font-black ${
                      isSoldOut
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {isSoldOut
                      ? "HABIS"
                      : `${remaining} Tiket`}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">
                  Deskripsi
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {event.detail || event.description}
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
                  disabled={!isAuthenticated || isSoldOut}
                  className={`
                    w-full h-16 text-xl font-black rounded-2xl flex items-center justify-center gap-3 transition-all
                    ${
                      !isAuthenticated || isSoldOut
                        ? "bg-slate-300 cursor-not-allowed text-slate-500"
                        : "bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 active:scale-[0.97]"
                    }
                  `}
                >
                  <ShoppingCart size={24} />
                  {!isAuthenticated
                    ? "Login untuk Membeli"
                    : isSoldOut
                    ? "Tiket Habis Terjual"
                    : "Masukkan Keranjang"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
