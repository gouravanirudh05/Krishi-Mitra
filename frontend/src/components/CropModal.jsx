// export default function CropModal({ crop, onClose }) {
//     if (!crop) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
//             <div className="bg-white p-6 rounded-xl shadow-lg w-96 scale-100 transition-transform duration-300 relative">
//                 <button
//                     onClick={onClose}
//                     className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center bg-gray-200 text-xl font-bold text-gray-700 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200"
//                     aria-label="Close"
//                 >
//                     ×
//                 </button>

//                 <div className="text-4xl mb-4">{crop.emoji || "🌾"}</div>
//                 <h2 className="text-2xl font-bold mb-2">{crop.name}</h2>
//                 <p className="text-sm text-gray-500 mb-2">Price: ₹{crop.price} / kg</p>
//                 <p className="text-sm text-gray-500 mb-2">Field Size: {crop.fieldSize}</p>
//                 <p className="text-sm text-gray-500">Expected Yield: 3,000 kg</p>
//             </div>
//         </div>
//     );
// }
