import Finance4 from "../assets/Finance4.gif";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      otherName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ease-banking-app.onrender.com/api/register",
        data
      );
      toast.success(response.data.message || "Registration successful!");
      setTimeout(() => {
        reset();
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.error || "Registration failed";
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
              SIGNUP
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 w-full p-4"
          >
            <div className="flex gap-x-2">
              <div className="flex flex-col gap-y-1 w-1/2">
                <label className="block">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="rounded-lg border-2 h-10 border-[#1384AB] p-4 outline-none"
                  {...register("firstName", { required: "First Name required" })}
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-y-1 w-1/2">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="rounded-lg border-2 h-10 border-[#1384AB] p-4 outline-none"
                  {...register("lastName", { required: "Last Name required" })}
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label>Other Names</label>
              <input
                type="text"
                placeholder="Enter Other Names"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4 outline-none"
                {...register("otherName", { required: "Other Name required" })}
              />
              {errors.otherName && (
                <p className="text-red-500">{errors.otherName.message}</p>
              )}
            </div>
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
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4 outline-none"
                {...register("phoneNumber", {
                  required: "Phone Number required",
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="flex gap-x-2">
  {/* Password Field */}
  <div className="flex flex-col gap-y-1 w-1/2">
    <label>Password</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
        className="rounded-lg border-2 h-10 border-[#1384AB] p-4 pr-10 outline-none w-full"
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
      <p className="text-red-500 text-sm">{errors.password.message}</p>
    )}
  </div>

  {/* Confirm Password Field */}
  <div className="flex flex-col gap-y-1 w-1/2">
    <label>Confirm Password</label>
    <div className="relative">
      <input
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm Password"
        className="rounded-lg border-2 h-10 border-[#1384AB] p-4 pr-10 outline-none w-full"
        {...register("confirmPassword", {
          required: "Confirm Password required",
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        })}
      />
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute right-3 top-2.5 text-gray-600 hover:text-[#02487F]"
      >
        {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
    {errors.confirmPassword && (
      <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
    )}
  </div>
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
                "Sign Up"
              )}
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <NavLink to="/login" className="text-[#02487F]">
                Login
              </NavLink>
            </p>
          </form>
        </div>

        <div className="hidden lg:block h-full w-1/2">
          <img
            src={Finance4}
            alt="Finance Illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default SignUp;
