import { Link } from "react-router-dom";
import { Menu } from "lucide-react"; 

const AdminHeader = () => {
  return (
    <div className="bg-blue-500 border-b p-6 flex justify-between items-center shadow-sm">
      <div className="flex text-white items-center gap-3">
        <Link 
          to="/" 
          className="p-1 hover:bg-gray-200 rounded-lg transition-colors text-white"
        >
          <Menu size={24} />
        </Link>
        <h2 className="font-bold text-xl text-white">Admin Dashboard</h2>
      </div>
      
      <div className="text-sm text-xl text-white">
        Hari ini: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default AdminHeader;