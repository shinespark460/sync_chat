import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
// import bgImage from "../src/assets/images/bg_image.jpg";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import SignUpPage from "./pages/SignUpPage";
function App() {
  const { authUser } = useContext(AppContext);
  return (
    <>
      <div
        // className="w-full h-full relative"
        // style={{
        //   backgroundImage: `url(${bgImage})`,
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        // }}
      >
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
