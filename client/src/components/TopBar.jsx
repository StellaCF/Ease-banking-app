import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import axios from "axios";
import { toast } from "react-toastify";


const TopBar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const authToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const axiosRes = await axios.get("https://ease-banking-app.onrender.com/api/user", 
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );
        const response = axiosRes.data;
        console.log(response)
        setUser(response.data);
      } catch (error) {
        toast.error(error.response.error.message);
      }
    };

    fetchUser();
  },[authToken])

  const firstInitial = user?.firstName.charAt(0).toUpperCase() || "";
  const lastInitial = user?.lastName.charAt(0).toUpperCase() || "";
  const initial = firstInitial + lastInitial;
    return (
      <div className="bg-gradient-to-r from-[#02487F] to-[#1384AB] text-white p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg">Hi, {user?.firstName}</h1>
              <h2 className="text-xl font-semibold mt-4">Account Balance</h2>
              <p className="text-3xl font-bold mt-1">₦{user?.acctBalance}</p>
            </div>

            <div 
              onClick={() => navigate("/profile")}
              className="text-right text-white text-2xl w-15 h-15 grid place-items-center rounded-full cursor-pointer bg-[#20B6D9]">
               {initial}
            </div>
          </div>
        </div>
    );
  };
  
  export default TopBar;
  