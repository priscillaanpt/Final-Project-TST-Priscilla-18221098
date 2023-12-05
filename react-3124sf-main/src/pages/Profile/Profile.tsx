import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { Avatar, Button } from "@nextui-org/react";
import axios from "axios";
import UrlConstant from "../../constant/url";

const Profile = () => {
    const [profileData, setProfileData] = useState({
      username : '',
      email : '',
      password: ''
    })
    useEffect(() =>{
      const token = localStorage.getItem("token")
      const getProfileData = async () => {
        const response = await axios.get(UrlConstant.API_URL+"profile", {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        setProfileData(response.data)
      }
      getProfileData()
    }, [])

    return (
      <div className="flex flex-col min-h-screen">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
        <div className="w-full max-w-xs p-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl mb-4 text-center">Data Profile</h2>
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-2 text-sm">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={profileData.username} // Add this line to bind the value to the state
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={profileData.email} // Add this line to bind the value to the state
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={profileData.password} // Add this line to bind the value to the state
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                disabled
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
