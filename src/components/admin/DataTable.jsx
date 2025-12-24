import React from 'react';

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
};

const DataTable = ({ data, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">Daftar Event</h2>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="p-3 border-b">Nama Event</th>
            <th className="p-3 border-b">Kategori</th>
            <th className="p-3 border-b text-center">Tanggal</th>
            <th className="p-3 border-b text-center">Harga</th>
            <th className="p-3 border-b text-center">Lokasi</th>
            <th className="p-3 border-b">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50 transition">
              <td className="p-3 border-b font-medium">{event.name}</td>
              <td className="p-3 border-b">{event.category}</td>
              <td className="p-3 border-b text-center text-gray-600">{event.date}</td>
              <td className="p-3 border-b text-center text-gray-600">{formatRupiah(event.price)}</td>
              <td className="p-3 border-b text-center text-gray-600">{event.location}</td>
              <td className="p-3 border-b space-x-2">
                <button
                  onClick={() => onEdit(event)}
                  className="bg-[#4ade80] text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(event.id)}
                  className="bg-[#f87171] text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
