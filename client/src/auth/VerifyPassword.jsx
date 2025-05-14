import payment from "../assets/payment.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const VerifyPassword = () => {
  const [otp, setOtp] = useState("")
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
    
 const handleSubmit = async (e) => {
  e.preventDefault();
  navigate(`/resetPassword?otp=${otp}&email=${email}`)
 }

  return (
    <div>
    <div className="w-10/12 h-screen flex justify-between gap-10 mx-auto items-center">
      <div className="ms-8 w-1/2">
        <div className="justify-center items-center  bg-white">
          <h1 className="text-center text-2xl text-[#02487F] font-extrabold mt-8">
            VERIFY OTP
          </h1>
          <p className='text-center'>OTP was sent to your email: </p>
        </div>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-y-2 w-100% p-4">
          <label>OTP</label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            placeholder="Enter Confirmation Code"
            className="rounded-lg border-2 h-10 border-[#1384AB] p-4 outline-none"
            required
          />
          <button type='submit' className="bg-[#02487F] text-center text-white p-2 rounded-md gap-y-3 mt-5 cursor-pointer hover:bg-[#1384ab] transition duration-300 ease-in-out">
            Verify 
          </button>
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
