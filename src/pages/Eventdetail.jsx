import { useParams } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import calendar from "@/assets/icon_calendar.svg"

export default function Eventdetail({ events }) {
  const { id } = useParams()

  // Perbaikan tipe data di sini
  const event = events.find((e) => e.id.toString() === id.toString())

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg mb-4">Event tidak ditemukan</p>
        <Button onClick={() => window.history.back()}>Kembali</Button>
      </div>
    )
  }

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID").format(number)

  const phoneNumber = "6289517793305"
  const message = `Halo kak, saya tertarik untuk membeli tiket event:
Nama Event: ${event.name}
Tanggal: ${event.date}
Harga: Rp ${formatRupiah(event.price)}

Mohon info selanjutnya, terima kasih 🙏`

  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="pt-28 pb-10 px-6 flex justify-center bg-gray-50 min-h-screen">
      <Card className="max-w-4xl w-full shadow-lg border-gray-200">
        <CardContent className="p-6 grid md:grid-cols-2 gap-8">
          
          <div className="space-y-4">
             <img
              src={event.image}
              alt={event.name}
              className="rounded-lg object-cover w-full "
            />
          </div>

          <div className="space-y-4 flex flex-col justify-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {event.name}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-blue-600 font-medium">
                <img src={calendar} alt="icon_calendar" className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
               <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Lokasi</p>
               <p className="text-gray-800">{event.location}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Deskripsi</p>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
              <p className="text-sm text-gray-600 italic">{event.detail}</p>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-1">Harga Tiket</p>
              <p className="font-bold text-3xl text-blue-700">
                Rp {formatRupiah(event.price)}
              </p>
            </div>

            <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 shadow-green-200 shadow-lg">
                Pesan via WhatsApp
              </Button>
            </a>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}