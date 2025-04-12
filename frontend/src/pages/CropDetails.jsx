import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import ChartCard from "../components/ChartCard";
import BarChartComponent from "../components/BarChartComponent";
import LineChartComponent from "../components/LineChartComponent";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL ?? "http://localhost:5000";

export const irrigationScheduleData = [
    { day: "Mon", used: 50, recommended: 60 },
    { day: "Tue", used: 65, recommended: 70 },
    { day: "Wed", used: 55, recommended: 60 },
    { day: "Thu", used: 60, recommended: 65 },
    { day: "Fri", used: 70, recommended: 75 },
];

export const timeToHarvestData = [
    { week: "Week 1", progress: 10 },
    { week: "Week 2", progress: 30 },
    { week: "Week 3", progress: 55 },
    { week: "Week 4", progress: 75 },
    { week: "Week 5", progress: 100 },
];

export const expectedHarvestData = [
    { crop: "Wheat", expected: 3000, target: 3500 },
    { crop: "Rice", expected: 2500, target: 2700 },
    { crop: "Maize", expected: 2800, target: 3000 },
];

export default function CropDetails() {
    const { cropId } = useParams();
    const crop = "barley";

    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [cropDetails, setCropDetails] = useState(null);


    useEffect(() => {
        async function fetchCropDetails() {
            try {
                const cropRes = await fetch(
                    `${BACKEND_URL}/api/marketPlace/farmer/getCrop`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ cropName: cropId }),
                    }
                );
                const cropJson = await cropRes.json();
                setCropDetails(cropJson.farmerCrops); // assuming your backend sends this
                console.log("Fetched Crop Details:", cropJson.farmerCrops);
            } catch (err) {
                console.error("Error loading crop details", err);
            }
        }

        fetchCropDetails();
    }, []);


    const handleUpload = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/marketPlace/farmer/uploadCrop`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cropName: cropId,
                    cropQuantity: quantity,
                    cropPrice: price,
                }),
            });

            const data = await response.json();
            console.log("Upload Response:", data);
            alert("Crop uploaded successfully!");

            setQuantity("");
            setPrice("");
        } catch (error) {
            console.error("Upload Error:", error);
            alert("Failed to upload crop.");
        }
    };

    if (!crop) return <p className="p-8">Loading...</p>;

    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-8 space-y-8">
                    {/* Crop Info Card */}
                    <div className="bg-white rounded-2xl p-6 shadow col-span-1 xl:col-span-1 w-2/5 mx-auto">

                        <h2 className="text-xl text-center font-semibold mb-4">Crop Information</h2>

                        {cropDetails ? (
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-medium">Crop Name:</span>
                                    <span>{cropDetails.cropName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Sown Date:</span>
                                    <span>{new Date(cropDetails.date).toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Fertilizer Used:</span>
                                    <span>{cropDetails.fertilizer}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Fertilizer Period:</span>
                                    <span>{cropDetails.fertilizerPeriod} days</span>
                                </div>
                            </div>
                        ) : (
                            <p>Loading crop information...</p>
                        )}

                    </div>


                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Rain Shower Prediction */}
                        {/* <div className="bg-white rounded-2xl p-6 shadow col-span-1 xl:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">Rain shower prediction</h2>
                        <div className="bg-gray-100 h-52 rounded flex items-center justify-center text-gray-500">Chart Placeholder</div>
                    </div> */}

                        {/* Irrigation Schedule */}
                        <ChartCard title="Irrigation Schedule">
                            <BarChartComponent
                                data={irrigationScheduleData}
                                dataKey="used"
                                xKey="day"
                                color="#3b82f6"
                            />
                        </ChartCard>
                        {/* Time to Harvest */}
                        <ChartCard title="Time to harvest">
                            <LineChartComponent
                                data={timeToHarvestData}
                                lines={[{ dataKey: "progress", color: "#3b82f6" }]}
                            />
                        </ChartCard>
                        {/* Expected Harvest */}
                        <ChartCard title="Expected Harvest" height="h-40">
                            <BarChartComponent
                                data={expectedHarvestData}
                                dataKey="expected"
                                xKey="crop"
                                color="#3b82f6"
                            />
                        </ChartCard>

                        {/* Pesticide/Fertilizer Schedule */}
                        <div className="bg-white rounded-2xl p-6 shadow col-span-2 w-3/4">
                            <h2 className="text-xl font-semibold mb-4">Pesticide / Fertilizer Schedule</h2>
                            <ul className="space-y-2">
                                <li className="flex justify-between"><span>Neem Oil</span><span>45%</span></li>
                                <li className="flex justify-between"><span>Urea Fertilizer</span><span>29%</span></li>
                                <li className="flex justify-between"><span>Compost Mix</span><span>18%</span></li>
                                <li className="flex justify-between"><span>Potash Blend</span><span>25%</span></li>
                            </ul>
                        </div>

                        {/* Farm Guide */}
                        {/* <div className="bg-white rounded-2xl p-6 shadow">
                        <h2 className="text-xl font-semibold mb-4">Farm Guide</h2>
                        <div className="bg-gray-100 h-48 rounded flex items-center justify-center text-gray-500">Chart Placeholder</div>
                    </div> */}

                        {/* Upload to Marketplace */}
                        <div className="bg-white rounded-2xl p-6 shadow w-3/4 mx-auto">
                            <h2 className="text-xl font-semibold mb-4">Upload Crop to Marketplace</h2>
                            <input
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Crop Quantity in kg"
                                className="border p-2 w-full mb-4 rounded"
                            />
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Crop Price"
                                className="border p-2 w-full mb-4 rounded"
                            />
                            <button
                                onClick={handleUpload}
                                className="bg-blue-600 hover:bg-blue-700 transition text-white rounded py-2 w-full"
                            >
                                Upload Data
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
