// components/Sidebar.js
import { FaHome, FaMoneyCheck, FaListAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    try {
      Cookies.remove("auth_token"); 
      toast.success("Logged Out");
      navigate("/login")
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <aside className="w-64 min-h-screen bg-white shadow-md px-4 py-6 flex flex-col">
      <div className="flex items-center space-x-2 mb-10">
        <span className="font-bold text-xl text-[#02487F]">Ease Bank</span>
      </div>

      <nav className="space-y-6 flex-1">
        <NavLink to="/dashboard" className="flex items-center space-x-2 text-[#02487F] bg-blue-100 p-2 rounded">
          <FaHome /> <span>Home</span>
        </NavLink>
        <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-[#02487F] p-2">
          <FaMoneyCheck /> <span>Ease Loan</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-[#02487F] p-2">
          <FaListAlt /> <span>Transactions</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-[#02487F] p-2">
          <FaUser /> <span>Profile</span>
        </a>
      </nav>

      <button
        onClick={logout}
        className="flex items-center text-red-500 hover:text-red-600 p-2 mt-auto cursor-pointer">
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
