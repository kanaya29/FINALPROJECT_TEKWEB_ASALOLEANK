import { useState } from "react"
import Navbar from "@/components/public/Navbar"
import Footer from "@/components/public/Footer"
import Home from "./pages/Home"
import poster from "./assets/poster.jpg";

function App() {
  const [event] = useState([
    {
      "id": 1,
      "name": "Jazz Gunung 2025",
      "category": "Music",
      "date": "08-12-2025",
      "price": 750000,
      "location": "Bromo Amphitheater",
      "description": "Konser jazz etnik di ketinggian 2000mdpl",
      "image": poster
    },
    {
      "id": 2,
      "name": "Tech Conference 2025",
      "category": "Technology",
      "date": "20-9-2025",
      "price": 350000,
      "location": "JCC Jakarta",
      "description": "Konser asik sambil chill minum boba",
      "image":poster
    },
     {
      "id": 3,
      "name": "Food Festival Jakarta",
      "category": "FOOD",
      "date": "20-3-2025",
      "price": 50000,
      "location": "Jakarta International Expo",
      "description" : "Festival kuliner dengan berbagai stan makanan unik",
      "image":poster
    },
  ])

  return (
    <div className="min-h-screen flex flex-col" >
      <Navbar />
      <main className="flex-grow ">
        <Home event={event} />
      </main>
      <Footer />
    </div>
  )
}

export default App
