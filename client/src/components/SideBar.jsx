// components/Sidebar.js
import { FaHome, FaMoneyCheck, FaListAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white shadow-md px-4 py-6 flex flex-col">
      <div className="flex items-center space-x-2 mb-10">
        <img src="/logo.svg" alt="Wiremoney Logo" className="w-8 h-8" />
        <span className="font-bold text-xl text-blue-600">wiremoney</span>
      </div>

      <nav className="space-y-6 flex-1">
        <a href="#" className="flex items-center space-x-2 text-blue-700 bg-blue-100 p-2 rounded">
          <FaHome /> <span>Home</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 p-2">
          <FaMoneyCheck /> <span>Payments</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 p-2">
          <FaListAlt /> <span>Transactions</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 p-2">
          <FaCog /> <span>Settings</span>
        </a>
      </nav>

      <button className="flex items-center text-red-500 hover:text-red-600 p-2 mt-auto">
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
