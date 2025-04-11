import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Crops() {
    const crops = [
        { id: "wheat", name: "Wheat", color: "#fff4f4", emoji: "🌾", sales: "1,200 kg", growth: "+5%" },
        { id: "rice", name: "Rice", color: "#fff8e1", emoji: "🍚", sales: "2,500 kg", growth: "+8%" },
        { id: "maize", name: "Maize", color: "#e9fef3", emoji: "🌽", sales: "1,800 kg", growth: "+3%" },
    ];

    const scheduleData = [
        { name: "Urea", percent: "70%", color: "bg-green-500" },
        { name: "DAP", percent: "50%", color: "bg-blue-500" },
        { name: "Potash", percent: "35%", color: "bg-yellow-500" },
        { name: "Pesticide A", percent: "60%", color: "bg-red-500" },
    ];

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
                            {crops.map((crop) => (
                                <Link to={`/crops/${crop.id}`}>
                                    <div
                                        className="rounded-xl p-4 shadow hover:scale-[1.02] transition-transform duration-200"
                                        style={{ backgroundColor: crop.color }}
                                    >
                                        <div className="text-3xl">{crop.emoji}</div>
                                        <h4 className="font-bold mt-2">{crop.name}</h4>
                                        <p className="text-sm text-gray-500">Total Yield: {crop.sales}</p>
                                        <p className="text-green-600 text-xs">{crop.growth} from last week</p>
                                    </div>
                                </Link>
                            ))}

                            {/* "Add New Crop" Card */}
                            <div className="flex justify-center items-center bg-gray-100 text-4xl rounded-xl shadow cursor-pointer">
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
                                <span className="text-purple-600">● Predicted</span>
                                <span className="text-blue-500">● Actual</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-4 col-span-2 lg:col-span-1">
                            <h4 className="font-semibold mb-2">Irrigation Schedule</h4>
                            <div className="h-40 flex justify-center items-center text-gray-400">
                                [Bar Chart]
                            </div>
                            <div className="flex justify-around mt-4 text-xs">
                                <span className="text-blue-500">● Water Used</span>
                                <span className="text-green-500">● Recommended</span>
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
                                <span className="text-gray-500">Est: 3 weeks</span>
                                <span className="text-green-600">Progress: 65%</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-4 col-span-2">
                            <h4 className="font-semibold mb-2">Expected harvest</h4>
                            <div className="h-40 flex justify-center items-center text-gray-400">
                                [Grouped Bar Chart]
                            </div>
                            <div className="flex justify-around text-xs mt-4">
                                <span className="text-green-600">Expected: 3,200 kg</span>
                                <span className="text-yellow-500">Target: 4,000 kg</span>
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
                                        <th>Usage</th>
                                        <th className="text-right">Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scheduleData.map(({ name, percent, color }, idx) => (
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
                                <span className="text-blue-600">Tips Shared: 135</span>
                                <span className="text-green-500">Views: 863</span>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
