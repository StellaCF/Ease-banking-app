import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";
import Cookies from "js-cookie"
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
  const navigate = useNavigate();
  const authToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchUserTrans = async () => {
      setLoading(true);
      try {
        const axiosRes = await axios.get("https://ease-banking-app.onrender.com/api/user-transactions", 
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );
        const response = axiosRes.data;
        console.log(response)
        setHistory(response.data.transactions);
      } catch (error) {
        toast.error(error.response.error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTrans();
  },[authToken])


  const formatDateAndTime = (isoString) => {
    const dateObj = new Date(isoString);
    const date = dateObj.toLocaleDateString("en-NG", {
      // year: "numeric",
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 ml-64">
        <TopBar/>

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
            <h3 className="text-xl font-semibold">Recent Transactions</h3>
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
              {history.map((tx) => (
                <tr key={tx.id} className="text-sm border-b text-gray-600">
                  <td className="py-4">{tx.type}</td>
                  <td className="py-4">₦{tx.amount}</td>
                  <td className="py-4">{formatDateAndTime(tx.createdAt).date} | {formatDateAndTime(tx.createdAt).time}</td>
                  <td className="py-4">{tx.status}</td>
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
