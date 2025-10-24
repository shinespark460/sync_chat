import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AppContext } from '../context/AppContext';

const LoginPage = () => {
  const [currState, setCurrState] = useState('Sign Up');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const { login } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true); // show bio after first submit
    }
    login(currState === "Sign Up" ? "signup" : "login", { fullName, email, password, bio });
  };

  return (
    <div className="min-h-screen relative z-50 bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <img src={assets.logo_big} alt="logo" className="w-[min(30vw,200px)]" />

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 border border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-80 backdrop-blur-xl"
      >
        <h2 className="flex justify-between text-2xl font-medium items-center text-white">
          {currState}
          {
            isDataSubmitted && (<img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt="arrow" className="w-5 cursor-pointer" />)
          }

        </h2>

        {currState === "Sign Up" && !isDataSubmitted && (
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-2 border text-white border-gray-500 focus:outline-none rounded-md focus:ring-2 focus:ring-indigo-500 bg-transparent"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="p-2 border text-white focus:ring-2 focus:ring-indigo-500 border-gray-500 focus:outline-none rounded-md bg-transparent"
              placeholder="Email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="p-2 border text-white focus:ring-2 focus:ring-indigo-500 border-gray-500 focus:outline-none rounded-md bg-transparent"
              placeholder="Password"
              required
            />
          </>
        )}

        {currState === "Sign Up" && isDataSubmitted && (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-2 border text-white focus:ring-2 focus:ring-indigo-500 border-gray-500 focus:outline-none rounded-md bg-transparent"
            rows={4}
            placeholder="Your bio"
            required
          />
        )}

        <button
          type="submit"
          className="bg-gradient-to-r cursor-pointer from-purple-400 to-violet-600 border-none text-white text-sm py-2 px-2 rounded-xl hover:opacity-90 transition"
        >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="text-sm text-gray-500 flex flex-row gap-2 items-center">
          <input type="checkbox" required />{" "}
          <p className="text-white">Agree with terms and user policy</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign Up" ? (
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="text-violet-300 cursor-pointer font-medium"
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-300">
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Sign Up");
                  setIsDataSubmitted(false);
                }}
                className="text-violet-300 cursor-pointer font-medium"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
