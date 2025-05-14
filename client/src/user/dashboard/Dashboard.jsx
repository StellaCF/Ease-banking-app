import { useState } from "react";
import Sidebar from "../../components/SideBar";
import { useNavigate } from "react-router-dom";

const features = [
  { title: "Deposit", description: "Fund your account securely", color: "bg-[#1384AB]", path: "/depositPage" },
  { title: "Withdraw", description: "Withdraw to your local bank", color: "bg-[#1384AB]", path: "/WithdrawPage" },
  { title: "Transfer", description: "Send money instantly", color: "bg-[#1384AB]", path: "/TransferPage" },
  { title: "Save", description: "Set money aside for goals", color: "bg-[#1384AB]", path: "/SavePage" },
];

const transactions = [
  { id: 1, type: "Deposit", amount: 500, date: "May 12, 2025", status: "Completed" },
  { id: 2, type: "Transfer", amount: 200, date: "May 10, 2025", status: "Pending" },
  { id: 3, type: "Withdraw", amount: 100, date: "May 8, 2025", status: "Completed" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const accountBalance = 1200.75;``

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((tx) => tx.type === filter);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 ml-64">
        {/* KYC Banner with Greeting & Balance */}
        <div className="bg-gradient-to-r from-[#02487F] to-[#1384AB] text-white p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-lg">Hi, user</h1>
              <h2 className="text-xl font-semibold mt-4">Account Balance</h2>
              <p className="text-3xl font-bold mt-1">₦{accountBalance.toFixed(2)}</p>
            </div>

            <div className="text-right">
              {/* <h2 className="text-2xl font-semibold">Unlock more account privileges</h2>
              <button className="mt-4 bg-white text-[#02487F] font-semibold px-4 py-2 rounded-full">
                Complete KYC Verification
              </button> */}
            </div>
          </div>
        </div>

        {/* Quick Action Features */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div key={feature.title} onClick={() => navigate(feature.path)} className={`p-6 rounded-lg cursor-pointer text-white ${feature.color}`}>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History with Filter */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Transaction History</h3>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
            >
              <option value="All">All</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
              <option value="Transfer">Transfer</option>
            </select>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 text-sm border-b">
                <th className="py-2">Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="text-sm border-b text-gray-700">
                  <td className="py-2">{tx.type}</td>
                  <td className="py-2">₦{tx.amount}</td>
                  <td className="py-2">{tx.date}</td>
                  <td className="py-2">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
