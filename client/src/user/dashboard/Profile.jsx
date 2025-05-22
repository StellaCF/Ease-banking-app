import { useEffect, useState } from "react";
import { Pencil } from "lucide-react"; 
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  
  const authToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const axiosRes = await axios.get("https://ease-banking-app.onrender.com/api/user",
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );
        const response = axiosRes.data;
        setUserData(response.data);
        reset({
          firstName: response.data.firstName,
          otherName: response.data.otherName,
          lastName: response.data.lastName,
          phoneNumber: response.data.phoneNumber,
          address: response.data.address,
          gender: response.data.gender,
          DOB: response.data.DOB,
          nin: response.data.nin,
        });
      } catch (error) {
        console.log(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [authToken, reset]);

  const fullname = userData?.firstName + " " + userData?.otherName + " " + userData?.lastName;
  
  const formatDateAndTime = (isoString) => {
    const dateObj = new Date(isoString);
    const date = dateObj.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    
    const time = dateObj.toLocaleTimeString("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    
    return { date, time };
  };

  const handleSave = async (data) => {
    setIsEditing(false);
    try {
      const axiosRes = await axios.put("https://ease-banking-app.onrender.com/api/user",
        {
          firstName: data.firstName,
          otherName: data.otherName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          gender: data.gender,
          DOB: data.DOB,
          nin: data.nin,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      const response = axiosRes.data;
      const updatedUser = response.data;
      toast.success(response.message);
      setUserData(updatedUser);
      reset({
        firstName: updatedUser.firstName,
        otherName: updatedUser.otherName,
        lastName: updatedUser.lastName,
        phoneNumber: updatedUser.phoneNumber,
        gender: updatedUser.gender,
        address: updatedUser.address,
        DOB: updatedUser.DOB,
        nin: updatedUser.nin,
      });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-6 lg:p-8 space-y-6">
        <TopBar/>

        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-2xl shadow-md mb-24 relative">
          <h2 className="text-2xl md:text-3xl font-bold text-[#02487F] mb-6">Profile</h2>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-blue-600 hover:text-blue-800 transition"
          >
            <Pencil />
          </button>

          {/* Basic Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
            <Detail
              label="Full Name"
              editable={isEditing}
              {...register("fullName")}
              defaultValue={fullname}
              />
            <Detail
              label="Email Address"
              defaultValue={userData?.email}
              />
            <Detail
              label="Phone Number"
              editable={isEditing}
              {...register("phoneNumber")}
              defaultValue={userData?.phoneNumber}
            />
            <Detail
              label="Residential Address"
              editable={isEditing}
              {...register("address")}
              defaultValue={userData?.address}
            />
            <Detail
              type="date"
              label="Date of Birth"
              editable={isEditing}
              {...register("DOB")}
              defaultValue={userData?.DOB}
            />
            <Detail
              label="Gender"
              editable={isEditing}
              {...register("gender")}
              defaultValue={userData?.gender}
              />
          </div>

          {/* Account Details */}
          <div className="border-t pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
            <Detail
              label="Account Number"
              defaultValue={userData?.acctNumber}
            />
            <Detail
              label="Account Type"
              defaultValue="Savings"
              />
            <Detail
              label="Account Status"
              defaultValue="Active"
              />
            <Detail
              label="Date Joined"
              defaultValue={formatDateAndTime(userData?.createdAt).date}
              />
          </div>

          <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Detail
              label="National ID Number (NIN)"
              editable={isEditing}
              {...register("nin")}
              defaultValue={userData?.nin}
              />
          </div>

          {isEditing && (
            <button
            onClick={handleSubmit(handleSave)}
            className="mt-6 bg-[#02487F] hover:bg-[#1384AB] text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Save Changes
            </button>
          )}
        </div>
      </main>
      <Loader loading={loading} inline={false} size={150} />
    </div>
  );
};

const Detail = ({ type="text", label, editable, defaultValue, ...inputProps }) => (
  <div>
    <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
    {editable ? (
      <input
        {...inputProps}
        defaultValue={defaultValue}
        type={type}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 outline-none"
      />
    ) : (
      <p className="text-lg font-semibold text-gray-800 cursor-not-allowed">
        {defaultValue || ""}
      </p>
    )}
  </div>
);


Detail.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputProps: PropTypes.object,
};
export default Profile;
