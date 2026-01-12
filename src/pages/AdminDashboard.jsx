import { useState, useEffect } from "react";
import { LayoutDashboard, PlusCircle, ListTodo, CheckCircle2 } from "lucide-react";
import AdminHeader from "../components/admin/AdminHeader";
import FormData from "../components/admin/FormData";
import DataTable from "../components/admin/DataTable";
import poster from "../assets/poster.jpg"; 

const AdminDashboard = ({ events, setEvents }) => {
  const [editingEvent, setEditingEvent] = useState(null);
  
  const [toast, setToast] = useState({ show: false, message: "" });

  const showNotification = (msg) => {
    setToast({ show: true, message: msg });
    
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const addEvent = (event) => {
    setEvents([...events, { ...event, id: Date.now().toString() }]);
    showNotification("Event baru berhasil ditambahkan!");
  };

  const updateEvent = (event) => {
    setEvents(events.map((e) => (e.id === event.id ? event : e)));
    setEditingEvent(null);
    showNotification("Event berhasil diperbarui!");
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    showNotification("Event telah berhasil dihapus!");
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] relative"> 
      {toast.show && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] animate-bounce-in">
          <div className="bg-white border-l-4 border-green-500 shadow-2xl rounded-xl px-6 py-4 flex items-center gap-4 min-w-[300px]">
            <CheckCircle2 className="text-green-500 w-6 h-6" />
            <div>
              <p className="font-bold text-slate-800">Berhasil!</p>
              <p className="text-sm text-slate-500">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      <AdminHeader />

      <div className="max-w-7xl mx-auto py-10 space-y-10">
        
        <div className="bg-gradient-to-r bg-blue-500 rounded-3xl p-8 text-white shadow-xl flex justify-between items-center overflow-hidden relative">
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8" />
              Halo, Admin!
            </h1>
            <p className="mt-2 text-blue-50 font-medium">
              Kelola tiket event kamu dengan lebih mudah dan bergaya.
            </p>
          </div>
          <img 
            src={poster} 
            alt="decoration" 
            className="w-48 h-48 object-cover rounded-2xl rotate-12 absolute -right-8 -bottom-8 opacity-30 blur-[1px]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <section className="lg:col-span-5 bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-blue-50/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <PlusCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingEvent ? "Edit Event" : "Buat Event Baru"}
                </h2>
                <p className="text-sm text-slate-400">Isi data detail event di bawah</p>
              </div>
            </div>
            
            <FormData
              onAdd={addEvent}
              onEdit={updateEvent}
              editingEvent={editingEvent}
            />
          </section>

          <section className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-blue-50/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-green-100 rounded-2xl">
                <ListTodo className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Daftar Event</h2>
                <p className="text-sm text-slate-400">Total {events.length} event terdaftar</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 overflow-hidden">
              <DataTable
                data={events}
                onEdit={setEditingEvent}
                onDelete={deleteEvent}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;