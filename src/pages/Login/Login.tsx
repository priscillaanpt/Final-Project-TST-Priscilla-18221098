import React from "react";
import NavbarComponent from "../../components/NavbarComponent";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
        <div className="w-full max-w-xs p-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl mb-4 text-center">Login</h2>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-2 text-sm">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-center">
              {" "}
              {/* Centering the button */}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
