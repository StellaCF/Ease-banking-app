import { NavLink } from "react-router-dom";
import payment from "../assets/payment.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ease-banking-app.onrender.com/api/forgot-password",
        data
      );
      console.log(response.data);
      const { message } = response.data;
      toast.success(message);
      setTimeout(() => {
        reset();
        navigate(`/verifyPassword?email=${encodeURIComponent(data.email)}`);
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
            <h1 className="text-center text-2xl text-[#02487F] font-extrabold mt-8">
              Forgot Your Password?
            </h1>
            <p className="text-center">
              Enter your email address and we will send you a code to reset
              your password.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2 w-full p-4"
          >
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
              {...register("email", { required: "email required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#02487F] text-center text-white p-2 rounded-md gap-y-3 mt-5 cursor-pointer hover:bg-[#1384AB] transition duration-300 ease-in-out"
            >
              {loading ? (
                <Loader loading={true} inline={true} size={20} />
              ) : (
                "Send"
              )}
            </button>
            <p className="text-center">
              Remember password?{" "}
              <NavLink to="/login" className="text-[#02487F]">
                Login
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
    </div>
  );
};

export default ForgetPassword;
