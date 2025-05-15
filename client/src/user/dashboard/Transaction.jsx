import { useState } from "react";
import Sidebar from "../../components/SideBar";
import { motion, AnimatePresence } from "framer-motion";

const TransactionPage = () => {
  const [filter, setFilter] = useState("All");

  const transactions = [
    { type: "Deposit", amount: 5000, date: "2025-05-10", status: "Successful" },
    { type: "Withdraw", amount: 2000, date: "2025-05-11", status: "Pending" },
    { type: "Transfer", amount: 1500, date: "2025-05-12", status: "Failed" },
    { type: "Deposit", amount: 8000, date: "2025-05-13", status: "Successful" },
    { type: "Withdraw", amount: 1000, date: "2025-05-14", status: "Successful" },
  ];

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((txn) => txn.type === filter);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 space-y-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#02487F]">Transaction History</h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          {["All", "Deposit", "Transfer", "Withdraw"].map((item) => (
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
        <div className="overflow-auto rounded-xl shadow bg-white">
          <table className="min-w-full text-left table-auto">
            <thead className="bg-[#02487F] text-white">
              <tr>
                <th className="py-3 px-6 font-medium text-sm">Type</th>
                <th className="py-3 px-6 font-medium text-sm">Amount</th>
                <th className="py-3 px-6 font-medium text-sm">Date</th>
                <th className="py-3 px-6 font-medium text-sm">Status</th>
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
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">{txn.type}</td>
                    <td className="py-4 px-6">₦{txn.amount.toLocaleString()}</td>
                    <td className="py-4 px-6">{txn.date}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          txn.status === "Successful"
                            ? "bg-green-100 text-green-600"
                            : txn.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
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
