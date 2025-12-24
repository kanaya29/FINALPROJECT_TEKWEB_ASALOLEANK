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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-6xl space-y-6">
        <AdminHeader />

        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
          <div className="bg-indigo-500 p-4 text-white font-bold text-lg">
            Admin Dashboard
          </div>

          <div className="p-6 space-y-8">
            <FormData onAdd={addEvent} onEdit={updateEvent} editingEvent={editingEvent} />
            <DataTable data={events} onDelete={deleteEvent} onEdit={editEvent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
