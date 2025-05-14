// components/KycBanner.jsx
const TopBar = () => {

    const accountBalance = 1200.75;
    const username = "user"; // Replace with actual username from context or props
    return (
      <div className="bg-gradient-to-r from-[#02487F] to-[#1384AB] text-white p-6 rounded-lg space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-lg">Hi, {username}</h1>
            <h2 className="text-xl font-semibold mt-4">Account Balance</h2>
            <p className="text-3xl font-bold mt-1">₦{accountBalance.toFixed(2)}</p>
          </div>
          {/* Optional KYC section (currently hidden)
          <div className="text-right">
            <h2 className="text-2xl font-semibold">Unlock more account privileges</h2>
            <button className="mt-4 bg-white text-[#02487F] font-semibold px-4 py-2 rounded-full">
              Complete KYC Verification
            </button>
          </div> */}
        </div>
      </div>
    );
  };
  
  export default TopBar;
  