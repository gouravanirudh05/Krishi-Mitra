import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CropCard from "../components/CropCard";
import ChartCard from "../components/ChartCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const cropOptions = [
    { name: "Tomato", kc: 1.15 },
    { name: "Wheat", kc: 0.85 },
    { name: "Rice", kc: 1.05 },
    { name: "Maize", kc: 1.10 },
];
export default function Planner() {
    const [rainData, setRainData] = useState([]);
    const [irrigationData, setIrrigationData] = useState([]);
    const [selectedCrop, setSelectedCrop] = useState(cropOptions[0]);
    useEffect(() => {
        async function fetchRainForecast() {
            // TODO: Replace with /getlocation backend call
            const lat = 25.2843;
            const lon = 91.7308;
            const apiKey = import.meta.env.VITE_WEATHER_API;

            try {
                const response = await fetch(
                    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=no&alerts=no`
                );
                const data = await response.json();

                const ET0 = 4; // Example reference evapotranspiration

                const forecast = data.forecast.forecastday.map((day) => {
                    const dateLabel = new Date(day.date).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                    });

                    const rainfall = day.day.totalprecip_mm || 0;
                    const irrigation = Math.max(ET0 * selectedCrop.kc - rainfall, 0);

                    return {
                        date: dateLabel,
                        rain: parseFloat(rainfall.toFixed(2)),
                        irrigation: parseFloat(irrigation.toFixed(2)),
                    };
                });

                setRainData(forecast.map((d) => ({ date: d.date, rain: d.rain })));
                setIrrigationData(forecast.map((d) => ({ date: d.date, irrigation: d.irrigation })));
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }

        fetchRainForecast();
    }, [selectedCrop]);
    return (
        <div className="flex min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
            <Sidebar activePage="Planner" />
            <div className="flex-1 flex flex-col">
                <Header pageTitle="Planner" />

                <main className="flex-1 p-8 space-y-8">
                    {/* Your Crops */}
                    <section>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {["1", "2", "3"].map((name, i) => (
                                <CropCard
                                    key={i}
                                    id={i}
                                    emoji="📦"
                                    name={`Crop Name ${name}`}
                                    color="#fff4f4"
                                    sales={`${(i + 1) * 300} kg`}
                                    growth="+8% from yesterday"
                                />
                            ))}
                            <div className="flex justify-center items-center bg-gray-100 text-4xl rounded-xl shadow">
                                +
                            </div>
                        </div>
                    </section>

                    {/* Charts */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <ChartCard title="Rain shower prediction">
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={rainData}>
                                    <XAxis dataKey="date" />
                                    <YAxis unit=" mm" />
                                    <Tooltip />
                                    <Bar dataKey="rain" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartCard>

                        <ChartCard title="Irrigation Schedule">
                            [Bar Chart]
                        </ChartCard>
                        <ChartCard title="Time to harvest">
                            [Line Chart]
                        </ChartCard>
                    </section>

                    {/* Bottom Charts */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartCard title="Expected Harvest" height="h-40">
                            [Bar Graph]
                        </ChartCard>
                        <ChartCard title="Pesticide / Fertilizer Schedule" height="h-40">
                            <div className="text-sm text-gray-500">[Table with bars]</div>
                        </ChartCard>
                    </section>
                </main>
            </div>
        </div>
    );
}
