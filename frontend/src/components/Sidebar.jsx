import { NavLink } from "react-router-dom";

const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Planner", path: "/planner" },
    { label: "Crops", path: "/crops" },
    { label: "Market", path: "/market" },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white shadow-md p-6">
            <div className="flex items-center gap-2 mb-10">
                <img src="/src/assets/logo.png" alt="Logo" className="h-10" />
                <h1 className="text-2xl font-bold">KrishiMitra</h1>
            </div>
            <nav className="flex flex-col items-center gap-4 w-full">
                {navItems.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.path}
                        className={({ isActive }) =>
                            `rounded-lg py-2 px-4 text-center w-full ${isActive ? "bg-green-600 text-white" : "hover:bg-gray-100"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}