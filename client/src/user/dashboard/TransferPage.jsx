import { useState } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

const TransferPage = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);

  const accountBalance = 1200.75;

  const availableBanks = [
    { name: "Access Bank", code: "044" },
    { name: "GTBank", code: "058" },
    { name: "First Bank", code: "011" },
    { name: "UBA", code: "033" },
    { name: "Zenith Bank", code: "057" },
    // Add more mock banks if needed
  ];

  const verifyAccount = () => {
    if (!selectedBank || !accountNumber) {
      alert("Please fill in bank and account number.");
      return;
    }

    setLoading(true);
    // Mock account name logic
    setTimeout(() => {
      setAccountName("John Doe");
      setIsVerified(true);
      setLoading(false);
    }, 1000);
  };

  const handleTransfer = () => {
    if (!isVerified || !amount) {
      alert("Verify account and enter amount.");
      return;
    }

    alert(`Transfer of ₦${amount} to ${accountName} was successful!`);
    // Reset
    setAccountNumber("");
    setAccountName("");
    setAmount("");
    setNarration("");
    setIsVerified(false);
    setSaveBeneficiary(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8">
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

          <button
            onClick={verifyAccount}
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition mb-6"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>

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
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                {loading ? "Processing..." : "Transfer Now"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default TransferPage;
