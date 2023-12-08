import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

const HomeDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 border-4 flex justify-center items-center border-dashed rounded-full animate-spin border-[#3CB371]"></div>
        </div>
      ) : (
        <section className="flex justify-start gap-2">
          <Sidebar />
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeDashboard;
