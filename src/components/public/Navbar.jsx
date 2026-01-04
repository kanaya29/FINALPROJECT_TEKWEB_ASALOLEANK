 feature-user
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react"; // Import ikon garis tiga

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path
      ? "text-white font-semibold"
      : "text-gray-800 hover:text-white";

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-500 border-b shadow z-50">
      <div className="max-w-6xl mx-auto  py-4 flex text-l justify-between items-center text-white">
        <div className="flex justify-between gap-3">
          {/* TAMBAHAN: Tombol garis tiga untuk akses Admin Dashboard */}
          <Link
            to="/admin"
            className=" p-1 hover:bg-blue-600 rounded-lg transition-colors"
            title="Ke Dashboard Admin"
          >
            <Menu size={24} className="text-white" />
          </Link>
          <h1 className="text-2xl font-bold">
            Event Tiket
          </h1>
        </div>

        <nav className="space-x-4 bg-blue-400 rounded-xl px-5 py-2 flex items-center">
          <Link to="/" className={linkClass("/")} >
            Home
          </Link>

          <Link to="/Event" className={linkClass("/event")}>
            Event
          </Link>

          <Link to="/Contact" className={linkClass("/Contact")}>
            Contact
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-blue-500 px-10 py-5 shadow-lg shadow-gray-400 w-full text-white sticky top-0 left-0 z-50 font-sans">
      <h1 className="font-bold text-xl tracking-wide">
        EVENT TICKET
      </h1>

      <div className="space-x-8">
        <a 
          href="#Home" 
          className="hover:text-blue-200 transition-colors cursor-pointer font-medium"
        >
          Home
        </a>
        <a 
          href="#Event" 
          className="hover:text-blue-200 transition-colors cursor-pointer font-medium"
        >
          Event
        </a>
      </div>
    </nav>
  );
}
 main
