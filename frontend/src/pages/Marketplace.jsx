import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HeaderCustomer from "../components/HeaderCustomer";
import CropCardCustomer from "../components/CropCardCustomer";
import CheckoutButton from "../components/CheckoutButton";
import CropModal from "../components/CropModal";
import dummyCrops from "../data/dummyCrops";

export default function CustomerDashboard() {
  const [selectedCrop, setSelectedCrop] = useState(null);

  return (
    <div className="flex min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
      <Sidebar customNav={[{ label: "Marketplace", path: "/marketplace" }]} activePage="Marketplace" />

      <div className="flex-1 flex flex-col">
        <HeaderCustomer />

        <main className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-4">Available Crops</h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {dummyCrops.map((crop) => (
              <div key={crop.id} onClick={() => setSelectedCrop(crop)}>
                <CropCardCustomer {...crop} />
              </div>
            ))}
          </section>
        </main>

        <CheckoutButton />
        <CropModal crop={selectedCrop} onClose={() => setSelectedCrop(null)} />
      </div>
    </div>
  );
}
