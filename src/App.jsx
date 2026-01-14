import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import CartSidebar from "./components/public/CartSidebar";

import Home from "./pages/Home";
import Event from "./pages/Event";
import Eventdetail from "./pages/Eventdetail";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import DetailAdmin from "./pages/DetailAdmin";
import NotFound from "./pages/NotFound";

function App() {
  const [events, setEvents] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tickets"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(data);
    });

    return () => unsub();
  }, []);

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
            element={<AdminDashboard events={events} />}
          />
          <Route
            path="/admin/detail/:id"
            element={<DetailAdmin events={events} />}
          />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
