import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale"; 
import { CalendarIcon, Link2, TicketCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const FormData = ({ onAdd, onEdit, editingEvent, setEditingEvent }) => {
  const [form, setForm] = useState({
    name: "",
    date: "",
    price: "",
    tickets: "", 
    soldTicket: 0,
    location: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (editingEvent) {
      setForm({
        ...editingEvent,
        // Pastikan mapping field konsisten dengan database
        tickets: editingEvent.totalTicket || editingEvent.tickets || "",
        soldTicket: editingEvent.soldTicket || 0 
      });
    } else {
      resetForm();
    }
  }, [editingEvent]);

  const resetForm = () => {
    setForm({ 
      name: "", date: "", price: "", tickets: "", 
      soldTicket: 0, location: "", description: "", image: "" 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // KOREKSI PENTING: Konversi ke Number agar perhitungan stok akurat
    const finalData = {
      ...form,
      price: Number(form.price),
      totalTicket: Number(form.tickets), // Gunakan nama field totalTicket agar sinkron
      soldTicket: Number(form.soldTicket)
    };

    editingEvent ? onEdit(finalData) : onAdd(finalData);
    resetForm();
  };

  const noSpinnerClass = "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="NAMA EVENT"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={cn(
              "w-full justify-start text-left h-10 font-normal", 
              !form.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {form.date ? format(new Date(form.date), "PPP", { locale: localeID }) : "Pilih Tanggal"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={form.date ? new Date(form.date) : undefined}
            onSelect={(date) => setForm({ ...form, date: date ? date.toISOString() : "" })}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">Harga</label>
          <Input 
            type="number" 
            placeholder="Rp" 
            value={form.price} 
            onChange={(e) => setForm({ ...form, price: e.target.value })} 
            className={noSpinnerClass}
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">Total Stok</label>
          <Input 
            type="number" 
            placeholder="0" 
            value={form.tickets} 
            onChange={(e) => setForm({ ...form, tickets: e.target.value })} 
            className={noSpinnerClass}
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-blue-600 mb-1 block uppercase flex items-center gap-1">
            <TicketCheck className="w-3 h-3" /> Terjual
          </label>
          <Input 
            type="number" 
            placeholder="0" 
            value={form.soldTicket} 
            onChange={(e) => setForm({ ...form, soldTicket: e.target.value })} 
            className={cn(noSpinnerClass, "border-blue-200 bg-blue-50/30 focus:bg-white")}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
          <Link2 className="w-3 h-3" />
          <span>Link URL Poster</span>
        </div>
        <Input
          placeholder="https://..."
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />
      </div>

      <Input
        placeholder="LOKASI"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        required
      />

      <textarea
        placeholder="Deskripsi Event"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full min-h-[100px] border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
      />

      <div className="flex gap-2 pt-2">
        {editingEvent && (
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1" 
            onClick={() => { resetForm(); setEditingEvent(null); }}
          >
            Batal
          </Button>
        )}
        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors shadow-md">
          {editingEvent ? "Perbarui Data" : "Simpan"}
        </Button>
      </div>
    </form>
  );
};

export default FormData;