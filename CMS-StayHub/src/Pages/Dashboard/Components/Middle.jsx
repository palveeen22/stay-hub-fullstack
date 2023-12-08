import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListLodgings from "../ListLodgings/ListLodgings";
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = "https://phase2-aio.vercel.app";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

const Middle = () => {
  const [lodging, setLodging] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { lodgingId } = useParams();
  const [search, setSearch] = useState("");

  const getAllLodging = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${apiUrl}/apis/rent-room/lodgings`,
        config
      );
      setLodging(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/apis/rent-room/lodgings/${id}`, config);
      console.log("Post deleted:", id);
      setLodging(lodging.filter((post) => post.id !== id));
      Swal.fire({
        icon: "success",
        title: "Delete sucesfull",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getAllLodging();
  }, [search]);

  return (
    <div className="w-[75%] flex flex-col gap-10">
      <div className="relative w-full">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="find here.."
          className="w-full bg-[#ffffff] rounded-full border px-4 py-4 h-full text-[#000000] placeholder-text-sm placeholder-gray-600 pl-4"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 px-1 py-1 bg-[#3CB371] rounded-full">
          <Icon icon="pepicons-pencil:loop" width={20} color="#ffffff" />
        </div>
      </div>

      <div className="w-full flex justify-center gap-2">
        <div className="flex-1 border rounded-lg px-8 py-6 bg-[#ffffff]">
          <span className="flex justify-start gap-4">
            <Icon
              icon="clarity:employee-group-solid"
              width={25}
              color="#848884"
            />
            <h3 className="text-base text-[#848884] font-light">Total Staff</h3>
          </span>
          <span className="flex justify-between gap-4 items-center">
            <h3>12</h3>
            <p className="text-[#848884] text-sm">Now days</p>
          </span>
        </div>
        <div className="flex-1 border rounded-lg px-8 py-6 bg-[#ffffff]">
          <span className="flex justify-start gap-4 items-center">
            <Icon icon="ci:building-04" width={25} color="#848884" />
            <h3 className="text-base text-[#848884] font-light">
              Total Lodging
            </h3>
          </span>
          <span className="flex justify-between gap-4 items-center">
            <h3>{lodging.length}</h3>
            <p className="text-[#848884] text-sm">Now days</p>
          </span>
        </div>
      </div>
      <ListLodgings
        lodging={lodging}
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Middle;
