import React, { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import FormData from '../components/admin/FormData';
import DataTable from '../components/admin/DataTable';

const AdminDashboard = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      name: "Jazz Gunung 2025",
      category: "Music",
      date: "2025-08-12",
      price: 750000,
      location: "Bromo Amphitheater",
      description: "Konser jazz etnik di ketinggian 2000mdpl.",
      image: "https://url-poster-event.jpg"
    },
    {
      id: "2",
      name: "Tech Conference 2025",
      category: "Tech",
      date: "2025-02-05",
      price: 350000,
      location: "Bandung Convention Center",
      description: "Konferensi teknologi terbesar di Bandung.",
      image: "https://url-poster-event2.jpg"
    },
    {
      id: "3",
      name: "Food Festival Jakarta",
      category: "Food",
      date: "2025-03-20",
      price: 50000,
      location: "Jakarta International Expo",
      description: "Festival kuliner dengan berbagai stan makanan unik.",
      image: "https://url-poster-event3.jpg"
    }
  ]);

  const [editingEvent, setEditingEvent] = useState(null);

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
    console.log("Event Baru Ditambahkan!", newEvent);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    console.log(`Event dengan ID ${id} Berhasil Dihapus`);
  };

  const editEvent = (event) => setEditingEvent(event);

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));
    setEditingEvent(null);
    console.log(`Event dengan ID ${updatedEvent.id} Berhasil Diperbarui`);
  };

  return (
  <div className="min-h-screen bg-slate-50 w-full">

    <div className="p-4 md:px-10">
      <AdminHeader />
    </div>

    <div className="w-full px-4 md:px-10 pb-10">
      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 w-full">

        <div className="bg-[#5c7cfa] p-5 text-white font-bold text-xl shadow-inner">
          Admin Dashboard
        </div>

        <div className="p-6 md:p-10 space-y-12">
          <section>
            <FormData onAdd={addEvent} />
          </section>
          
          <hr className="border-gray-100" />
          
          <section className="overflow-x-auto">
            <DataTable data={events} onDelete={deleteEvent} />
          </section>
        </div>
      </div>
    </div>
  </div>
  );
}
export default AdminDashboard;
