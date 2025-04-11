import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Planner() {
    return (
        <div className="flex min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
            <Sidebar activePage="Planner" />
            <div className="flex-1 flex flex-col">
                <Header pageTitle="Planner" />
                <main className="flex-1 p-8 space-y-8">
                    {/* Your Crops */}
                    <section>
                        <h3 className="font-semibold mb-4 text-xl">Your Crops</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {["1", "2", "3"].map((name, i) => (
                                <div key={i} className="rounded-xl p-4 shadow bg-[#fff4f4]">
                                    <div className="text-3xl">📦</div>
                                    <h4 className="font-bold mt-2">Crop Name {name}</h4>
                                    <p className="text-sm text-gray-500">Total Sales</p>
                                    <p className="text-pink-600 text-xs">+8% from yesterday</p>
                                </div>
                            ))}
                            <div className="flex justify-center items-center bg-gray-100 text-4xl rounded-xl shadow">
                                +
                            </div>
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
