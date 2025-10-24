/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ correct env key

axios.defaults.baseURL = backendUrl;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const value = {
    axios,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
