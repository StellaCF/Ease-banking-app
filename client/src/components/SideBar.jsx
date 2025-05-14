import { FaHome, FaMoneyCheck, FaListAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-white shadow-md px-4 py-6 flex flex-col justify-between z-50">
      <div>
        <div className="flex items-center space-x-2 mb-10">
          <span className="font-bold text-xl text-[#02487F]">Ease Bank</span>
        </div>

        <nav className="space-y-6">
          <NavLink
            to="/dashboard"
            className="flex items-center space-x-2 text-[#02487F] bg-blue-100 p-2 rounded"
          >
            <FaHome /> <span>Home</span>
          </NavLink>
          <NavLink
            to="/LoanPage"
            className="flex items-center space-x-2 text-gray-700 hover:text-[#02487F] p-2"
          >
            <FaMoneyCheck /> <span>Ease Loan</span>
          </NavLink>
          <NavLink
            to="/#"
            className="flex items-center space-x-2 text-gray-700 hover:text-[#02487F] p-2"
          >
            <FaListAlt /> <span>Transactions</span>
          </NavLink>
          <NavLink
            to="/Profile"
            className="flex items-center space-x-2 text-gray-700 hover:text-[#02487F] p-2"
          >
            <FaUser /> <span>Profile</span>
          </NavLink>
        </nav>
      </div>

      <button className="flex items-center text-red-500 hover:text-red-600 p-2">
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
