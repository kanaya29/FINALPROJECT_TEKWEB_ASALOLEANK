import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { LogOut } from "lucide-react";
import logoBatik from "@/assets/logo_batik.png";

import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const linkClass = (path) =>
    location.pathname === path
      ? "text-white font-semibold underline underline-offset-4"
      : "text-blue-100 hover:text-white transition-colors";

  return (
    <>

      <header className="fixed top-0 left-0 w-full bg-blue-500 shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center text-white">

          <div className="flex items-center gap-2">
            <img src={logoBatik} alt="Logo Monggo Ticket" className="h-10 w-auto" />
            <h1 className="text-lg md:text-2xl font-bold tracking-wide">
              MONGGO TICKET
            </h1>
          </div>

          <nav className="hidden md:flex space-x-6 bg-blue-400 rounded-xl px-6 py-2">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/event" className={linkClass("/event")}>Event</Link>
            <Link to="/contact" className={linkClass("/contact")}>Contact</Link>
          </nav>

          <div className="flex items-center gap-3">

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl focus:outline-none"
            >
              ☰
            </button>

            {user ? (
              <>
                <span className="hidden sm:block text-sm font-medium">
                  Hi, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setOpenLogin(true)}
                  className="px-4 py-1 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition"
                >
                  Sign in
                </button>
                <button
                  onClick={() => setOpenSignup(true)}
                  className="px-4 py-1 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-blue-400 px-4 py-4 space-y-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-white">
              Home
            </Link>
            <Link to="/event" onClick={() => setMenuOpen(false)} className="block text-white">
              Event
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="block text-white">
              Contact
            </Link>
          </div>
        )}
      </header>

      <LoginModal open={openLogin} setOpen={setOpenLogin} />
      <SignupModal open={openSignup} setOpen={setOpenSignup} />
    </>
  );
}
