import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Select, Space } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalForm from "../../../Components/ModalForm";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

const apiUrl = "https://phase2-aio.vercel.app";
const AddLodging = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  //   const [name, setName] = useState("");
  //   const [imgUrl, setImgUrl] = useState("");
  //   const [facility, setFacility] = useState(0);
  //   const [roomCapacity, setRoomCapacity] = useState(0);
  //   const [location, setLocation] = useState(0);

  const handleSubmit = async (
    e,
    name,
    imgUrl,
    facility,
    roomCapacity,
    location,
    typeId
  ) => {
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
  return (
    <>
      <button
        type="button"
        className="flex justify-start gap-2 items-center rounded-lg p-2 cursor-pointer text-[#899499] hover:text-white hover:bg-[#3CB371]"
        onClick={() => setShowModal(true)}
      >
        <Icon icon="basil:add-outline" width={20} />
        <p className="text-sm">Add Lodgings</p>
      </button>
      {showModal ? (
        <ModalForm
          apiUrl={apiUrl}
          handleSubmit={handleSubmit}
          setShowModal={setShowModal}
        />
      ) : null}
    </>
  );
};

export default AddLodging;
