import payment from "../assets/payment.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const otp = queryParams.get("otp")

    const {
      register,
      formState: { errors },
      handleSubmit,
      watch,
      reset
    } = useForm({
    defaultValues: {
      email: email,
      otp: otp,
      password: ""
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("https://ease-banking-app.onrender.com/api/reset-password", data);
      console.log(response.data)
      const { message } = response.data;
      toast.success(message);
      setTimeout(() => {
        reset();
        navigate("/login");
      }, 2000);
    } catch (error) {
    console.log(error)     
    const errorMessage = error.response?.data?.error;
    toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <div className="w-10/12 h-screen flex justify-between gap-10 mx-auto items-center">
        <div className="ms-8 w-1/2">
          <div className="justify-center items-center  bg-white">
            <h1 className="text-center text-4xl text-[#02487F] font-extrabold mt-8">
              RESET PASSWORD
            </h1>
          </div>
          <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2 w-100% p-4">
            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
                {...register("password", {required: "password is required"})}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label>ConfirmPassword</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
                {...register("password", {required: "password is required", validate: (value) => value === watch("password") || "Passwords do not match",})}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <button className="bg-[#02487F] text-white p-2 rounded-md gap-y-3 mt-5 cursor-pointer hover:bg-[#1384AB] transition duration-300 ease-in-out">
              {loading == true ? <Loader loading={true} inline={true} size={20}/> : "Reset Password"}
            </button>
          </form>
        </div>
        <div className="h-full w-1/2">
          <img src={payment} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default LoginPage;
