import ProductCard from "@/components/public/ProductCard"

export default function Event({ events = [] }) {
    return(
        <div className="w-full max-w-8xl pt-28 px-10">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-center ">Temukan Event Musik kamu Disini</h1>
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