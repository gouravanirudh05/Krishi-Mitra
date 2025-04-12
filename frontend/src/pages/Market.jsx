import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CropCard from "../components/CropCard";
import ChartCard from "../components/ChartCard";
const BACKEND_URL =
  import.meta.env.VITE_APP_BACKEND_URL ?? "http://localhost:5000";
export default function MarketDashboard() {
    const [farmerCrops, setFarmerCrops] = useState([]);

    useEffect(() => {
        async function fetchFarmerCrops() {
            try {
                const farmerId = localStorage.getItem("farmerId"); // or extract from JWT if using auth
                const res = await fetch(`${BACKEND_URL}/api/marketPlace/farmer/getMarket`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();
                if (data.success) {
                    setFarmerCrops(data.farmerCrops);
                }
            } catch (err) {
                console.error("Failed to fetch crops", err);
            }
        }

        fetchFarmerCrops();
    }, []);

    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
            <Sidebar />

            <div className="flex flex-col flex-1">
                <Header title="Market Overview" />

                <main className="flex-1 p-8 space-y-8">
                    {/* Your Crops Section */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-4">Your Market Crops</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {farmerCrops.map((crop) => (
                                <CropCard
                                    key={crop._id}
                                    id={crop._id}
                                    name={crop.cropName}
                                    emoji="🌾"
                                    color="#d1fae5"
                                    sales={`${crop.cropQuantity} kg`}
                                    growth={`₹${crop.cropPrice} per kg`}
                                />
                            ))}
                            <div className="flex items-center justify-center bg-gray-200 rounded-xl shadow text-4xl font-light cursor-pointer">
                                +
                            </div>
                        </div>
                    </div>

                    {/* Graph Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <ChartCard title="Market Trends">[Market Trends Chart Placeholder]</ChartCard>
                        <ChartCard title="Profit Ratio / with your price">[Profit Bar Chart Placeholder]</ChartCard>
                        <ChartCard title="Time to Harvest">[Time to Harvest Chart Placeholder]</ChartCard>
                    </div>

                    {/* Expected Harvest Profit */}
                    <div className="mt-4">
                        <ChartCard title="Expected Harvest Profit">[Expected Harvest Profit Chart Placeholder]</ChartCard>
                    </div>
                </main>
            </div>
        </div>
    );
}
