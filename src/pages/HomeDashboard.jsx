import React, { useContext } from "react";
import LeftTab from "../components/LeftTab";
import ChatTab from "../components/ChatTab";
import { AppContext } from "../context/AppContext";
import SenderProfleTab from "../components/SenderProfleTab";
import BottomTabMobile from "../components/BottomTabMobile";
import { ChatContext } from "../context/ChatContext";

const HomeDashboard = () => {
  const { openProfileUser } = useContext(AppContext);
  const { selectedUser } = useContext(ChatContext);
  return (
    <>
      <div
        className={`md:grid hidden ${
          openProfileUser
            ? "2xl:grid-cols-[2.5fr_7fr_2.5fr] xl:grid-cols-[3fr_6fr_3fr] lg:grid-cols-[3.5fr_5fr_3.5fr] md:grid-cols-[5fr_7fr] transition-all duration-200"
            : "xl:grid-cols-[3fr_9fr] lg:grid-cols0[4fr_8fr] md:grid-cols-[5fr_7fr]"
        } `}
      >
        <LeftTab />
        {/* <ChatTab /> */}
        {openProfileUser && window.innerWidth <= 768 ? null : <ChatTab />}
        {openProfileUser && <SenderProfleTab />}
      </div>
      <div className="block md:hidden">
      
        {!selectedUser && <BottomTabMobile />}

        {selectedUser && !openProfileUser && <ChatTab />}

        {selectedUser && openProfileUser && <SenderProfleTab />}
      </div>
    </>
  );
};

export default HomeDashboard;
