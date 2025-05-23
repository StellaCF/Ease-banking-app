import { FaHome, FaMoneyCheck, FaListAlt, FaUser, FaSignOutAlt, FaToolbox } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import logo from "../assets/banklogo.png";
import { useState } from 'react';

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    try {
      Cookies.remove("auth_token"); 
      toast.success("Logged Out");
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex fixed top-0 left-0 w-64 h-screen bg-white shadow-md px-4 py-6 flex-col justify-between z-50">
        <div>
          <div onClick={() => navigate("/")} className="flex items-center mb-5">
            <img src={logo} alt="" className='bg-transparent w-20 h-20'/>
            <span className="font-bold text-2xl text-[#02487F]">Ease Bank</span>
          </div>

          <nav className="space-y-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center rounded-lg space-x-2 text-gray-700 hover:text-[#20B6D9] hover:bg-[#E6F7FB] ${isActive && "bg-[#E6F7FB] text-[#20B6D9]"} p-3`
              }
            >
              <FaHome /> <span>Home</span>
            </NavLink>
            <NavLink
              to="/loanPage"
              className={({ isActive }) =>
                `flex items-center rounded-lg space-x-2 text-gray-700 hover:text-[#20B6D9] hover:bg-[#E6F7FB] ${isActive && "bg-[#E6F7FB] text-[#20B6D9]"} p-3`
              }
            >
              <FaMoneyCheck /> <span>Ease Loan</span>
            </NavLink>
            <NavLink
              to="/transaction"
              className={({ isActive }) =>
                `flex items-center rounded-lg space-x-2 text-gray-700 hover:text-[#20B6D9] hover:bg-[#E6F7FB] ${isActive && "bg-[#E6F7FB] text-[#20B6D9]"} p-3`
              }
            >
              <FaListAlt /> <span>Transactions</span>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center rounded-lg space-x-2 text-gray-700 hover:text-[#20B6D9] hover:bg-[#E6F7FB] ${isActive && "bg-[#E6F7FB] text-[#20B6D9]"} p-3`
              }
            >
              <FaUser /> <span>Profile</span>
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center rounded-lg space-x-2 text-gray-700 hover:text-[#20B6D9] hover:bg-[#E6F7FB] ${isActive && "bg-[#E6F7FB] text-[#20B6D9]"} p-3`
              }
            >
              <FaToolbox /> <span>Settings</span>
            </NavLink>
          </nav>
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center text-red-500 hover:text-red-600 p-2 mt-auto cursor-pointer"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </aside>

      {/* Sidebar for small screens with tooltips */}
      <aside className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner flex justify-around items-center py-3 z-50 lg:hidden">
        <NavLink
          to="/dashboard"
          title="Home"
          className={({ isActive }) =>
            `text-2xl ${isActive ? "text-[#20B6D9]" : "text-gray-600"}`
          }
        >
          <FaHome />
        </NavLink>
        <NavLink
          to="/loanPage"
          title="Ease Loan"
          className={({ isActive }) =>
            `text-2xl ${isActive ? "text-[#20B6D9]" : "text-gray-600"}`
          }
        >
          <FaMoneyCheck />
        </NavLink>
        <NavLink
          to="/transaction"
          title="Transactions"
          className={({ isActive }) =>
            `text-2xl ${isActive ? "text-[#20B6D9]" : "text-gray-600"}`
          }
        >
          <FaListAlt />
        </NavLink>
        <NavLink
          to="/profile"
          title="Profile"
          className={({ isActive }) =>
            `text-2xl ${isActive ? "text-[#20B6D9]" : "text-gray-600"}`
          }
        >
          <FaUser />
        </NavLink>
        <NavLink
          to="/settings"
          title="Settings"
          className={({ isActive }) =>
            `text-2xl ${isActive ? "text-[#20B6D9]" : "text-gray-600"}`
          }
          >
             <FaToolbox />
          </NavLink>
        <button onClick={() => setShowLogoutModal(true)} title="Logout" className="text-2xl text-red-500 cursor-pointer">
          <FaSignOutAlt />
        </button>
      </aside>

      {showLogoutModal && (
        <div className="fixed w-full h-screen flex items-center justify-center bg-[#0004] bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
