 feature-user
import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import Navbar from "@/components/public/Navbar"
import Footer from "@/components/public/Footer"

import Home from "./pages/Home"
import Event from "./pages/Event"
import Eventdetail from "./pages/Eventdetail"
import Contact from "./pages/Contact"

import poster from "./assets/poster.jpg"

function App() {
  const [events] = useState([
    {
      id: 1,

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
main
      name: "Jazz Gunung 2025",
      category: "Music",
      date: "08-12-2025",
      price: 750000,
 feature-user
      location: "nawang jagad",
      description: "Konser jazz etnik di ketinggian 2000mdpl",
      detail: "konser ini diselenggaran dengan asik dna memberi kesan takterlupakan",
      image: poster,
      totalTicket: 1000,
      soldTicket: 999
    },
    {
      id: 2,
      name: "Perunggu festival 2025",
      category: "Music",
      date: "20-12-2025",
      price: 350000,
      location: "UAD YOGYAKARTA",
      description:  "Konser jazz etnik di ketinggian 2000mdpl",
      detail: "konser ini diselenggaran dengan asik dna memberi kesan takterlupakan",
      image: poster,
      totalTicket: 1000,
      soldTicket: 740
    },
    {
      id: 3,
      name: "HUT Kridosono 2025",
      category: "Technology",
      date: "20-12-2025",
      price: 350000,
      location: "lapangan kridosono",
      description:  "Konser jazz etnik di ketinggian 2000mdpl",
      detail: "konser ini diselenggaran dengan asik dna memberi kesan takterlupakan",
      image: poster,
      totalTicket: 1000,
      soldTicket: 740
    }
  ])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home events={events} />} />
          <Route path="/event" element={<Event events={events} />} />
          <Route path="/event/:id" element={<Eventdetail events={events} />} />
          <Route path="/contact" element={<Contact  />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )

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
 main
}

export default App
