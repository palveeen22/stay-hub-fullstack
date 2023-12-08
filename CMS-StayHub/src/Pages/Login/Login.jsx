import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
// Miscellaneous
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url = "https://phase2-aio.vercel.app";

  function emailOnChange(e) {
    setEmail(e.target.value);
  }

  function passwordOnChange(e) {
    setPassword(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post(`${url}/apis/login`, {
        email,
        password,
      });
      localStorage.setItem("access_token", data.data.access_token);
      navigate("/dashboard");
      Swal.fire({
        icon: "success",
        title: "Login sucesfull",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        title: error.response.data.error,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center gap-8">
        <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
          <div className="self-start hidden lg:flex flex-col text-white">
            {/* <img src="" className="mb-3" alt="" /> */}
            <h1 className="mb-3 font-bold text-5xl">Welcome Back StayHubers</h1>
            <p className="pr-3">Check what news for our best costumers</p>
          </div>
        </div>
        <form
          className="flex justify-center self-center z-10"
          onSubmit={handleLogin}
        >
          <div className="p-12 bg-white mx-auto rounded-2xl w-100">
            <div className="mb-4">
              {/* <h3 className="font-semibold text-2xl text-gray-800">Sign In</h3> */}
              <div className="flex justify-center m-2">
                <span className="flex justify-between gap-2  items-center cursor-pointer">
                  <Icon icon="fa6-solid:s" width={25} color="#3CB371" />
                  {/* <Link to={`/`}> */}
                  <p className="text-[#3CB371] text-xl font-semibold">
                    StayHub
                  </p>
                  {/* </Link> */}
                </span>
              </div>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Email
                </label>
                <input
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="text"
                  placeholder="mail@gmail.com"
                  onChange={emailOnChange}
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="password"
                  placeholder="Enter your password"
                  onChange={passwordOnChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-green-400 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className="pt-5 text-center text-gray-400 text-xs"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
