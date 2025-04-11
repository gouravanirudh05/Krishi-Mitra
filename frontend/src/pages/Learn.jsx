import logo from "../assets/logo.png";
import learnbg from "../assets/learnbg.jpeg"
import middlemen from "../assets/middlemen.png"
import icon from "../assets/image.png"
import { Link } from "react-router-dom";
export default function Learn() {
  return (
    <div className="min-h-screen overflow-auto">

      {/* Navigation */}
      <nav className="bg-transparent absolute top-0 left-0 right-0 z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="KrishiMitra Logo" className="h-10" />
            <span className="text-white font-bold text-xl ml-2">KrishiMitra</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-green-300">
              Home
            </Link>
            <Link to="/learn" className="text-white hover:text-green-300">
              Learn
            </Link>
            <Link to="/signup">
              <button className="text-white px-6 py-3 rounded-md" style={{ backgroundColor: "#24A565" }}>
                Get Started
              </button>
            </Link>
          </div>
          <button className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        <img
          src={learnbg}
          alt="Farm field"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 max-w-3xl">Boosts the farmers better than ever</h1>
          <p className="text-xl max-w-2xl">
            Eliminates middlemen and farmers are getting their due on their time, food, and crops.
          </p>
        </div>
      </section>

      {/* Middle Man Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <img
          src={middlemen}
          alt="Market place"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start text-white z-10 px-8 md:px-16 lg:px-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Removes the <span className="text-cyan-400">Middle Man</span>
          </h2>
          <p className="text-lg max-w-xl">
            According to a recent study in India the reason farmers lose valuable profits is a result of access to
            market, and exploitation by middlemen leading to low prices and reduced profitability.
          </p>
        </div>
      </section>

      {/* Farmer Friendly Section */}
      <section className="py-16 px-8" style={{ backgroundColor: "#24A565" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="p-4 rounded-lg w-32 h-32 flex items-center justify-center">
            <img src={icon} alt="Wheat icon" className="h-20 w-20" />
          </div>
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">Farmer Friendly</h2>
            <p className="max-w-2xl">
              In addition to having a user friendly app, we also provide a phone call based service that allows one to
              access all the features they would access from the app. This connects those who can't use nor can use a
              smart phone well.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider text-gray-700 mb-4">Crop Planning ↗</h3>
            <p className="text-gray-600">
              Everything you need to know is in crop planning. A precise farmer with proper crop selection for proper
              season, weather schedule, planting time, harvest schedule along with when to prepare. This helps plan from
              conceptualization to quantity. It's easy to make it more accurate.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider text-gray-700 mb-4">Farm Guidance ↗</h3>
            <p className="text-gray-600">
              Get expert guidance on farming practices, pest control, and crop management.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider text-gray-700 mb-4">Market Place ↗</h3>
            <p className="text-gray-600">Connect directly with buyers and get the best prices for your produce.</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8">
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-700">Check out our FAQs and we'll get back to you at a conveniently timed hour.</p>
            <button className="text-white px-4 py-2 rounded-md mt-4 hover:opacity-90" style={{ backgroundColor: "#24A565" }}>Get Help</button>

          </div>
        </div>
      </section>

      {/* Easy Steps Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center md:text-left">Easy steps</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 font-semibold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Farmers register and give basic details</h3>
                <p className="text-gray-600">
                  Farmers can use the platform to bridge to give them the best margin their efforts deserve. They can
                  register with basic details like name, farm location, crop types, etc. to get started with proper
                  help.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 font-semibold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Crop planning & guidance</h3>
                <p className="text-gray-600">
                  Our AI-based crop processor provides crop guidance for your synthetic schedule for the farmer. This is
                  based on many factors and offers insight on when, where, what to plant, and how to handle it for best
                  outcomes.
                </p>
                <div className="mt-4 bg-pink-100 p-2 rounded">
                  <h4 className="text-sm font-semibold uppercase">Video Explanation</h4>
                  <p className="text-xs text-gray-600">Get a visual</p>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 font-semibold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Marketplace with market trends</h3>
                <p className="text-gray-600">
                  Farmers can list all market-ready commodities and their prices. They can even view offers by retailers
                  to sell for advantage. In the future we can directly link your delivery from who can make the most for
                  the farmers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-16 px-8 bg-white text-center">
        <h2 className="text-4xl font-bold text-purple-900 mb-2">Get Started</h2>
        <p className="text-gray-600 mb-8">Look at new world of possibilities</p>

        <div className="max-w-md mx-auto">
          <div className="flex">
            <input
              type="text"
              placeholder="Your Phone number"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="text-white px-6 py-2 rounded-r-md hover:opacity-90" style={{ backgroundColor: "#24A565" }}>Sign Up</button>

          </div>
          <p className="text-xs text-gray-500 mt-2">or simply call service</p>
        </div>
      </section>


    </div>
  )
}