import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import Loader from "../../components/Loader";

const features = [
  { title: "Deposit", description: "Fund your account securely", color: "bg-[#1384AB]", path: "/depositPage" },
  { title: "Withdraw", description: "Withdraw to your local bank", color: "bg-[#1384AB]", path: "/WithdrawPage" },
  { title: "Transfer", description: "Send money instantly", color: "bg-[#1384AB]", path: "/TransferPage" },
  { title: "Save", description: "Set money aside for goals", color: "bg-[#1384AB]", path: "/SavePage" },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const authToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchUserTrans = async () => {
      setLoading(true);
      try {
        const axiosRes = await axios.get("https://ease-banking-app.onrender.com/api/user-transactions", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setHistory(axiosRes.data.data.transactions);
      } catch (error) {
        toast.error(error.response.error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTrans();
  }, [authToken]);

  const formatDateAndTime = (isoString) => {
    const dateObj = new Date(isoString);
    const date = dateObj.toLocaleDateString("en-NG", { month: "numeric", day: "numeric" });
    const time = dateObj.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit", hour12: true });
    return { date, time };
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 md:px-8 py-8 space-y-8 transition-all duration-300 lg:ml-64">
        <TopBar />

        {/* Quick Actions */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                onClick={() => navigate(feature.path)}
                className={`p-4 sm:p-6 rounded-lg cursor-pointer text-white ${feature.color}`}
              >
                <h4 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">{feature.title}</h4>
                <p className="text-xs sm:text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg sm:text-xl font-semibold">Recent Transactions</h3>
          </div>

          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4 hidden md:table-cell">Date</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((tx) => (
                <tr key={tx.id} className="border-b text-gray-700">
                  <td className="py-3 pr-4">{tx.type}</td>
                  <td className="py-3 pr-4">₦{tx.amount}</td>
                  <td className="py-3 pr-4 hidden md:table-cell">
                    {formatDateAndTime(tx.createdAt).date} | {formatDateAndTime(tx.createdAt).time}
                  </td>
                  <td className="py-3 pr-4">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Loader loading={loading} inline={false} size={150}/>
    </div>
  );
};

export default Dashboard;
