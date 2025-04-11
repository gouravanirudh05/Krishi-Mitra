import React from "react";
import Sidebar from "../components/Sidebar"; // adjust the path as needed
import Header from "../components/Header";

export default function MarketDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex flex-col flex-1">
                {/* Header */}
                <Header />

                {/* Main content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* Your Crops Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Your Crops</h3>
                        <p className="text-sm text-gray-500 mb-4">Farm summary</p>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-red-100 p-4 rounded shadow">
                                    <div className="w-6 h-6 bg-gray-400 rounded-full mb-2" />
                                    <h4 className="font-bold">Crop Name {i}</h4>
                                    <p>Total Sales</p>
                                    <p className="text-sm text-blue-600">+8% from yesterday</p>
                                </div>
                            ))}
                            <div className="flex items-center justify-center bg-gray-200 rounded shadow text-4xl font-light">
                                +
                            </div>
                        </div>
                    </div>

                    {/* Graph Sections */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Market Trends */}
                        <div className="bg-white p-4 rounded shadow">
                            <h4 className="font-semibold mb-2">Market Trends</h4>
                            <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
                                [Market Trends Chart Placeholder]
                            </div>
                            <div className="flex justify-around mt-2 text-xs">
                                <span className="text-purple-500">Loyal Customers</span>
                                <span className="text-red-500">New Customers</span>
                                <span className="text-green-500">Unique Customers</span>
                            </div>
                        </div>

                        {/* Profit Ratio */}
                        <div className="bg-white p-4 rounded shadow">
                            <h4 className="font-semibold mb-2">Profit ratio / with your price</h4>
                            <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
                                [Profit Bar Chart Placeholder]
                            </div>
                            <div className="flex justify-around mt-2 text-xs">
                                <span className="text-blue-600">● Online Sales</span>
                                <span className="text-green-600">● Offline Sales</span>
                            </div>
                        </div>

                        {/* Time to Harvest */}
                        <div className="bg-white p-4 rounded shadow">
                            <h4 className="font-semibold mb-2">Time to harvest</h4>
                            <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
                                [Time to Harvest Chart Placeholder]
                            </div>
                            <div className="flex justify-around mt-2 text-xs">
                                <div>
                                    <div className="text-blue-600">● Last Month</div>
                                    <div className="text-gray-500">$3,004</div>
                                </div>
                                <div>
                                    <div className="text-green-600">● This Month</div>
                                    <div className="text-gray-500">$4,504</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expected Harvest Profit */}
                    <div className="mt-4 bg-white p-4 rounded shadow">
                        <h4 className="font-semibold mb-2">Expected Harvest profit</h4>
                        <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
                            [Expected Harvest Profit Chart Placeholder]
                        </div>
                        <div className="flex justify-around mt-2 text-xs">
                            <div>
                                <div className="text-green-600">Reality Sales (Global)</div>
                                <div className="text-right">8,823</div>
                            </div>
                            <div>
                                <div className="text-yellow-600">Target Sales (Commercial)</div>
                                <div className="text-right">12,122</div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
