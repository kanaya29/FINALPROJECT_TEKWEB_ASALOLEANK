import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import logoBatik from "@/assets/logo_batik.png";

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path
      ? "text-white font-semibold underline underline-offset-4"
      : "text-blue-100 hover:text-white transition-colors";

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-500 shadow-lg z-50">
      <div className="max-w-6xl mx-auto py-4 px-6 flex justify-between items-center text-white">

        {/* KIRI: Menu + Logo + Judul */}
        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className="p-1 hover:bg-blue-600 rounded-lg transition-colors"
            title="Ke Dashboard Admin"
          >
            <Menu size={24} className="text-white" />
          </Link>

          <div className="flex items-center gap-3">
            <img
              src={logoBatik}
              alt="Logo Monggo Ticket"
              className="h-10 w-15"
            />
            <h1 className="text-2xl font-bold tracking-wide">
              MONGGO TICKET
            </h1>
          </div>
        </div>

        {/* NAV MENU */}
        <nav className="hidden md:flex space-x-6 bg-blue-400 rounded-xl px-6 py-2 items-center">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>

          <Link to="/event" className={linkClass("/event")}>
            Event
          </Link>

          <Link to="/contact" className={linkClass("/contact")}>
            Contact
          </Link>
        </nav>

      </div>
    </header>
  );
}
