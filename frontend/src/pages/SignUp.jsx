import React from "react";
import LoginPageBackground from "../assets/signupbackground.jpg";
import { Link } from 'react-router-dom';
export default function SignupForm() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4 sm:px-8"
      style={{
        backgroundImage: `url(${LoginPageBackground})`,
      }}
    >
      <div className="w-full max-w-3xl bg-white p-10 border rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="text-[#1e0e62]">Create your </span>
          <span className="text-green-600">Account</span>
        </h1>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-[#1e0e62]">FIRST NAME</label>
            <input
              type="text"
              className="w-full border rounded-full px-4 py-2 mt-1 focus:outline-none"
            />
          </div>

        
          <div>
            <label className="text-xs font-bold text-[#1e0e62]">LAST NAME</label>
            <input
              type="text"
              className="w-full border rounded-full px-4 py-2 mt-1 focus:outline-none"
            />
          </div>

        
          <div>
            <label className="text-xs font-bold text-[#1e0e62]">COUNTRY</label>
            <input
              type="text"
              className="w-full border rounded-full px-4 py-2 mt-1 focus:outline-none"
            />
          </div>

        
          <div>
            <label className="text-xs font-bold text-[#1e0e62]">STATE</label>
            <input
              type="text"
              className="w-full border rounded-full px-4 py-2 mt-1 focus:outline-none"
            />
          </div>

        
          <div>
            <label className="text-xs font-bold text-[#1e0e62]">CITY/DISTRICT</label>
            <input
              type="text"
              className="w-full border rounded-full px-4 py-2 mt-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#1e0e62]">ADDRESS</label>
            <input
              type="text"
              className="w-full border rounded-full px-4 py-2 mt-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#1e0e62]">PHONE NUMBER</label>
            <input
              type="text"
              className="w-full border rounded-full px-4 py-2 mt-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#1e0e62]">
              EMAIL ID <span className="text-gray-400">(OPTIONAL)</span>
            </label>
            <input
              type="email"
              className="w-full border rounded-full px-4 py-2 mt-1 focus:outline-none"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              placeholder="OTP"
              className="w-full border rounded-full px-4 py-2 mt-2 focus:outline-none text-gray-400"
            />
          </div>
          <div className="col-span-1 flex justify-end items-end">
            <button
              type="submit"
              className="bg-[#24A565] text-white px-6 py-2 mt-2 rounded-full hover:opacity-90"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-xs text-gray-400 text-center mt-6">
          ALREADY HAVE AN ACCOUNT?{" "}
          <Link to="/login" className="text-green-600 font-bold cursor-pointer">
  SIGN IN
</Link>
        </p>
      </div>
    </div>
  );
}