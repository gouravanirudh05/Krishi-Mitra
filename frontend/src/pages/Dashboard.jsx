import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CropCard from "../components/CropCard";
import ChartCard from "../components/ChartCard";
import DisplayField from "../components/DisplayField";

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
    <div className="flex min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
      <Sidebar activePage="Dashboard" />

      <div className="flex-1 flex flex-col">
        <Header pageTitle="Dashboard" />

        <main className="flex-1 p-8 space-y-8">
          {/* Crop Cards */}
          <section className="w-3/4 mx-auto">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold text-center mb-6">Farmer Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DisplayField label="Name" value={farmerInfo.name} />
                <DisplayField label="Phone Number" value={farmerInfo.phoneNumber} />
                <DisplayField label="District" value={farmerInfo.district} />
                <DisplayField label="Town" value={farmerInfo.town} />
                <DisplayField label="Block" value={farmerInfo.block} />
                <DisplayField label="State" value={farmerInfo.state} />
                <DisplayField label="Land Area (acres)" value={farmerInfo.landArea} />
              </div>
            </div>
          </section>

          <p className="text-xl font-semibold text-gray-800 mb-2">Your Crops</p>
          <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {crops
              .filter((crop) => crop.cropName && crop.cropName.trim() !== "")
              .map((crop) => (
                <CropCard
                  key={crop._id}
                  id={crop._id}
                  emoji="🌾"
                  name={crop.cropName}
                  color="#ffffff"
                  fertilizer={crop.fertilizer}
                  growth="+8% from yesterday"
                />
              ))}
          </section>

          {/* Farming Tips */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-4">
              <h4 className="font-semibold mb-2">Farming Tips</h4>
              <div className="h-40 overflow-y-auto text-sm text-gray-700 whitespace-pre-line px-1">
                {farmerInfo.farmingTips || "No tips available."}
              </div>
            </div>
          </section>              

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard title="Rain shower prediction">[Chart]</ChartCard>
            <ChartCard title="Irrigation Schedule">[Bar Chart]</ChartCard>
            <ChartCard title="Time to harvest">[Line Chart]</ChartCard>
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
