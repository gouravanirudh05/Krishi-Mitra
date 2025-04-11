import React from "react";

export default function HeaderCustomer() {
    return (
        <header className="bg-white px-6 py-4 shadow flex justify-between items-center">
            <h2 className="text-3xl font-bold">Marketplace</h2>
            <div className="flex items-center gap-4">
                <div className="relative cursor-pointer">
                    <div className="w-6 h-6 rounded-full bg-gray-300" />
                    {/* You can add a badge/count */}
                </div>
                <img src="/src/assets/profile.png" className="w-10 h-10 rounded-full" alt="User" />
            </div>
        </header>
    );
}
