import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Gunakan onSnapshot agar data di Katalog otomatis hilang jika dihapus di Admin
import { collection, onSnapshot } from "firebase/firestore"; 
import { db } from "./firebase";

import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import Home from "./pages/Home";
import Event from "./pages/Event";
import EventDetail from "./pages/EventDetail"; 
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import DetailAdmin from "./pages/DetailAdmin";
import CartSidebar from "./components/public/CartSidebar"; 
import TestConnection from "./TestConnection"; 

function App() {
  const [events, setEvents] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // LISTENER REAL-TIME
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tickets"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(data); // Update otomatis seluruh halaman (Home, Event, Admin)
    });

    return () => unsub(); // Mematikan pantauan saat aplikasi ditutup
  }, []);

  const addToCart = (event) => {
    const isExist = cartItems.find((item) => item.id === event.id);
    if (!isExist) {
      setCartItems([...cartItems, event]);
    }
    setIsCartOpen(true); 
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CartSidebar 
        isOpen={isCartOpen} 
        setIsOpen={setIsCartOpen} 
        cartItems={cartItems} 
        setCartItems={setCartItems} 
      />

      <div className="bg-yellow-50 py-2 border-b">
        <TestConnection />
      </div>

      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Semua halaman menerima data 'events' yang sama */}
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
                    element={<EventDetail events={events} addToCart={addToCart} />} 
                  />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        {/* Kirim events ke AdminDashboard tanpa membuat state baru */}
        <Route
          path="/admin"
          element={<AdminDashboard events={events} />}
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