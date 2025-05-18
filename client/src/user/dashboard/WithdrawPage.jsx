import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Loader from "../../components/Loader";

const WithdrawPage = () => {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const authToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://api.paystack.co/bank?currency=NGN", {
          headers: {
            Authorization: `Bearer sk_test_b8d340f2a02c8948240cf554228c1112b0fe93a7`,
          },
        });
        if (response.data.status) {
          setBanks(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  const handleVerify = async () => {
    if (accountNumber.length !== 10 || !selectedBank) {
      toast.warn("Please enter a valid 10-digit account number and select a bank.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${selectedBank}`,
        {
          headers: {
            Authorization: `Bearer sk_test_b8d340f2a02c8948240cf554228c1112b0fe93a7`,
          },
        }
      );
      if (response.data.status) {
        setAccountName(response.data.data.account_name);
        setIsVerified(true);
      } else {
        setAccountName("");
        setIsVerified(false);
        toast.error("Account verification failed. Please check the details.");
      }
    } catch (error) {
      toast.error(error);
      setIsVerified(false);
    }
    setLoading(false);
  };

  const handleWithdraw = () => {
    setShowConfirmModal(true);
  };

  const handlePinConfirm = async () => {
    setLoader(true);
    try {
      const axiosRes = await axios.post("https://ease-banking-app.onrender.com/api/user/withdraw",
        { amount: Number(amount), 
          acctName: accountName, 
          acctNum: accountNumber, 
          bank: selectedBank, 
          description: desc,
          pin: pin },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }
      );
      const response = axiosRes.data;
      toast.success(response.message);
      setAmount("");
      setDesc("");
      setIsVerified(false);
      setAccountName("");
      setAccountNumber("");
      setSelectedBank("");
      setPin("");
      setShowPinModal(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid PIN or request failed.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 ml-64">
        <TopBar username="user" />

        <div className="w-full mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-[#02487F] mb-6">Withdraw Funds</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Select Bank</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 outline-none"
              >
                <option value="">-- Select Bank --</option>
                {banks.map((bank) => (
                  <option key={bank.code} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 outline-none"
                placeholder="Enter account number"
              />
            </div>
          </div>

          {!isVerified && (
            <button
              onClick={handleVerify}
              disabled={loading}
              className="bg-[#02487F] hover:bg-[#1384AB] cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition mb-6"
            >
              {loading ? "Verifying..." : "Verify Account"}
            </button>
          )}

          {isVerified && (
            <>
              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Account Name</label>
                <input
                  type="text"
                  value={accountName}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-gray-100 outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Amount to Withdraw</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 outline-none"
                  placeholder="Enter amount"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Description</label>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 outline-none"
                  placeholder="Enter description"
                />
              </div>

              <button
                onClick={handleWithdraw}
                disabled={loading}
                className="w-full bg-[#02487F] cursor-pointer hover:bg-[#1384AB] text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                {loading ? "Processing..." : "Withdraw Now"}
              </button>
            </>
          )}
        </div>
      </main>


      {showConfirmModal && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#0006] flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#02487F]">Confirm Withdrawal</h2>
              <button onClick={() => setShowConfirmModal(false)} className="text-gray-500 hover:text-red-500 text-2xl">&times;</button>
            </div>
          <p><strong>Bank:</strong> {banks.find((bank) => bank.code === selectedBank)?.name || selectedBank}</p>
          <p><strong>Account Number:</strong> {accountNumber}</p>
          <p><strong>Account Name:</strong> {accountName}</p>
          <p><strong>Amount:</strong> ₦{amount}</p>
          <p><strong>Description:</strong> {desc}</p>
          <button
            onClick={() => {
              setShowConfirmModal(false);
              setShowPinModal(true);
            }}
            className="mt-4 bg-[#02487F] hover:bg-[#1384AB] cursor-pointer text-white px-4 py-2 rounded-lg"
          >
            Confirm
          </button>
        </div>
        </div>
      )}

      {/* PIN Entry Modal */}
      {showPinModal && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#0006] flex items-center justify-center z-50">

          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-[#02487F]">Enter PIN</h2>
              <button onClick={() => setShowPinModal(false)} className="text-gray-500 hover:text-red-500 text-xl">&times;</button>
            </div>
          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter 4-digit PIN"
            className="w-full mt-4 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 outline-none mb-4"
          />
          <button
            onClick={handlePinConfirm}
            className="w-full bg-[#02487F] hover:bg-[#1384AB] cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Withdraw
          </button>
        </div>
        </div>
      )}
      <Loader loading={loader} inline={false} size={150} />
    </div>
  );
};

export default WithdrawPage;
