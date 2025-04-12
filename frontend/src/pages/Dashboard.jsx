import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CropCard from "../components/CropCard";
import DisplayField from "../components/DisplayField";
import InfoItem from "../components/InfoItem";
import ChartCard from "../components/ChartCard";
import LineChartComponent from "../components/LineChartComponent";
import BarChartComponent from "../components/BarChartComponent";

export const rainShowerData = [
  { day: "Mon", predicted: 10, actual: 12 },
  { day: "Tue", predicted: 15, actual: 14 },
  { day: "Wed", predicted: 8, actual: 10 },
  { day: "Thu", predicted: 12, actual: 13 },
  { day: "Fri", predicted: 20, actual: 18 },
];

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

export const scheduleTableData = [
  { name: "Urea", usage: 70, color: "bg-green-500" },
  { name: "DAP", usage: 55, color: "bg-blue-500" },
  { name: "Potash", usage: 35, color: "bg-yellow-500" },
  { name: "Pesticide A", usage: 60, color: "bg-red-500" },
];



const BACKEND_URL =
  import.meta.env.VITE_APP_BACKEND_URL ?? "http://localhost:5000";

export default function Dashboard() {
  const [crops, setCrops] = useState([]);
  const [farmerInfo, setFarmerInfo] = useState({
    name: "",
    phoneNumber: "",
    district: "",
    state: "",
    town: "",
    block: "",
    landArea: 0,
    farmingTips: "",
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch crops
        const cropsRes = await fetch(
          `${BACKEND_URL}/api/marketPlace/farmer/getCrops`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const cropsJson = await cropsRes.json();
        console.log(cropsJson);
        setCrops(cropsJson.farmerCrops || []);

        // Fetch farmer info
        const farmerRes = await fetch(
          `${BACKEND_URL}/api/marketPlace/farmer/getProfile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const farmerJson = await farmerRes.json();
        setFarmerInfo({
          name: farmerJson.farmer.name,
          phoneNumber: farmerJson.farmer.phoneNumber,
          district: farmerJson.farmer.district,
          state: farmerJson.farmer.state,
          town: farmerJson.farmer.town,
          block: farmerJson.farmer.block,
          landArea: farmerJson.farmer.landArea,
          farmingTips: farmerJson.farmer.farmingTips,
        });
        console.log(farmerJson);
      } catch (err) {
        console.error("Error loading dashboard data", err);
      }
    }
    fetchDashboardData();
  }, []);


  return (
      <div className="flex flex-col sm:flex-row min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">


      <Sidebar activePage="Dashboard" />

      <div className="flex-1 flex flex-col">
        <Header pageTitle="Dashboard" />

        <main className="flex-1 p-8 space-y-8">
          {/* Crop Cards */}
          
            {/* <div className="bg-white rounded-2xl shadow p-6"> */}
              {/* <h2 className="text-xl font-semibold text-center mb-6">Farmer Information</h2> */}
              <section className="w-full max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">👨‍🌾 Farmer Profile</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InfoItem label="Name" value={farmerInfo.name} icon="👤" />
                    <InfoItem label="Phone Number" value={farmerInfo.phoneNumber} icon="📞" />
                    <InfoItem label="District" value={farmerInfo.district} icon="🗺️" />
                    <InfoItem label="Town" value={farmerInfo.town} icon="🏘️" />
                    <InfoItem label="State" value={farmerInfo.state} icon="🗂️" />
                    <InfoItem label="Land Area (Acres)" value={farmerInfo.landArea} icon="🌾" />
                  </div>
                </div>
              </section>
            


          <p className="text-xl font-semibold text-gray-800 mb-2">Your Crops</p>
          <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {Array.from(
              new Map(
                crops
                  .filter((crop) => crop.cropName && crop.cropName.trim() !== "")
                  .map((crop) => [crop.cropName, crop])
              ).values()
            ).map((crop) => (
              <CropCard
                key={crop._id}
                id={crop.cropName}
                emoji="🌾"
                name={crop.cropName}
                color="#ffffff"
                text1={`${crop.fertilizer} fertilizer used`}
                text2={`crop sown on ${crop.date.toString().slice(0,10)}`}
              />
            ))}
          </section>


          {/* Farming Tips */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-4">
              <h4 className="font-semibold mb-2 text-lg">🌱 Farming Tips</h4>
              <div className="h-40 overflow-y-auto text-sm text-gray-700 px-1 space-y-3">
                {(farmerInfo.farmingTips || "No tips available.")
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">➤</span>
                      <span className="leading-relaxed">{line}</span>
                    </div>
                  ))}
              </div>
            </div>
          </section>

            

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard title="Rain shower prediction">
              <LineChartComponent
                data={rainShowerData}
                lines={[
                  { dataKey: "predicted", color: "#3b82f6" }, // blue
                  { dataKey: "actual", color: "#ef4444" },    // red
                ]}
              />
            </ChartCard>

            <ChartCard title="Irrigation Schedule">
              <BarChartComponent
                data={irrigationScheduleData}
                dataKey="used"
                xKey="day"
                color="#3b82f6"
              />
            </ChartCard>
            <ChartCard title="Time to harvest">
              <LineChartComponent
                data={timeToHarvestData}
                lines={[{ dataKey: "progress", color: "#3b82f6" }]}
              />
            </ChartCard>
          </section>

          {/* Bottom Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Expected Harvest" height="h-40">
              <BarChartComponent
                data={expectedHarvestData}
                dataKey="expected"
                xKey="crop"
                color="#3b82f6"
              />
            </ChartCard>
            <ChartCard title="Pesticide / Fertilizer Schedule" height="h-40">
              <BarChartComponent
                data={scheduleTableData}
                dataKey="usage"
                xKey="name"
                color="#3b82f6"
              />
            </ChartCard>
          </section>

        </main>
      </div>
    </div>
  );
}
