import payment from "../assets/Payment.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Get query params safely
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");
  const otp = queryParams.get("otp");

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: email || "",
      otp: otp || "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ease-banking-app.onrender.com/api/reset-password",
        data
      );
      console.log(response.data);
      const { message } = response.data;
      toast.success(message);
      setTimeout(() => {
        reset();
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.error;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-10/12 h-screen mx-auto flex flex-col items-center justify-center gap-10 lg:flex-row lg:justify-between lg:items-center">
        <div className="w-full lg:w-1/2 ms-8">
          <div className="justify-center items-center bg-white">
            <h1 className="text-center text-4xl text-[#02487F] font-extrabold mt-8">
              RESET PASSWORD
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2 w-full p-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-between ">
                <label>Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-2"
                  >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`p-2 rounded-md gap-y-3 mt-5 transition duration-300 ease-in-out
                ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#02487F] hover:bg-[#1384AB] text-white"}
              `}
            >
              {loading ? (
                <Loader loading={true} inline={true} size={20} />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
        <div className="hidden lg:block h-full w-1/2">
          <img
            src={payment}
            alt="Payment Illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
