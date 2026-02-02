// import React from "react";
import { assets } from "@/assets";
import { useAuth } from "@/contexts/AuthContext";
import Nav from "@/layouts/Nav";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-7xl mx-auto p-4">
      <Nav />
      <main className="mt-20 px-8 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center max-w-3xl gap-3">
          <img src={assets.hero} alt="hero" className="w-1/2 aspect-square" />
          <div className="flex gap-3">
            <h3 className="text-3xl font-medium">Hey {user?.username} !</h3>
            <img src={assets.wave} alt="wave" className="w-10 aspect-square" />
          </div>
          <h1 className="text-5xl font-bold">Welcome to Our App</h1>
          <p className="text-md font-medium">
            Let's start with a quick tour and wee will have you up and running
            in no time!
          </p>
          {/* <Button
            variant="link"
            onClick={() => navigate("/login")}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-gray-500 text-base font-medium cursor-pointer hover:no-underline"
          >
            Get Started
          </Button> */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
