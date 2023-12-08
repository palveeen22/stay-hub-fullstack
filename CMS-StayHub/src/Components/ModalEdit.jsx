import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Select, Space } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

const apiUrl = "https://phase2-aio.vercel.app";

const ModalEdit = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [facility, setFacility] = useState(0);
  const [roomCapacity, setRoomCapacity] = useState(0);
  const [location, setLocation] = useState(0);
  const [typeId, setTypeId] = useState();
  const [type, setType] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addedData = {
      name,
      imgUrl,
      facility,
      roomCapacity: +roomCapacity,
      location,
      typeId,
    };
    try {
      const { data } = await axios.post(
        `${apiUrl}/apis/rent-room/lodgings`,
        addedData,
        config
      );
      setShowModal(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Succes create a new lodging",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const getType = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/apis/rent-room/types`,
        config
      );
      setType(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getType();
  }, []);

  return (
    <>
      <Icon
        icon="tabler:edit"
        width={25}
        onClick={() => setShowModal(true)}
        className="cursor-pointer"
      />

      {showModal ? (
        <>
          <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-50 z-50">
            {/* component */}
            {/* This is an example component */}
            <div className="max-w-2xl bg-white p-16 rounded-3xl">
              <button
                onClick={() => setShowModal(false)}
                className="w-[20%] flex justify-center font-medium rounded-lg text-sm  bg-red-700 ml-auto m-2 text-[#ffffff] p-1  hover:translate-y-[2px]"
              >
                cancel
              </button>
              <form
                className="text-[#000000 flex flex-col justify-start ml-auto"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="bg-gray-50 border border-[#3CB371] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                      placeholder="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Facility{" "}
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-[#3CB371] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                      placeholder="WIFI, tv, shower"
                      onChange={(e) => setFacility(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Room Capacity
                    </label>
                    <input
                      type="number"
                      className="bg-gray-50 border border-[#3CB371] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                      placeholder="room capacity"
                      onChange={(e) => setRoomCapacity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Location
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-[#3CB371] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                      placeholder="west jombang avenue"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900"></label>
                  Image Url
                  <input
                    type="text"
                    className="bg-gray-50 border border-[#3CB371] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                    placeholder="image url here"
                    onChange={(e) => setImgUrl(e.target.value)}
                  />
                </div>
                <Select
                  defaultValue="Choose your type"
                  style={{
                    width: 540,
                    height: 45,
                  }}
                  options={type?.map((e) => ({
                    value: e?.id,
                    label: e?.name,
                  }))}
                  onChange={(value) => {
                    setTypeId(value);
                  }}
                />
                <button
                  type="submit"
                  className="text-white bg-[#3CB371] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center m-4  hover:translate-y-[2px]"
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

export default ModalEdit;
