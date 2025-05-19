import { NavLink } from "react-router-dom";
import payment from "../assets/payment.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
    const {
      register,
      formState: { errors },
      handleSubmit,
      reset
    } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("https://ease-banking-app.onrender.com/api/login", data);
      const { message, token } = response.data;
      toast.success(message);
      console.log(response.data)
      Cookies.set("auth_token", token, {
        expires: 1,
        secure: true, 
        sameSite: "strict",
      });
      setTimeout(() => {
        reset();
        if (response.data.user.pin === null) {
          navigate("/transactionPin");
        } else {
          navigate("/dashboard")
        }
      }, 2000);
    } catch (error) {
    console.log(error)     
    const errorMessage = error.response?.data?.error || "Login failed";
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
              LOGIN
            </h1>
          </div>
          <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 w-100% p-4">
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
              {...register("email", {required: "Email required"})}
            />
             {errors.email && <p className="text-red-500">{errors.email.message}</p>}
             </div>
             <div className="flex flex-col gap-1">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="rounded-lg border-2 h-10 border-[#1384AB] p-4"
              {...register("password", {required: "Password required"})}
            />
             {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
             </div>
            <NavLink to='/ForgetPassword' className="text-blue-950">Forgot Password?</NavLink>
            <button
              disabled={loading}
              type="submit"
             className="bg-[#02487F] text-white p-2 rounded-md gap-y-3 mt-5 cursor-pointer hover:bg-[#1384AB] transition duration-300 ease-in-out">
              {loading == true ? <Loader loading={true} inline={true} size={20}/> : "Login"} 
            </button>
            <p className="text-center">
              Dont have an account?{" "}
              <NavLink to="/signup" className="text-[#02487F]">
                Signup
              </NavLink>
            </p>
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
