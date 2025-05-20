import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const [filter, setFilter] = useState("All");
  const [transactions, setTransactions] = useState([]);
  const authToken = Cookies.get("auth_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const axiosRes = await axios.get("https://ease-banking-app.onrender.com/api/user-transactions", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        });
        const response = axiosRes.data;
        toast.success(response.data.message);
        const combinedTransactions = [
          ...(response.data.transactions || []).map(t => ({ ...t, source: "transactions" })),
          ...(response.data.loanSave || []).map(t => ({ ...t, source: "loanSave" }))
        ];

        combinedTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTransactions(combinedTransactions);
      } catch (error) {
        toast.error(error.response?.data?.message || error.response?.data?.error || "Error fetching transactions");
      }
    };
    fetchTransactions();
  }, [authToken]);

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

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((txn) => txn.type === filter);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 space-y-6 md:ml-64">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#02487F]">Transaction History</h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-4">
          {["All", "deposit", "transfer", "withdraw"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === item
                  ? "bg-[#02487F] text-white"
                  : "bg-white text-[#02487F] border border-[#02487F]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto rounded-xl shadow bg-white">
          <table className="min-w-full text-left table-auto">
            <thead className="bg-[#E6F7FB] text-black">
              <tr>
                <th className="py-3 px-4 md:px-6 text-xs md:text-sm font-medium">Type</th>
                <th className="py-3 px-4 md:px-6 text-xs md:text-sm font-medium">Amount</th>
                <th className="py-3 px-4 md:px-6 text-xs md:text-sm font-medium">Date</th>
                <th className="py-3 px-4 md:px-6 text-xs md:text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredTransactions.map((txn, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-[#eee] hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      navigate(`/transactiondetails`, {
                        state: { txn },
                      })
                    }
                  >
                    <td className="py-4 px-4 md:px-6 text-sm">{txn.type}</td>
                    <td className="py-4 px-4 md:px-6 text-sm">₦{txn.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 md:px-6 text-sm">
                      {formatDateAndTime(txn.createdAt).date} |{" "}
                      {formatDateAndTime(txn.createdAt).time}
                    </td>
                    <td className="py-4 px-4 md:px-6 text-sm">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                        {txn.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TransactionPage;
