import { NavLink } from "react-router-dom";

export default function Sidebar({ activePage, customNav }) {
  const defaultNav = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Crops", path: "/crops" },
    { label: "Market", path: "/market" },
  ];

  const navItems = customNav || defaultNav;

  return (
    <>
      {/* Sidebar for larger screens */}
      <aside className="hidden sm:block w-64 bg-white shadow-md p-6">
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
                `rounded-lg py-2 px-4 text-left w-full ${
                  isActive || activePage === item.label
                    ? "bg-green-500 text-white"
                    : "hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Top Navbar for mobile */}
      <nav className="block sm:hidden w-full bg-white shadow-md p-4 flex justify-around">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              `text-sm px-2 py-1 ${
                isActive || activePage === item.label
                  ? "text-green-600 font-semibold"
                  : "text-gray-600"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
