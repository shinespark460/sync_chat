import React from "react";
import LeftTab from "../components/LeftTab";
import ChatTab from "../components/ChatTab";

const HomeDashboard = () => {
  return (
    <div className="flex flex-row ">
      <LeftTab />
      <ChatTab />
    </div>
  );
};

export default HomeDashboard;
