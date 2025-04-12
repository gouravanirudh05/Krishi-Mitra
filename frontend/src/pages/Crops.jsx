import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CropCard from "../components/CropCard";
import ChartCard from "../components/ChartCard";
import AddCropModal from "../components/AddCropModal";
import dummyCrops from "../data/dummyCrops";
import dummySchedule from "../data/dummySchedule";

export default function Crops() {
    const [crops, setCrops] = useState(dummyCrops);
    const [showModal, setShowModal] = useState(false);

    const handleAddCrop = (cropName) => {
        setCrops((prev) => [
            ...prev,
            {
                id: cropName.toLowerCase().replace(/\s/g, "-"),
                name: cropName,
                emoji: "🌾",
                color: "#fefefe",
                sales: "0 kg",
                growth: "+0%",
            },
        ]);
    };

    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header title="Crops" />

                <main className="flex-1 p-8 space-y-8">
                    <section>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                            {crops.map((crop) => (
                                <CropCard key={crop.id} {...crop} />
                            ))}

                            <div
                                className="flex justify-center items-center bg-gray-100 text-4xl rounded-xl shadow cursor-pointer hover:bg-gray-200 transition"
                                onClick={() => setShowModal(true)}
                            >
                                +
                            </div>
                        </div>
                    </section>

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
                                    {dummySchedule.map(({ name, percent, color }, idx) => (
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

                        <ChartCard
                            title="Farm Guide"
                            footer={
                                <>
                                    <span className="text-blue-600">Tips Shared: 135</span>
                                    <span className="text-green-500">Views: 863</span>
                                </>
                            }
                        >
                            [Stacked Bar Chart]
                        </ChartCard>
                    </section>
                </main>
            </div>

            {showModal && (
                <AddCropModal onClose={() => setShowModal(false)} onAdd={handleAddCrop} />
            )}
        </div>
    );
}
