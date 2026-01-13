import Navbar from "@/components/public/Navbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="pt-24 px-6 bg-slate-50 min-h-screen">
        {children}
      </main>
    </>
  );
}
