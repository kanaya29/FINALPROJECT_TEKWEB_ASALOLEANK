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
      name: "Jazz Gunung 2025",
      category: "Music",
      date: "08-12-2025",
      price: 750000,
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
}

export default App
