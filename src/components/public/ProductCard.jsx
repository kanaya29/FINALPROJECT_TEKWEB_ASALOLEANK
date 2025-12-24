export default function ProductCard({ event }) {
  return (
    <div className="bg-gradient-to-r from-blue-400 via-green-200 to-green-100 p-4
    rounded-xl border border-gray-500 flex gap-4 max-w-md ">
      <img
        src={event.image}
        alt={event.name}
        className="w-24 h-22 rounded-lg object-cover flex-shrink-0"/>

      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{event.name}</h3>
          <p className="text-sm text-gray-500">{event.date}</p>
          <p className="text-sm font-semibold">{event.location}</p>
          <p className="text-sm text-gray-600 mt-1">
            {event.description}
          </p>
          <p className="text-blue-600 font-semibold mt-2">
            {event.price}
          </p>
        </div>

        <button
          onClick={() => console.log("Pesan:", event.name)}
          className="mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-700 w-20">
          Beli Tiket
        </button>
      </div>

    </div>
  )
}
