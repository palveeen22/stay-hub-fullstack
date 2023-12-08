import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import EditLodging from "../Components/EditLodging";

const ListLodgings = ({ lodging, isLoading, handleDelete }) => {
  return (
    <>
      <div className="container p-2 mx-auto sm:p-4">
        <div
          className="overflow-x-auto rounded-lg overflow-y-auto border"
          style={{ maxHeight: "600px" }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 border-4 flex justify-center items-center border-dashed rounded-full animate-spin border-[#3CB371]"></div>
            </div>
          ) : (
            <table className="w-full p-6 text-xs text-left whitespace-nowrap">
              <thead>
                <tr className="bg-[#3CB371]">
                  <th className="p-3 text-center">Id</th>
                  <th className="p-3 text-center">Name</th>
                  {/* <th className="p-3 text-center">Facility</th> */}
                  <th className="p-3 text-center">Room Capacity</th>
                  {/* <th className="p-3 text-center">Image Upload</th> */}
                  <th className="p-3 text-center">Location</th>
                  <th className="p-3 text-center">Author</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {lodging.map((e) => {
                  return (
                    <tr
                      className="border-b bg-[#ffffff] text-[#000000]"
                      key={e.id}
                    >
                      <td className="px-3 py-2">
                        <p className="text-sm">{e?.id}</p>
                      </td>
                      <td className="px-3 py-2">
                        <p className="text-sm">{e?.name}</p>
                      </td>
                      {/* <td className="px-3 py-2">
                        <p className="text-sm">
                          {textEllipsisCustom(e?.facility)}
                        </p>
                      </td> */}
                      <td className="px-3 py-2">
                        <p className="text-sm">{e?.roomCapacity}</p>
                      </td>
                      {/* <td>
                        <ModalUpload fileId={e.id} />
                      </td> */}
                      <td className="px-3 py-2">
                        <p className="text-sm">{e?.location}</p>
                      </td>
                      <td className="px-3 py-2">
                        <p className="text-sm">{e?.authorId}</p>
                        <p className="dark:text-gray-400 text-sm">
                          {e?.User.username}
                        </p>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex justify-center gap-4 items-center">
                          <EditLodging id={e?.id} />
                          <button onClick={() => handleDelete(e?.id)}>
                            <Icon icon="uiw:delete" width={25} />
                          </button>
                          <Link to={`/dashboard/upload-file/${e?.id}`}>
                            <button>
                              <Icon icon="material-symbols:upload" width={25} />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ListLodgings;
