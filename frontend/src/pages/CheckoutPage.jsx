import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function CheckOutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    console.log("Stored cart from localStorage:", storedCart);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.cropQuantity * item.cropPrice,
    0
  );

  return (
    <div className="flex min-h-screen bg-[#f6fbf9] text-gray-800 font-poppins">
      <Sidebar
        customNav={[{ label: "Marketplace", path: "/marketplace" }]}
        activePage="Marketplace"
      />

      <div className="flex-1 flex flex-col">
        <Header pageTitle="Check Out" />

        <main className="flex-1 p-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

          {cartItems.length === 0 ? (
            <div className="text-gray-600">Your cart is empty.</div>
          ) : (
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
                      <td className="py-2">{item.cropName}</td>
                      <td>{item.cropQuantity}</td>
                      <td>₹{item.cropPrice}</td>
                      <td>₹{item.cropQuantity * item.cropPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mt-6">
                <div className="text-lg font-semibold">
                  Total:{" "}
                  <span className="text-green-600 font-bold">₹{total}</span>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Print Bill
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
