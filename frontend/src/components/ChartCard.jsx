import React from "react";

const ChartCard = ({ title, children, footer }) => {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <h4 className="font-semibold mb-2">{title}</h4>
            <div className="h-40 flex justify-center items-center text-gray-400">
                {children}
            </div>
            <div className="flex justify-around text-xs mt-4">{footer}</div>
        </div>
    );
};

export default ChartCard;
