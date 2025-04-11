import React from "react";
import { Link } from "react-router-dom";

const CropCard = ({ id, name, emoji, color, sales, text2, text1}) => {
    return (
        <Link to={`/crops/${id}`}>
            <div
                className="rounded-xl p-4 shadow hover:scale-[1.02] transition-transform duration-200"
                style={{ backgroundColor: color || "#f0f0f0" }}
            >
                <div className="text-3xl">{emoji || "🌱"}</div>
                <h4 className="font-bold mt-2">{name}</h4>
                <p className="text-sm text-gray-500">{text1}</p>
                <p className="text-green-600 text-xs">{text2}</p>
            </div>
        </Link>
    );
};

export default CropCard;
