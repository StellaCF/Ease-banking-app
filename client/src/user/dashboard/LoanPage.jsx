import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

const LoanPage = () => {
  const [user, setUser] = useState();
  const [loanAmount, setLoanAmount] = useState("");
  const [currentLoan, setCurrentLoan] = useState(0);
  const [showRepayField, setShowRepayField] = useState(false);
  const [repayAmount, setRepayAmount] = useState("");
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [address, setAddress] = useState("");
  const [nin, setNIN] = useState("");

  const authToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const axiosRes = await axios.get("https://ease-banking-app.onrender.com/api/user", 
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );
        const response = axiosRes.data;
        console.log(response)
        setUser(response.data);
      } catch (error) {
        toast.error(error.response.error.message);
      }
    };

    fetchUser();
  }, [authToken]);

  const fullname = user?.firstName + " " + user?.otherName + " " + user?.lastName;

  
  const handleAddLoan = async () => {
    if (!address || !nin) {
      toast.error("Please complete all application form fields.", {
        icon: "❌",
      });
      return;
    }
    const amount = Number(loanAmount);
    try {
      const axiosRes = await axios.post("https://ease-banking-app.onrender.com/api/user/loan", {amount: amount}, {
        headers: {
          Authorization: `Bearer ${authToken}`
        },
      })
      const response = axiosRes.data;
      toast.success(response.message, { icon: "✅" });
      setLoanAmount("");
      setAddress("");
      setNIN("");
      setShowLoanForm(false);
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.error, { icon: "⚠️" });
      return;
      
    }

    setCurrentLoan((prev) => prev + amount);
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
        {/* Top Section with Loan Info and Actions */}
        <div className="bg-gradient-to-r from-[#1384AB] to-[#024875]  text-white p-6 h-52 rounded-2xl shadow flex flex-col md:flex-row md:justify-between">
          <div>
            <h4 className="text-lg mt-8 font-semibold">Current Loan Amount</h4>
            <p className="text-3xl font-bold mt-1">₦{loanAmount}</p>
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
                    value={fullname}
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={user?.phoneNumber}
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-2">Residential Address</label>
                  <input
                    type="text"
                    value={user.address || address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!!user.address}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                    placeholder="Enter address"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-2">National ID Number (NIN)</label>
                  <input
                    type="text"
                    value={user.nin || nin}
                    onChange={(e) => setNIN(e.target.value)}
                    disabled={!!user.nin}
                    required
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
