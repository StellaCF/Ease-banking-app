import { FaHome, FaMoneyCheck, FaListAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../assets/banklogo.png"

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
    <aside className="fixed top-0 left-0 w-64 h-screen bg-white shadow-md px-4 py-6 flex flex-col justify-between z-50">
      <div>
        <div className="flex items-center mb-5">
          <img src={logo} alt="" className='bg-transparent w-20 h-20'/>
          <span className="font-bold text-2xl text-[#02487F]">Ease Bank</span>
        </div>

        <nav className="space-y-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `flex items-center rounded-lg space-x-2 text-gray-700 hover:text-[#20B6D9] hover:bg-[#E6F7FB] ${isActive && "bg-[#E6F7FB] text-[#20B6D9]"} p-3`}
          >
            <FaHome /> <span>Home</span>
          </NavLink>
          <NavLink
            to="/loanPage"
            className={({ isActive }) => `flex items-center rounded-lg space-x-2 text-gray-700 hover:text-[#20B6D9] hover:bg-[#E6F7FB] ${isActive && "bg-[#E6F7FB] text-[#20B6D9]"} p-3`}
          >
            <FaMoneyCheck /> <span>Ease Loan</span>
          </NavLink>
          <NavLink
            to="/transaction"
            className={({ isActive }) => `flex items-center rounded-lg space-x-2 text-gray-700 hover:text-[#20B6D9] hover:bg-[#E6F7FB] ${isActive && "bg-[#E6F7FB] text-[#20B6D9]"} p-3`}
          >
            <FaListAlt /> <span>Transactions</span>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => `flex items-center rounded-lg space-x-2 text-gray-700 hover:text-[#20B6D9] hover:bg-[#E6F7FB] ${isActive && "bg-[#E6F7FB] text-[#20B6D9]"} p-3`}
          >
            <FaUser /> <span>Profile</span>
          </NavLink>
        </nav>
      </div>

      <button
        onClick={logout}
        className="flex items-center text-red-500 hover:text-red-600 p-2 mt-auto cursor-pointer">
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
