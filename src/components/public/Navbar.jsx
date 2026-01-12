import { Link, useLocation } from "react-router-dom"
import { Menu } from "lucide-react"
import { useState } from "react"

import LoginModal from "@/components/auth/LoginModal"
import SignupModal from "@/components/auth/SignupModal"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
  const location = useLocation()
  const { user, logout } = useAuth()

  const [openLogin, setOpenLogin] = useState(false)
  const [openSignup, setOpenSignup] = useState(false)

  const linkClass = (path) =>
    location.pathname === path
      ? "text-white font-semibold underline underline-offset-4"
      : "text-blue-100 hover:text-white transition-colors"

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-blue-500 shadow-lg z-50">
        <div className="max-w-6xl mx-auto py-4 px-6 flex justify-between items-center text-white">

          {/* KIRI */}
          <div className="flex items-center gap-4">
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

          <nav className="md:flex space-x-6 bg-blue-400 rounded-xl px-6 py-2 items-center">
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

          <div className="flex gap-3 items-center">

            {user ? (
              <>
                <span className="text-sm font-medium">
                  Hi, {user.name}
                </span>

                <button
                  onClick={logout}
                  className="px-4 py-1 border border-white rounded-lg hover:bg-red-500 hover:border-red-500 transition"
                >
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
                  Sign Up
                </button>
              </>
            )}

          </div>

        </div>
      </header>

      <LoginModal open={openLogin} setOpen={setOpenLogin} />
      <SignupModal open={openSignup} setOpen={setOpenSignup} />
    </>
  )
}
