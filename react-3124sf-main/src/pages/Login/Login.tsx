import axios from "axios";
import React, { useState } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import UrlConstant from "../../constant/url";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = {
      username : username,
      password : password,
    }

    try {
      const response = await axios.post(UrlConstant.API_URL + "login", params, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)

      const token = response.data.token;

      localStorage.setItem("token", token);

      window.location.href = "/";
    } catch (error: any) {
      console.error("Login failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
        <div className="w-full max-w-xs p-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl mb-4 text-center">Login</h2>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-2 text-sm">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username} // Add this line to bind the value to the state
                onChange={(e) => setUsername(e.target.value)} // Add this line to update the state
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
                value={password} // Add this line to bind the value to the state
                onChange={(e) => setPassword(e.target.value)} // Add this line to update the state
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-5 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </div>
            <p className="text-center text-xs">Need an Account? try <a href="/register">Register</a>.</p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
