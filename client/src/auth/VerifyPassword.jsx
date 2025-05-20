import payment from "../assets/payment.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const VerifyPassword = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/resetPassword?otp=${otp}&email=${email}`);
  };

  return (
    <div>
      <div className="w-10/12 h-screen mx-auto flex flex-col items-center justify-center gap-10 lg:flex-row lg:justify-between lg:items-center">
        <div className="w-full lg:w-1/2 ms-8">
          <div className="justify-center items-center bg-white">
            <h1 className="text-center text-2xl text-[#02487F] font-extrabold mt-8">
              VERIFY OTP
            </h1>
            <p className="text-center">OTP was sent to your email: {email}</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-2 w-full p-4"
          >
            <label>OTP</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Enter Confirmation Code"
              className="rounded-lg border-2 h-10 border-[#1384AB] p-4 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-[#02487F] text-center text-white p-2 rounded-md gap-y-3 mt-5 cursor-pointer hover:bg-[#1384ab] transition duration-300 ease-in-out"
            >
              Verify
            </button>
          </form>
        </div>
        <div className="hidden lg:block h-full w-1/2">
          <img
            src={payment}
            alt="Verification Illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyPassword;
