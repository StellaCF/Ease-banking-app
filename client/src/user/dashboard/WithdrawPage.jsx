import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

const WithdrawPage = () => {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [recipientCode, setRecipientCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const accountBalance = 1200.75; // Example balance

  useEffect(() => {
    // Fetch list of banks from Paystack
    const fetchBanks = async () => {
      try {
        const response = await fetch("https://api.paystack.co/bank?currency=NGN", {
          headers: {
            Authorization: `Bearer YOUR_SECRET_KEY`,
          },
        });
        const data = await response.json();
        if (data.status) {
          setBanks(data.data);
        }
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  const handleVerify = async () => {
    if (!accountNumber || !selectedBank) {
      alert("Please enter account number and select a bank.");
      return;
    }

    setLoading(true);
    try {
      // Resolve account number
      const resolveResponse = await fetch(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${selectedBank}`,
        {
          headers: {
            Authorization: `Bearer YOUR_SECRET_KEY`,
          },
        }
      );
      const resolveData = await resolveResponse.json();

      if (resolveData.status) {
        setAccountName(resolveData.data.account_name);
        setIsVerified(true);

        // Create transfer recipient
        const recipientResponse = await fetch("https://api.paystack.co/transferrecipient", {
          method: "POST",
          headers: {
            Authorization: `Bearer YOUR_SECRET_KEY`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "nuban",
            name: resolveData.data.account_name,
            account_number: accountNumber,
            bank_code: selectedBank,
            currency: "NGN",
          }),
        });

        const recipientData = await recipientResponse.json();
        if (recipientData.status) {
          setRecipientCode(recipientData.data.recipient_code);
        } else {
          alert("Failed to create transfer recipient.");
        }
      } else {
        alert("Account verification failed.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("An error occurred during verification.");
    }
    setLoading(false);
  };

  const handleWithdraw = async () => {
    if (!amount || !recipientCode) {
      alert("Please enter amount and verify account details.");
      return;
    }

    setLoading(true);
    try {
      // Initiate transfer
      const transferResponse = await fetch("https://api.paystack.co/transfer", {
        method: "POST",
        headers: {
          Authorization: `Bearer sk_test_b8d340f2a02c8948240cf554228c1112b0fe93a7`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "balance",
          amount: parseFloat(amount) * 100, // Convert to kobo
          recipient: recipientCode,
          reason: "Withdrawal",
        }),
      });

      const transferData = await transferResponse.json();
      if (transferData.status) {
        alert("Withdrawal successful!");
        // Reset form
        setAccountNumber("");
        setAccountName("");
        setAmount("");
        setRecipientCode("");
        setIsVerified(false);
      } else {
        alert("Withdrawal failed.");
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      alert("An error occurred during withdrawal.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 ml-64">
        <TopBar username="user" accountBalance={accountBalance} />

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-[#02487F] mb-6">Withdraw Funds</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Select Bank</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Enter account number"
              />
            </div>
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="bg-[#02487F] hover:bg-[#1384AB] cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition mb-6"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-gray-100"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Amount to Withdraw</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                  placeholder="Enter amount"
                />
              </div>

              <button
                onClick={handleWithdraw}
                disabled={loading}
                className="w-full bg-[#02487F] hover:bg-[#1384AB] text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                {loading ? "Processing..." : "Withdraw Now"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default WithdrawPage;
