import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import CartSidebar from "@/components/public/CartSidebar";

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
      location: "Nawang Jagad",
      description: "Konser jazz etnik di ketinggian 2000mdpl",
      detail: "Konser dengan suasana alam pegunungan",
      image: poster,
      totalTicket: 1000,
      soldTicket: 999,
    },
    {
      id: "2",
      name: "Perunggu Festival 2025",
      category: "Music",
      date: "20-12-2025",
      price: 350000,
      location: "UAD Yogyakarta",
      description: "Festival musik modern",
      detail: "Menampilkan musisi nasional",
      image: poster,
      totalTicket: 1000,
      soldTicket: 740,
    },
    {
      id: "3",
      name: "HUT Kridosono 2025",
      category: "Dangdut",
      date: "20-12-2025",
      price: 350000,
      location: "Lapangan Kridosono",
      description: "Pesta rakyat tahunan",
      detail: "Hiburan dangdut meriah",
      image: poster,
      totalTicket: 1000,
      soldTicket: 740,
    },
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (event) => {
    const exist = cartItems.find((item) => item.id === event.id);
    if (!exist) {
      setCartItems([...cartItems, event]);
    }
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <CartSidebar
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

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
      </main>

      <Footer />
    </div>
  );
}

export default App;
