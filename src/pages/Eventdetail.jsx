import { useParams } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import calendar from "@/assets/icon_calendar.svg"

export default function Eventdetail({ events }) {
  const { id } = useParams()

  const event = events.find((e) => e.id === Number(id))

  if (!event) {
    return (
      <p className="text-center mt-20 text-lg">
        Event tidak ditemukan
      </p>
    )
  }

  const phoneNumber = "6289517793305"
  const message = `Halo kak, saya tertarik untuk  membeli tiket event:
  Nama Event: ${event.name}
  Tanggal: ${event.date}
  Lokasi: ${event.location}
  Harga: Rp ${event.price}

Mohon info selanjutnya, terima kasih 🙏`

  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="pt-20 px-6 flex justify-center">
      <Card className="max-w-4xl w-full">
        <CardContent className="p-6 grid md:grid-cols-2 gap-8">

          <img
            src={event.image}
            alt={event.name}
            className="rounded-lg object-cover w-full"
          />

          <div className="space-y-3">
            <h1 className="text-3xl font-bold">
              {event.name}
            </h1>

            <div className="flex gap-2">
              <img
                src={calendar}
                alt="icon_calendar"
                className="w-5 h-5 md:w-5 md:h-5"
              />
              <p className="text-sm text-gray-600">
                {event.date}
              </p>
            </div>

            <p className="text-gray-600">lokasi : 
              {event.location}
            </p>

            <p className="mt-2">
              {event.description}
            </p>

            <p className="text-sm">
              {event.detail}
            </p>

            <p>Penyelenggara:</p>
            <div className="flex items-center gap-3">
              <img
                src={event.image}
                alt={event.name}
                className="w-10 h-10 rounded-full object-cover shadow"
              />
              <span className="text-sm font-semibold">
                Perunggu
              </span>
            </div>
            
            <p className="font-bold text-xl text-blue-600">
              Rp {event.price}
            </p>

            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                Pesan via WhatsApp
              </Button>
            </a>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
