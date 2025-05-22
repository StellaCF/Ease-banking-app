import React from 'react'
import Sidebar from '../../components/SideBar'
import { useState } from 'react';
import { FaTrash, FaShieldAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from "js-cookie";

const Setting = () => {
   const [verifyPassword, setVerifyPassword] = useState(false);
   const [resetPin, setResetPin] = useState(false);
   const [deleteAccount, setDeleteAccount] = useState(false);
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);

   const authToken = Cookies.get("auth_token");

   const verifyPasswordHandler = async () => {
      setLoading(true); 
      try {
         const axiosRes = await axios.post("https://ease-banking-app.onrender.com/api/user/verify-password", 
            {password: password},
            {
               headers: {
                  Authorization: `Bearer ${authToken}`,
               },
            }
         )
         const response = axiosRes.data;
         toast.success(response.message || "verified");
         setPassword("");
         setVerifyPassword(false);
         setDeleteAccount(true);
      } catch (error) {
         toast.error(error.response.data.error);
      }
      setLoading(false);
   }

  return (
   <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar/>
      <main>
         <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 space-y-8 md:ml-64">
            <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
            <div className="flex flex-col gap-7">
               <button className="bg-white flex items-center gap-1  shadow-md rounded-lg text-left px-6 py-3 text-md font-semibold cursor-pointer">
                  <FaShieldAlt className='text-[#02487f]'/> Change Transaction Pin
               </button>
               <button
                  onClick={() => setVerifyPassword(true)}
                  className="bg-white flex items-center gap-1 shadow-md rounded-lg text-left px-6 py-3 text-md font-semibold cursor-pointer">
                    <FaTrash className='text-red-600'/> Delete Account
               </button>
            </div>
         </div>
      </main>

      {verifyPassword && (
         <div className="fixed z-99 w-full h-screen flex items-center justify-center bg-[#0003] bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
               <h2 className="text-xl font-semibold mb-4">Verify Password</h2>
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
               />
               <button
                  onClick={verifyPasswordHandler}
                  disabled={loading}
                  className="bg-[#02487F] text-white px-4 py-2 rounded-lg cursor-pointer"
               >
                  {loading ? "Verifying..." : "Verify"}
               </button>
            </div>
         </div>
      )}
    </div>
  )
}

export default Setting
