import ProductCard from "@/components/public/ProductCard"
import foto_homapge from "../assets/gambar_homepage.png"


export default function Home({ events = [] }) {
  return (
    <div>
      <section className="bg-blue-200 py-4 px-6 pt-28 mb-3">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-20 md:flex-row-reverse mb-3">
          <img
            src={foto_homapge}
            alt="foto_homepage"
            className="w-48 h-48 md:w-64 md:h-64"
          />


          <div className="w-full md:w-1/2 text-center md:text-left py-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-1 leading-tight">
              CARI, TEMUKAN, & KLIK
            </h1>
            <p className="mb-6 max-w-lg md:max-w-none mx-auto">
              Event ticket adalah website yang digunakan untuk menemukan event
              ticket sedang berlangsung. Website ini memudahkan booking ticket
              langsung melalui WhatsApp admin event.
            </p>
          </div>
        </div>
      </section>
     


      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center">Event Terdekat</h1>
      </div>


      <div className="py-2 px-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.length === 0 ? (
          <p className="col-span-3 text-center">
            Belum ada event
          </p>
        ) : (
          events.map((item) => (
            <ProductCard key={item.id} event={item} />
          ))
        )}
      </div>
    </div>
  )
}



