import React from "react";
import payment from "../assets/payment.png";

const LoginPage = () => {
  return (
    <div>
      <div className="w-10/12 h-screen flex justify-between gap-10 mx-auto items-center">
        <div className="ms-8 w-1/2">
          <div className="justify-center items-center  bg-white">
            <h1 className="text-center text-4xl text-[#02487F] font-extrabold mt-8">
              RESET PASSWORD
            </h1>
          </div>
          <form action="" className="flex flex-col gap-y-2 w-100% p-4">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
              required
            />
                <label>ConfirmPassword</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
                  required
                />
            <button className="bg-[#02487F] text-white p-2 rounded-md gap-y-3 mt-5 cursor-pointer hover:bg-[#1384AB] transition duration-300 ease-in-out">
              Reset Password
            </button>
          </form>
        </div>
        <div className="h-full w-1/2">
          <img src={payment} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default LoginPage;
