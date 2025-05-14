import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

const Profile = () => {
  const user = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 801 234 5678",
    address: "12, Marina Street, Lagos, Nigeria",
    accountNumber: "1234567890",
    bvn: "22334455667",
    nin: "14567892109",
    accountType: "Savings",
    gender: "Male",
    dateOfBirth: "1990-05-14",
    joinedDate: "2021-08-01",
    accountStatus: "Active",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 space-y-6">
        <TopBar username="user" accountBalance={1200.75} />

        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold text-[#02487F] mb-6">Banking Profile</h2>

          {/* Section 1: Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Detail label="Full Name" value={user.fullName} />
            <Detail label="Email Address" value={user.email} />
            <Detail label="Phone Number" value={user.phone} />
            <Detail label="Residential Address" value={user.address} />
            <Detail label="Date of Birth" value={user.dateOfBirth} />
            <Detail label="Gender" value={user.gender} />
          </div>

          {/* Section 2: Account Details */}
          <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Detail label="Account Number" value={user.accountNumber} />
            <Detail label="Account Type" value={user.accountType} />
            <Detail label="Account Status" value={user.accountStatus} />
            <Detail label="Date Joined" value={user.joinedDate} />
          </div>

          {/* Section 3: Identification */}
          <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Detail label="BVN" value={user.bvn} />
            <Detail label="National ID Number (NIN)" value={user.nin} />
          </div>
        </div>
      </main>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <p className="text-lg font-semibold text-gray-800">{value}</p>
  </div>
);

export default Profile;
