import { useState } from "react";
import { Trash2, ShoppingBag, X, Minus, Plus } from "lucide-react";

export default function CartSidebar({
  isOpen,
  setIsOpen,
  cartItems,
  setCartItems,
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID").format(number);

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

        const currentQty = item.qty || 1;

        if (type === "inc") return { ...item, qty: currentQty + 1 };
        if (type === "dec" && currentQty > 1)
          return { ...item, qty: currentQty - 1 };

        return item;
      })
    );
  };

  const handleCheckoutWA = () => {
    const phoneNumber = "6289517793305";

    const itemList = cartItems
      .map((item, index) => {
        const qty = item.qty || 1;
        return `${index + 1}. ${item.name}
Jumlah: ${qty}
Harga: Rp ${formatRupiah(item.price)}
Subtotal: Rp ${formatRupiah(item.price * qty)}`;
      })
      .join("\n\n");

    const message = `Halo Monggo Ticket, saya ingin memesan tiket berikut:\n\n${itemList}\n\nTotal Pembayaran: Rp ${formatRupiah(
      totalPrice
    )}\n\nMohon info selanjutnya dan instruksi pembayarannya. Terima kasih `;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setCartItems([]);
    setIsOpen(false);
    setShowConfirm(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70]
        shadow-2xl transform transition-transform duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
       
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-blue-600" size={22} />
            <h2 className="text-lg font-black">Keranjang Belanja</h2>
          </div>
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50">
          {cartItems.length === 0 ? (
            <p className="text-center text-slate-400">
              Keranjang masih kosong
            </p>
          ) : (
            cartItems.map((item) => {
              const qty = item.qty || 1;

              return (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white rounded-2xl border shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                  <div className="flex-grow">
                    <h4 className="font-bold text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-blue-600 font-black text-sm">
                      Rp {formatRupiah(item.price)}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQty(item.id, "dec")}
                        className="w-7 h-7 rounded border flex items-center justify-center"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="font-bold text-sm">{qty}</span>

                      <button
                        onClick={() => updateQty(item.id, "inc")}
                        className="w-7 h-7 rounded border flex items-center justify-center"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-300 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-white space-y-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rp {formatRupiah(totalPrice)}</span>
            </div>

            <button
              onClick={() => setShowConfirm(true)}
              className="w-full h-14 bg-green-500 text-white font-black rounded-2xl"
            >
              Checkout Sekarang (WA)
            </button>
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-black text-lg text-center">
              Konfirmasi Checkout
            </h3>
            <p className="text-sm text-slate-600 text-center">
              Yakin ingin checkout dan melanjutkan ke WhatsApp?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 h-12 rounded-xl border font-bold"
              >
                Batal
              </button>
              <button
                onClick={handleCheckoutWA}
                className="flex-1 h-12 rounded-xl bg-green-500 text-white font-bold"
              >
                Ya, Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
