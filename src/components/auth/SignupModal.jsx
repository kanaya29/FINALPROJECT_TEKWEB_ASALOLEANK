import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default function SignupModal({ open, setOpen }) {
  const [role, setRole] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = () => {
    login({
      name: "User Baru",
      email: "baru@gmail.com",
      role
    })

    setOpen(false)

    if (role === "admin") {
      navigate("/admin")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Sign Up</DialogTitle>

        {!role && (
          <div className="space-y-3">
            <Button onClick={() => setRole("public")} className="w-full bg-blue-500 text-white">
              Daftar sebagai Public
            </Button>

            <Button onClick={() => setRole("admin")} className="w-full  bg-blue-500 text-white">
              Daftar sebagai Admin
            </Button>
          </div>
        )}

        {role && (
          <div className="space-y-3">
            <Input placeholder="Nama" />
            <Input placeholder="Email" />
            <Button onClick={handleSubmit} className="w-full  bg-blue-500 text-white">
              Daftar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
