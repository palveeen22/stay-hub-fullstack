import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ModalForm from "./ModalForm";
import Modal from "./Modal";

import Swal from "sweetalert2";
import ModalUpload from "./Upload";
import { useParams } from "react-router-dom";
import AddLodging from "../Pages/Dashboard/Components/AddLodging";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLogout = () => {
    localStorage.clear();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Success logout",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="p-6 flex flex-col justify-between gap-2 h-full bg-white w-[15%] min-h-screen border">
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-start">
          <span className="flex justify-between gap-2  items-end cursor-pointer">
            <Icon icon="fa6-solid:s" width={25} color="#3CB371" />
            <Link to={`/`}>
              <p className="text-[#3CB371] text-base font-semibold">
                StayHub Team
              </p>
            </Link>
          </span>
        </div>
        <div className="border-b"></div>
        <div className="flex flex-col gap-4 justify-start">
          <p className="text-sm text-[#848884] ">Team Management</p>
          <Link to={`/dashboard`}>
            <div
              className={`flex justify-start gap-2 items-center rounded-lg p-2 ${
                activeLink === "dashboard"
                  ? "text-white bg-[#3CB371]"
                  : "text-[#899499] hover:text-white hover:bg-[#3CB371]"
              }`}
              onClick={() => handleLinkClick("dashboard")}
            >
              <Icon icon="akar-icons:dashboard" width={20} />
              <p className="text-sm">Dashboard</p>
            </div>
          </Link>
          <Link to={`/dashboard/list-types`}>
            <div
              className={`flex justify-start gap-2 items-center rounded-lg p-2 ${
                activeLink === "members"
                  ? "text-white bg-[#3CB371]"
                  : "text-[#899499] hover:text-white hover:bg-[#3CB371]"
              }`}
              onClick={() => handleLinkClick("members")}
            >
              <Icon icon="simple-icons:hotelsdotcom" width={20} />
              <p className="text-sm">Types</p>
            </div>
          </Link>
          <Modal />
          <AddLodging />
        </div>
        <div className="border-b"></div>
      </section>
      <div
        className="flex justify-start gap-2 items-center text-[#3CB371]  rounded-lg p-2 cursor-pointer"
        onClick={handleLogout}
      >
        <Icon icon="tabler:logout" width={35} /> <p>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
