import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CropCard from "../components/CropCard";
import ChartCard from "../components/ChartCard";

export default function Planner() {
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
                            [Chart]
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
