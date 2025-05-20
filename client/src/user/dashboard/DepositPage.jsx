import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import axios from "axios";
import { toast } from "react-toastify";
<<<<<<< HEAD
import Cookies from "js-cookie";
=======
import Cookies from "js-cookie"
import Loader from "../../components/Loader";
>>>>>>> 8c509cd2cf3ef9dba30c11520884d4443d9cf843

const Deposit = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [amount, setAmount] = useState("");
  const authToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const axiosRes = await axios.get("https://ease-banking-app.onrender.com/api/user", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const response = axiosRes.data;
        setUser(response.data);
      } catch (error) {
<<<<<<< HEAD
        toast.error(error?.response?.data?.message || "Failed to fetch user data");
=======
        toast.error(error.response.error.message);
      } finally {
        setLoading(false);
>>>>>>> 8c509cd2cf3ef9dba30c11520884d4443d9cf843
      }
    };

    fetchUser();
  }, [authToken]);

  const handleDeposit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
=======
    console.log("Depositing:", amount);
    setLoading(true);
>>>>>>> 8c509cd2cf3ef9dba30c11520884d4443d9cf843
    try {
      const response = await axios.post(
        "https://ease-banking-app.onrender.com/api/user/deposit",
        { amount: Number(amount) },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      toast.success(response.data.message);
      setAmount("");
    } catch (error) {
<<<<<<< HEAD
      toast.error(error?.response?.data?.error || "Deposit failed");
=======
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
>>>>>>> 8c509cd2cf3ef9dba30c11520884d4443d9cf843
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 px-4 sm:px-6 md:px-8 py-8 space-y-8 transition-all duration-300 ml-0 lg:ml-64">
        <TopBar />

        <div className="w-full mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#02487F] mb-6">Deposit Funds</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 mb-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Bank Name</label>
              <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700">
                Ease Bank
              </div>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">Account Name</label>
              <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700">
                Name Name
              </div>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">Account Number</label>
              <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700">
                {user?.acctNumber || "Loading..."}
              </div>
            </div>
          </div>

          <form onSubmit={handleDeposit} className="mt-8">
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
      <Loader loading={loading} inline={false} size={150}/>
    </div>
  );
};

export default Deposit;
