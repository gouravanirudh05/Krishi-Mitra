import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
      {/* Pass activePage to Sidebar */}
      <Sidebar activePage="Dashboard" />

      <div className="flex-1 flex flex-col">
        {/* Pass pageTitle to Header */}
        <Header pageTitle="Dashboard" />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8">
          {/* Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow hover:scale-105 transition transform duration-200"
              >
                <div className="text-3xl mb-2">🌾</div>
                <h3 className="font-bold">Crop Name {i}</h3>
                <p className="text-sm text-gray-500">Total Sales</p>
                <p className="text-green-600 text-xs">+8% from yesterday</p>
              </div>
            ))}
            <div className="flex justify-center items-center bg-white rounded-xl shadow text-4xl text-gray-400">
              +
            </div>
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-4">
              <h4 className="font-semibold mb-2">Rain shower prediction</h4>
              <div className="h-32 flex justify-center items-center text-gray-400">[Chart]</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h4 className="font-semibold mb-2">Irrigation Schedule</h4>
              <div className="h-32 flex justify-center items-center text-gray-400">[Bar Chart]</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h4 className="font-semibold mb-2">Time to harvest</h4>
              <div className="h-32 flex justify-center items-center text-gray-400">[Line Chart]</div>
            </div>
          </section>

          {/* Bottom Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-4">
              <h4 className="font-semibold mb-2">Expected Harvest</h4>
              <div className="h-40 flex justify-center items-center text-gray-400">[Bar Graph]</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h4 className="font-semibold mb-2">Pesticide / Fertilizer Schedule</h4>
              <div className="text-sm text-gray-500">[Table with bars]</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
