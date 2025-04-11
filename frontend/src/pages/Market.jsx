import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CropCard from "../components/CropCard";
import ChartCard from "../components/ChartCard";

export default function MarketDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex flex-col flex-1">
                {/* Header */}
                <Header title="Market Overview" />

                {/* Main content */}
                <main className="flex-1 p-8 space-y-8">
                    {/* Your Crops Section */}
                    <div className="mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3].map((i) => (
                                <CropCard
                                    key={i}
                                    id={i}
                                    name={`Crop Name ${i}`}
                                    emoji="🌾"
                                    color="#fee2e2"
                                    sales={`${i * 500} kg`}
                                    growth="+8% from yesterday"
                                />
                            ))}
                            <div className="flex items-center justify-center bg-gray-200 rounded-xl shadow text-4xl font-light">
                                +
                            </div>
                        </div>
                    </div>

                    {/* Graph Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <ChartCard
                            title="Market Trends"
                            footer={
                                <>
                                    <span className="text-purple-500">Loyal</span>
                                    <span className="text-red-500">New</span>
                                    <span className="text-green-500">Unique</span>
                                </>
                            }
                        >
                            [Market Trends Chart Placeholder]
                        </ChartCard>

                        <ChartCard
                            title="Profit Ratio / with your price"
                            footer={
                                <>
                                    <span className="text-blue-600">● Online Sales</span>
                                    <span className="text-green-600">● Offline Sales</span>
                                </>
                            }
                        >
                            [Profit Bar Chart Placeholder]
                        </ChartCard>

                        <ChartCard
                            title="Time to Harvest"
                            footer={
                                <>
                                    <div>
                                        <div className="text-blue-600">● Last Month</div>
                                        <div className="text-gray-500">$3,004</div>
                                    </div>
                                    <div>
                                        <div className="text-green-600">● This Month</div>
                                        <div className="text-gray-500">$4,504</div>
                                    </div>
                                </>
                            }
                        >
                            [Time to Harvest Chart Placeholder]
                        </ChartCard>
                    </div>

                    {/* Expected Harvest Profit */}
                    <div className="mt-4">
                        <ChartCard
                            title="Expected Harvest Profit"
                            footer={
                                <>
                                    <div>
                                        <div className="text-green-600">Reality Sales (Global)</div>
                                        <div className="text-right">8,823</div>
                                    </div>
                                    <div>
                                        <div className="text-yellow-600">Target Sales (Commercial)</div>
                                        <div className="text-right">12,122</div>
                                    </div>
                                </>
                            }
                        >
                            [Expected Harvest Profit Chart Placeholder]
                        </ChartCard>
                    </div>
                </main>
            </div>
        </div>
    );
}
