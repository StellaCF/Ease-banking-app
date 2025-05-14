import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoanPage = () => {
  const navigate = useNavigate();

  const [loanAmount, setLoanAmount] = useState("");
  const [currentLoan, setCurrentLoan] = useState(0);
  const [bankActivity] = useState(8000); // Simulated banking activity
  const [maxLoanableAmount, setMaxLoanableAmount] = useState(0);
  const [showRepayField, setShowRepayField] = useState(false);
  const [repayAmount, setRepayAmount] = useState("");
  const [showLoanForm, setShowLoanForm] = useState(false);

  // Loan application form fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [nin, setNIN] = useState("");

  const accountBalance = 1200.75; // Simulated balance

  useEffect(() => {
    const calculatedMax = bankActivity * 0.5;
    setMaxLoanableAmount(calculatedMax);
  }, [bankActivity]);

  const handleAddLoan = () => {
    const amount = parseFloat(loanAmount);

    if (!fullName || !phone || !address || !nin) {
      toast.error("Please complete all application form fields.");
      return;
    }

    if (!amount || amount <= 0 || amount > maxLoanableAmount) {
      toast.error("Invalid loan amount.");
      return;
    }

    setCurrentLoan((prev) => prev + amount);
    setLoanAmount("");
    setFullName("");
    setPhone("");
    setAddress("");
    setNIN("");
    setShowLoanForm(false);
    toast.success("Loan successfully added!");
  };

  const handleToggleRepayField = () => {
    setShowRepayField((prev) => !prev);
    setShowLoanForm(false);
  };

  const handleRepayLoan = () => {
    const amount = parseFloat(repayAmount);
    if (!amount || amount <= 0 || amount > currentLoan) {
      toast.error("Invalid repayment amount.");
      return;
    }
    setCurrentLoan((prev) => prev - amount);
    setRepayAmount("");
    setShowRepayField(false);
    toast.success("Loan repayment successful.");
  };

  const toggleLoanForm = () => {
    setShowLoanForm((prev) => !prev);
    setShowRepayField(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 space-y-8">
        <TopBar username="user" accountBalance={accountBalance} />

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        {/* Loan Action Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Loan Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 rounded-lg bg-[#02487F] text-white">
              <h4 className="text-lg font-semibold mb-2">Loan Amount</h4>
              <p className="text-2xl font-bold">₦{currentLoan.toLocaleString()}</p>
            </div>

            <div
              onClick={toggleLoanForm}
              className="p-6 rounded-lg cursor-pointer bg-[#1384AB] text-white"
            >
              <h4 className="text-lg font-semibold mb-2">Request Loan</h4>
              <p className="text-sm">Submit a new loan application</p>
            </div>

            <div
              onClick={handleToggleRepayField}
              className="p-6 rounded-lg cursor-pointer bg-[#1384AB] text-white"
            >
              <h4 className="text-lg font-semibold mb-2">Repay Loan</h4>
              <p className="text-sm">Pay down your existing loan</p>
            </div>
          </div>
        </div>

        {/* Loan Form Section */}
        {showLoanForm && (
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
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
          </div>
        )}

        {/* Repayment Section */}
        {showRepayField && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
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
          </div>
        )}
      </main>
    </div>
  );
};

export default LoanPage;
