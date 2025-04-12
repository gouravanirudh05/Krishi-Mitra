import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import HeaderCustomer from "../components/HeaderCustomer";
import CropCardCustomer from "../components/CropCardCustomer";
import CheckoutButton from "../components/CheckoutButton";
import CropModal from "../components/CropModal";

const BACKEND_URL =
  import.meta.env.VITE_APP_BACKEND_URL ?? "http://localhost:5000";

export default function Marketplace() {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [crops, setCrops] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function fetchMarket() {
      try {
        const marketRes = await fetch(
          `${BACKEND_URL}/api/marketPlace/customer/getMarket`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const marketJson = await marketRes.json();
        setCrops(marketJson);
      } catch (err) {
        console.error("Error loading market data", err);
      }
    }
    fetchMarket();
  }, []);

  const addToCart = (cropId) => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const crop = crops.find((crop) => crop._id === cropId);

    const index = existingCart.findIndex((item) => item.id === cropId);

    if (index === -1) {
      existingCart.push({
        id: cropId,
        cropName: crop.cropName,
        cropPrice: crop.cropPrice,
        cropQuantity: 1,
      });
    } else {
      existingCart[index].cropQuantity += 1;
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    console.log("Cart after adding:", existingCart);

    setSelectedCrop(crop);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const removeFromCart = (cropId) => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const crop = crops.find((crop) => crop._id === cropId);

    const index = existingCart.findIndex((item) => item.id === cropId);

    if (index === -1) {
      existingCart.push({
        id: cropId,
        cropName: crop.cropName,
        cropPrice: crop.cropPrice,
        cropQuantity: 1,
      });
    } else {
      existingCart[index].cropQuantity += 1;
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    console.log("Cart after adding:", existingCart);

    setSelectedCrop(crop);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
      <Sidebar
        customNav={[{ label: "Marketplace", path: "/marketplace" }]}
        activePage="Marketplace"
      />

      <div className="flex-1 flex flex-col">
        <HeaderCustomer />

        <main className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-4">Available Crops</h2>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {crops.map((crop) => (
              <CropCardCustomer
                key={crop._id}
                id={crop._id}
                cropName={crop.name}
                cropPrice={crop.price}
                cropQuantity={crop.availableQuantity}
                farmerId={crop.farmer}
                onIncrement={() => addToCart(crop._id)}
                onDecrement={() => removeFromCart(crop._id)}
              />

            ))}
          </section>
        </main>

        <CheckoutButton />
        <CropModal crop={selectedCrop} onClose={() => setSelectedCrop(null)} />

        {showToast && (
          <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
            Crop added to cart!
          </div>
        )}
      </div>
    </div>
  );
}
