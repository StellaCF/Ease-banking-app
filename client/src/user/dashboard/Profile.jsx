import { useState } from "react";
import { Pencil } from "lucide-react"; 
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
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
  });

  const handleChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here (e.g., API call)
    console.log("Saved changes:", userData);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 space-y-6">
        <TopBar username="user" accountBalance={1200.75} />

        <div className="bg-white p-8 rounded-2xl shadow-md relative">
          <h2 className="text-3xl font-bold text-[#02487F] mb-6">Profile</h2>

          {/* Edit Icon */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-8 right-8 text-blue-600 hover:text-blue-800 transition"
          >
            <Pencil />
          </button>

          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Detail
              label="Full Name"
              value={userData.fullName}
              editable={isEditing}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            <Detail
              label="Email Address"
              value={userData.email}
              editable={isEditing}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Detail
              label="Phone Number"
              value={userData.phone}
              editable={isEditing}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <Detail
              label="Residential Address"
              value={userData.address}
              editable={isEditing}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <Detail
              label="Date of Birth"
              value={userData.dateOfBirth}
              editable={isEditing}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            />
            <Detail
              label="Gender"
              value={userData.gender}
              editable={isEditing}
              onChange={(e) => handleChange("gender", e.target.value)}
            />
          </div>

          {/* Account Details */}
          <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Detail
              label="Account Number"
              value={userData.accountNumber}
              editable={isEditing}
              onChange={(e) => handleChange("accountNumber", e.target.value)}
            />
            <Detail
              label="Account Type"
              value={userData.accountType}
              editable={isEditing}
              onChange={(e) => handleChange("accountType", e.target.value)}
            />
            <Detail
              label="Account Status"
              value={userData.accountStatus}
              editable={isEditing}
              onChange={(e) => handleChange("accountStatus", e.target.value)}
            />
            <Detail
              label="Date Joined"
              value={userData.joinedDate}
              editable={isEditing}
              onChange={(e) => handleChange("joinedDate", e.target.value)}
            />
          </div>

          {/* Identification */}
          <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Detail
              label="BVN"
              value={userData.bvn}
              editable={isEditing}
              onChange={(e) => handleChange("bvn", e.target.value)}
            />
            <Detail
              label="National ID Number (NIN)"
              value={userData.nin}
              editable={isEditing}
              onChange={(e) => handleChange("nin", e.target.value)}
            />
          </div>

          {/* Save Button */}
          {isEditing && (
            <button
              onClick={handleSave}
              className="mt-6 bg-[#02487F] hover:bg-[#1384AB] text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Save Changes
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

const Detail = ({ label, value, editable, onChange }) => (
  <div>
    <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
    {editable ? (
      <input
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
      />
    ) : (
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    )}
  </div>
);

export default Profile;
