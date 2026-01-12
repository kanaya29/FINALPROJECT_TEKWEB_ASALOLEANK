import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import calendar from "@/assets/icon_calendar.svg"

export default function ProductCard({ event }) {
  const remainingTicket = Math.max(
    event.totalTicket - event.soldTicket,
    0
  )

  const soldPercentage =
    event.totalTicket > 0
      ? (event.soldTicket / event.totalTicket) * 100
      : 0

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID").format(number)

  let statusLabel = "Tersedia"
  let statusVariant = "default"

  if (remainingTicket === 0) {
    statusLabel = "Habis"
    statusVariant = "destructive"
  } else if (remainingTicket < 50) {
    statusLabel = "Hampir Habis"
    statusVariant = "outline"
  }

  return (
    <Link to={`/event/${event.id}`} className="h-full">
      <Card
        className="
          relative h-full min-h-[280px]
          bg-gray-100 border border-gray-300
          cursor-pointer transition
          hover:scale-105
        "
      >
        <CardContent className="p-4 flex flex-col justify-between h-full">
          
          <div className="flex gap-4">
            <img
              src={event.image}
              alt={event.name}
              className="
                w-24 h-36 rounded-xl object-cover flex-shrink-0 shadow-sm
              "
            />

            <div className="flex flex-col gap-1 w-full min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold leading-tight text-slate-800 line-clamp-2">
                  {event.name}
                </h3>

                <Badge
                  variant={statusVariant}
                  className={`shrink-0 text-[10px] px-2 py-0.5 whitespace-nowrap
                    ${
                      statusLabel === "Hampir Habis"
                        ? "bg-white text-black border"
                        : ""
                    }
                  `}
                >
                  {statusLabel}
                </Badge>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <img
                  src={calendar}
                  alt="calendar"
                  className="w-4 h-4 opacity-70"
                />
                <p className="text-sm text-slate-500 font-medium">
                  {event.date}
                </p>
              </div>

              <p className="text-sm text-slate-600 font-medium">
                📍 {event.location}
              </p>

              <p className="text-sm text-slate-400 line-clamp-2 mt-1">
                {event.description}
              </p>

              <p className="font-bold text-blue-600 text-lg mt-1">
                Rp {formatRupiah(event.price)}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2 bg-white p-3 rounded-xl border border-slate-100 shadow-inner">
            <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
              <span>Ketersediaan</span>
              <span
                className={
                  remainingTicket < 50
                    ? "text-orange-600"
                    : "text-green-600"
                }
              >
                {remainingTicket} Tiket Sisa
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  soldPercentage > 80 ? "bg-red-500" : "bg-blue-500"
                }`}
                style={{ width: `${soldPercentage}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 font-medium uppercase">
              <span>Terjual: {event.soldTicket}</span>
              <span>Total: {event.totalTicket}</span>
            </div>
          </div>

        </CardContent>
      </Card>
    </Link>
  )
}
