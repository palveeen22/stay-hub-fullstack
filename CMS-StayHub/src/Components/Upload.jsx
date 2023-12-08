import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

const apiUrl = "https://phase2-aio.vercel.app";

const Upload = () => {
  const [imgUrl, setImgUrl] = useState("");
  const { productId } = useParams();
  const navigate = useNavigate();

  const inputOnChangeHandler = (e) => {
    const input = e.target.files[0];
    setImgUrl(input);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    // Membuat objek FormData
    const formData = new FormData();
    formData.append("file", imgUrl);

    try {
      await axios.patch(
        `${apiUrl}/apis/rent-room/lodgings/${productId}`,
        formData,
        config
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success upload new photo",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
  return (
    <>
      <div className=" top-0 left-0 flex justify-center items-center w-screen h-screen">
        <div className="max-w-2xl bg-white p-16 rounded-3xl">
          <form className="text-[#000000" onSubmit={handleUpload}>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Attach Document
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col  justify-center items-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <img
                        className="has-mask h-30 object-center"
                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                        alt="freepik image"
                      />
                    </div>
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Drag and drop</span> files here{" "}
                      <br /> or
                      <a className="text-blue-600 hover:underline">
                        select a file
                      </a>
                      from your computer
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    // id="file-upload"
                    // name="file-upload"
                    onChange={inputOnChangeHandler}
                  />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              <span>File type: doc,pdf,types of images</span>
            </p>
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
  );
};

export default Upload;
