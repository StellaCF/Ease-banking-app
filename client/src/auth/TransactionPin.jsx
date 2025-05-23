import payment from "../assets/Payment.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import Cookies from "js-cookie";

const TransactionPin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const authToken = Cookies.get("auth_token");
    try {
      const response = await axios.post(
        "https://ease-banking-app.onrender.com/api/user/transactionPin",
        data,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      const { message } = response.data;
      toast.success(message);
      setTimeout(() => {
        reset();
        navigate("/dashboard");
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
              SET TRANSACTION PIN
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2 w-full p-4"
          >
            <div className="flex flex-col gap-1">
              <label>Enter Pin</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="Enter 4-digit PIN"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4 outline-none"
                {...register("pin", { required: "Pin is required" })}
              />
              {errors.pin && (
                <p className="text-red-500">{errors.pin.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>Confirm Pin</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="Confirm 4-digit PIN"
                className="rounded-lg border-2 h-10 border-[#1384AB] p-4 outline-none"
                {...register("confirmPin", {
                  required: "Confirm Pin is required",
                  validate: (value) =>
                    value === watch("pin") || "Pins do not match",
                })}
              />
              {errors.confirmPin && (
                <p className="text-red-500">{errors.confirmPin.message}</p>
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
                "Set Pin"
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

export default TransactionPin;
