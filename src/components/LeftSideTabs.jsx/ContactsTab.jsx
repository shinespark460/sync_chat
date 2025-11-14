import React, { useContext, useState, useMemo } from "react";
import { UserPlus, Search } from "lucide-react";
import { ChatContext } from "../../context/ChatContext";
import { AppContext } from "../../context/AppContext";
import CircularProgress from "@mui/material/CircularProgress";

const ContactsTab = () => {
  const [input, setInput] = useState("");
  const { users, selectedUser, setSelectedUser, setUnseenMessages, loading } =
    useContext(ChatContext);
  const { onlineUsers, setOpenProfileUser } = useContext(AppContext);

  // 🔍 Filter + Group + Sort contacts
  const groupedContacts = useMemo(() => {
    // 1️⃣ Filter contacts by search text
    const filtered = users.filter((user) =>
      user.fullName.toLowerCase().includes(input.toLowerCase())
    );

    // 2️⃣ Sort alphabetically
    const sorted = filtered.sort((a, b) =>
      a.fullName.localeCompare(b.fullName, "en", { sensitivity: "base" })
    );

    // 3️⃣ Group by first letter
    const grouped = sorted.reduce((acc, user) => {
      const firstLetter = user.fullName[0]?.toUpperCase() || "#";
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(user);
      return acc;
    }, {});

    return grouped;
  }, [users, input]);

  const alphabetKeys = useMemo(
    () => Object.keys(groupedContacts).sort(),
    [groupedContacts]
  );

  return (
    <div className="w-full  h-screen overflow-y-auto flex flex-col py-4 md:border-r ">
      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-3">
        <h2 className="text-green-600 text-xl font-semibold">Contacts</h2>
        <button className="w-8 h-8 flex justify-center items-center bg-base-100 rounded-full hover:bg-green-200 border-[1px] transition">
          <UserPlus className="" size={16} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4">
        <div className="relative my-3">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 "
            size={16}
          />
          <input
            type="text"
            placeholder="Search contacts"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="w-full pl-9 pr-3 py-2.5  border-[1px] outline-none focus:ring-1 focus:ring-green-400 transition"
          />
        </div>
      </div>

      {/* Contact List */}
      {loading ? (
        <div className="flex flex-col justify-center items-center gap-3 w-full mt-20">
          <CircularProgress color="success" />
          <p className="text-[#4eac6d] text-xl">Fetching Users...</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {alphabetKeys.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No contacts found</p>
          ) : (
            alphabetKeys.map((letter) => (
              <div
                key={letter}
                className="mb-3 border-b-[1px] border-[#aaa8a86c]"
              >
                {/* Alphabet Header */}
                <div className="sticky top-0 z-10 px-2 py-1">
                  <h3 className="text-sm font-bold ">{letter}</h3>
                </div>

                {/* Contacts under that letter */}
                {groupedContacts[letter].map((user) => (
                  <div
                    key={user._id}
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenProfileUser(false);
                      setUnseenMessages((prev) => ({
                        ...prev,
                        [user._id]: 0,
                      }));
                    }}
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-all duration-150 ${
                      selectedUser?._id === user._id
                        ? "bg-base-300"
                        : "hover:bg-base-300"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative">
                      {user.profilePic ? (
                        <div className="w-12 h-12">
                          <img
                            src={user.profilePic}
                            alt={user.fullName}
                            className=" object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex justify-center items-center text-gray-600 font-semibold">
                          {user.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                      )}

                      {/* Online Indicator */}
                      {onlineUsers.includes(user._id) && (
                        <div className="absolute w-3 h-3 rounded-full bg-green-500 bottom-0 right-1 border-2 "></div>
                      )}
                    </div>

                    {/* User info */}
                    <div className="flex justify-between items-center w-full">
                      <p className="font-medium  truncate">{user.fullName}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ContactsTab;
