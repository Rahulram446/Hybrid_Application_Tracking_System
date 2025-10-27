import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const links = [
    { name: "Home", path: "/dashboard/home" },
    { name: "Admin", path: "/dashboard/admin" },
    { name: "Applicant", path: "/dashboard/applicant" },
    { name: "Form", path: "/dashboard/form" },
    { name: "Bot", path: "/dashboard/bot" },
  ];

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">My Dashboard</h1>
      <div className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`hover:text-gray-200 ${
              location.pathname === link.path ? "underline font-semibold" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
