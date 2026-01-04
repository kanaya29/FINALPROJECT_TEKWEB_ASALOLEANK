import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home"; 
import EventDetail from "./pages/EventDetail";
import DetailAdmin from "./pages/DetailAdmin";
import poster from "./assets/poster.jpg";

function App() {
  const [events, setEvents] = useState([
    {
      id: "1",
      name: "Jazz Gunung 2025",
      category: "Music",
      date: "08-12-2025",
      price: 750000,
      location: "Bromo Amphitheater",
      description: "Konser jazz etnik di pegunungan",
      image: poster,
    },
    {
      id: "2",
      name: "Tech Conference 2025",
      category: "Tech",
      date: "05-02-2025",
      price: 300000,
      location: "Bandung Convention Center",
      description: "Konferensi teknologi terbesar",
      image: poster,
    },
    {
      id: "3",
      name: "Food Festival Jakarta",
      category: "Food",
      date: "20-03-2025",
      price: 50000,
      location: "JIExpo Kemayoran",
      description: "Nikmati kuliner nusantara sepuasnya.",
      image: poster,
    },
  ]);

  return (
    <Routes>
      <Route path="/" element={<Home events={events} />} />
      <Route path="/detail-produk/:id" element={<EventDetail events={events} />} />
      
      <Route index element={<AdminDashboard events={events} setEvents={setEvents} />} />
        
      <Route path="detail/:id" element={<DetailAdmin events={events} />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;