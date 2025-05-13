import React from "react";
import payment from "../assets/payment.png";

const TransactionPin = () => {
  // Restrict input to digits only
  return (
    <div>
      <div className="w-10/12 h-screen flex justify-between gap-10 mx-auto items-center">
        <div className="ms-8 w-1/2">
          <div className="justify-center items-center bg-white">
            <h1 className="text-center text-4xl text-[#02487F] font-extrabold mt-8">
              SET TRANSACTION PIN
            </h1>
          </div>
          <form className="flex flex-col gap-y-2 w-full p-4">
            <label>Enter Pin</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
              required
            />
            <label>Confirm Pin</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="Confirm 4-digit PIN"
              className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
              required
            />
            <button
              type="submit"
              className="bg-[#02487F] text-white p-2 rounded-md mt-5 hover:bg-[#1384AB] transition duration-300 ease-in-out"
            >
              Set Pin
            </button>
          </form>
        </div>
        <div className="h-full w-1/2">
          <img src={payment} alt="Payment Illustration" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default TransactionPin;
