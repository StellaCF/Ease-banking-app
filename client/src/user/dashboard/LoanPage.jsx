import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const LoanPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [history, setHistory] = useState([]);

  const [loanAmount, setLoanAmount] = useState("");
  const [showRepayField, setShowRepayField] = useState(false);
  const [repayAmount, setRepayAmount] = useState("");
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [address, setAddress] = useState("");
  const [nin, setNIN] = useState("");

  const authToken = Cookies.get("auth_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const axiosRes = await axios.get("https://ease-banking-app.onrender.com/api/user", 
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );
        const response = axiosRes.data;
        setUser(response.data);
        setHistory(response.data.loanSave);
      } catch (error) {
        toast.error(error.response.error.message);
      }
    };

    const fetchUserTrans = async () => {
      try {
        const axiosRes = await axios.get("https://ease-banking-app.onrender.com/api/user-transactions", 
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );
        const response = axiosRes.data;
        setHistory(response.data.loanSave);
      } catch (error) {
        toast.error(error.response.error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchUserTrans();
  }, [authToken]);

  const fullname = user?.firstName + " " + user?.otherName + " " + user?.lastName;

  const filteredHistory = history?.filter((h) => h.type === "loan" || h.type === "repayment");
  console.log(filteredHistory);

  // const totalLoan = (safeHistory.filter(l => l.type === "loan").reduce((sum, l) => sum + Number(l.amount), 0));
  // const totalRepay = (safeHistory.filter(l => l.type === "repayment").reduce((sum, l) => sum + Number(l.amount), 0));
  // let loanAmt  = Number(totalLoan - totalRepay).toFixed(2);
  // if (loanAmt < 0) {
  //   loanAmt = 0.00;
  // }

  const loanAmt = user?.loanBalance || 0.00;

  const formatDateAndTime = (isoString) => {
    const dateObj = new Date(isoString);
    const date = dateObj.toLocaleDateString("en-NG", {
      month: "numeric",
      day: "numeric",
    });

    const time = dateObj.toLocaleTimeString("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { date, time };
  };

  const handleAddLoan = async () => {
    if ((!user.address && !address.trim()) || (!user.nin && !nin.trim())) {
      toast.error("Please complete all application form fields.", {
        icon: "❌",
      });
      return;
    }
    if(!loanAmount){
      toast.error("Amount required")
    }
    const amount = Number(loanAmount);
    setLoading(true);
    try {
      const axiosRes = await axios.post("https://ease-banking-app.onrender.com/api/user/loan", {amount: amount, address, nin}, {
        headers: {
          Authorization: `Bearer ${authToken}`
        },
      })
      const response = axiosRes.data;
      toast.success(response.message, { icon: "✅" });
      setLoanAmount("");
      setShowLoanForm(false);
    } catch (error) {
      toast.error(error.response.error, { icon: "⚠️" });
      return;  
    } finally {
      setLoading(false);
    }
  };

  const handleRepayLoan = async () => {
    if(!repayAmount){
      toast.error("Amount required")
    }
    if (repayAmount > loanAmt) {
      toast.error("Repayment amount cannot exceed loan amount");
      return;
    }
    const amount = Number(repayAmount);
    setLoading(true);
    try {
      const axiosRes = await axios.post("https://ease-banking-app.onrender.com/api/user/repay-loan", {amount: amount}, {
        headers: {
          Authorization: `Bearer ${authToken}`
        },
      })
      const response = axiosRes.data;
      toast.success(response.message, { icon: "✅" });
      setRepayAmount("");
      setShowRepayField(false);
    } catch (error) {
      toast.error(error.response.data.error, { icon: "⚠️" });
      return;
    } finally {
      setLoading(false);
    }
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 md:p-8 space-y-8">
        <div className="bg-gradient-to-r from-[#024875] to-[#1384AB] text-white h-40 p-6 rounded-2xl shadow flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold">Current Loan Amount</h4>
            <p className="text-3xl font-bold mt-2">₦{Number(loanAmt).toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}</p>
          </div>

          <div className="flex items-center justify-end gap-2 lg:mt-6 md:gap-4">
            <button
              onClick={toggleLoanForm}
              className="bg-[#20B6D9] hover:bg-[#0e6b8f] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold"
            >
              Request Loan
            </button>
            <button
              onClick={handleToggleRepayField}
              disabled={Number(loanAmt) === 0.00}
              className="bg-[#20B6D9] hover:bg-[#0e6b8f] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold"
            >
              Repay Loan
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showLoanForm && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-xl md:text-3xl font-bold text-[#02487F] mb-6">Loan Management</h2>
              <p className="text-red-600 text-sm mb-4">
                ⚠️ If a loan is not repaid within 30 days, it will be automatically deducted from your account.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                <div>
                  <label className="block text-gray-600 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullname}
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={user?.phoneNumber}
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
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
                className="bg-[#02487F] hover:bg-[#1384AB] text-white font-semibold py-3 px-6 rounded-lg w-full"
              >
                Submit Loan Request
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRepayField && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-xl md:text-2xl font-bold text-[#02487F] mb-4">Repay Loan</h2>
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
                className="mt-4 w-full bg-[#02487F] hover:bg-[#1384AB] text-white font-semibold py-3 px-6 rounded-lg"
              >
                Confirm Repayment
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow mb-20 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-semibold">Loan History</h3>
          </div> 

          {filteredHistory?.length === 0 ? (
            <p>You dont have any loan history yet</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-600 text-sm border-b">
                  <th className="py-2">Type</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2 hidden md:table-cell">Date</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory?.map?.((txn) => (
                  <tr key={txn.id}
                  onClick={() =>
                    navigate(`/transactiondetails`, {
                      state: { txn },
                    })
                  }
                    className="text-sm border-b text-gray-600 cursor-pointer">
                    <td className="py-4">{txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}</td>
                    <td className="py-4">₦{Number(txn.amount).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}</td>
                    <td className="py-4 hidden md:block">{formatDateAndTime(txn.createdAt).date} | {formatDateAndTime(txn.createdAt).time}</td>
                    <td className="py-4">{txn.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Loader loading={loading} inline={false} size={150} />
    </div>
  );
};

export default LoanPage;
