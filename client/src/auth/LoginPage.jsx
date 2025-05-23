import { NavLink } from "react-router-dom";
import payment from "../assets/Payment.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ease-banking-app.onrender.com/api/login",
        data
      );
      const { message, token } = response.data;
      toast.success(message);
      console.log(response.data);
      Cookies.set("auth_token", token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
        reset();
        if (response.data.user.pin === null) {
          navigate("/transactionPin");
        } else {
          navigate("/dashboard");
        }

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
        <div className="w-full lg:w-1/2">
          <div className="justify-center items-center bg-white">
            <h1 className="text-center text-4xl text-[#02487F] font-extrabold mt-8">
              LOGIN
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 w-full p-4"
          >
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4 outline-none"
                {...register("email", { required: "Email required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="rounded-lg border-2 h-10 border-[#1384AB] p-4 pr-10 w-full outline-none"
                  {...register("password", { required: "Password required" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-600 hover:text-[#02487F]"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <NavLink to="/ForgetPassword" className="text-blue-950">
              Forgot Password?
            </NavLink>
            <button
              disabled={loading}
              type="submit"
              className={`p-2 rounded-md gap-y-3 mt-5 transition duration-300 ease-in-out
                ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#02487F] hover:bg-[#1384AB] text-white"}
              `}
            >
              {loading ? (
                <Loader loading={true} inline={true} size={20} />
              ) : (
                "Login"
              )}
            </button>
            <p className="text-center">
              Dont have an account?{" "}
              <NavLink to="/signup" className="text-[#02487F]">
                Signup
              </NavLink>
            </p>
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
      {/* <Footer /> */}
    </div>
  );
};

export default LoginPage;
