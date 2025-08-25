import React from "react";
import aloura from "../../assets/Aloura.png";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "FocusZone", path: "/focuszone" },
    { name: "Journal", path: "/journal" },
    { name: "Mood", path: "/mood" },
    { name: "Learn & Grow", path: "/learn" },
    { name: "Self-Care", path: "/selfcare" },
    { name: "Wellbeing", path: "/wellbeing" },
  ];

  return (
    <div className="w-48 min-h-screen bg-[#ebdaf0] p-3 flex flex-col items-center shadow-md">
      {/* Logo */}
      <header className="w-full flex justify-center mb-5 animate-fade-in">
        <img src={aloura} alt="Aloura Logo" className="w-32" /> 
      </header>

      {/* Nav Items */}
      <ul className="flex flex-col w-full space-y-2">
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:bg-white/70 hover:shadow-sm ${
                isActive ? "bg-white font-semibold shadow-sm" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

