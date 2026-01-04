import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import { Link } from "react-router-dom"; 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

const formatTanggal = (dateStr) => {
  try {
    if (!dateStr) return "-";
    if (dateStr.includes("-") && dateStr.length <= 10) return dateStr;
    
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  } catch (e) {
    return dateStr;
  }
};

const DataTable = ({ data, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader className="bg-slate-100">
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Harga</TableHead>
          <TableHead>Lokasi</TableHead>
          <TableHead className="text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((e) => (
          <TableRow key={e.id} className="hover:bg-slate-50">
            <TableCell className="font-medium">{e.name}</TableCell>
            <TableCell>{formatTanggal(e.date)}</TableCell>
            <TableCell>{formatRupiah(e.price)}</TableCell>
            <TableCell>{e.location}</TableCell>

            <TableCell>
              <div className="flex justify-center gap-2">
                <Link to={`/admin/detail/${e.id}`}>
                  <Button size="sm" variant="outline">Detail</Button>
                </Link>

                <Button size="sm" variant="secondary" onClick={() => onEdit(e)}>
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">Hapus</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini akan menghapus event <strong>{e.name}</strong> secara permanen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(e.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Ya, Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;