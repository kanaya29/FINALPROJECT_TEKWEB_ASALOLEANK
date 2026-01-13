import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AdminHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-blue-500 border-b p-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3 text-white">
        <h2 className="font-bold text-xl">Admin Dashboard</h2>
      </div>

      <div className="flex items-center gap-6 text-white">
        <span className="text-sm">
          Hari ini: {new Date().toLocaleDateString()}
        </span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
