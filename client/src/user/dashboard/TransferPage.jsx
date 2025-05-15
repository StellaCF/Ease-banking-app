import { useState } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransferPage = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");

  const accountBalance = 1200.75;

  const availableBanks = [
    { name: "Access Bank", code: "044" },
    { name: "GTBank", code: "058" },
    { name: "First Bank", code: "011" },
    { name: "UBA", code: "033" },
    { name: "Zenith Bank", code: "057" },
  ];

  const verifyAccount = () => {
    if (!selectedBank || !accountNumber) {
      toast.error("Please fill in bank and account number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setAccountName("John Doe");
      setIsVerified(true);
      setLoading(false);
      toast.success("Account verified successfully!");
    }, 1000);
  };

  const handleTransfer = () => {
    if (!isVerified || !amount) {
      toast.error("Please verify the account and enter an amount.");
      return;
    }
    setShowConfirmModal(true);
  };

  const handlePinConfirm = () => {
    toast.success(`Transfer of ₦${amount} to ${accountName} was successful!`);

    setAccountNumber("");
    setAccountName("");
    setAmount("");
    setNarration("");
    setIsVerified(false);
    setSaveBeneficiary(false);
    setShowConfirmModal(false);
    setShowPinModal(false);
    setPin("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 ml-64">
        <TopBar username="user" accountBalance={accountBalance} />

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-[#02487F] mb-6">Make a Transfer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Select Bank</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              >
                <option value="">-- Select Bank --</option>
                {availableBanks.map((bank) => (
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Enter account number"
              />
            </div>
          </div>

          {!isVerified && (
            <button
              onClick={verifyAccount}
              disabled={loading}
              className="bg-[#02487F] hover:bg-[#1384AB] text-white font-semibold py-3 px-6 rounded-lg transition mb-6"
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
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3"
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

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  checked={saveBeneficiary}
                  onChange={() => setSaveBeneficiary(!saveBeneficiary)}
                  className="mr-2"
                />
                <label className="text-gray-600">Save beneficiary for future transfers</label>
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
        <div className="fixed w-full h-screen top-0 left-0 bg-[#0006] flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-[90%] max-w-md">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#02487F]">Confirm Transfer</h2>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-gray-500 hover:text-red-500 text-2xl"
              >
                &times;
              </button>
            </div>
            <p><strong>Bank:</strong> {availableBanks.find((b) => b.code === selectedBank)?.name}</p>
            <p><strong>Account Number:</strong> {accountNumber}</p>
            <p><strong>Account Name:</strong> {accountName}</p>
            <p><strong>Amount:</strong> ₦{amount}</p>
            <p><strong>Narration:</strong> {narration || "N/A"}</p>
            <button
              onClick={() => {
                setShowConfirmModal(false);
                setShowPinModal(true);
              }}
              className="mt-4 bg-[#02487F] hover:bg-[#1384AB] text-white px-4 py-2 rounded-lg w-full"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#0006] flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-[90%] max-w-md">
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
              type="password"
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

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />
    </div>
  );
};

export default TransferPage;
