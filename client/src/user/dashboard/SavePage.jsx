import { useState } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

const SavePage = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [savings, setSavings] = useState([]);
  const [accountBalance, setAccountBalance] = useState(1200.75);

  const handleSave = () => {
    if (!description || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Enter a valid description and amount");
      return;
    }

    if (parseFloat(amount) > accountBalance) {
      alert("Insufficient balance");
      return;
    }

    const newSaving = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
    };

    setSavings([...savings, newSaving]);
    setAccountBalance(prev => prev - parseFloat(amount));
    setDescription("");
    setAmount("");
  };

  const handleSpend = (id) => {
    const savingToSpend = savings.find(item => item.id === id);
    if (savingToSpend) {
      setAccountBalance(prev => prev + savingToSpend.amount);
      setSavings(savings.filter(item => item.id !== id));
    }
  };

  const handleAddToSavings = (id) => {
    const addAmount = prompt("Enter amount to add:");
    const numericAmount = parseFloat(addAmount);

    if (!addAmount || isNaN(numericAmount) || numericAmount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    if (numericAmount > accountBalance) {
      alert("Insufficient balance");
      return;
    }

    setSavings(prevSavings =>
      prevSavings.map(saving =>
        saving.id === id
          ? { ...saving, amount: saving.amount + numericAmount }
          : saving
      )
    );
    setAccountBalance(prev => prev - numericAmount);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8">
        <TopBar username="user" accountBalance={accountBalance} />

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-[#02487F] mb-6">Save Money</h2>

          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Travel Fund"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to save"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Save
          </button>
        </div>

        {savings.length > 0 && (
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold text-gray-700">Your Savings</h3>
            {savings.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">{item.description}</p>
                  <p className="text-sm text-gray-600">₦{item.amount.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToSavings(item.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => handleSpend(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Spend
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavePage;
