import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <header className="bg-white px-6 py-4 shadow flex justify-between items-center">
            <div>
                <h2 className="text-3xl font-bold capitalize">
                    {path === "/" ? "Dashboard" : path.slice(1)}
                </h2>
            </div>
            {/* Right side like search, profile, etc. */}
            <div className="flex items-center gap-4">
                {/* (same content as before) */}
            </div>
        </header>
    );
}
