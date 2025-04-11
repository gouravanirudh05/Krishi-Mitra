import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CropCard from "../components/CropCard";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
      <Sidebar activePage="Dashboard" />

      <div className="flex-1 flex flex-col">
        <Header pageTitle="Dashboard" />

        <main className="flex-1 p-8 space-y-8">
          {/* Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <CropCard
                key={i}
                id={i}
                emoji="🌾"
                name={`Crop Name ${i}`}
                color="#ffffff"
                sales={`${(i + 1) * 200} kg`}
                growth="+8% from yesterday"
              />
            ))}
            <div className="flex justify-center items-center bg-white rounded-xl shadow text-4xl text-gray-400">
              +
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
