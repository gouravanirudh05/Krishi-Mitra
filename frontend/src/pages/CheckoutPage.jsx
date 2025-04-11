import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// Dummy cart data
const cartItems = [
    { id: "wheat", name: "Wheat", quantity: 10, pricePerKg: 30 },
    { id: "rice", name: "Rice", quantity: 5, pricePerKg: 40 },
    { id: "maize", name: "Maize", quantity: 8, pricePerKg: 35 },
];

export default function CheckOutPage() {
    const navigate = useNavigate();
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.pricePerKg, 0);

    return (
        <div className="flex min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
            {/* Simplified Sidebar */}
            <Sidebar
                customNav={[{ label: "Marketplace", path: "/marketplace" }]}
                activePage="Marketplace"
            />


            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <Header pageTitle="Check Out" />

                <main className="flex-1 p-8">
                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        ← Back
                    </button>

                    <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

                    <div className="bg-white rounded-xl shadow p-6">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="pb-2">Crop</th>
                                    <th className="pb-2">Quantity (kg)</th>
                                    <th className="pb-2">Price/kg (₹)</th>
                                    <th className="pb-2">Total (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-2">{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>₹{item.pricePerKg}</td>
                                        <td>₹{item.quantity * item.pricePerKg}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-6">
                            <div className="text-lg font-semibold">
                                Total: <span className="text-green-600">₹{total}</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
