import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const LoanPage = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [currentLoan, setCurrentLoan] = useState(0);
  const [bankActivity] = useState(8000);
  const [maxLoanableAmount, setMaxLoanableAmount] = useState(0);
  const [showRepayField, setShowRepayField] = useState(false);
  const [repayAmount, setRepayAmount] = useState("");
  const [showLoanForm, setShowLoanForm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [nin, setNIN] = useState("");

  useEffect(() => {
    setMaxLoanableAmount(bankActivity * 0.5);
  }, [bankActivity]);

  const handleAddLoan = () => {
    const amount = parseFloat(loanAmount);

    if (!fullName || !phone || !address || !nin) {
      toast.error("Please complete all application form fields.", {
        icon: "❌",
      });
      return;
    }

    if (!amount || amount <= 0 || amount > maxLoanableAmount) {
      toast.error("Invalid loan amount.", { icon: "⚠️" });
      return;
    }

    setCurrentLoan((prev) => prev + amount);
    setLoanAmount("");
    setFullName("");
    setPhone("");
    setAddress("");
    setNIN("");
    setShowLoanForm(false);
    toast.success("Loan successfully added!", { icon: "✅" });
  };

  const handleRepayLoan = () => {
    const amount = parseFloat(repayAmount);

    if (!amount || amount <= 0 || amount > currentLoan) {
      toast.error("Invalid repayment amount.", { icon: "⚠️" });
      return;
    }

    setCurrentLoan((prev) => prev - amount);
    setRepayAmount("");
    setShowRepayField(false);
    toast.success("Loan repayment successful.", { icon: "✅" });
  };

  const toggleLoanForm = () => {
    setShowLoanForm((prev) => !prev);
    setShowRepayField(false);
  };

  const handleToggleRepayField = () => {
    setShowRepayField((prev) => !prev);
    setShowLoanForm(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 space-y-8">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        {/* Top Section with Loan Info and Actions */}
        <div className="bg-gradient-to-r from-[#1384AB] to-[#024875]  text-white p-6 h-52 rounded-2xl shadow flex flex-col md:flex-row md:justify-between">
          <div>
            <h4 className="text-lg mt-8 font-semibold">Current Loan Amount</h4>
            <p className="text-3xl font-bold mt-1">₦{currentLoan.toLocaleString()}</p>
          </div>

          <div className="mt-auto flex gap-4">
            <button
              onClick={toggleLoanForm}
              className="bg-[#1384AB] hover:bg-[#0e6b8f] transition duration-300 text-white px-6 py-4 rounded-lg font-semibold"
            >
              Request Loan
            </button>
            <button
              onClick={handleToggleRepayField}
              className="bg-[#1384AB] hover:bg-[#0e6b8f] transition duration-300 text-white px-6 py-4 rounded-lg font-semibold"
            >
              Repay Loan
            </button>
          </div>
        </div>

        {/* Loan Form Animation */}
        <AnimatePresence>
          {showLoanForm && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-3xl font-bold text-[#02487F] mb-6">Loan Management</h2>
              <p className="text-red-600 text-sm mb-4">
                ⚠️ If a loan is not repaid within 30 days, it will be automatically deducted from your account.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-600 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-2">Residential Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                    placeholder="Enter address"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-2">National ID Number (NIN)</label>
                  <input
                    type="text"
                    value={nin}
                    onChange={(e) => setNIN(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                    placeholder="Enter NIN"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Loan Amount</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter loan amount"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                />
              </div>

              <button
                onClick={handleAddLoan}
                className="bg-[#02487F] hover:bg-[#1384AB] text-white font-semibold py-3 px-6 rounded-lg transition w-full"
              >
                Submit Loan Request
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Repayment Form Animation */}
        <AnimatePresence>
          {showRepayField && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-2xl font-bold text-[#02487F] mb-4">Repay Loan</h2>
              <label className="block text-gray-600 font-medium mb-2">Repayment Amount</label>
              <input
                type="number"
                value={repayAmount}
                onChange={(e) => setRepayAmount(e.target.value)}
                placeholder="Enter amount to repay"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              />
              <button
                onClick={handleRepayLoan}
                className="mt-4 w-full bg-[#02487F] hover:bg-[#1384AB] text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Confirm Repayment
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default LoanPage;
