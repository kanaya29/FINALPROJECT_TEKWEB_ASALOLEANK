import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";

import Home from "./pages/Home";
import Event from "./pages/Event";
import Eventdetail from "./pages/Eventdetail";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import DetailAdmin from "./pages/DetailAdmin";
import NotFound from "./pages/NotFound";

import poster from "./assets/poster.jpg";

function App() {
  const [events, setEvents] = useState([
    {
      id: "1",
      name: "Jazz Gunung 2025",
      category: "Music",
      date: "08-12-2025",
      price: 750000,
      location: "nawang jagad",
      description: "Konser jazz etnik di ketinggian 2000mdpl",
      detail: "konser ini diselenggarakan dengan asik dan memberi kesan tak terlupakan",
      image: poster,
      totalTicket: 1000,
      soldTicket: 999
    },
    {
      id: "2",
      name: "Perunggu festival 2025",
      category: "Music",
      date: "20-12-2025",
      price: 350000,
      location: "UAD YOGYAKARTA",
      description: "Konser jazz etnik di ketinggian 2000mdpl",
      detail: "konser ini diselenggarakan dengan asik dan memberi kesan tak terlupakan",
      image: poster,
      totalTicket: 1000,
      soldTicket: 740
    },
    {
      id: "3",
      name: "HUT Kridosono 2025",
      category: "dangdut",
      date: "20-12-2025",
      price: 350000,
      location: "lapangan kridosono",
      description: "Konser jazz etnik di ketinggian 2000mdpl",
      detail: "konser ini diselenggarakan dengan asik dan memberi kesan tak terlupakan",
      image: poster,
      totalTicket: 1000,
      soldTicket: 740
    },
    {
      id: "4",
      name: "Timefun Fest 2025",
      category: "pop",
      date: "20-12-2025",
      price: 350000,
      location: "lapangan kridosono",
      description: "Konser jazz etnik di ketinggian 2000mdpl",
      detail: "konser ini diselenggarakan dengan asik dan memberi kesan tak terlupakan",
      image: poster,
      totalTicket: 1000,
      soldTicket: 740
    }
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>

        <Route element={<UserLayout />}>
          <Route path="/" element={<Home events={events} />} />
          <Route path="/event" element={<Event events={events} />} />
          <Route path="/event/:id" element={<Eventdetail events={events} />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route
          path="/admin"
          element={<AdminDashboard events={events} setEvents={setEvents} />}
        />
        <Route
          path="/admin/detail/:id"
          element={<DetailAdmin events={events} />}
        />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default App;
