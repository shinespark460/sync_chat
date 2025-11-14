import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/AppContext";
import SignUpPage from "./pages/SignUpPage";
import HomeDashboard from "./pages/HomeDashboard";

function App() {
  const { authUser } = useContext(AppContext);

  // -------------------------
  //  GLOBAL THEME CONTROLLER
  // -------------------------
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  // ------------------------------------

  return (
    <>
      <div className="overflow-y-hidden">
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              authUser ? (
                <HomeDashboard theme={theme} setTheme={setTheme} />
              ) : (
                <Navigate to="/signup" />
              )
            }
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
