import React from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { Avatar, Button } from "@nextui-org/react";

const Profile = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div className="h-16" /> {/* Adding space of 16px between Navbar and Profile */}
      <div className="container mx-auto py-8">
        {/* Rest of your profile content */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex gap-3 items-center">
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Avatar name="Junior" />
          </div>
        </div>
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">John Doe</h1>
          <p className="text-gray-500">Web Developer</p>
        </div>
        <div className="text-center mb-6">
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            viverra enim at turpis rutrum hendrerit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
