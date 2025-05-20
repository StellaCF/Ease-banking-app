import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie"
import Loader from "../../components/Loader";

const SavePage = () => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [user, setUser] = useState();
  const [amount, setAmount] = useState("");
  const [savings, setSavings] = useState([]);
  const [activeAction, setActiveAction] = useState({});
  const [actionAmount, setActionAmount] = useState({}); 

  const authToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchSavings = async () => {
      setLoading(true);
      try {
        const axiosRes = await axios.get("https://ease-banking-app.onrender.com/api/user/user-savings", {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const response = axiosRes.data;
        setSavings(response.data);
        console.log(response);
      } catch (error) {
        console.error(error.response.data.error);
      } 
    };

    const fetchUser = async () => {
    try {
      const axiosRes = await axios.get("https://ease-banking-app.onrender.com/api/user", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const response = axiosRes.data;
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

    fetchSavings();
    fetchUser();
  }, [authToken]);

  const handleSave = async () => {
    const parsedAmount = parseFloat(amount);
    setLoading(true);
    try {
      const axiosRes = await axios.post("https://ease-banking-app.onrender.com/api/user/save", 
        {
          amount: parsedAmount,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      )
      const response = axiosRes.data;
      toast.success(response.message);
      console.log(response.data);
      setDescription("");
      setAmount("");
    } catch (error) {
      toast.error(error.response.data.error)
    } finally {
      setLoading(false);
    }
  };

  const toggleAction = (id, type) => {
    setActiveAction((prev) => ({
      ...prev,
      [id]: prev[id] === type ? null : type,
    }));
    setActionAmount((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleActionSubmit = async (id, type) => {
    const amount = parseFloat(actionAmount[id]);
    setLoading(true);
    try {
      if (type === "spend") {
        const axiosRes = await axios.post(`https://ease-banking-app.onrender.com/api/user/spend/${id}`, { amount }, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const response = axiosRes.data;
        toast.success(response.message);
        setActiveAction((prev) => ({ ...prev, [id]: null }));
        setActionAmount((prev) => ({ ...prev, [id]: "" }));
      } else {
        const axiosRes = await axios.patch(`https://ease-banking-app.onrender.com/api/user/save/${id}/update`, { amount }, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const response = axiosRes.data;
        toast.success(response.message);
        setActiveAction((prev) => ({ ...prev, [id]: null }));
        setActionAmount((prev) => ({ ...prev, [id]: "" }));
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="md:w-64">
        <Sidebar />
      </div>

      <main className="flex-1 p-4 md:p-8 space-y-8">
        <TopBar/>

        <div className="w-full mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-[#02487F] ">Save Money</h2>
            <h3 className="text-lg text-[#02487F] font-semibold">Total Savings: ₦{user?.savingsBalance}</h3>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 md:py-3"
                placeholder="e.g. Vacation Fund"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 md:py-3"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="bg-[#02487F] hover:bg-[#1384AB] text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition w-full md:w-auto"
          >
            Save
          </button>

          {savings.length > 0 && (
            <div className="grid gap-4">
              {savings.map((save) => (
                <div
                  key={save.id}
                  className="border border-gray-300 p-4 md:p-6 rounded-xl bg-[#E6F7FB] shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-[#02487F]">{save.description}</h3>
                      <p className="mt-2 md:mt-4 text-gray-700">₦{save.amount}</p>
                    </div>

                    <div className="flex space-x-2 mt-4 md:mt-0">
                      <button
                        onClick={() => toggleAction(save.id, "spend")}
                        className="bg-[#02487F] hover:bg-[#1384AB] cursor-pointer text-white py-1 px-4 rounded-lg"
                      >
                        Spend
                      </button>
                      <button
                        onClick={() => toggleAction(save.id, "add")}
                        className="bg-[#02487F] hover:bg-[#1384AB] cursor-pointer text-white py-1 px-4 rounded-lg"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {activeAction[save.id] && (
                    <div className="mt-4 space-y-2">
                      <input
                        type="number"
                        placeholder={`Enter amount to ${activeAction[save.id]}`}
                        value={actionAmount[save.id]}
                        onChange={(e) =>
                          setActionAmount({ ...actionAmount, [save.id]: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                      <button
                        onClick={() => handleActionSubmit(save.id, activeAction[save.id])}
                        className="w-full bg-[#02487F] hover:bg-[#1384AB] cursor-pointer text-white py-2 px-6 rounded-lg"
                      >
                        Confirm {activeAction[save.id]}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Loader loading={loading} inline={false} size={150} />
    </div>
  );
};

export default SavePage;
