import React from "react";
import Sidebar from "../../../Components/Sidebar";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useState, useEffect } from "react";

const apiUrl = "https://phase2-aio.vercel.app";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

const ListMembers = () => {
  const [type, setType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTypes = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${apiUrl}/apis/rent-room/types`,
        config
      );
      setType(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTypes();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 border-4 flex justify-center items-center border-dashed rounded-full animate-spin border-[#3CB371]"></div>
        </div>
      ) : (
        <div className="container p-2 mx-auto sm:p-4">
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full p-6 text-xs text-left whitespace-nowrap">
              <thead>
                <tr className="bg-[#3CB371]">
                  <th className="p-3">Id</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              {type?.map((e) => {
                return (
                  <tbody
                    className="border-b bg-[#ffffff] text-[#000000]"
                    key={e?.id}
                  >
                    <tr>
                      <td className="px-3 py-2">
                        <p className="text-sm">{e?.id}</p>
                      </td>
                      <td className="px-3 py-2">
                        <p className="text-sm">{e?.name}</p>
                      </td>

                      <td className="px-3 py-2">
                        <button
                          type="button"
                          title="Open details"
                          className="p-1 rounded-full dark:text-gray-600 hover:dark:bg-gray-700 focus:dark:bg-gray-700"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-4 h-4 fill-current"
                          >
                            <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ListMembers;
