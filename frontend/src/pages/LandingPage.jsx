import React from "react";
import FarmerImage from "../assets/LandingPageFarmer.png";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
export default function KrishiMitra() {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex flex-col justify-center py-16 bg-white">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-1">
            <div data-property-1="Black" className="w-32 h-32 relative">
              <img className="w-32 h-32 left-0 top-0 absolute" src={logo} />
            </div>
            <h1 className="text-[#151439] text-7xl font-bold">KrishiMitra</h1>
          </div>
        </header>
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 px-12">
          <span className="text-[#151439]">Just a </span>
          <span className="text-[#24a665]">great tool to </span><br />
          <span className="text-[#151439]">empower </span>
          <span className="text-[#24a665]">farmers</span>
        </h2>
        <p className="text-gray-400 max-w-md mb-6 px-12">
          We made it so beautiful and simple. It combines landings, pages, blogs and shop screens. It is definitely
          the tool you need in your collection!
        </p>
        <div className="flex gap-4 flex-wrap mb-4 px-12">
          <Link to="/signup">
            <button className="bg-[#24a665] text-white px-9 py-4 text-lg rounded-full font-semibold hover:bg-opacity-90 transition-all">
              Get Started
            </button>
          </Link>
          <Link to="/learn">
            <button className="border border-[#24a665] text-[#090e0b] px-9 py-4 text-lg rounded-full font-semibold hover:bg-[#f7f9f8] hover:bg-opacity-10 transition-all">
              Learn More
            </button>
          </Link>
        </div>

        <p className="text-sm text-gray-400 px-12">
          By signing up, you agree to the Terms of Service
        </p>
      </div>
      <div className="w-1/2">
        <img
          src={FarmerImage}
          alt="Farmer"
          className="w-full h-screen object-cover "
        />
      </div>
    </div>
  );
}