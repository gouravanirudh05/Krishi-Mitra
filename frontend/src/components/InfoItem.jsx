import React from "react";

const InfoItem = ({ label, value, icon }) => (
    <div className="flex items-start gap-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="text-gray-500 text-sm">{label}</div>
        <div className="font-medium text-lg">{value || "—"}</div>
      </div>
    </div>
  );
  
export default InfoItem;