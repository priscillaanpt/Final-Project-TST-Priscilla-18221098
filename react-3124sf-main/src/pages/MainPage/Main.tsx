import React from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { Image, Button } from "@nextui-org/react";
import ProductCard from "../../components/ProductCard";

const Main = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div className="flex flex-col py-16 justify-center items-center text-white gap-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to WomenCloth!</h1>
        <p className="text-lg">Explore our amazing features:</p>
        <Button color="primary" variant="ghost">Explore</Button>
        <div className="mt-8">
          <Image
            width={400}
            alt="NextUI hero Image"
            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          />
        </div>
        <p className="text-sm mt-8">Stay tuned for exciting updates!</p>
      </div>
    </div>
  );
};

export default Main;
