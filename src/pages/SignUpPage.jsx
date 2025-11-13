import React, { useContext, useState } from "react";
import {
  LogIn,
  User,
  Mail,
  Lock,
  MessageSquare,
  Eye,
  EyeOff,
} from "lucide-react";
import signupIllustrator from "../assets/images/login/login-01.png";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loading";
import logo from "../assets/images/login/synk_logo.png";
// Main App component
const App = () => {
  const { login, loading } = useContext(AppContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    bio: "",
  });

  const [currState, setCurrState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  // Simple state update handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle authentication here.
    console.log("Form Submitted:", formData);
    login(currState === "Sign Up" ? "signup" : "login", formData);
  };
  // The single-page responsive layout
  return (
    <div className="min-h-screen bg-[#4eac6d] flex items-center relative justify-center lg:p-4 p-0 py-4 font-inter">
      {loading && (
        <div className="text-8xl absolute w-full h-full top-0 z-50 bg-[#dddddd8a] flex justify-center items-center text-red-500">
          {" "}
          <Loader />
        </div>
      )}
      {/* Container: Max width for desktop, full width for mobile */}
      <div className="w-full max-w-11/12 mx-auto grid grid-cols-1 md:grid-cols-12 rounded-xl  overflow-hidden">
        {/* LEFT COLUMN: VISUAL/MARKETING (Hidden on mobile, visible on medium screens) */}
        <div className="md:col-span-5 lg:col-span-4  p-6 lg:p-10 relative hidden md:flex flex-col justify-between items-center text-white">
          <div className="w-full">
            <img src={logo} className="w-40 brightness-100" />
          </div>

          <div className="flex flex-col items-center justify-center text-center py-5">
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
              Join the future of instant connection.
            </h1>
            <p className="text-lg opacity-90">
              Synk provides secure and seamless communication across all your
              devices.
            </p>
          </div>

          <img
            src={signupIllustrator}
            alt="Chat Application Illustration"
            className="w-full max-w-xs md:max-w-full z-10 "
          />
        </div>

        {/* RIGHT COLUMN: SIGN UP FORM */}
        <div className="md:col-span-7 lg:col-span-8 w-full p-6 sm:p-10 2xl:p-16 relative flex flex-col justify-between bg-white rounded-xl">
          <div className="flex flex-col lg:gap-5 justify-center items-center w-full">
            {/* Logo for Mobile View */}
            <div className="md:hidden mb-4 ">
              <img src={logo} className="w-40 brightness-100" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center">
              {currState === "Sign Up" ? "Create Your Account" : "Welcome Back"}
            </h1>
            {currState === "Sign Up" ? (
              <p className="font-semibold text-lg text-gray-600 text-center">
                Get your free{" "}
                <span className="text-[#4eac6d] font-bold">Synk</span> account
                now
              </p>
            ) : (
              <p className="font-semibold text-lg text-gray-600 text-center">
                Sign in to continue to
                <span className="text-[#4eac6d] font-bold"> Synk</span>
              </p>
            )}
            {/* FORM SECTION: Center the form content and constrain its max width */}
            <form
              onSubmit={handleSubmit}
              className="text-base lg:mt-8 mt-4 w-full max-w-md"
            >
              {/* Name Field */}
              {currState === "Sign Up" && (
                <div className="mb-4">
                  <label className="flex items-center text-gray-700 font-semibold mb-2 text-sm">
                    <User className="w-4 h-4 mr-2 text-[#4eac6d]" /> Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eac6d] transition duration-200"
                    required
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="mb-4">
                <label className="flex items-center text-gray-700 font-semibold mb-2 text-sm">
                  <Mail className="w-4 h-4 mr-2 text-[#4eac6d]" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eac6d] transition duration-200"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-4 relative">
                <label className="flex items-center text-gray-700 font-semibold mb-2 text-sm">
                  <Lock className="w-4 h-4 mr-2 text-[#4eac6d]" /> Password
                </label>
                <input
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eac6d] transition duration-200"
                  required
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-5 h-5 text-gray-400 absolute right-5 top-1/2 cursor-pointer"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </span>
              </div>

              {/* Bio Field (Changed from text to textarea and added icon) */}
              {currState === "Sign Up" && (
                <div className="mb-6">
                  <label className="flex items-center text-gray-700 font-semibold mb-2 text-sm">
                    <MessageSquare className="w-4 h-4 mr-2 text-[#4eac6d]" />{" "}
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="A short introduction about yourself"
                    className="w-full p-3 border resize-none border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eac6d] transition duration-200"
                  />
                </div>
              )}

              {/* Terms Checkbox */}
              <div className="text-gray-500 flex flex-row gap-3 my-4 items-start">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-[#4eac6d] bg-gray-100 border-gray-300 rounded focus:ring-[#4eac6d]"
                  required
                />
                <p className="text-sm">
                  I agree with the{" "}
                  <span className="font-medium text-[#4eac6d] cursor-pointer hover:underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-[#4eac6d] cursor-pointer hover:underline">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full rounded-xl text-white py-3 mt-4 bg-[#4eac6d] hover:bg-[#3a8b54] transition cursor-pointer duration-300 shadow-lg flex flex-row gap-2 justify-center items-center font-bold text-lg"
              >
                <LogIn />
                {currState === "Sign Up" ? "Sign Up Accuont" : "Login Account"}
              </button>
            </form>
          </div>

          {/* Footer Links and Copyright */}
          <div
            className={` ${
              currState === "Sing Up" ? "mt-8" : "mt-4"
            } mt-8 text-center text-gray-600`}
          >
            <p className="text-sm sm:text-base mb-2">
              {currState === "Sign Up"
                ? "Already have an account?"
                : " Don't have an account?"}
              <span
                onClick={() =>
                  setCurrState(currState === "Sign Up" ? "Login" : "Sign Up")
                }
                className="text-[#4eac6d] font-bold cursor-pointer hover:underline"
              >
                {currState === "Sign Up" ? " Login" : " Sign Up"}
              </span>
            </p>

            <div className="border-t border-gray-100 pt-4 mt-auto">
              <p className="lg:text-lg text-sm text-gray-500">
                Synk 2025 &copy; | All rights reserved. | Crafted By &nbsp;
                <a
                  href="https://hemanshu-mishra.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4eac6d] font-bold cursor-pointer hover:underline"
                >
                  Himanshu
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
