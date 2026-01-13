import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button"; 
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";

const DetailAdmin = ({ events }) => {
  const { id } = useParams(); 
  const event = events.find((e) => e.id.toString() === id);

  if (!event) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4 font-bold text-red-500">Event tidak ditemukan!</p>
        <Link to="/admin">
           <Button variant="outline">Kembali ke Dashboard</Button>
        </Link>
      </div>
    );
  }

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);

  return (
    <div className="max-w-4xl mx-auto p-10">
      <Link to="/admin">
        <Button variant="outline" className="mb-6 group">
          <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> 
          Kembali ke Dashboard
        </Button>
      </Link>
      
      <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
        <div className="flex justify-between items-start border-b pb-8">
          <div>
            {/* Bagian Badge Category sudah dihapus di sini */}
            <h1 className="text-4xl font-black text-slate-900 leading-tight">
              {event.name}
            </h1>
          </div>
          <p className="text-3xl font-black text-green-600">
            {formatRupiah(event.price)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 mt-10">
          <div>
            <p className="font-bold text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-2">
              TANGGAL
            </p>
            <p className="text-xl text-slate-700 font-semibold">
              {event.date ? format(new Date(event.date), "dd MMMM yyyy", { locale: localeID }) : "Belum diatur"}
            </p>
          </div>
          <div>
            <p className="font-bold text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-2">
              LOKASI
            </p>
            <p className="text-xl text-slate-700 font-semibold">
              📍 {event.location}
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-50">
          <p className="font-bold text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-4">
            DESKRIPSI
          </p>
          <p className="text-lg text-slate-600 leading-relaxed italic">
            "{event.description}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailAdmin;