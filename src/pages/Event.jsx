import ProductCard from "@/components/public/ProductCard";
import { ShoppingCart } from "lucide-react"; 

export default function Event({ events = [], addToCart, setIsCartOpen, cartItemsCount }) {
  return (
    <div className="w-full min-h-screen pt-32 pb-16 px-6 md:px-10 bg-slate-100">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-center mb-16">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight text-center">
            Temukan Event Musik kamu Disini
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.length === 0 ? (
            <p className="col-span-full text-center text-slate-400 py-20">
              Belum ada event tersedia.
            </p>
          ) : (
            events.map((item) => (
              <ProductCard 
                key={item.id} 
                event={item} 
                addToCart={addToCart} 
              />
            ))
          )}
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsCartOpen(true)}
          className="group relative p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all active:scale-95 border-4 border-white"
        >
          <ShoppingCart size={28} />

          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full shadow-md border-2 border-white animate-in zoom-in">
              {cartItemsCount}
            </span>
          )}
        </button>
      </div>

    </div>
  );
}