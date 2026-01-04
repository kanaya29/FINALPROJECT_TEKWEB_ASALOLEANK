import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import calendar from "@/assets/icon_calendar.svg"

export default function ProductCard({ event }) {
  const remainingTicket = Math.max(
    event.totalTicket - event.soldTicket,
    0
  )

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID").format(number)

  // LOGIKA STATUS TIKET (OPSI 1)
  let statusLabel = "Tersedia"
  let statusVariant = "default"

  if (remainingTicket === 0) {
    statusLabel = "Habis"
    statusVariant = "destructive"
  } else if (remainingTicket < 50) {
    statusLabel = "Hampir Habis"
    statusVariant = "secondary"
  }

  return (
    <Link to={`/event/${event.id}`} className="h-full">
      <Card
        className="h-full min-h-[260px] bg-gray-200
        border border-gray-400 cursor-pointer
        hover:scale-105 transition">
        <CardContent className="p-4 flex flex-col justify-between h-full">

          <div className="flex gap-4">
            <img
              src={event.image}
              alt={event.name}
              className="w-24 h-26 rounded-lg object-cover flex-shrink-0"/>
            
            <div className="flex flex-col gap-1 w-full">

              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold">
                  {event.name}
                </h3>

                <Badge variant={statusVariant}>
                  {statusLabel}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <img src={calendar} alt="calendar" className="w-4 h-4" />
                <p className="text-sm text-gray-600">
                  {event.date}
                </p>
              </div>

              <p className="text-sm">
                Lokasi: {event.location}
              </p>

              <p className="text-sm text-gray-700 line-clamp-3">
                {event.description}
              </p>

              <p className="font-bold text-blue-700">
                Rp {formatRupiah(event.price)}
              </p>
            </div>
          </div>

          <div className="mt-4 text-sm bg-white/70 rounded-lg p-2">
            <p>
              Terjual: <b>{event.soldTicket}</b>
            </p>
            <p>
              Sisa:{" "}
              <b
                className={
                  remainingTicket < 50
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {remainingTicket}
              </b>
            </p>
          </div>

        </CardContent>
      </Card>
    </Link>
  )
}
