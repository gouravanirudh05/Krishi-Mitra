import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function CropsDashboard() {
    return (
        <div className="flex min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header title="Crops" />

                {/* Content Area */}
                <main className="flex-1 p-8 space-y-8">
                    {/* Your Crops Section */}
                    <section>
                        <h3 className="font-semibold mb-2 text-lg">Your Crops</h3>
                        <p className="text-sm text-gray-500 mb-4">Farm summary</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                            {["#fff4f4", "#fff8e1", "#e9fef3"].map((bg, i) => (
                                <div
                                    key={i}
                                    className={`rounded-xl p-4 shadow`}
                                    style={{ backgroundColor: bg }}
                                >
                                    <div className="text-3xl">📦</div>
                                    <h4 className="font-bold mt-2">Crop Name {i + 1}</h4>
                                    <p className="text-sm text-gray-500">Total Sales</p>
                                    <p className="text-pink-600 text-xs">+8% from yesterday</p>
                                </div>
                            ))}
                            <div className="flex justify-center items-center bg-gray-100 text-4xl rounded-xl shadow">
                                +
                            </div>
                        </div>
                    </section>

                    {/* Top Charts Row */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow p-4">
                            <h4 className="font-semibold mb-2">Rain shower prediction</h4>
                            <div className="h-40 flex justify-center items-center text-gray-400">
                                [Line Chart]
                            </div>
                            <div className="flex justify-around mt-4 text-xs">
                                <span className="text-purple-600">● Loyal</span>
                                <span className="text-red-500">● New</span>
                                <span className="text-green-500">● Unique</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-4 col-span-2 lg:col-span-1">
                            <h4 className="font-semibold mb-2">Irrigation Schedule</h4>
                            <div className="h-40 flex justify-center items-center text-gray-400">
                                [Bar Chart]
                            </div>
                            <div className="flex justify-around mt-4 text-xs">
                                <span className="text-blue-500">● Online Sales</span>
                                <span className="text-green-500">● Offline Sales</span>
                            </div>
                        </div>
                    </section>

                    {/* Mid Row */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow p-4">
                            <h4 className="font-semibold mb-2">Time to harvest</h4>
                            <div className="h-40 flex justify-center items-center text-gray-400">
                                [Area Chart]
                            </div>
                            <div className="flex justify-around text-xs mt-4">
                                <span className="text-gray-500">Last Month: $3,004</span>
                                <span className="text-green-600">This Month: $4,504</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-4 col-span-2">
                            <h4 className="font-semibold mb-2">Expected harvest</h4>
                            <div className="h-40 flex justify-center items-center text-gray-400">
                                [Grouped Bar Chart]
                            </div>
                            <div className="flex justify-around text-xs mt-4">
                                <span className="text-green-600">Reality Sales: 8,823</span>
                                <span className="text-yellow-500">Target Sales: 12,122</span>
                            </div>
                        </div>
                    </section>

                    {/* Bottom Row */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow p-4">
                            <h4 className="font-semibold mb-2">Pesticide / Fertilizer Schedule</h4>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left">
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Popularity</th>
                                        <th>Sales</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Home Decor Range", "45%", "bg-blue-500"],
                                        ["Disney Pink Bag", "29%", "bg-green-500"],
                                        ["Bathroom Essentials", "18%", "bg-purple-500"],
                                        ["Apple Watches", "25%", "bg-orange-500"],
                                    ].map(([name, percent, color], idx) => (
                                        <tr key={idx} className="border-t">
                                            <td>{`0${idx + 1}`}</td>
                                            <td>{name}</td>
                                            <td>
                                                <div className="relative w-full h-2 bg-gray-100 rounded-full">
                                                    <div
                                                        className={`absolute top-0 left-0 h-2 rounded-full ${color}`}
                                                        style={{ width: percent }}
                                                    ></div>
                                                </div>
                                            </td>
                                            <td className="text-right">{percent}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-white rounded-xl shadow p-4">
                            <h4 className="font-semibold mb-2">Farm Guide</h4>
                            <div className="h-40 flex justify-center items-center text-gray-400">
                                [Stacked Bar Chart]
                            </div>
                            <div className="flex justify-around text-xs mt-4">
                                <span className="text-blue-600">Volume: 1,135</span>
                                <span className="text-green-500">Services: 635</span>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
