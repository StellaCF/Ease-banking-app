import React from 'react'
// import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-end items-center px-6 py-4 space-x-6 text-sm">
        <a href="#" className="text-white hover:underline">FAQ</a>
        <a href="#" className="text-white hover:underline">Contact Us</a>
        <button 
          onClick={() => navigate('/login')} 
          className="px-4 py-2 border border-white rounded-full cursor-pointer">Log in</button>
        <button 
        onClick={() => navigate('/signup')}
        className="px-4 py-2 bg-white text-[#004876] rounded-full cursor-pointer">Create Account</button>
      </div>
    </>
  )
}

export default Navbar
