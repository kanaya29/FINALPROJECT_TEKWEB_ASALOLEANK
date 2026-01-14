import { useState } from "react";
import {
  Trash2,
  ShoppingBag,
  X,
  Minus,
  Plus,
  LockKeyhole,
  Loader2,
} from "lucide-react";
import { db } from "../../firebase";
import { doc, updateDoc, increment } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export default function CartSidebar({
  isOpen,
  setIsOpen,
  cartItems,
  setCartItems,
}) {
  const { isAuthenticated } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID").format(number || 0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const qty = item.qty || 1;
        if (type === "inc") return { ...item, qty: qty + 1 };
        if (type === "dec" && qty > 1)
          return { ...item, qty: qty - 1 };
        return item;
      })
    );
  };

  // 🔥 CHECKOUT + UPDATE STOK + WA
  const handleCheckoutWA = async () => {
    if (!isAuthenticated || cartItems.length === 0) return;

    setIsProcessing(true);

    try {
      // 1️⃣ Atomic update stok
      const updates = cartItems.map((item) => {
        const ref = doc(db, "tickets", item.id);
        return updateDoc(ref, {
          soldTicket: increment(item.qty || 1),
        });
      });

      await Promise.all(updates);

      // 2️⃣ Format pesan WA
      const phoneNumber = "6289517793305";

      const itemList = cartItems
        .map((item, i) => {
          const qty = item.qty || 1;
          return `${i + 1}. ${item.name}
   - Jumlah: ${qty}
   - Subtotal: Rp ${formatRupiah(item.price * qty)}`;
        })
        .join("\n\n");

      const message = `Halo Monggo Ticket 👋
Saya ingin memesan tiket berikut:

${itemList}

*Total Bayar: Rp ${formatRupiah(totalPrice)}*

Mohon info instruksi pembayaran.
Terima kasih 🙏`;

      // 3️⃣ Open WhatsApp
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      // 4️⃣ Cleanup
      setCartItems([]);
      setIsOpen(false);
      setShowConfirm(false);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-blue-600" size={22} />
            <h2 className="text-lg font-black">Keranjang Belanja</h2>
          </div>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="mx-auto text-slate-200 mb-4" size={64} />
              <p className="text-slate-400 font-medium">
                Keranjang masih kosong
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-white rounded-2xl border"
              >
                <img
                  src={item.image}
                  className="w-20 h-20 rounded-xl object-cover"
                  alt={item.name}
                />

                <div className="flex-grow">
                  <h4 className="font-bold text-sm line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-blue-600 font-black text-sm">
                    Rp {formatRupiah(item.price)}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQty(item.id, "dec")}
                      className="w-8 h-8 border rounded-lg"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="font-bold w-4 text-center">
                      {item.qty || 1}
                    </span>

                    <button
                      onClick={() => updateQty(item.id, "inc")}
                      className="w-8 h-8 border rounded-lg"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t space-y-4">
            <div className="flex justify-between font-black">
              <span>Total</span>
              <span>Rp {formatRupiah(totalPrice)}</span>
            </div>

            <button
              disabled={!isAuthenticated}
              onClick={() => setShowConfirm(true)}
              className={`w-full h-14 rounded-2xl font-black flex items-center justify-center gap-2 ${
                isAuthenticated
                  ? "bg-green-500 text-white"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              {!isAuthenticated && <LockKeyhole size={18} />}
              Checkout ke WhatsApp
            </button>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center space-y-6">
            <ShoppingBag className="mx-auto text-green-500" size={40} />
            <h3 className="font-black text-xl">
              Konfirmasi Pesanan
            </h3>
            <p className="text-slate-500 text-sm">
              Stok akan dikurangi otomatis dan pesanan diteruskan ke WhatsApp.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 h-12 border rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={handleCheckoutWA}
                disabled={isProcessing}
                className="flex-1 h-12 bg-green-500 text-white rounded-xl flex justify-center items-center"
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Lanjutkan"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
