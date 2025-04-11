import React from "react";
import FarmerImage from "../assets/LandingPageFarmer.png";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
export default function KrishiMitra() {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex flex-col justify-center px-12 py-16 bg-white">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div data-property-1="Black" className="w-16 h-16 relative">
              <img className="w-16 h-16 left-0 top-0 absolute" src={logo} />
            </div>
            <h1 className="text-[#151439] text-2xl font-bold">KrishiMitra</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-8 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#151439]">Our Team</a></li>
              <li><a href="/about" className="hover:text-[#151439]">About</a></li>
            </ul>
          </nav>
        </header>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          <span className="text-[#151439]">Just a </span>
          <span className="text-[#24a665]">great tool to </span><br />
          <span className="text-[#151439]">empower </span>
          <span className="text-[#24a665]">farmers</span>
        </h2>
        <p className="text-gray-400 max-w-md mb-6">
          We made it so beautiful and simple. It combines landings, pages, blogs and shop screens. It is definitely
          the tool you need in your collection!
        </p>
        <div className="flex gap-4 flex-wrap mb-4">
          <Link to="/signup">
            <button className="bg-[#24a665] text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
              Get Started
            </button>
          </Link>
          <Link to="/learn">
            <button className="border border-[#24a665] text-[#090e0b] px-6 py-3 rounded-full font-medium hover:bg-[#f7f9f8] hover:bg-opacity-10 transition-all">
              Learn More
            </button>
          </Link>
        </div>
        <p className="text-sm text-gray-400">
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