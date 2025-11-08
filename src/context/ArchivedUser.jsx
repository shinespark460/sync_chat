/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const ArchiveContext = createContext();

export const ArchiveProvider = ({ children }) => {
  const [archivedUsers, setArchivedUsers] = useState([]);

  const value = {
    archivedUsers,
    setArchivedUsers,
  };

  return (
    <ArchiveContext.Provider value={value}>
      {children}
    </ArchiveContext.Provider>
  );
};
