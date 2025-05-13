import React from 'react'
import { NavLink } from 'react-router-dom'
import payment from "../assets/payment.png"

const VerifyPassword = () => {
  return (
    <div>
    <div className="w-10/12 h-screen flex justify-between gap-10 mx-auto items-center">
      <div className="ms-8 w-1/2">
        <div className="justify-center items-center  bg-white">
          <h1 className="text-center text-2xl text-[#02487F] font-extrabold mt-8">
            We sent you a code to reset your password
          </h1>
        </div>
        <form action="" className="flex flex-col gap-y-2 w-100% p-4">
          <label>Confirmation Code</label>
          <input
            type="text"
            placeholder="Enter Confirmation Code"
            className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
            required
          />
          <NavLink to="/VerifyPassword" className="bg-[#02487F] text-center text-white p-2 rounded-md gap-y-3 mt-5 cursor-pointer hover:bg-[#1384ab] transition duration-300 ease-in-out">
            Send One Time Password
          </NavLink>
          <p className="text-center">
            <NavLink to="/login" className="text-[#02487F]">
              Resend code
            </NavLink>
          </p>
        </form>
      </div>
      <div className="h-full w-1/2">
        <img src={payment} alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  </div>
  )
}

export default VerifyPassword
