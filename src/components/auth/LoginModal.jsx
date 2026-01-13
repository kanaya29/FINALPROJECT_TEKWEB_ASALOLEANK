import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

export default function LoginModal({ open, setOpen }) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !name) {
      setError("Nama dan email wajib diisi")
      return
    }

    login({
      name,
      email,
      role: "public",
    })

    setEmail("")
    setName("")
    setError("")

    setOpen(false)
    
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
        </DialogHeader>

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" className="w-full  bg-blue-500 text-white">
            Sign in
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
