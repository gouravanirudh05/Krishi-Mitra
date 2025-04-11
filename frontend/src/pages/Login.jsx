import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import LoginPageBackground from "../assets/Loginbackground.png"

const BACKEND_URL =
  import.meta.env.VITE_APP_BACKEND_URL ?? "http://localhost:5000";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef([])
  const [receivedOTP, setReceivedOTP] = useState(false);

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "") // only digits
    if (!value) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (index < 5 && value) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault()
      const newOtp = [...otp]
      if (otp[index]) {
        newOtp[index] = ""
        setOtp(newOtp)
      } else if (index > 0) {
        newOtp[index - 1] = ""
        setOtp(newOtp)
        inputRefs.current[index - 1].focus()
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join("")
    console.log("Phone:", phoneNumber, "OTP:", otpValue)
    if(!receivedOTP){
      const response = await fetch(
        `${BACKEND_URL}/api/sendOtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({phoneNumber}),
        }
      );

      const json = await response.json();
      if(json.success)
        setReceivedOTP(true);
      alert(json.message);
    }
    else{
      const response = await fetch(
        `${BACKEND_URL}/api/verifyOtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({phoneNumber, otp: otpValue}),
        }
      );

      const json = await response.json();
      if(json.token)
      {
        localStorage.setItem("jwtToken", json.token);
        alert("Login successfull");
      }
      else
        alert(json.message);
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${LoginPageBackground})`,
      }}
    >
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h1 className="text-[#1e0e62] text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {!receivedOTP && (
          <input
            type="tel"
            placeholder="Your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-[#ebeaed] focus:outline-none focus:ring-2 focus:ring-[#1e0e62]/20 text-sm sm:text-base"
          />
          )}

          {receivedOTP && (
            <div>
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl border border-[#ebeaed] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e0e62]/20"
              />
            ))}
          </div>
          

          <div className="text-center text-[#151439] text-sm sm:text-base">
            Didn't receive <span className="text-[#1e0e62] font-medium">OTP</span>?
          </div>
          </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#24a565] text-white py-3 rounded-full font-semibold hover:bg-[#1e8f56] transition duration-200 text-sm sm:text-base"
          >
            {receivedOTP === true ? "Login": "Receive OTP"}
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