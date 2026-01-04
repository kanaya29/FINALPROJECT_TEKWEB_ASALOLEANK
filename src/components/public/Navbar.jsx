import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react"; 

export default function Navbar() {
  const location = useLocation();

  // Fungsi untuk memberi warna berbeda pada link yang sedang aktif
  const linkClass = (path) =>
    location.pathname === path
      ? "text-white font-semibold underline underline-offset-4"
      : "text-blue-100 hover:text-white transition-colors";

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-500 shadow-lg z-50">
      <div className="max-w-6xl mx-auto py-4 px-6 flex justify-between items-center text-white">
        
        {/* Bagian Logo & Akses Admin */}
        <div className="flex items-center gap-4">
          {/* Ikon Menu untuk akses cepat ke Dashboard Admin */}
          <Link
            to="/admin"
            className="p-1 hover:bg-blue-600 rounded-lg transition-colors"
            title="Ke Dashboard Admin"
          >
            <Menu size={24} className="text-white" />
          </Link>
          <h1 className="text-2xl font-bold tracking-wide">
            EVENT TICKET
          </h1>
        </div>

        {/* Menu Navigasi Utama */}
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