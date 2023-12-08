import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

const apiUrl = "https://phase2-aio.vercel.app";

const Modal = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addedData = {
      username,
      email,
      password,
      phoneNumber,
      address,
    };
    try {
      const { data } = await axios.post(
        `${apiUrl}/apis/add-user`,
        addedData,
        config
      );
      setShowModal(false); // Menutup modal
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success create new member",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="flex justify-start gap-2 items-center rounded-lg p-2 cursor-pointer text-[#899499] hover:text-white hover:bg-[#3CB371]"
        onClick={() => setShowModal(true)}
      >
        <Icon icon="basil:add-outline" width={20} />
        <p className="text-sm">Add Member</p>
      </button>
      {showModal ? (
        <>
          <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-50 z-50">
            {/* component */}
            {/* This is an example component */}
            <div className="max-w-2xl bg-white p-16 rounded-3xl">
              <button
                onClick={() => setShowModal(false)}
                className="w-[20%] flex justify-center font-medium rounded-lg text-sm  bg-red-700 ml-auto m-4 text-[#ffffff] p-1  hover:translate-y-[2px]"
              >
                cancel
              </button>
              <form className="text-[#000000" onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Username
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-[#3CB371] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                      placeholder="qwerty123"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      className="bg-gray-50 border border-[#3CB371] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                      placeholder="123-45-678"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="bg-gray-50 border border-[#3CB371] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                    placeholder="john.doe@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type="password"
                    className="bg-gray-50 border border-[#3CB371] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                    placeholder="•••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Address
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-[#3CB371] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                    placeholder="Street avenue 8"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-[#3CB371] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
