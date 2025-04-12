import React, { useState } from "react";

const availableCrops = ["Wheat", "Rice", "Corn", "Millet", "Barley"];

export default function UploadCropModal({ onClose }) {
    const [selectedCrop, setSelectedCrop] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleUpload = () => {
        if (selectedCrop && quantity > 0) {
            console.log("Uploading:", { selectedCrop, quantity });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-500 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold mb-4">Upload a Crop</h2>

                {/* Crop List */}
                <label className="block text-sm text-gray-600 mb-1">Choose Crop:</label>
                <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full mb-4 p-2 border rounded focus:outline-none"
                >
                    <option value="">-- Select --</option>
                    {availableCrops.map((crop) => (
                        <option key={crop} value={crop}>
                            {crop}
                        </option>
                    ))}
                </select>

                {/* Quantity Input */}
                <label className="block text-sm text-gray-600 mb-1">Quantity (kg):</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    className="w-full mb-6 p-2 border rounded focus:outline-none"
                />

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
                >
                    Upload to Marketplace
                </button>
            </div>
        </div>
    );
}
