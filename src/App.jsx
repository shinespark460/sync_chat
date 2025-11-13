import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ProfilePage from "./pages/ProfilePage";
// import bgImage from "../src/assets/images/bg_image.jpg";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import SignUpPage from "./pages/SignUpPage";
import HomeDashboard from "./pages/HomeDashboard";
function App() {
  const { authUser } = useContext(AppContext);
  return (
    <>
      <div className="overflow-y-hidden">
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomeDashboard /> : <Navigate to="/signup" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/signup" />}
          />
         
        </Routes>
      </div>
    </>
  );
}

export default App;
