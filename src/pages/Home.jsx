import ProductCard from "../components/public/ProductCard";

export default function Home({ event }) {
  return (
    <div>
      <div id="Home" className="mb-4">
        <h1 className="text-2xl font-bold text-center ">Event Terbaru</h1>
      </div>

      <div
        id="Event"
        className="py-2 px-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {event.map((item) => (
          <ProductCard key={item.id} event={item} />
        ))}
      </div>
    </div>
  );
}
