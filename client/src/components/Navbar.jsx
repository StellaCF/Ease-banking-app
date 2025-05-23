import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/banklogo.png";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";  

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!Cookies.get("auth_token");

  const closeMenuAndNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#02487F] to-[#1384AB]">
      <div className="h-[90px] w-11/12 mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Bank Logo" className="bg-transparent w-20 h-20" />
          <span className="font-bold text-2xl text-white hidden md:block">Ease Bank</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex justify-end items-center space-x-6 text-sm">
          <a href="#faq" className="text-white">FAQ</a>
          <a href="#contact us" className="text-white">Contact Us</a>
          {isLoggedIn ? (
            <button 
              onClick={() => navigate("/dashboard")} 
              className="px-4 py-2 border border-white rounded-full cursor-pointer text-white hover:bg-white hover:text-[#004876] transition"
            >
              Dashboard
            </button>
          ) : ( 
            <>
              <button 
                onClick={() => navigate('/login')} 
                className="px-4 py-2 border border-white rounded-full cursor-pointer text-white hover:bg-white hover:text-[#004876] transition"
              >
                Log in
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="px-4 py-2 bg-white text-[#004876] font-semibold rounded-full cursor-pointer hover:bg-[#f1f5f9] transition"
              >
                Create Account
              </button>
            </>
          )}
        </div>

        {/* Hamburger - Small Screens */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-white z-50"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Slide-in Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white text-[#004876] shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold">Menu</span>
              <button onClick={() => setMenuOpen(false)}><X size={24} /></button>
            </div>

            <a
              href="#"
              className="block font-medium text-md hover:text-[#0066cc] transition"
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </a>
            <a
              href="#"
              className="block font-medium text-md hover:text-[#0066cc] transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </a>
            <button
              onClick={() => closeMenuAndNavigate("/login")}
              className="w-full border border-[#004876] text-[#004876] py-2 rounded-lg hover:bg-[#f1f5f9] transition"
            >
              Log in
            </button>
            <button
              onClick={() => closeMenuAndNavigate("/signup")}
              className="w-full bg-[#004876] text-white py-2 rounded-lg hover:bg-[#00345c] transition"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* Removed the semi-transparent overlay to keep background unchanged */}
    </div>
  );
};

export default Navbar;
