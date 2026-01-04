import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ImagePlus } from "lucide-react"; 
import { cn } from "@/lib/utils";

const FormData = ({ onAdd, onEdit, editingEvent }) => {
  const [form, setForm] = useState({
    name: "",
    date: "",
    price: "",
    location: "",
    description: "",
    image: "", 
  });

  useEffect(() => {
    if (editingEvent) {
      setForm(editingEvent);
    } else {
      resetForm();
    }
  }, [editingEvent]);

  const resetForm = () => {
    setForm({
      name: "",
      date: "",
      price: "",
      location: "",
      description: "",
      image: "",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (form.image && form.image.startsWith('blob:')) {
        URL.revokeObjectURL(form.image);
      }
      const imageUrl = URL.createObjectURL(file);
      setForm({ ...form, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      onEdit(form);
    } else {
      onAdd(form);
    }
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        placeholder="NAMA EVENT"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal border-slate-200 h-10",
              !form.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {form.date ? format(new Date(form.date), "PPP") : <span>Pilih Tanggal</span>}
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

      <Input
        placeholder="HARGA"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <div className="md:col-span-2 space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1">
          <ImagePlus className="w-4 h-4" />
          <span>Poster Event</span>
        </div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="cursor-pointer border-dashed border-2 hover:bg-slate-50 transition"
        />
        {form.image && (
          <div className="mt-3 relative w-full h-40 group">
            <img
              src={form.image}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl border shadow-sm"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center text-white text-xs">
              Preview Poster
            </div>
          </div>
        )}
      </div>

      <div className="md:col-span-2">
        <Input
          placeholder="LOKASI"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
      </div>

      <textarea
        placeholder="Deskripsi Event"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="md:col-span-2 w-full min-h-[100px] border border-slate-200 rounded-md px-4 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />

      <div className="md:col-span-2 flex justify-end gap-3">
        {editingEvent && (
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => { resetForm(); onEdit(null); }}
          >
            Batal
          </Button>
        )}
        <Button type="submit" className="px-8 bg-blue-600 hover:bg-blue-700">
          {editingEvent ? "Update Event" : "Tambah Event"}
        </Button>
      </div>
    </form>
  );
};

export default FormData;