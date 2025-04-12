import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CropCard from "../components/CropCard";
import ChartCard from "../components/ChartCard";
import { LineChart } from "recharts";
import LineChartComponent from "../components/LineChartComponent";

export const marketTrendsData = [
    { day: "Mon", yourPrice: 32, marketPrice: 30 },
    { day: "Tue", yourPrice: 33, marketPrice: 31 },
    { day: "Wed", yourPrice: 31, marketPrice: 29 },
    { day: "Thu", yourPrice: 35, marketPrice: 33 },
    { day: "Fri", yourPrice: 34, marketPrice: 32 },
    { day: "Sat", yourPrice: 36, marketPrice: 34 },
    { day: "Sun", yourPrice: 33, marketPrice: 30 },
];


export const profitRatioData = [
    { crop: "Wheat", yourProfit: 4500, marketProfit: 3800 },
    { crop: "Rice", yourProfit: 6000, marketProfit: 5700 },
    { crop: "Corn", yourProfit: 3200, marketProfit: 3500 },
    { crop: "Barley", yourProfit: 5000, marketProfit: 4800 },
];

export const timeToHarvestData = [
    { week: "Week 1", progress: 10 },
    { week: "Week 2", progress: 30 },
    { week: "Week 3", progress: 55 },
    { week: "Week 4", progress: 75 },
    { week: "Week 5", progress: 100 },
];

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
        <div className="min-h-screen bg-gray-50 flex">
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
                        <ChartCard title="Market Trends">
                            <LineChartComponent
                                data={marketTrendsData}
                                lines={[
                                    { dataKey: "yourPrice", color: "#8884d8" },
                                    { dataKey: "marketPrice", color: "#82ca9d" },
                                ]}
                            />
                        </ChartCard>
                        <ChartCard title="Profit Ratio with your price">
                            <LineChartComponent
                                data={profitRatioData}
                                lines={[
                                    { dataKey: "yourProfit", color: "#8884d8" },
                                    { dataKey: "marketProfit", color: "#82ca9d" },
                                ]}
                            />
                        </ChartCard>
                        <ChartCard title="Time to Harvest">
                            <LineChartComponent
                                data={timeToHarvestData}
                                lines={[{ dataKey: "progress", color: "#8884d8" }]}
                            />
                        </ChartCard>
                    </div>
                </main>
            </div>
        </div>
    );
}
