import React, { useContext } from "react";
import LeftTab from "../components/LeftTab";
import ChatTab from "../components/ChatTab";
import { AppContext } from "../context/AppContext";
import SenderProfleTab from "../components/SenderProfleTab";

const HomeDashboard = () => {
  const { openProfileUser } = useContext(AppContext);
  return (
    <div
      className={`grid ${
        openProfileUser
          ? "grid-cols-[2fr_7.5fr_2.5fr] transition-all duration-200"
          : "grid-cols-[2fr_10fr]"
      } `}
    >
      <LeftTab />
      <ChatTab />
      {openProfileUser && <SenderProfleTab />}
    </div>
  );
};

export default HomeDashboard;
