import React from "react";
import loginImg from "../assets/images/login/login-01.png";
const SignUpPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full h-screen bg-[#4eac6d] p-4">
      <div className="grid grid-cols-[3fr_9fr]">
        <div className="">
          <div className="">
            <img
              src={loginImg}
              alt="login-img"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full h-full py-16 relative rounded-lg flex justify-center flex-col items-center bg-white">
          <div className="flex flex-col gap-3 justify-center items-center ">
            <h1 className="text-[1.5rem] font-medium text-[#555555]">
              Register Account
            </h1>
            <p className="font-medium text-xl text-[#555555]">
              Get your free{" "}
              <span className="text-[#4eac6d] font-bold">Synk</span> account now
            </p>
            <form onSubmit={() => handleSubmit()} className="text-[16px] mt-12">
              {/* Name Field */}
              <div className="my-2">
                <label className="block text-[#555555] font-medium  mb-2 mx-3">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-[500px] py-2 border border-gray-300 rounded-lg px-5 focus:outline-none focus:ring-2 focus:ring-[#4eac6d]"
                />
              </div>
              <div className="my-2">
                <label className="block text-[#555555] font-medium  mb-2 mx-3">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your name"
                  className="w-[500px] py-2 border border-gray-300 rounded-lg px-5 focus:outline-none focus:ring-2 focus:ring-[#4eac6d]"
                />
              </div>
              <div className="my-2">
                <label className="block text-[#555555] font-medium  mb-2 mx-3">
                  Password
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-[500px] py-2 border border-gray-300 rounded-lg px-5 focus:outline-none focus:ring-2 focus:ring-[#4eac6d]"
                />
              </div>
              <div className="my-2">
                <label className="block text-[#555555] font-medium  mb-2 mx-3">
                  Bio
                </label>
                <textarea
                  rows={4}
                  type="text"
                  placeholder="Enter your name"
                  className="w-[500px] py-2 border resize-none border-gray-300 rounded-lg px-5 focus:outline-none focus:ring-2 focus:ring-[#4eac6d]"
                />
              </div>
              <div className=" text-gray-500 flex flex-row gap-2 my-2 items-center">
                <input type="checkbox" required />{" "}
                <p className="">Agree with terms and user policy</p>
              </div>
              <button className="w-full rounded-lg text-white py-2 bg-[#4eac6d]">
                Register
              </button>
            </form>
          </div>
          <div className="mb-16 mt-6">
            <p className="text-[#555555]">
              Already have an account?{" "}
              <span className="text-[#4eac6d] font-bold cursor-pointer">
                Login
              </span>
            </p>
          </div>

          <div className="absolute bottom-3">
            <p className="text-[#555555]">
              Sink 2025 &copy; | All rights reserved. | Crafted By &nbsp;
              <a className="text-[#4eac6d] font-bold cursor-pointer">
                Himanshu
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
