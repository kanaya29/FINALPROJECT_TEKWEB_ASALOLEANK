import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

import Home from "./pages/Home";
import Event from "./pages/Event";
import Eventdetail from "./pages/Eventdetail";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import DetailAdmin from "./pages/DetailAdmin";
import CartSidebar from "./components/public/CartSidebar"; 

import poster from "./assets/poster.jpg";

function App() {
  // State untuk data Event utama
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
      category: "Technology",
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

  // --- LOGIKA KERANJANG ---
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fungsi untuk menambah tiket ke keranjang
  const addToCart = (event) => {
    const isExist = cartItems.find((item) => item.id === event.id);
    if (!isExist) {
      setCartItems([...cartItems, event]);
    }
    setIsCartOpen(true); // Buka sidebar otomatis setelah klik beli
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CartSidebar 
        isOpen={isCartOpen} 
        setIsOpen={setIsCartOpen} 
        cartItems={cartItems} 
        setCartItems={setCartItems} 
      />

      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home events={events} />} />
                  <Route 
                    path="/event" 
                    element={
                      <Event 
                        events={events} 
                        addToCart={addToCart} 
                        setIsCartOpen={setIsCartOpen} 
                        cartItemsCount={cartItems.length} 
                      />
                    } 
                  />
                  <Route 
                    path="/event/:id" 
                    element={<Eventdetail events={events} addToCart={addToCart} />} 
                  />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        <Route
          path="/admin"
          element={<AdminDashboard events={events} setEvents={setEvents} />}
        />
        <Route
          path="/admin/detail/:id"
          element={<DetailAdmin events={events} />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;