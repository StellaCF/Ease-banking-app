// pages/Dashboard.js

import Sidebar from "../../components/SideBar";

const wallets = [
  { name: 'Australian Dollar (AUD)', flag: '🇦🇺', amount: 0 },
  { name: 'Nigerian Naira (NGN)', flag: '🇳🇬', amount: 0 },
  { name: 'United States Dollar (USD)', flag: '🇺🇸', amount: 0 },
  { name: 'Great British Pounds (GBP)', flag: '🇬🇧', amount: 0 },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg text-gray-600">Hi, user</h1>
            <p className="text-sm text-gray-400">Welcome Back - 13th May, 2025.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold">
            CO
          </div>
        </div>

        {/* KYC Banner */}
        <div className="bg-blue-900 text-white p-6 rounded-lg flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Unlock more account privileges</h2>
            <p className="text-sm mt-2">Complete your KYC verification to access more features on Wiremoney</p>
            <button className="mt-4 bg-white text-blue-900 font-semibold px-4 py-2 rounded-full">
              Complete my KYC Verification
            </button>
          </div>
        </div>

        {/* Wallets */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Wallets</h3>
            <button className="bg-cyan-500 text-white px-4 py-2 rounded-full">Send Money</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wallets.map((wallet) => (
              <div key={wallet.name} className="border rounded-lg p-4 text-center relative">
                <span className="absolute top-2 right-2 bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded-full">
                  Coming Soon
                </span>
                <div className="text-3xl mb-2">{wallet.flag}</div>
                <div className="text-sm text-gray-600">{wallet.name}</div>
                <div className="text-2xl font-bold mt-2">${wallet.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
