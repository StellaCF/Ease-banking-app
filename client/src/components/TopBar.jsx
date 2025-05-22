import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/banklogo.png";


const TopBar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const authToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const axiosRes = await axios.get("https://ease-banking-app.onrender.com/api/user", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUser(axiosRes.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch user");
      }
    };

    fetchUser();
  }, [authToken]);

  const firstInitial = user?.firstName.charAt(0).toUpperCase() || "";
  const lastInitial = user?.lastName.charAt(0).toUpperCase() || "";
  const initial = firstInitial + lastInitial;

  return (
    <>
    <div className="w-full h-[80px] lg:hidden bg-white shadow-md flex items-center justify-center mb-4">
      <div className="flex items-center mb-5">
        <img src={logo} alt="" className='bg-transparent w-20 h-20'/>
        <span className="font-bold text-2xl text-[#02487F]">Ease Bank</span>
      </div>
    </div>
    <div className="bg-gradient-to-r from-[#02487F] to-[#1384AB] text-white p-4 sm:p-6 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-base sm:text-lg">Hi, {user?.firstName}</h1>
            <h2 className="text-lg sm:text-xl font-semibold mt-2">Account Balance</h2>
            <p className="text-xl sm:text-3xl font-bold mt-1">₦{Number(user?.acctBalance).toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}</p>
          </div>
        </div>

        <div
          onClick={() => navigate("/profile")}
          className="text-right text-white text-xl w-10 h-10 sm:w-12 sm:h-12 grid place-items-center rounded-full cursor-pointer bg-[#20B6D9]"
        >
          {initial}
        </div>
      </div>
    </div>
    </>
  );
};

export default TopBar;
