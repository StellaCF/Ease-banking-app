import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar"; 
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie"

const Deposit = () => {
  const [user, setUser] = useState();
  const [amount, setAmount] = useState("");
  const authToken = Cookies.get("auth_token")

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
  },[authToken])

  const handleDeposit = async (e) => {
    e.preventDefault();
    console.log("Depositing:", amount);
    try {
      const response = await axios.post("https://ease-banking-app.onrender.com/api/user/deposit",  
      { amount: Number(amount) }, 
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      toast.success(response?.message)
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 ml-64">
        {/* KYC Banner */}
        <TopBar/>

        {/* Deposit Form Section */}
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-[#02487F] mb-6">Deposit Funds</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Bank Name</label>
              <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700">
                Ease Bank
              </div>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">Account Number</label>
              <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700">
                {user?.acctNumber}
              </div>
            </div>
          </div>

          <form onSubmit={handleDeposit}>
            <div className="mb-6">
              <label htmlFor="amount" className="block text-gray-600 font-medium mb-2">
                Amount to Deposit
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1384AB] transition"
                placeholder="Enter amount"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#02487F] hover:bg-[#1384AB] text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Deposit Now
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Deposit;
