import { useState } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

const TransferPage = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [fullname, setFullname] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");

  const authToken = Cookies.get("auth_token");

  const verifyAccount = async () => {
    setLoading(true);
    try {
      const axiosRes = await axios.post(
        "https://ease-banking-app.onrender.com/api/user/verify-account",
        { acctNum: accountNumber },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const response = axiosRes.data;
      toast.success(response.message);
      setFullname(response.data);
      setIsVerified(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const fullName =
    fullname.firstName + " " + fullname.otherName + " " + fullname.lastName;

  const handleTransfer = () => {
    if (!amount) {
      toast.error("Amount is required.");
      return;
    }
    setShowConfirmModal(true);
  };

  const handlePinConfirm = async () => {
    try {
      const axiosRes = await axios.post(
        "https://ease-banking-app.onrender.com/api/user/transfer",
        {
          amount: Number(amount),
          pin: pin,
          acctNum: accountNumber,
          acctName: fullName,
          description: narration,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const response = axiosRes.data;
      toast.success(response.message);
      setAccountNumber("");
      setAmount("");
      setNarration("");
      setIsVerified(false);
      setShowPinModal(false);
      setPin("");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 space-y-8 md:ml-64">
        <TopBar />

        <div className="w-full mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#02487F] mb-6">Make a Transfer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Bank</label>
              <input
                value="Ease Bank"
                disabled
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
                placeholder="Enter account number"
              />
            </div>
          </div>

          {!isVerified && (
            <button
              onClick={verifyAccount}
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
                  value={fullName}
                  readOnly
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 cursor-not-allowed"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Amount (₦)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="Enter amount"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Narration (optional)</label>
                <input
                  type="text"
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="e.g. Bills, Donation, etc."
                />
              </div>

              <button
                onClick={handleTransfer}
                className="w-full bg-[#02487F] hover:bg-[#1384AB] text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Transfer Now
              </button>
            </>
          )}
        </div>
      </main>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#0006] flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#02487F]">Confirm Transfer</h2>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-gray-500 hover:text-red-500 text-2xl"
              >
                &times;
              </button>
            </div>
            <p className="mt-2"><strong>Bank:</strong> Ease Bank</p>
            <p className="mt-2"><strong>Account Number:</strong> {accountNumber}</p>
            <p className="mt-2"><strong>Account Name:</strong> {fullName}</p>
            <p className="mt-2"><strong>Amount:</strong> ₦{amount}</p>
            <p className="mt-2"><strong>Narration:</strong> {narration || "N/A"}</p>
            <button
              onClick={() => {
                setShowConfirmModal(false);
                setShowPinModal(true);
              }}
              className="mt-6 bg-[#02487F] hover:bg-[#1384AB] text-white px-4 py-2 rounded-lg w-full"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#0006] flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#02487F]">Enter PIN</h2>
              <button
                onClick={() => setShowPinModal(false)}
                className="text-gray-500 hover:text-red-500 text-2xl"
              >
                &times;
              </button>
            </div>
            <input
              type="number"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter 4-digit PIN"
              className="w-full mt-4 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 outline-none mb-4"
            />
            <button
              onClick={handlePinConfirm}
              className="w-full bg-[#02487F] hover:bg-[#1384AB] text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Transfer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferPage;
