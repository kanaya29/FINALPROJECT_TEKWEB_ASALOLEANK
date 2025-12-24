import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const FormData = ({ onAdd, onEdit, editingEvent }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    date: '',
    price: '',
    location: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (editingEvent) {
      setForm(editingEvent);
    } else {
      setForm({
        name: '',
        category: '',
        date: '',
        price: '',
        location: '',
        description: '',
        image: ''
      });
    }
  }, [editingEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      onEdit(form);
    } else {
      onAdd(form);
    }
    setForm({
      name: '',
      category: '',
      date: '',
      price: '',
      location: '',
      description: '',
      image: ''
    });
  };

  return (
    <div className="space-y-6 border p-6 rounded-lg bg-slate-50/50 shadow-sm">
      <h3 className="font-bold text-xl text-slate-800">
        {editingEvent ? "Edit Event" : "Tambah Event"}
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Nama Event</label>
          <input
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Nama Event"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Kategori</label>
          <input
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Kategori (misal: Music, Tech)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Harga</label>
          <input
            type="number"
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Contoh: 150000"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Tanggal Event</label>
          <input
            type="date"
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Lokasi</label>
          <input
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Lokasi Event"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-slate-600">Deskripsi</label>
          <textarea
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Deskripsi singkat event"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-slate-600">URL Gambar</label>
          <input
            type="url"
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="https://example.com/poster.jpg"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            required
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Button
            type="submit"
            className="bg-indigo-500 hover:bg-blue-700 px-10 py-4 text-base rounded-lg transition-all shadow-md">
            {editingEvent ? "Update Event" : "Tambah Event"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormData;
