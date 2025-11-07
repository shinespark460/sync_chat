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
          ? "2xl:grid-cols-[2fr_7.5fr_2.5fr] xl:grid-cols-[2fr_6.5fr_3.5fr] lg:grid-cols-[3.5fr_5fr_3.5fr] md:grid-cols-[4fr_8fr] transition-all duration-200"
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
