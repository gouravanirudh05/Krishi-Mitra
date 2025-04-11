import React, { useState } from "react"
import { Link } from "react-router-dom"
import LoginPageBackground from "../assets/Loginbackground.png";
export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Phone:", phoneNumber, "OTP:", otp)
  }
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center px-100"
      style={{
        backgroundImage: `url(${LoginPageBackground})`,
      }}
    >
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h1 className="text-[#1e0e62] text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <input
            type="tel"
            placeholder="Your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-[#ebeaed] focus:outline-none focus:ring-2 focus:ring-[#1e0e62]/20 text-sm sm:text-base"
          />

          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-[#ebeaed] focus:outline-none focus:ring-2 focus:ring-[#1e0e62]/20 text-sm sm:text-base"
          />

          <div className="text-center text-[#151439] text-sm sm:text-base">
            Didn't receive <span className="text-[#1e0e62] font-medium">OTP</span>?
          </div>

          <button
            type="submit"
            className="w-full bg-[#24a565] text-white py-3 rounded-full font-semibold hover:bg-[#1e8f56] transition duration-200 text-sm sm:text-base"
          >
            Receive OTP
          </button>
        </form>

        <div className="border-t border-[#ebeaed] my-6"></div>

        <div className="text-center text-[#151439] text-sm sm:text-base">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#1e0e62] font-medium hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
