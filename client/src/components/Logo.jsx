import React from 'react'
import logo from "../assets/banklogo.png";

const Logo = () => {
  return (
   <div className="flex justify-center items-center mb-12  lg:hidden">
      <img src={logo} alt="" className='bg-transparent w-20 h-20'/>
      <span className="font-bold text-2xl text-[#02487F]">Ease Bank</span>
   </div>
  )
}

export default Logo
