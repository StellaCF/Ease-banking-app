// import React from 'react'
import Sidebar from '../../components/SideBar'
import { useState } from 'react';
import { FaTrash, FaShieldAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Setting = () => {
   const [verifyPassword, setVerifyPassword] = useState(false);
   const [resetPin, setResetPin] = useState(false);
   const [deleteAccount, setDeleteAccount] = useState(false);
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);

   const authToken = Cookies.get("auth_token");
   const navigate = useNavigate();
     const {
       register,
       formState: { errors },
       handleSubmit,
       watch,
       reset,
     } = useForm({
       defaultValues: {
         newPin: "",
       },
     });

     const onSubmit = async (data) => {
      setLoading(true); 
      try {
         const response = await axios.post(
            "https://ease-banking-app.onrender.com/api/user/reset-pin",
            data,
            {
               headers: {
                  authorization: `Bearer ${authToken}`,
               },
            }
         );
         const { message } = response.data;
         toast.success(message);
         reset();
      } catch (error) {
         toast.error(error.response.data.error || "error setting pin");
      }
     }

   const handleVerifyPassword = async () => {
      try {
         if (!password) {
            toast.error("Password is required.");
            return;
         }
         setLoading(true); 
         const axiosRes = await axios.post("https://ease-banking-app.onrender.com/api/user/verify-password", 
            {password: password},
            {
               headers: {
                  Authorization: `Bearer ${authToken}`,
               },
            }
         )
         const response = axiosRes.data;
         toast.success(response.message);
         setPassword("");
         setVerifyPassword(false);
         setResetPin(true);
      } catch (error) {
         toast.error(error.response.data.error || "error verifying password");  
      }
      setLoading(false);
   }

   const handleDeleteAccount = async () => {
      if (!password) {
         toast.error("Password is required.");
         return;
      }
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
         setPassword("");
         toast.success(response.message);

         const deleteRes = await axios.delete("https://ease-banking-app.onrender.com/api/delete-acct", {
            headers: {
               Authorization: `Bearer ${authToken}`,
            },
         })
         const deleteResponse = deleteRes.data;
         toast.success(deleteResponse.message);
         setDeleteAccount(false);
         Cookies.remove("auth_token");
         navigate("/");
      } catch (error) {
         toast.error(error.response.data.error || "error verifying password");
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
               <button 
                  onClick={() => setVerifyPassword(true)}
                  className="bg-white flex items-center gap-1  shadow-md rounded-lg text-left px-6 py-3 text-md font-semibold cursor-pointer">
                  <FaShieldAlt className='text-[#02487f]'/> Change Transaction Pin
               </button>
               <button
                  onClick={() => setDeleteAccount(true)}
                  className="bg-white flex items-center gap-1 shadow-md rounded-lg text-left px-6 py-3 text-md font-semibold cursor-pointer">
                    <FaTrash className='text-red-600'/> Delete Account
               </button>
            </div>
         </div>
      </main>

      {verifyPassword && (
         <div className="fixed z-99 w-full h-screen flex items-center justify-center bg-[#0003] bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Verify Password</h2>
                  <button
                  onClick={() => setVerifyPassword(false)} className='text-gray-600 hover:text-red-600 text-lg font-bold cursor-pointer'>x</button>
               </div>
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
               />
               <button
                  onClick={handleVerifyPassword}
                  disabled={loading}
                  className="bg-[#02487F] text-white px-4 py-2 rounded-lg cursor-pointer"
               >
                  {loading ? "Verifying..." : "Verify"}
               </button>
            </div>
         </div>
      )}

      {resetPin && (
         <div className="fixed z-99 w-full h-screen flex items-center justify-center bg-[#0003] bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Reset Transaction Pin</h2>
                  <button
                  onClick={() => setResetPin(false)} className='text-gray-600 hover:text-red-600 text-lg font-bold cursor-pointer'>x</button>
               </div>
               {/* Add your reset pin form here */}
               <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="Enter new pin"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
                  {...register("newPin", { required: "Pin is required" })}
               />
               {errors.pin && (
                  <p className="hover:text-red-500">{errors.pin.message}</p>
               )}
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="Confirm pin"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
                  {...register("confirmPin", { required: "Confirm Pin", validate: (value) =>
                     value === watch("newPin") })}
               />
               {errors.pin && (
                  <p className="text-red-500">{errors.pin.message}</p>
               )}
               <div>
                  <button
                     onClick={handleSubmit(onSubmit)}
                   className='bg-[#02487F] text-white px-4 py-2 rounded-lg cursor-pointer'>Set Pin</button>
               </div>
            </div>
         </div>
      )}

      {deleteAccount && (
         <div className="fixed z-99 w-full h-screen flex items-center justify-center bg-[#0003] bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg py-10 px-16 ">
               <h2 className="text-md text-red-600 font-semibold mb-4">⚠️ Are you sure you want to delete your account?</h2>
               <ul className='flex flex-col gap-1'>
                  <li className='text-sm font-medium mb-1'>Deleting your account is permanent. This action will:</li>
                  <li className='list-disc text-sm'>Remove your personal information and account details.</li>
                  <li className='list-disc text-sm'>Erase your transaction history, balance, and activity records.</li>
                  <li className='list-disc text-sm'>Prevent any future recovery of your account.</li>
                  <li className='font-medium text-sm mt-3'>If you are sure, please confirm by entering your password.</li>
               </ul>
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full my-4"
               />
               <div className="flex gap-3 justify-end mt-4">
                  <button
                     onClick={handleDeleteAccount}
                     disabled={loading}
                     className="bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                     {loading ? "Deleting..." : "Delete"}
                  </button>
                  <button
                     onClick={() => setDeleteAccount(false)}
                     className="bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                     Cancel
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  )
}

export default Setting
