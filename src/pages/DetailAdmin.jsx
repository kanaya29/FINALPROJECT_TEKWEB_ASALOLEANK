import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button"; 
const DetailAdmin = ({ events }) => {
  const { id } = useParams(); 
  const event = events.find((e) => e.id.toString() === id);

  if (!event) {
    return (
      <div className="p-10 text-center">
        <p>Event tidak ditemukan!</p>
        <Link to="/admin" className="text-blue-500 underline">Kembali</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <Link to="/admin">
        <Button variant="outline" className="mb-6">← Kembali ke Dashboard</Button>
      </Link>
      
      <div className="bg-white border rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
              {event.category}
            </span>
            <h1 className="text-4xl font-extrabold mt-3">{event.name}</h1>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(event.price)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-400">TANGGAL</p>
            <p className="text-lg">{event.date}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-400">LOKASI</p>
            <p className="text-lg">{event.location}</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="font-semibold text-gray-400">DESKRIPSI</p>
          <p className="mt-2 text-gray-700 leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailAdmin;