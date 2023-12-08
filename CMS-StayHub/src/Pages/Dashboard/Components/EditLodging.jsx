import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import Swal from "sweetalert2";

import { useNavigate, useParams } from "react-router-dom";
import ModalForm from "../../../Components/ModalForm";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

const apiUrl = "https://phase2-aio.vercel.app";
const EditLodging = ({ id }) => {
  const navigate = useNavigate();
  const [lodging, setLodging] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getDataLodging = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/apis/rent-room/lodgings/${id}`,
        config
      );
      setLodging(data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "test",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getDataLodging();
  }, [showModal]);

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
      typeId: +typeId,
    };
    try {
      await axios.put(
        `${apiUrl}/apis/rent-room/lodgings/${id}`,
        addedData,
        config
      );
      setShowModal(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Succes update lodging",
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
      <Icon
        icon="tabler:edit"
        width={25}
        onClick={() => setShowModal(true)}
        className="cursor-pointer"
      />
      {showModal ? (
        <ModalForm
          apiUrl={apiUrl}
          handleSubmit={handleSubmit}
          setShowModal={setShowModal}
          lodging={lodging}
        />
      ) : null}
    </>
  );
};

export default EditLodging;
