import React from "react";
// import card from "../assets/card.png";
import Finance4 from "../assets/Finance4.gif";
// import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
        <div className="w-10/12 h-screen flex justify-between gap-10 mx-auto items-center">
          <div className="ms-8">
            <div className="justify-center items-center  bg-white">
              <h1 className="text-center text-4xl text-[#02487F] font-extrabold mt-8">
                SIGNUP
              </h1>
            </div>
            <form action="" className="flex flex-col gap-y-2 w-100% p-4">
                <div className="flex gap-x-2">
                  <div className="flex flex-col gap-y-2 w-1/2">
                  <label className="block">First Name</label>
                    <input
                        type="text"
                        placeholder="Enter First Name"
                        className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
                        required
                    />
                  </div>
                  <div className="flex flex-col gap-y-2 w-1/2">
                  <label>Last Name</label>
                    <input
                        type="text"
                        placeholder="Enter Last Name"
                        className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
                        required
                    />
                  </div>
                </div>
              <label>Other Names</label>
              <input
                type="text"
                placeholder="Enter Other Names"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
                required
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
                required
              />
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
                required
              />
              <div className="flex gap-x-2">
              <div className="flex flex-col gap-y-2 w-1/2">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
                required
              />
              </div>
              <div className="flex flex-col gap-y-2 w-1/2">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
                required
              />
              </div>
              </div>
              <button className="bg-[#02487F] text-white p-2 rounded-md gap-y-3 mt-5 cursor-pointer hover:bg-[#1384AB] transition duration-300 ease-in-out">
                Sign Up
              </button>
              <p className="text-center">
                Already have an account?{" "}
                <NavLink to="/login" className="text-[#02487F]">
                  Login
                </NavLink>
              </p>
            </form>
          </div>
          <div className="h-full w-full">
            <img src={Finance4} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
        {/* <Footer /> */}
    </div>
  );
};

export default SignUp;
