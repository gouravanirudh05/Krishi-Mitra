import React, { useState } from "react";

export default function AddCropModal({ onClose, onAdd }) {
    const [input, setInput] = useState("");

    const recommended = ["Wheat", "Rice", "Maize", "Corn", "Sugarcane"];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-500
             bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                >
                    ×
                </button>


                <h2 className="text-xl font-semibold mb-4">Add a New Crop</h2>

                <input
                    type="text"
                    placeholder="Enter Crop Name"
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <div className="mb-4">
                    <p className="text-sm font-medium mb-1 text-gray-600">Recommended Crops:</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                        {recommended.map((name, idx) => (
                            <button
                                key={idx}
                                onClick={() => setInput(name)}
                                className="px-3 py-1 bg-gray-100 rounded-full hover:bg-green-100 transition"
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => {
                        if (input.trim()) {
                            onAdd(input.trim());
                            setInput("");
                            onClose();
                        }
                    }}
                    className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Add
                </button>
            </div>
        </div>
    );
}
