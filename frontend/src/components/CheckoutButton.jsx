import { useNavigate } from "react-router-dom";

export default function CheckoutButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/checkout")}
            className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg shadow-lg"
        >
            Check Out
        </button>
    );

}
