import React, { useState, useEffect } from "react";
import Profile from "./Components/Profile";
import Middle from "./Components/Middle";

const Dashboard = () => {
  return (
    <div className="w-full paddingYShorter2 paddingXShorter3 flex justify-between gap-4 px-10">
      <Middle />
      <Profile />
    </div>
  );
};

export default Dashboard;
